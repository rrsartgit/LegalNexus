"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { useApi } from "@/lib/api/hooks"
import type { Sprawa } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SprawyManager() {
  const api = useApi()
  const [sprawy, setSprawy] = useState<Sprawa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentSprawa, setCurrentSprawa] = useState<Sprawa | null>(null)
  const [formState, setFormState] = useState({
    tytul: "",
    opis: "",
    klient_id: "",
    kancelaria_id: "",
    status: "",
    wartosc: 0,
  })
  const [formLoading, setFormLoading] = useState(false)

  // Mock data for clients and law firms for dropdowns
  const [mockKlienci, setMockKlienci] = useState<{ id: number; imie: string; nazwisko: string }[]>([])
  const [mockKancelarie, setMockKancelarie] = useState<{ id: number; nazwa: string }[]>([])

  useEffect(() => {
    fetchSprawy()
    fetchMockData()
  }, [])

  const fetchSprawy = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getCases()
      setSprawy(data)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować spraw.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować spraw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMockData = async () => {
    try {
      const clients = await api.getClients()
      setMockKlienci(clients.map((c) => ({ id: c.id, imie: c.imie, nazwisko: c.nazwisko })))
      const lawFirms = await api.getLawFirms()
      setMockKancelarie(lawFirms.map((lf) => ({ id: lf.id, nazwa: lf.nazwa })))
    } catch (err) {
      console.error("Failed to fetch mock data for dropdowns:", err)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      nowa: "bg-blue-100 text-blue-800",
      w_trakcie: "bg-yellow-100 text-yellow-800",
      zawieszona: "bg-orange-100 text-orange-800",
      zakonczona: "bg-gray-100 text-gray-800",
    }
    return statusMap[status as keyof typeof statusMap] || "bg-gray-100 text-gray-800"
  }

  const filteredSprawy = sprawy.filter((sprawa) => {
    const matchesSearch =
      sprawa.tytul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprawa.opis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || sprawa.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddSprawa = () => {
    setCurrentSprawa(null)
    setFormState({
      tytul: "",
      opis: "",
      klient_id: "",
      kancelaria_id: "",
      status: "nowa",
      wartosc: 0,
    })
    setIsFormOpen(true)
  }

  const handleEditSprawa = (sprawa: Sprawa) => {
    setCurrentSprawa(sprawa)
    setFormState({
      tytul: sprawa.tytul,
      opis: sprawa.opis,
      klient_id: String(sprawa.klient_id),
      kancelaria_id: String(sprawa.kancelaria_id),
      status: sprawa.status,
      wartosc: sprawa.wartosc || 0,
    })
    setIsFormOpen(true)
  }

  const handleDeleteSprawa = async (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę sprawę?")) {
      return
    }
    setLoading(true)
    try {
      await api.deleteCase(id)
      toast({
        title: "Sukces",
        description: "Sprawa została usunięta.",
      })
      fetchSprawy()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się usunąć sprawy.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      const payload = {
        ...formState,
        klient_id: Number.parseInt(formState.klient_id),
        kancelaria_id: Number.parseInt(formState.kancelaria_id),
        wartosc: Number.parseFloat(formState.wartosc.toString()),
      }
      if (currentSprawa) {
        // Update existing
        await api.updateCase(currentSprawa.id, payload)
        toast({
          title: "Sukces",
          description: "Sprawa została zaktualizowana.",
        })
      } else {
        // Create new
        await api.createCase(payload)
        toast({
          title: "Sukces",
          description: "Sprawa została dodana.",
        })
      }
      setIsFormOpen(false)
      fetchSprawy()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się zapisać sprawy.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Zarządzanie Sprawami</CardTitle>
          <CardDescription>Lista spraw prawnych w systemie.</CardDescription>
        </div>
        <Button onClick={handleAddSprawa}>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj sprawę
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Szukaj spraw..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
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

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Ładowanie spraw...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : filteredSprawy.length === 0 ? (
          <div className="text-center text-gray-500 p-4">Brak spraw do wyświetlenia.</div>
        ) : (
          <div className="space-y-4">
            {filteredSprawy.map((sprawa) => {
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
                    <Button variant="outline" size="sm" onClick={() => handleEditSprawa(sprawa)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteSprawa(sprawa.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentSprawa ? "Edytuj sprawę" : "Dodaj nową sprawę"}</DialogTitle>
            <DialogDescription>
              {currentSprawa ? "Zaktualizuj dane sprawy." : "Wprowadź dane nowej sprawy prawnej."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tytul" className="text-right">
                Tytuł
              </Label>
              <Input
                id="tytul"
                value={formState.tytul}
                onChange={(e) => setFormState({ ...formState, tytul: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opis" className="text-right">
                Opis
              </Label>
              <Textarea
                id="opis"
                value={formState.opis}
                onChange={(e) => setFormState({ ...formState, opis: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="klient_id" className="text-right">
                Klient
              </Label>
              <Select
                value={formState.klient_id}
                onValueChange={(value) => setFormState({ ...formState, klient_id: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz klienta" />
                </SelectTrigger>
                <SelectContent>
                  {mockKlienci.map((klient) => (
                    <SelectItem key={klient.id} value={String(klient.id)}>
                      {klient.imie} {klient.nazwisko}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kancelaria_id" className="text-right">
                Kancelaria
              </Label>
              <Select
                value={formState.kancelaria_id}
                onValueChange={(value) => setFormState({ ...formState, kancelaria_id: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz kancelarię" />
                </SelectTrigger>
                <SelectContent>
                  {mockKancelarie.map((kancelaria) => (
                    <SelectItem key={kancelaria.id} value={String(kancelaria.id)}>
                      {kancelaria.nazwa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formState.status} onValueChange={(value) => setFormState({ ...formState, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowa">Nowa</SelectItem>
                  <SelectItem value="w_trakcie">W trakcie</SelectItem>
                  <SelectItem value="zawieszona">Zawieszona</SelectItem>
                  <SelectItem value="zakonczona">Zakończona</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wartosc" className="text-right">
                Wartość
              </Label>
              <Input
                id="wartosc"
                type="number"
                value={formState.wartosc}
                onChange={(e) => setFormState({ ...formState, wartosc: Number.parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Zapisz zmiany"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
