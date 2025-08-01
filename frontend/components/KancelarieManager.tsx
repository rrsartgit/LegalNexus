"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { lawFirmsApi } from "@/frontend/lib/api"
import type { LawFirm } from "@/frontend/lib/api" // Assuming LawFirm type is exported from api.ts
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function KancelarieManager() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLawFirm, setCurrentLawFirm] = useState<LawFirm | null>(null)
  const { toast } = useToast()

  const fetchLawFirms = async () => {
    try {
      setLoading(true)
      const response = await lawFirmsApi.getLawFirms()
      setLawFirms(response.data)
    } catch (err) {
      setError("Nie udało się załadować listy kancelarii.")
      console.error("Failed to fetch law firms:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się załadować listy kancelarii.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLawFirms()
  }, [])

  const handleSaveLawFirm = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      specializations: (formData.get("specializations") as string).split(",").map((s) => s.trim()),
      description: formData.get("description") as string,
    }

    try {
      if (currentLawFirm) {
        await lawFirmsApi.updateLawFirm(currentLawFirm.id, data)
        toast({
          title: "Sukces",
          description: "Kancelaria została zaktualizowana.",
        })
      } else {
        await lawFirmsApi.createLawFirm(data)
        toast({
          title: "Sukces",
          description: "Nowa kancelaria została dodana.",
        })
      }
      setIsDialogOpen(false)
      setCurrentLawFirm(null)
      fetchLawFirms() // Refresh list
    } catch (err) {
      console.error("Failed to save law firm:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać kancelarii.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteLawFirm = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tę kancelarię?")) return
    try {
      await lawFirmsApi.deleteLawFirm(id)
      toast({
        title: "Sukces",
        description: "Kancelaria została usunięta.",
      })
      fetchLawFirms() // Refresh list
    } catch (err) {
      console.error("Failed to delete law firm:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć kancelarii.",
        variant: "destructive",
      })
    }
  }

  const openCreateDialog = () => {
    setCurrentLawFirm(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (firm: LawFirm) => {
    setCurrentLawFirm(firm)
    setIsDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Zarządzanie Kancelariami Prawnymi</CardTitle>
        <Button onClick={openCreateDialog} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Dodaj Kancelarię
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Specjalizacje</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawFirms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Brak zarejestrowanych kancelarii.
                </TableCell>
              </TableRow>
            ) : (
              lawFirms.map((firm) => (
                <TableRow key={firm.id}>
                  <TableCell className="font-medium">{firm.name}</TableCell>
                  <TableCell>{firm.email}</TableCell>
                  <TableCell>{firm.phone}</TableCell>
                  <TableCell>{firm.specializations.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(firm)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edytuj</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteLawFirm(firm.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Usuń</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentLawFirm ? "Edytuj Kancelarię" : "Dodaj Nową Kancelarię"}</DialogTitle>
              <DialogDescription>
                {currentLawFirm
                  ? "Zaktualizuj dane kancelarii prawnej."
                  : "Wypełnij formularz, aby dodać nową kancelarię prawną do systemu."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveLawFirm} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nazwa
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentLawFirm?.name || ""}
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
                  name="email"
                  type="email"
                  defaultValue={currentLawFirm?.email || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefon
                </Label>
                <Input id="phone" name="phone" defaultValue={currentLawFirm?.phone || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Adres
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={currentLawFirm?.address || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specializations" className="text-right">
                  Specjalizacje
                </Label>
                <Input
                  id="specializations"
                  name="specializations"
                  defaultValue={currentLawFirm?.specializations.join(", ") || ""}
                  placeholder="Np. prawo cywilne, karne"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Opis
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={currentLawFirm?.description || ""}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">{currentLawFirm ? "Zapisz Zmiany" : "Dodaj Kancelarię"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
