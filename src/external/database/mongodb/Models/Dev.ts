import mongoose from 'mongoose'
import { Dev } from '../../../../entities/dev'

interface IDevModel extends mongoose.Document, Dev {}

const Schema = new mongoose.Schema({
    github: {
        type: String,
        required: true,
        lowercase: true
    },
    avatar: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model<IDevModel>('Dev', Schema)
