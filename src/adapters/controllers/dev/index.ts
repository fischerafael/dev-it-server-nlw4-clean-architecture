import { Request, Response } from 'express'
import axios from 'axios'
import { formatHttpResponse } from '../../../app/utils/http-response-formatter'
import Dev from '../../../external/database/mongodb/Models/Dev'

export const devController = {
    async create(req: Request, res: Response) {
        try {
            const { body } = req
            const { status, data } = await devService.create({
                github: body.github
            })
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

type ICreateDev = {
    github: string
}

export const devService = {
    async create({ github }: ICreateDev) {
        try {
            const hasDev = await Dev.findOne({ github: github })
            if (hasDev) return formatHttpResponse(409, 'Dev already exist')

            const devInfo = await axios.get(
                `https://api.github.com/users/${github}`
            )

            const dev = await Dev.create({
                name: devInfo.data.name,
                github: github,
                avatar: devInfo.data.avatar_url
            })

            return formatHttpResponse(200, dev)
        } catch (err) {
            return formatHttpResponse(500, err)
        }
    },

    async index() {
        const devs = await Dev.find()

        return formatHttpResponse(200, devs)
    },

    async delete(devId: string) {
        const dev = await Dev.findByIdAndRemove(devId)
        if (!dev) return formatHttpResponse(404, 'Dev not found')

        return formatHttpResponse(200, 'Dev removed successfully')
    }
}
