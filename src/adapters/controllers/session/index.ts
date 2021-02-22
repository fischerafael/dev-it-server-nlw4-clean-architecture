import { Request, Response } from 'express'
import { IGithub } from '../../../entities/dev'
import { devRepository } from '../../../external/database/repository/dev'
import { formatHttpResponse } from '../../../usecases/utils/http-response-formatter'

export const sessionController = {
    async create(req: Request, res: Response) {
        try {
            const { body } = req
            const { status, data } = await sessionService.create(body.github)
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export const sessionService = {
    async create(github: IGithub) {
        try {
            const dev = await devRepository.findByGithub(github)
            if (dev === 'error')
                return formatHttpResponse(500, 'Error finding user')
            if (!dev) return formatHttpResponse(404, 'Dev not found')

            return formatHttpResponse(200, dev)
        } catch (err) {
            return formatHttpResponse(500, err)
        }
    }
}
