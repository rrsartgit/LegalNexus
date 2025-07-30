"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardStats from "@/components/DashboardStats"
import OrdersList from "@/components/OrdersList"
import CreateOrderForm from "@/components/CreateOrderForm"
import { LogOut, Plus } from "lucide-react"

export default function DashboardPage() {
  const { user, logout, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Ładowanie...</div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect to home
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold">Legal API Nexus</h1>
              <p className="text-sm text-gray-600">
                Witaj, {user.email} (
                {user.role === "CLIENT" ? "Klient" : user.role === "OPERATOR" ? "Operator" : "Admin"})
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <DashboardStats />
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">{user.role === "CLIENT" ? "Moje zlecenia" : "Wszystkie zlecenia"}</TabsTrigger>
            {user.role === "CLIENT" && (
              <TabsTrigger value="create">
                <Plus className="h-4 w-4 mr-2" />
                Nowe zlecenie
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{user.role === "CLIENT" ? "Twoje zlecenia" : "Zlecenia do obsługi"}</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersList />
              </CardContent>
            </Card>
          </TabsContent>

          {user.role === "CLIENT" && (
            <TabsContent value="create">
              <CreateOrderForm />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
