import { isAuthenticated } from '@/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'ByFinances',
  description: 'Monyy',
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return <main className="flex h-screen w-screen items-center justify-center gap-4 bg-primary-foreground p-4">{children}</main>
}
