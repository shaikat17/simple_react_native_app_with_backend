
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import postRouter from './routes/postRoutes.js'

// dot env
dotenv.config()

// MONGODB Connection
connectDB()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)

// home
app.get('/', (req, res) => {
    res.send('Server is running')
})
// PORT
const PORT = process.env.PORT || 8080

// app.listen(PORT, () => {
//     console.log('Server is running on port '.bgGreen.white, PORT.bgGreen.white)
// })

export default app