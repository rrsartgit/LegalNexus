import type { Metadata } from "next"
import type React from "react"
import ClientLayout from "./ClientLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Legal API Nexus - Zarządzanie Kancelariami Prawnymi",
  description: "System zarządzania kancelariami prawnymi, klientami i sprawami",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
