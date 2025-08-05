import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClientProvider } from "@/frontend/app/ClientLayout"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legal API Nexus",
  description: "Platforma do zarządzania kancelariami prawnymi",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
