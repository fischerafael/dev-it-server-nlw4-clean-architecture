import axios from 'axios'

export async function getGitHubUserData(githubUser: string) {
    try {
        const { data, status } = await axios.get(
            `https://api.github.com/users/${githubUser}`
        )

        return {
            data,
            status
        }
    } catch (err) {
        return {
            data: err,
            status: 404
        }
    }
}
