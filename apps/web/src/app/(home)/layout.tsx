import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import "../globals.css"
import { Sidebar } from "@/components/Sidebar"
import { ptBR } from "date-fns/locale"
import { setDefaultOptions } from "date-fns"
import { isAuthenticated } from '@/auth'
import { redirect } from 'next/navigation'

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
        <main className="flex-grow overflow-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
