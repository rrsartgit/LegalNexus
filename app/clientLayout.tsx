"use client"

import type React from "react"

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const queryClient = new QueryClient()

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default function ClientLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/logowanie")
    } else if (!loading && isAuthenticated && allowedRoles && !allowedRoles.includes(user?.role || "")) {
      router.push("/") // Redirect to home or an unauthorized page if role not allowed
    }
  }, [loading, isAuthenticated, user, allowedRoles, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Ładowanie...</p>
      </div>
    )
  }

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(user?.role || ""))) {
    return null // Render nothing or a loading spinner while redirecting
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
