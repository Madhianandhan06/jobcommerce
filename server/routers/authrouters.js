import express from 'express'
import { getCurrentUser, jobsCreate, login, myJobs, protect, register, searchJobs } from '../controllers/authcontrollers.js'

const authRouter = express.Router()

authRouter.post('/register', register) 
authRouter.post('/login', login) 
authRouter.get('/me', getCurrentUser)
authRouter.post('/post-jobs', protect, jobsCreate) 
authRouter.get('/search-jobs', searchJobs)
authRouter.get('/my-jobs', protect, myJobs)

export default authRouter