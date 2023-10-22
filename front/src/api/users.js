import { basePath } from './config'

export const getRelatedUsers = async (token) => {
    const url = `${basePath}/list-users`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
    }

    const response = await fetch(url, params)

    const users = await response.json()

    return users
}

export const createRelatedUser = async (user, token) => {
    const url = `${basePath}/create-user`
    const params = {
        method: 'POST',
        body: await JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
    }

    const response = await fetch(url, params)

    const newUser = await response.json()

    return newUser
}

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

export const signUp = async (user) => {
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

export const signIn = async (credentials) => {
    const url = `${basePath}/sign-in`
    const params = {
        method: 'POST',
        body: await JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
          },
    }

    const response = await fetch(url, params)

    const auth = await response.json()

    console.log(auth);

    return auth
}