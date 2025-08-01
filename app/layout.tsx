import type { Metadata } from "next"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "../frontend/lib/auth" // Corrected import path for AuthProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./globals.css" // Ensure this path is correct for global styles

export const metadata: Metadata = {
  title: "Legal API Nexus - Zarządzanie Kancelariami Prawnymi",
  description: "System zarządzania kancelariami prawnymi, klientami i sprawami",
    generator: 'v0.dev'
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>{/* If you removed Google Fonts, ensure no other font imports are here */}</head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
