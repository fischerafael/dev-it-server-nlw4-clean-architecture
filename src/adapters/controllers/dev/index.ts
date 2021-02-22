import { Request, Response } from 'express'
import { devService } from '../../../usecases/dev'

export const devController = {
    async create(req: Request, res: Response) {
        try {
            const { body } = req
            const { status, data } = await devService.create(body.github)
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    async index(req: Request, res: Response) {
        try {
            const { status, data } = await devService.index()
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { params } = req
            const { status, data } = await devService.delete(params.dev_id)
            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}
