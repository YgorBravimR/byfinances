import { isAuthenticated } from '@/auth'
import Navbar from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import '../globals.css'

export const metadata: Metadata = {
  title: 'BYPLO',
  description: 'Soluções que conectam!',
}

export default async function IndoorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/sign-in')
  }

  setDefaultOptions({ locale: ptBR })

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Navbar />
        <main className="flex-grow overflow-auto bg-accent text-accent-foreground">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
