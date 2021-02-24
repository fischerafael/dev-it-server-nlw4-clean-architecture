import { IDevId } from '../../entities/dev'
import { ITask } from '../../entities/task'
import Dev from '../../external/database/mongodb/Models/Dev'

import { devRepository } from '../../external/database/repository/dev'
import { taskRepository } from '../../external/database/repository/task'

import { formatHttpResponse } from '../utils/http-response-formatter'

export const taskService = {
    async create(data: ITask, dev: IDevId, auth: IDevId) {
        try {
            const isAuthenticated = dev === auth
            if (!isAuthenticated)
                return formatHttpResponse(403, 'Not authorized')

            const hasDev = await devRepository.findById(dev)
            if (!hasDev || hasDev === 'error')
                return formatHttpResponse(404, 'Dev not found')

            const task = await taskRepository.create(
                {
                    description: data.description,
                    completed: data.completed,
                    durationInSeconds: data.durationInSeconds
                },
                dev
            )

            /*const createdTask = task as {
                _id: string
                description: string
                completed: boolean
                durationInSeconds: number
                dev: string
            }

            hasDev.tasks.push(createdTask._id)
            // @ts-ignore
            await hasDev.save()*/

            return formatHttpResponse(200, task)
        } catch (err) {
            return formatHttpResponse(500, err)
        }
    }
}
