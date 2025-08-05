import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal API Nexus - Profesjonalna Pomoc Prawna",
  description:
    "Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w ciągu 24 godzin. Profesjonalnie, szybko i w przystępnej cenie.",
    generator: 'v0.dev'
}

import ClientLayout from "./clientLayout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'