import express from 'express'
import cors from 'cors'
import { connectToMongoDB } from '../external/database/mongodb'

connectToMongoDB()

const app = express()

app.use(cors())
app.use(express.json())

export default app
