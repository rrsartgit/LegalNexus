"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { LawFirm } from "@/lib/types"

export function KancelarieManager() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLawFirm, setCurrentLawFirm] = useState<LawFirm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLawFirms()
  }, [])

  const fetchLawFirms = async () => {
    setLoading(true)
    setError(null)
    try {
      // Mock API call
      const mockLawFirms: LawFirm[] = [
        {
          id: 1,
          name: "Kancelaria Prawna Lex",
          address: "ul. Długa 1, Warszawa",
          phone: "123-456-789",
          email: "lex@example.com",
          specializations: ["Prawo cywilne", "Prawo rodzinne"],
          description: "Doświadczona kancelaria z wieloletnim stażem.",
          rating: 4.5,
          reviews: 120,
        },
        {
          id: 2,
          name: "Adwokaci i Radcowie Prawni Veritas",
          address: "ul. Krótka 5, Kraków",
          phone: "987-654-321",
          email: "veritas@example.com",
          specializations: ["Prawo karne", "Prawo gospodarcze"],
          description: "Specjaliści w sprawach karnych i biznesowych.",
          rating: 4.8,
          reviews: 90,
        },
      ]
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setLawFirms(mockLawFirms)
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

  const handleAddEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentLawFirm) return

    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

      if (currentLawFirm.id === 0) {
        // Add new law firm
        const newLawFirm = { ...currentLawFirm, id: lawFirms.length + 1 }
        setLawFirms((prev) => [...prev, newLawFirm])
        toast({ title: "Kancelaria dodana pomyślnie!" })
      } else {
        // Update existing law firm
        setLawFirms((prev) => prev.map((firm) => (firm.id === currentLawFirm.id ? currentLawFirm : firm)))
        toast({ title: "Kancelaria zaktualizowana pomyślnie!" })
      }
      setIsModalOpen(false)
      setCurrentLawFirm(null)
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas zapisu kancelarii.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas zapisu kancelarii.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setLawFirms((prev) => prev.filter((firm) => firm.id !== id))
      toast({ title: "Kancelaria usunięta pomyślnie!" })
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas usuwania kancelarii.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas usuwania kancelarii.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setCurrentLawFirm({
      id: 0,
      name: "",
      address: "",
      phone: "",
      email: "",
      specializations: [],
      description: "",
      rating: 0,
      reviews: 0,
    })
    setIsModalOpen(true)
  }

  const openEditModal = (firm: LawFirm) => {
    setCurrentLawFirm(firm)
    setIsModalOpen(true)
  }

  if (loading) return <p>Ładowanie kancelarii...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Zarządzanie Kancelariami</CardTitle>
        <Button onClick={openAddModal}>Dodaj Kancelarię</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specjalizacje</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawFirms.map((firm) => (
              <TableRow key={firm.id}>
                <TableCell>{firm.name}</TableCell>
                <TableCell>{firm.email}</TableCell>
                <TableCell>{firm.specializations.join(", ")}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(firm)}>
                    Edytuj
                  </Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(firm.id)}>
                    Usuń
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentLawFirm?.id === 0 ? "Dodaj nową kancelarię" : "Edytuj kancelarię"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEdit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nazwa
              </Label>
              <Input
                id="name"
                value={currentLawFirm?.name || ""}
                onChange={(e) => setCurrentLawFirm({ ...currentLawFirm!, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adres
              </Label>
              <Input
                id="address"
                value={currentLawFirm?.address || ""}
                onChange={(e) => setCurrentLawFirm({ ...currentLawFirm!, address: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefon
              </Label>
              <Input
                id="phone"
                value={currentLawFirm?.phone || ""}
                onChange={(e) => setCurrentLawFirm({ ...currentLawFirm!, phone: e.target.value })}
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
                value={currentLawFirm?.email || ""}
                onChange={(e) => setCurrentLawFirm({ ...currentLawFirm!, email: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specializations" className="text-right">
                Specjalizacje
              </Label>
              <Input
                id="specializations"
                value={currentLawFirm?.specializations.join(", ") || ""}
                onChange={(e) =>
                  setCurrentLawFirm({
                    ...currentLawFirm!,
                    specializations: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="col-span-3"
                placeholder="Np. Prawo cywilne, Prawo rodzinne"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Opis
              </Label>
              <Textarea
                id="description"
                value={currentLawFirm?.description || ""}
                onChange={(e) => setCurrentLawFirm({ ...currentLawFirm!, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Zapisywanie..." : "Zapisz zmiany"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
