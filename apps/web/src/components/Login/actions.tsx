"use server"

import { authApi } from "@/http/apiClient"
import { SignInSchema } from './schemas'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const result = SignInSchema.safeParse({ email, password })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { access_token } = await authApi.post(`users/sign-in`, { json: { email, password } }).json<{ access_token: string }>()
    cookies().set('access_token', access_token, { maxAge: 60 * 60 * 24, path: '/' })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return { success: false, message: 'Unexpected error, try again in a few minutes.', errors: null }
  }

  return { success: true, message: null, errors: null }
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

    return { success: true, message: null, errors: null }
  }
}
