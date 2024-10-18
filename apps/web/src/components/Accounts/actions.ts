'use server'

import { authApi } from '@/http/apiClient'
import { CreateAccountDTO, CreateAccountSchema, IAccount, IBank } from './types'
import { HTTPError } from 'ky'

const BASE_PATH = 'accounts'

export const getAccounts = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500)) // TODO - REMOVE IT
    const res = await authApi.get(`${BASE_PATH}`).json<IAccount[]>()

    return res
  } catch (err) {
    console.error(err)
  }
}

export const getBanks = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500)) // TODO - REMOVE IT
    const res = await authApi.get(`${BASE_PATH}/banks`).json<IBank[]>()

    return res
  } catch (err) {
    console.error(err)
    return []
  }
}

export const createAccountFormAction = async (data: CreateAccountDTO) => {
  const result = CreateAccountSchema.safeParse({ ...data, initialBalance: Number(data.initialBalance) })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    await authApi.post(`${BASE_PATH}/create`, { json: result.data }).json<IAccount>()

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
