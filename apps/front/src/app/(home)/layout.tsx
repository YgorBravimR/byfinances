import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import "../globals.css"
import { Sidebar } from "@/components/Sidebar"
import { ptBR } from "date-fns/locale"
import { setDefaultOptions } from "date-fns"

export const metadata: Metadata = {
  title: "BYPLO",
  description: "Soluções que conectam!",
}

export default async function IndoorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  setDefaultOptions({ locale: ptBR })

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-grow overflow-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
