import { Request, Response } from 'express'
import Task from '../../external/database/mongodb/Models/Task'
import { devRepository } from '../../external/database/repository/dev'
import { taskRepository } from '../../external/database/repository/task'
import { formatHttpResponse } from '../utils/http-response-formatter'

export const profileController = {
    async show(req: Request, res: Response) {
        try {
            const { params } = req
            const { status, data } = await profileService.show(
                params.dev_github
            )
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export const profileService = {
    async show(github: string) {
        try {
            const dev = await devRepository.findByGithub(github)
            if (!dev) return formatHttpResponse(404, 'Dev not found')
            if (dev === 'error')
                return formatHttpResponse(500, 'Error getting dev data')

            const tasks = await taskRepository.indexById(dev._id)

            return formatHttpResponse(200, { dev, tasks })
        } catch (err) {
            return formatHttpResponse(500, err)
        }
    }
}
