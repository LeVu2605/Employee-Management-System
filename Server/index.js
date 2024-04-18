import express from 'express'
import cors from 'cors'
import authRoutes from './Router/adminRoutes.js'
import employeeRoute from './Router/employeeRoutes.js'
import connectDB from './utils/ConnectDB.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}))

app.use(express.json());

app.use(cookieParser())

app.use(express.static('Public'))

app.use('/auth', authRoutes)
app.use('/employee', employeeRoute)

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})