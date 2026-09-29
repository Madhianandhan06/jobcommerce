import 'dotenv/config'
import Job from '../models/jobModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import Image from '../models/ImageModel.js'
import cloudinary from '../services/cloudinary.js'

const upload = multer({ dest: "uploads/" });
export const uploadProfileImage = upload.single('image')
const JWT_SECRET = process.env.JWT_SECRET_KEY
const isProduction = process.env.NODE_ENV === 'production'
const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

// protected route middleware
export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

export const jobsCreate = async (req, res) => {
    const { description, location } = req.body
    const normalizedDescription = description?.trim()
    const normalizedLocation = location?.trim()

    if (!normalizedDescription || !normalizedLocation) {
        return res.status(400).json({ message: 'Please fill missing details' })
    }

    try {
        const job = await Job.create({
            description: normalizedDescription,
            location: normalizedLocation,

            // very important line, which creates relation b/w User and their Posts
            createdBy: req.user._id,
        })
        return res.status(201).json({
            description: job.description,
            location: job.location,
            createdBy: job.createdBy,
            message: `Your Job post is created!`
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const searchJobs = async (req, res) => {
    const { description } = req.query

    try {
        const filter = {}

        if (description) {
            filter.description = description
        }

        const jobs = await Job.find(filter).sort({ createdAt: -1 })

        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found' })
        }

        const creatorIds = [...new Set(jobs.map((job) => job.createdBy.toString()))]
        const images = await Image.find({ createdBy: { $in: creatorIds } })
            .sort({ createdAt: -1 })
            .select('createdBy imageUrl')
        const profileImageByCreator = new Map()

        for (const image of images) {
            const creatorId = image.createdBy.toString()
            if (!profileImageByCreator.has(creatorId)) {
                profileImageByCreator.set(creatorId, image.imageUrl)
            }
        }

        const jobsWithProfiles = jobs.map((job) => ({
            ...job.toObject(),
            profileImageUrl: profileImageByCreator.get(job.createdBy.toString()) || null,
        }))

        return res.status(200).json({ jobs: jobsWithProfiles })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const myJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 })

        return res.status(200).json({ jobs })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        // Read the token from the httpOnly cookie and verify its user ID.
        res.set('Cache-Control', 'no-store')
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'No authentication cookie' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(401).json({ message: 'Not authenticated' })
    }
}

export const register = async (req, res) => {
    const name = req.body.name?.trim()
    const email = req.body.email?.trim().toLowerCase()
    const { password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({ message: `Please provide all required fields` })
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }
    const existiging = await User.findOne({email})

    if(existiging){
        return res.status(409).json({ message: `Account already exists try to login` })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword }) 

        const token = jwt.sign (
            { userId : user._id.toString() },
            JWT_SECRET,
            { expiresIn : '7d' } 
        )

        res.cookie('token', token, authCookieOptions)

        return res.json({
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const email = req.body.email?.trim().toLowerCase()
    const { password } = req.body

    if(!email || !password){
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({ message: 'User not found' })
    }
    try {
       const isMatch = await bcrypt.compare(password, user.password)
       
       if(!isMatch){
        return res.status(401).json({ message: 'Password was wrong' })
       }
        
        const token = jwt.sign (
            { userId : user._id.toString() },
            JWT_SECRET,
            { expiresIn : '7d' } 
        )

        res.cookie('token', token, authCookieOptions)

        return res.status(200).json({
            message: "Logged in successsfully!"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMyProfile = async (req, res) => {
    try {
        const images = await Image.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        return res.json({ images });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const postMyProfile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Select an image to upload." });
    }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    
    const image = await Image.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      createdBy: req.user._id,
    });

    res.json({
      image,
      message: "File received",
    });
  } catch (error) {
        return res.status(500).json({ message: error.message });
  }

}
