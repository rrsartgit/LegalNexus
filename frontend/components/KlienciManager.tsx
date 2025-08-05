"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { useApi } from "@/lib/api/hooks"
import type { Klient } from "@/lib/api"
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

export function KlienciManager() {
  const api = useApi()
  const [klienci, setKlienci] = useState<Klient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentKlient, setCurrentKlient] = useState<Klient | null>(null)
  const [formState, setFormState] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    telefon: "",
    adres: "",
    pesel: "",
    nip: "",
    typ: "osoba_fizyczna",
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchKlienci()
  }, [])

  const fetchKlienci = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getClients()
      setKlienci(data)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować klientów.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować klientów.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredKlienci = klienci.filter((klient) => {
    const matchesSearch =
      klient.imie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klient.nazwisko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klient.pesel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      klient.nip?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || klient.typ === filterType
    return matchesSearch && matchesType
  })

  const handleAddKlient = () => {
    setCurrentKlient(null)
    setFormState({
      imie: "",
      nazwisko: "",
      email: "",
      telefon: "",
      adres: "",
      pesel: "",
      nip: "",
      typ: "osoba_fizyczna",
    })
    setIsFormOpen(true)
  }

  const handleEditKlient = (klient: Klient) => {
    setCurrentKlient(klient)
    setFormState({
      imie: klient.imie,
      nazwisko: klient.nazwisko,
      email: klient.email,
      telefon: klient.telefon,
      adres: klient.adres,
      pesel: klient.pesel || "",
      nip: klient.nip || "",
      typ: klient.typ,
    })
    setIsFormOpen(true)
  }

  const handleDeleteKlient = async (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego klienta?")) {
      return
    }
    setLoading(true)
    try {
      await api.deleteClient(id)
      toast({
        title: "Sukces",
        description: "Klient został usunięty.",
      })
      fetchKlienci()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się usunąć klienta.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      if (currentKlient) {
        // Update existing
        await api.updateClient(currentKlient.id, formState)
        toast({
          title: "Sukces",
          description: "Dane klienta zostały zaktualizowane.",
        })
      } else {
        // Create new
        await api.createClient(formState)
        toast({
          title: "Sukces",
          description: "Klient został dodany.",
        })
      }
      setIsFormOpen(false)
      fetchKlienci()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się zapisać danych klienta.",
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
          <CardTitle>Zarządzanie Klientami</CardTitle>
          <CardDescription>Lista zarejestrowanych klientów.</CardDescription>
        </div>
        <Button onClick={handleAddKlient}>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj klienta
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Szukaj klientów..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
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

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Ładowanie klientów...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : filteredKlienci.length === 0 ? (
          <div className="text-center text-gray-500 p-4">Brak klientów do wyświetlenia.</div>
        ) : (
          <div className="space-y-4">
            {filteredKlienci.map((klient) => (
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
                      klient.typ === "osoba_fizyczna" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                    }
                  >
                    {klient.typ.replace("_", " ")}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEditKlient(klient)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteKlient(klient.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentKlient ? "Edytuj klienta" : "Dodaj nowego klienta"}</DialogTitle>
            <DialogDescription>
              {currentKlient ? "Zaktualizuj dane klienta." : "Wprowadź dane nowego klienta."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imie" className="text-right">
                Imię
              </Label>
              <Input
                id="imie"
                value={formState.imie}
                onChange={(e) => setFormState({ ...formState, imie: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nazwisko" className="text-right">
                Nazwisko
              </Label>
              <Input
                id="nazwisko"
                value={formState.nazwisko}
                onChange={(e) => setFormState({ ...formState, nazwisko: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefon" className="text-right">
                Telefon
              </Label>
              <Input
                id="telefon"
                value={formState.telefon}
                onChange={(e) => setFormState({ ...formState, telefon: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adres" className="text-right">
                Adres
              </Label>
              <Input
                id="adres"
                value={formState.adres}
                onChange={(e) => setFormState({ ...formState, adres: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pesel" className="text-right">
                PESEL
              </Label>
              <Input
                id="pesel"
                value={formState.pesel}
                onChange={(e) => setFormState({ ...formState, pesel: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nip" className="text-right">
                NIP
              </Label>
              <Input
                id="nip"
                value={formState.nip}
                onChange={(e) => setFormState({ ...formState, nip: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="typ" className="text-right">
                Typ
              </Label>
              <Select value={formState.typ} onValueChange={(value) => setFormState({ ...formState, typ: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz typ klienta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="osoba_fizyczna">Osoba fizyczna</SelectItem>
                  <SelectItem value="osoba_prawna">Osoba prawna</SelectItem>
                </SelectContent>
              </Select>
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
