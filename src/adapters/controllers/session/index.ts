import { Request, Response } from 'express'
import { sessionService } from '../../../usecases/session'

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
