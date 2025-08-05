"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Users, FileText, Plus, Search, Edit, Trash2 } from "lucide-react"
import type { Kancelaria, Klient, Sprawa } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/logowanie") // Redirect to login if not authenticated
    } else if (!loading && user) {
      // Redirect based on role if on a generic dashboard path
      if (user.role === "admin" && window.location.pathname !== "/admin") {
        router.push("/admin")
      } else if (user.role === "operator" && window.location.pathname !== "/panel-operatora") {
        router.push("/panel-operatora")
      } else if (user.role === "client" && window.location.pathname !== "/panel-klienta") {
        router.push("/panel-klienta")
      }
    }
  }, [user, loading, router])

  // Mock data for development
  const mockKancelarie: Kancelaria[] = [
    {
      id: 1,
      nazwa: "Kancelaria Prawna ABC",
      adres: "ul. Główna 1, 00-001 Warszawa",
      telefon: "+48 22 123 45 67",
      email: "kontakt@abc.pl",
      nip: "1234567890",
      data_utworzenia: "2024-01-15",
      status: "aktywna",
    },
    {
      id: 2,
      nazwa: "Prawnik XYZ",
      adres: "ul. Prawnicza 5, 31-000 Kraków",
      telefon: "+48 12 987 65 43",
      email: "biuro@xyz.pl",
      nip: "0987654321",
      data_utworzenia: "2024-02-20",
      status: "aktywna",
    },
  ]

  const mockKlienci: Klient[] = [
    {
      id: 1,
      imie: "Jan",
      nazwisko: "Kowalski",
      email: "jan.kowalski@email.com",
      telefon: "+48 500 123 456",
      adres: "ul. Kwiatowa 10, 00-001 Warszawa",
      pesel: "80010112345",
      typ: "osoba_fizyczna",
      data_utworzenia: "2024-01-20",
    },
    {
      id: 2,
      imie: "Anna",
      nazwisko: "Nowak",
      email: "anna.nowak@email.com",
      telefon: "+48 600 987 654",
      adres: "ul. Słoneczna 15, 31-000 Kraków",
      typ: "osoba_fizyczna",
      data_utworzenia: "2024-02-10",
    },
  ]

  const mockSprawy: Sprawa[] = [
    {
      id: 1,
      tytul: "Sprawa rozwodowa",
      opis: "Rozwód za porozumieniem stron",
      klient_id: 1,
      kancelaria_id: 1,
      status: "w_trakcie",
      data_utworzenia: "2024-01-25",
      wartosc: 5000,
    },
    {
      id: 2,
      tytul: "Spór o alimenty",
      opis: "Ustalenie wysokości alimentów na dziecko",
      klient_id: 2,
      kancelaria_id: 2,
      status: "nowa",
      data_utworzenia: "2024-02-15",
      wartosc: 3000,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      aktywna: "bg-green-100 text-green-800",
      nieaktywna: "bg-red-100 text-red-800",
      nowa: "bg-blue-100 text-blue-800",
      w_trakcie: "bg-yellow-100 text-yellow-800",
      zawieszona: "bg-orange-100 text-orange-800",
      zakonczona: "bg-gray-100 text-gray-800",
    }
    return statusMap[status as keyof typeof statusMap] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Ładowanie panelu...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will be redirected by useEffect
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Legal API Nexus</h1>
        <p className="text-gray-600 mt-2">System zarządzania kancelariami prawnymi</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="kancelarie">Kancelarie</TabsTrigger>
          <TabsTrigger value="klienci">Klienci</TabsTrigger>
          <TabsTrigger value="sprawy">Sprawy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kancelarie</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKancelarie.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockKancelarie.filter((k) => k.status === "aktywna").length} aktywnych
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Klienci</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKlienci.length}</div>
                <p className="text-xs text-muted-foreground">Łącznie zarejestrowanych</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sprawy</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSprawy.length}</div>
                <p className="text-xs text-muted-foreground">
                  {mockSprawy.filter((s) => s.status === "w_trakcie").length} w trakcie
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ostatnie sprawy</CardTitle>
              <CardDescription>Najnowsze sprawy w systemie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSprawy.map((sprawa) => (
                  <div key={sprawa.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{sprawa.tytul}</h4>
                      <p className="text-sm text-gray-600">{sprawa.opis}</p>
                      <p className="text-xs text-gray-500">
                        Utworzono: {new Date(sprawa.data_utworzenia).toLocaleDateString("pl-PL")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(sprawa.status)}>{sprawa.status.replace("_", " ")}</Badge>
                      {sprawa.wartosc && (
                        <span className="text-sm font-medium">{sprawa.wartosc.toLocaleString("pl-PL")} zł</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kancelarie" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Kancelarie prawne</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj kancelarię
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Szukaj kancelarii..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKancelarie.map((kancelaria) => (
                  <div key={kancelaria.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{kancelaria.nazwa}</h4>
                      <p className="text-sm text-gray-600">{kancelaria.adres}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Tel: {kancelaria.telefon}</span>
                        <span>Email: {kancelaria.email}</span>
                        <span>NIP: {kancelaria.nip}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(kancelaria.status)}>{kancelaria.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="klienci" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Klienci</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj klienta
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Szukaj klientów..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Typ klienta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszyscy</SelectItem>
                    <SelectItem value="osoba_fizyczna">Osoba fizyczna</SelectItem>
                    <SelectItem value="osoba_prawna">Osoba prawna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKlienci.map((klient) => (
                  <div key={klient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {klient.imie} {klient.nazwisko}
                      </h4>
                      <p className="text-sm text-gray-600">{klient.adres}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Tel: {klient.telefon}</span>
                        <span>Email: {klient.email}</span>
                        {klient.pesel && <span>PESEL: {klient.pesel}</span>}
                        {klient.nip && <span>NIP: {klient.nip}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          klient.typ === "osoba_fizyczna"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }
                      >
                        {klient.typ.replace("_", " ")}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sprawy" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Sprawy</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj sprawę
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Szukaj spraw..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status sprawy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="nowa">Nowa</SelectItem>
                    <SelectItem value="w_trakcie">W trakcie</SelectItem>
                    <SelectItem value="zawieszona">Zawieszona</SelectItem>
                    <SelectItem value="zakonczona">Zakończona</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSprawy.map((sprawa) => {
                  const klient = mockKlienci.find((k) => k.id === sprawa.klient_id)
                  const kancelaria = mockKancelarie.find((k) => k.id === sprawa.kancelaria_id)

                  return (
                    <div key={sprawa.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{sprawa.tytul}</h4>
                        <p className="text-sm text-gray-600">{sprawa.opis}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>
                            Klient: {klient?.imie} {klient?.nazwisko}
                          </span>
                          <span>Kancelaria: {kancelaria?.nazwa}</span>
                          <span>Utworzono: {new Date(sprawa.data_utworzenia).toLocaleDateString("pl-PL")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(sprawa.status)}>{sprawa.status.replace("_", " ")}</Badge>
                        {sprawa.wartosc && (
                          <span className="text-sm font-medium">{sprawa.wartosc.toLocaleString("pl-PL")} zł</span>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Witaj, {user.email}!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Twoja rola: {user.role}</div>
            <p className="text-xs text-muted-foreground">To jest Twój panel użytkownika.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne sprawy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Liczba spraw w toku.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ostatnie zamówienia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Liczba ostatnich zamówień.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
