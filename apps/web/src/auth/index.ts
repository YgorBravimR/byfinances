import { cookies } from 'next/headers'

export function isAuthenticated() {
  return !!cookies().get('access_token')?.value
}
