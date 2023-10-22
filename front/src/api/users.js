import { basePath } from './config'

export const getUsers = async () => {
    const url = `${basePath}/get-users`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
          },
    }

    const response = await fetch(url, params)

    const users = await response.json()

    return users
}

export const createUser = async (user) => {
    const url = `${basePath}/sign-up`
    const params = {
        method: 'POST',
        body: await JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
          },
    }

    const response = await fetch(url, params)

    const newUser = await response.json()

    return newUser
}