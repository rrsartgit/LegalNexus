import type React from "react"
import "../app/globals.css" // Ensure this path is correct for global styles
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "../lib/auth" // Corrected import path for AuthProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// If you want to use a system font stack, you can remove this import
// and rely on Tailwind's default font-sans.
// const inter = Inter({ subsets: ["latin"] })

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
