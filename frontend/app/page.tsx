"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, FileText, BarChart3 } from "lucide-react"
import KancelarieManager from "@/components/KancelarieManager"
import KlienciManager from "@/components/KlienciManager"
import SprawyManager from "@/components/SprawyManager"
import Dashboard from "@/components/Dashboard"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">System Zarządzania Kancelarią Prawną</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="kancelarie" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Kancelarie
            </TabsTrigger>
            <TabsTrigger value="klienci" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Klienci
            </TabsTrigger>
            <TabsTrigger value="sprawy" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Sprawy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="kancelarie">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie Kancelariami</CardTitle>
                <CardDescription>Dodawaj, edytuj i zarządzaj kancelariami prawnymi w systemie.</CardDescription>
              </CardHeader>
              <CardContent>
                <KancelarieManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="klienci">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie Klientami</CardTitle>
                <CardDescription>Zarządzaj bazą klientów kancelarii prawnych.</CardDescription>
              </CardHeader>
              <CardContent>
                <KlienciManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sprawy">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie Sprawami</CardTitle>
                <CardDescription>Prowadź i zarządzaj sprawami klientów.</CardDescription>
              </CardHeader>
              <CardContent>
                <SprawyManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
