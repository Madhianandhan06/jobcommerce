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
  // Allow the Vite URL whether it is opened as localhost or 127.0.0.1.
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})