import dotenv from 'dotenv'
dotenv.config()
import * as allRouter from './modules/index.router.js'
import express from 'express'
import connectDB from './DB/connection.js'
import { globalErrorHandling } from './services/ErrorHandlig.js'
const app = express()
// setup port and the baseUrl
const baseUrl = process.env.BASEURL
const port = process.env.PORT || 5000
//convert Buffer Data
app.use(express.json())
//Setup API Routing 
app.use(`${baseUrl}/auth`, allRouter.authRouter)
app.use(`${baseUrl}/message`, allRouter.messageRouter)
app.use(`${baseUrl}/user`, allRouter.userRouter)


app.use(`*`, (req, res) => {
    res.json({ message: "In-valid routing" })
})

app.get('/', (req, res) => res.send('Hello World!'))
connectDB()
// Handling Error
app.use(globalErrorHandling)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))