import { IDevId } from '../../../../entities/dev'
import { ITask } from '../../../../entities/task'
import Task from '../../mongodb/Models/Task'

export const taskRepository = {
    async create(data: ITask, dev: IDevId): Promise<object | 'error'> {
        try {
            const task = await Task.create({
                description: data.description,
                completed: data.completed,
                durationInSeconds: data.durationInSeconds,
                dev: dev
            })

            await task.populate('dev').execPopulate()

            return task
        } catch (err) {
            return 'error'
        }
    },

    async indexById(devId: string) {
        try {
            const tasks = await Task.find({ dev: devId })

            return tasks
        } catch (err) {
            return 'error'
        }
    }
}
