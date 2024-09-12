import { authApi } from '@/http/apiClient'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get('access_token')?.value
}

export async function auth() {
  const token = cookies().get('access_token')?.value

  if (!token) {
    redirect('/sign-in')
  }

  try {
    const { user } = await authApi.get(`users/profile`).json<{ user: any }>()

    return user
  } catch (err) {
    console.error(err)
    cookies().delete('access_token')
  }
  redirect('/sign-in')
}
