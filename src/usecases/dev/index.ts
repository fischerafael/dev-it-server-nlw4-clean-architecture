import { IGithub } from '../../entities/dev'

import { formatHttpResponse } from '../utils/http-response-formatter'

import { devRepository } from '../../external/database/repository/dev'
import { getGitHubUserData } from '../../external/services/axios'

export const devService = {
    async create(github: IGithub) {
        try {
            const hasDev = await devRepository.findByGithub(github)
            if (hasDev === 'error')
                return formatHttpResponse(500, 'Error finding user')
            if (hasDev) return formatHttpResponse(409, 'Dev already exist')

            const { data: githubData, status } = await getGitHubUserData(github)
            if (status === 404)
                return formatHttpResponse(404, 'Github user does not exist')

            const dev = await devRepository.create({
                name: githubData.name,
                github: github,
                avatar: githubData.avatar_url
            })

            return formatHttpResponse(200, dev)
        } catch (err) {
            return formatHttpResponse(500, err)
        }
    },

    async index() {
        const devs = await devRepository.findAll()

        return formatHttpResponse(200, devs)
    },

    async delete(devId: string) {
        const dev = await devRepository.findByIdAndRemove(devId)
        if (!dev) return formatHttpResponse(404, 'Dev not found')

        return formatHttpResponse(200, 'Dev removed successfully')
    }
}
