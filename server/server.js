import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import authRouter from './routers/authrouters.js'
dotenv.config()
const app = express()

// splits urls, loop through them  & trims white spaces, ignore empty quotes " ", 

// ex: [
//  "http://localhost:5173",
//  "https://myapp.vercel.app"
// ]
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

await connectDB() // Ensure you call the connectDB function to connect to the database
app.use(cors({

  // cors callback function checks whether browser's headers or allowedOrigins array contains credible client request
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // rejects if url is invalid
    return callback(new Error('Origin is not allowed by CORS'))
  },
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1

  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
