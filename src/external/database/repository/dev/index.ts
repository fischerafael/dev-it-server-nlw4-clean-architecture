import { IDev } from '../../../../entities/dev'
import Dev from '../../mongodb/Models/Dev'

export const devRepository = {
    async findByGithub(github: string): Promise<object | 'error'> {
        try {
            const dev = await Dev.findOne({ github: github })
            return dev
        } catch (err) {
            return 'error'
        }
    },

    async findById(id: string): Promise<object | 'error'> {
        try {
            const dev = await Dev.findById(id)
            return dev
        } catch (err) {
            return 'error'
        }
    },

    async create(data: IDev) {
        try {
            const dev = await Dev.create({
                name: data.name,
                github: data.github,
                avatar: data.avatar
            })
            return dev
        } catch (err) {
            return 'error'
        }
    },

    async findAll() {
        try {
            const devs = await Dev.find()
            return devs
        } catch (err) {
            return 'error'
        }
    },

    async findByIdAndRemove(id: string) {
        try {
            const devs = await Dev.findByIdAndRemove(id)
            return devs
        } catch (err) {
            return 'error'
        }
    }
}
