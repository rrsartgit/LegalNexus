import "./globals.css"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"

export const metadata = {
  title: "Kancelaria X",
  description: "Nowoczesne usługi prawne wspierane przez AI i RAG.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main role="main" className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
