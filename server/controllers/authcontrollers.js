import 'dotenv/config'
import Job from '../models/jobModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET_KEY

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
    console.log(req.body);
    
    if (!description || !location) {
        return res.status(400).json({ message: 'Please fill missing details' })
    }

    try {
        const job = await Job.create({
            description,
            location,

            // very important line, which creates relation b/w User and their Posts
            createdBy: req.user._id,
        })
        console.log(job);
        
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

        return res.status(200).json({ jobs })
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
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({ message: `Please provide all required fields` })
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            name: user.name,
            email: user.email,
            token,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            token,
            message: "Logged in successsfully!"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}