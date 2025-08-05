"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { useApi } from "@/lib/api/hooks"
import type { Kancelaria } from "@/lib/api"
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

export function KancelarieManager() {
  const api = useApi()
  const [kancelarie, setKancelarie] = useState<Kancelaria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentKancelaria, setCurrentKancelaria] = useState<Kancelaria | null>(null)
  const [formState, setFormState] = useState({
    nazwa: "",
    adres: "",
    telefon: "",
    email: "",
    nip: "",
    status: "aktywna",
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchKancelarie()
  }, [])

  const fetchKancelarie = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getLawFirms()
      setKancelarie(data)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować kancelarii.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować kancelarii.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      aktywna: "bg-green-100 text-green-800",
      nieaktywna: "bg-red-100 text-red-800",
    }
    return statusMap[status as keyof typeof statusMap] || "bg-gray-100 text-gray-800"
  }

  const filteredKancelarie = kancelarie.filter(
    (kancelaria) =>
      kancelaria.nazwa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kancelaria.adres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kancelaria.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddKancelaria = () => {
    setCurrentKancelaria(null)
    setFormState({
      nazwa: "",
      adres: "",
      telefon: "",
      email: "",
      nip: "",
      status: "aktywna",
    })
    setIsFormOpen(true)
  }

  const handleEditKancelaria = (kancelaria: Kancelaria) => {
    setCurrentKancelaria(kancelaria)
    setFormState({
      nazwa: kancelaria.nazwa,
      adres: kancelaria.adres,
      telefon: kancelaria.telefon,
      email: kancelaria.email,
      nip: kancelaria.nip,
      status: kancelaria.status,
    })
    setIsFormOpen(true)
  }

  const handleDeleteKancelaria = async (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę kancelarię?")) {
      return
    }
    setLoading(true)
    try {
      await api.deleteLawFirm(id)
      toast({
        title: "Sukces",
        description: "Kancelaria została usunięta.",
      })
      fetchKancelarie()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się usunąć kancelarii.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      if (currentKancelaria) {
        // Update existing
        await api.updateLawFirm(currentKancelaria.id, formState)
        toast({
          title: "Sukces",
          description: "Kancelaria została zaktualizowana.",
        })
      } else {
        // Create new
        await api.createLawFirm(formState)
        toast({
          title: "Sukces",
          description: "Kancelaria została dodana.",
        })
      }
      setIsFormOpen(false)
      fetchKancelarie()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się zapisać kancelarii.",
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
          <CardTitle>Zarządzanie Kancelariami</CardTitle>
          <CardDescription>Lista zarejestrowanych kancelarii prawnych.</CardDescription>
        </div>
        <Button onClick={handleAddKancelaria}>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj kancelarię
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Szukaj kancelarii..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Ładowanie kancelarii...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : filteredKancelarie.length === 0 ? (
          <div className="text-center text-gray-500 p-4">Brak kancelarii do wyświetlenia.</div>
        ) : (
          <div className="space-y-4">
            {filteredKancelarie.map((kancelaria) => (
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
                  <Button variant="outline" size="sm" onClick={() => handleEditKancelaria(kancelaria)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteKancelaria(kancelaria.id)}>
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
            <DialogTitle>{currentKancelaria ? "Edytuj kancelarię" : "Dodaj nową kancelarię"}</DialogTitle>
            <DialogDescription>
              {currentKancelaria ? "Zaktualizuj dane kancelarii." : "Wprowadź dane nowej kancelarii prawnej."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nazwa" className="text-right">
                Nazwa
              </Label>
              <Input
                id="nazwa"
                value={formState.nazwa}
                onChange={(e) => setFormState({ ...formState, nazwa: e.target.value })}
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
              <Label htmlFor="nip" className="text-right">
                NIP
              </Label>
              <Input
                id="nip"
                value={formState.nip}
                onChange={(e) => setFormState({ ...formState, nip: e.target.value })}
                className="col-span-3"
                required
              />
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
                  <SelectItem value="aktywna">Aktywna</SelectItem>
                  <SelectItem value="nieaktywna">Nieaktywna</SelectItem>
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
