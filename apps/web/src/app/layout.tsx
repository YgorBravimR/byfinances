import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BYPLO",
  description: "Soluções que conectam!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "min-h-screen overflow-x-hidden bg-slate-100 dark:bg-[#000207]")}>{children}</body>
    </html>
  )
}
