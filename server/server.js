import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRouter from './routers/authrouters.js'
dotenv.config()
const app = express()

await connectDB() // Ensure you call the connectDB function to connect to the database
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})