"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { clientsApi } from "@/frontend/lib/api"
import type { Client } from "@/frontend/lib/api" // Assuming Client type is exported from api.ts
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function KlienciManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const { toast } = useToast()

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await clientsApi.getClients()
      setClients(response.data)
    } catch (err) {
      setError("Nie udało się załadować listy klientów.")
      console.error("Failed to fetch clients:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się załadować listy klientów.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
    }

    try {
      // Assuming create/update client endpoints exist in clientsApi
      // For now, this is a placeholder as API only has getClients/getClientById
      if (currentClient) {
        // await clientsApi.updateClient(currentClient.id, data);
        toast({
          title: "Informacja",
          description: "Funkcja edycji klienta nie jest jeszcze zaimplementowana w API.",
        })
      } else {
        // await clientsApi.createClient(data);
        toast({
          title: "Informacja",
          description: "Funkcja dodawania klienta nie jest jeszcze zaimplementowana w API.",
        })
      }
      setIsDialogOpen(false)
      setCurrentClient(null)
      fetchClients() // Refresh list
    } catch (err) {
      console.error("Failed to save client:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać klienta.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClient = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tego klienta?")) return
    try {
      // Assuming delete client endpoint exists in clientsApi
      // await clientsApi.deleteClient(id);
      toast({
        title: "Informacja",
        description: "Funkcja usuwania klienta nie jest jeszcze zaimplementowana w API.",
      })
      fetchClients() // Refresh list
    } catch (err) {
      console.error("Failed to delete client:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć klienta.",
        variant: "destructive",
      })
    }
  }

  const openCreateDialog = () => {
    setCurrentClient(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (client: Client) => {
    setCurrentClient(client)
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
        <CardTitle>Zarządzanie Klientami</CardTitle>
        <Button onClick={openCreateDialog} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Dodaj Klienta
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Brak zarejestrowanych klientów.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.name || "N/A"}</TableCell>
                  <TableCell>{client.phone || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(client)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edytuj</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClient(client.id)}>
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentClient ? "Edytuj Klienta" : "Dodaj Nowego Klienta"}</DialogTitle>
              <DialogDescription>
                {currentClient
                  ? "Zaktualizuj dane klienta."
                  : "Wypełnij formularz, aby dodać nowego klienta do systemu."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveClient} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentClient?.email || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nazwa
                </Label>
                <Input id="name" name="name" defaultValue={currentClient?.name || ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefon
                </Label>
                <Input id="phone" name="phone" defaultValue={currentClient?.phone || ""} className="col-span-3" />
              </div>
              <div className="flex justify-end">
                <Button type="submit">{currentClient ? "Zapisz Zmiany" : "Dodaj Klienta"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
