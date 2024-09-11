"use server"

import { authApi } from "@/http/apiClient"

export async function signIn(_: unknown, data: FormData) {
  try {
    const { email, password } = Object.fromEntries(data)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const res = await authApi.post(`users/sign-in`, { json: { email, password } }).json<{ access_token: string }>()

    return res.access_token
  } catch (err) {
    console.error(err)

    return null
  }
}

export async function signUp(_: unknown, data: FormData) {
  try {
    const { email, password, name } = Object.fromEntries(data)

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const res = await authApi
      .post(`users/sign-up`, {
        json: { email, password, name },
      })
      .json<{ access_token: string }>()

    return res.access_token
  } catch (err) {
    console.error(err)

    return null
  }
}
