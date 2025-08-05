import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/frontend/lib/auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "Legal API Nexus - Zarządzanie Kancelariami Prawnymi",
  description: "System zarządzania kancelariami prawnymi, klientami i sprawami",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
