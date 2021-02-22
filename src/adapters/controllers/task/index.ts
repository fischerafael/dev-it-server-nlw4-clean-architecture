import { Request, Response } from 'express'
import { taskService } from '../../../usecases/task'

export const taskController = {
    async create(req: Request, res: Response) {
        try {
            const { body, params, headers } = req
            const { status, data } = await taskService.create(
                {
                    description: body.description,
                    durationInSeconds: body.duration,
                    completed: body.completed
                },
                params.dev_id,
                headers.auth as string
            )
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}
