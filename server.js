const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./connect/database')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

// Connect to the database
connectDB()

const app = express()

// Enable CORS for the specific origin
app.use(cors({
    origin: 'https://genuine-cat-085d21.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define routes
app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Error handling middleware
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`))