import express from 'express'
import {jobsCreate} from '../controllers/authcontrollers.js'

const authRouter = express.Router()

authRouter.post('/post-jobs', jobsCreate)

export default authRouter