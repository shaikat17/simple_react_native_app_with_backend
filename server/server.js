
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import express from 'express'

// dot env
dotenv.config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to full stack react native app'
    })
})

// PORT
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})