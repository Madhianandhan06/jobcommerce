import express from 'express'
import { jobsCreate, searchJobs } from '../controllers/authcontrollers.js'

const authRouter = express.Router()

authRouter.post('/post-jobs', jobsCreate) 
authRouter.get('/search-jobs', searchJobs)

export default authRouter