import mongoose from 'mongoose'
import { ITask } from '../../../../entities/task'

interface ITaskModel extends mongoose.Document, ITask {
    dev: string
}

const Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    durationInSeconds: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    dev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev',
        required: true
    }
})

export default mongoose.model<ITaskModel>('Task', Schema)
