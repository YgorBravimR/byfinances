'use server'

import { authApi } from '@/http/apiClient'
import { CreateAccountDTO, CreateAccountSchema, IAccount } from './types'
import { HTTPError } from 'ky'

export const getAccounts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    const res = await authApi.get(`accounts`).json<IAccount[]>()

    return res
  } catch (err) {
    console.error(err)
  }
}

export const createAccountFormAction = async (data: CreateAccountDTO) => {
  const result = CreateAccountSchema.safeParse({ ...data, initialBalance: Number(data.initialBalance) })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  await new Promise((resolve) => setTimeout(resolve, 2500))
  try {
    await authApi.post(`accounts/create`, { json: result.data }).json<IAccount>()

    return { success: true, message: 'Account created with success!', errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return { success: false, message: 'Unexpected error, try again in a few minutes.', errors: null }
  }
}
