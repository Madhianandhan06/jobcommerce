import express from 'express'
import { getCurrentUser, getMyProfile, jobsCreate, login, myJobs, postMyProfile, protect, register, searchJobs, uploadProfileImage } from '../controllers/authcontrollers.js'

const authRouter = express.Router()

authRouter.post('/register', register) 
authRouter.post('/login', login) 
authRouter.get('/me', getCurrentUser)
authRouter.post('/post-jobs', protect, jobsCreate) 
authRouter.get('/search-jobs', searchJobs)
authRouter.get('/my-jobs', protect, myJobs)

// authRouter.get('/images', protect, getProfile)
authRouter.get('/images', protect, getMyProfile)

authRouter.post('/upload', protect, uploadProfileImage, postMyProfile)

// authRouter.put('/upload/:id', protect, updateMyProfile)

// authRouter.delete('/my-jobs', protect, dltProfile)
// authRouter.delete('/my-jobs/:id', protect, dltMyProfile)


export default authRouter