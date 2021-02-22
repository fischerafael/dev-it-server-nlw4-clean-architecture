import mongoose from 'mongoose'

interface IDev extends mongoose.Document {
    github: string
    avatar: string
    name: string
}

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

export default mongoose.model<IDev>('Dev', Schema)
