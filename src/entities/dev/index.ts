export interface IDevResponse {
    github: IGithub
    name: string
    avatar: string
    _id: string
}

export interface IDev {
    github: IGithub
    name: string
    avatar: string
}

export type IGithub = string

export type IDevId = string
