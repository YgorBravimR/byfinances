'use server'

import { authApi } from '@/http/apiClient'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { SignInSchema, SignUpSchema } from './types'

export const signInFormAction = async (data: FormData) => {
  const { email, password } = Object.fromEntries(data)

  const result = SignInSchema.safeParse({ email, password })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { access_token } = await authApi
      .post(`users/sign-in`, { json: { email, password } })
      .json<{ access_token: string }>()
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

export const signUpFormAction = async (data: FormData) => {
  const { email, password, confirmPassword, name } = Object.fromEntries(data)

  const schema = SignUpSchema.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

  const result = schema.safeParse({ email, password, confirmPassword, name })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { access_token } = await authApi
      .post(`users/sign-up`, { json: { email, password, name } })
      .json<{ access_token: string }>()
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
