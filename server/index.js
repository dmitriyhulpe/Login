require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const router = require('./router/index')
const errorMiddleware = require('./middlewares/ErrorMiddleware')

const PORT = process.env.PORT
const application = express()

application.use(express.json())
application.use(cookieParser())
application.use(cors({
    credentials: true,
    origin: process.env.CLIENTURL
}))

application.use('/api', router)

application.use(errorMiddleware)


const start = async () => {
    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        application.listen(PORT, () => console.log('Server has been started...'))
    } catch (error) {
        console.log(error)
    }
}

start()