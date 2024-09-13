import { cn } from "@/lib/utils"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientProvider from './client-provider'
import './globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ByFinances',
  description: 'Monyy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'min-h-screen overflow-x-hidden bg-background text-foreground')}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
