import express from 'express'
import cors from 'cors'

import { routes } from './routes'
import { connectToMongoDB } from '../external/database/mongodb'

connectToMongoDB()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
