"use client"

import ClientLayout from "../ClientLayout"
import { DashboardStats } from "@/frontend/components/DashboardStats"
import { OrdersList } from "@/frontend/components/OrdersList"
import { CreateOrderForm } from "@/frontend/components/CreateOrderForm"
import { useAuth } from "@/frontend/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Ładowanie panelu...</p>
        </div>
      </ClientLayout>
    )
  }

  if (!user) {
    // This case should ideally be handled by ClientLayout redirect
    return null
  }

  return (
    <ClientLayout allowedRoles={["client", "operator", "admin"]}>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Witaj, {user.email}!</h1>
        <p className="text-gray-600 mb-8">Rola: {user.role}</p>

        {user.role === "admin" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Panel Administratora</h2>
            <DashboardStats />
            <Separator className="my-6" />
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie Użytkownikami i Kancelariami (w budowie)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Funkcjonalność zarządzania użytkownikami i kancelariami będzie dostępna wkrótce.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {user.role === "client" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Panel Klienta</h2>
            <Tabs defaultValue="my-orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-orders">Moje Zlecenia</TabsTrigger>
                <TabsTrigger value="new-order">Nowe Zlecenie</TabsTrigger>
              </TabsList>
              <TabsContent value="my-orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Moje Zlecenia Analizy Dokumentów</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrdersList />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="new-order">
                <Card>
                  <CardHeader>
                    <CardTitle>Złóż Nowe Zlecenie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CreateOrderForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {user.role === "operator" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Panel Operatora</h2>
            <Tabs defaultValue="all-orders" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="all-orders">Wszystkie Zlecenia</TabsTrigger>
              </TabsList>
              <TabsContent value="all-orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Zlecenia do Obsługi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrdersList /> {/* Operator sees all orders */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </ClientLayout>
  )
}
