"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="pl">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  )
}
