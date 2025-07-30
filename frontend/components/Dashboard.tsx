"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, FileText, Plus, Activity } from "lucide-react"
import { apiClient } from "@/lib/api"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Fetch data using React Query
  const { data: kancelarie = [], isLoading: loadingKancelarie } = useQuery({
    queryKey: ["kancelarie"],
    queryFn: () => apiClient.getKancelarie(),
  })

  const { data: klienci = [], isLoading: loadingKlienci } = useQuery({
    queryKey: ["klienci"],
    queryFn: () => apiClient.getKlienci(),
  })

  const { data: sprawy = [], isLoading: loadingSprawy } = useQuery({
    queryKey: ["sprawy"],
    queryFn: () => apiClient.getSprawy(),
  })

  const stats = {
    kancelarie: kancelarie.length,
    klienci: klienci.length,
    sprawy: sprawy.length,
    aktywneSprawy: sprawy.filter((s) => s.status === "w_trakcie").length,
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal API Nexus</h1>
          <p className="text-gray-600 mt-2">System zarządzania kancelariami prawnymi</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Dodaj nowy
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kancelarie</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingKancelarie ? "..." : stats.kancelarie}</div>
            <p className="text-xs text-muted-foreground">Zarejestrowane kancelarie</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Klienci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingKlienci ? "..." : stats.klienci}</div>
            <p className="text-xs text-muted-foreground">Zarejestrowani klienci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sprawy</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingSprawy ? "..." : stats.sprawy}</div>
            <p className="text-xs text-muted-foreground">Wszystkie sprawy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingSprawy ? "..." : stats.aktywneSprawy}</div>
            <p className="text-xs text-muted-foreground">Sprawy w trakcie</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="kancelarie">Kancelarie</TabsTrigger>
          <TabsTrigger value="klienci">Klienci</TabsTrigger>
          <TabsTrigger value="sprawy">Sprawy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ostatnie kancelarie</CardTitle>
                <CardDescription>Najnowiej zarejestrowane kancelarie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kancelarie.slice(0, 5).map((kancelaria) => (
                    <div key={kancelaria.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{kancelaria.nazwa}</p>
                        <p className="text-sm text-gray-500">{kancelaria.email}</p>
                      </div>
                      <Badge variant={kancelaria.aktywna ? "default" : "secondary"}>
                        {kancelaria.aktywna ? "Aktywna" : "Nieaktywna"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ostatnie sprawy</CardTitle>
                <CardDescription>Najnowiej utworzone sprawy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sprawy.slice(0, 5).map((sprawa) => (
                    <div key={sprawa.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{sprawa.tytul}</p>
                        <p className="text-sm text-gray-500">ID: {sprawa.id}</p>
                      </div>
                      <Badge
                        variant={
                          sprawa.status === "nowa"
                            ? "default"
                            : sprawa.status === "w_trakcie"
                              ? "secondary"
                              : sprawa.status === "zawieszona"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {sprawa.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kancelarie">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie kancelariami</CardTitle>
              <CardDescription>Lista wszystkich zarejestrowanych kancelarii</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kancelarie.map((kancelaria) => (
                  <div key={kancelaria.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{kancelaria.nazwa}</h3>
                        <p className="text-sm text-gray-600">{kancelaria.adres}</p>
                        <p className="text-sm text-gray-600">
                          {kancelaria.email} | {kancelaria.telefon}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={kancelaria.aktywna ? "default" : "secondary"}>
                          {kancelaria.aktywna ? "Aktywna" : "Nieaktywna"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edytuj
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="klienci">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie klientami</CardTitle>
              <CardDescription>Lista wszystkich zarejestrowanych klientów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {klienci.map((klient) => (
                  <div key={klient.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {klient.imie} {klient.nazwisko}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {klient.email} | {klient.telefon}
                        </p>
                        <p className="text-sm text-gray-600">{klient.adres}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edytuj
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sprawy">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie sprawami</CardTitle>
              <CardDescription>Lista wszystkich spraw w systemie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sprawy.map((sprawa) => (
                  <div key={sprawa.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{sprawa.tytul}</h3>
                        <p className="text-sm text-gray-600">{sprawa.opis}</p>
                        <p className="text-xs text-gray-500">
                          Utworzona: {new Date(sprawa.data_utworzenia).toLocaleDateString("pl-PL")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            sprawa.status === "nowa"
                              ? "default"
                              : sprawa.status === "w_trakcie"
                                ? "secondary"
                                : sprawa.status === "zawieszona"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {sprawa.status.replace("_", " ")}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edytuj
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
