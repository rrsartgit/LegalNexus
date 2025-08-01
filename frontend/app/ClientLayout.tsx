"use client"

import { useState } from "react"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/frontend/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface ClientLayoutProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ClientLayout({ children, allowedRoles }: ClientLayoutProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("home") // State for active section

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      toast({
        title: "Brak dostępu",
        description: "Musisz być zalogowany, aby uzyskać dostęp do tej strony.",
        variant: "destructive",
      })
      router.push("/logowanie")
      return
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      toast({
        title: "Brak uprawnień",
        description: "Nie masz wystarczających uprawnień, aby uzyskać dostęp do tej strony.",
        variant: "destructive",
      })
      // Redirect based on user's actual role or to home
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "operator") {
        router.push("/panel-operatora")
      } else if (user.role === "client") {
        router.push("/panel-klienta")
      } else {
        router.push("/")
      }
    }
  }, [isAuthenticated, loading, user, allowedRoles, router])

  if (loading || (isAuthenticated && allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Ładowanie...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSectionChange={setActiveSection} activeSection={activeSection} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
