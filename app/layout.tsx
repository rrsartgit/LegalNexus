import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google" // Import Montserrat from next/font/google
import "./globals.css" // Import globals.css at the top of the file
import ClientLayout from "./clientLayout"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Define as a CSS variable
})

export const metadata: Metadata = {
  title: "Legal API Nexus - Profesjonalna Pomoc Prawna",
  description:
    "Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24 godzin. Profesjonalnie, szybko i w przystępnej cenie.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning className={montserrat.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
