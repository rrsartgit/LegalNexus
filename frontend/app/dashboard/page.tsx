"use client"

import { useEffect, useState } from "react"
import ClientLayout from "../ClientLayout"
import { useAuth } from "@/lib/auth" // Corrected import path
import { DashboardStats } from "@/frontend/components/DashboardStats"
import { OrdersList } from "@/frontend/components/OrdersList"
import { KancelarieManager } from "@/frontend/components/KancelarieManager"
import { KlienciManager } from "@/frontend/components/KlienciManager"
import { SprawyManager } from "@/frontend/components/SprawyManager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/logowanie")
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Ładowanie panelu...</span>
        </div>
      </ClientLayout>
    )
  }

  if (!user) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Brak dostępu</h1>
          <p className="text-gray-600 mb-6">Nie masz uprawnień do przeglądania tej strony.</p>
          <Button onClick={() => router.push("/logowanie")}>Przejdź do logowania</Button>
        </div>
      </ClientLayout>
    )
  }

  const renderAdminDashboard = () => (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Przegląd</TabsTrigger>
        <TabsTrigger value="users">Użytkownicy</TabsTrigger>
        <TabsTrigger value="law-firms">Kancelarie</TabsTrigger>
        <TabsTrigger value="orders">Zlecenia</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <DashboardStats />
      </TabsContent>
      <TabsContent value="users" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Zarządzanie Użytkownikami</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <UsersManager /> */}
            <p>Funkcjonalność zarządzania użytkownikami w budowie.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="law-firms" className="mt-4">
        <KancelarieManager />
      </TabsContent>
      <TabsContent value="orders" className="mt-4">
        <OrdersList />
      </TabsContent>
    </Tabs>
  )

  const renderClientDashboard = () => (
    <Tabs defaultValue="my-orders" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="my-orders">Moje Zlecenia</TabsTrigger>
        <TabsTrigger value="my-cases">Moje Sprawy</TabsTrigger>
        <TabsTrigger value="profile">Mój Profil</TabsTrigger>
      </TabsList>
      <TabsContent value="my-orders" className="mt-4">
        <OrdersList />
      </TabsContent>
      <TabsContent value="my-cases" className="mt-4">
        <SprawyManager />
      </TabsContent>
      <TabsContent value="profile" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Mój Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: {user.email}</p>
            <p>Rola: {user.role}</p>
            {/* Add more profile details and edit options */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  const renderOperatorDashboard = () => (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tasks">Zadania</TabsTrigger>
        <TabsTrigger value="clients">Klienci</TabsTrigger>
        <TabsTrigger value="cases">Sprawy</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks" className="mt-4">
        <OrdersList /> {/* Operators might manage orders as tasks */}
      </TabsContent>
      <TabsContent value="clients" className="mt-4">
        <KlienciManager />
      </TabsContent>
      <TabsContent value="cases" className="mt-4">
        <SprawyManager />
      </TabsContent>
    </Tabs>
  )

  return (
    <ClientLayout allowedRoles={["client", "operator", "admin"]}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Panel {user.role}</h1>
            </div>
            {user.role === "admin" && renderAdminDashboard()}
            {user.role === "client" && renderClientDashboard()}
            {user.role === "operator" && renderOperatorDashboard()}
          </main>
        </div>
      </div>
    </ClientLayout>
  )
}
