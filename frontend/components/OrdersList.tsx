"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Search, Loader2 } from "lucide-react"
import { useApi } from "@/lib/api/hooks"
import type { Order } from "@/lib/api"
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

export function OrdersList() {
  const api = useApi()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    document_url: "",
    document_type: "",
    status: "",
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getOrders()
      setOrders(data)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować zleceń.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować zleceń.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return statusMap[status as keyof typeof statusMap] || "bg-gray-100 text-gray-800"
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleEditOrder = (order: Order) => {
    setCurrentOrder(order)
    setFormState({
      title: order.title,
      description: order.description,
      document_url: order.document_url,
      document_type: order.document_type,
      status: order.status,
    })
    setIsFormOpen(true)
  }

  const handleDeleteOrder = async (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to zlecenie?")) {
      return
    }
    setLoading(true)
    try {
      await api.deleteOrder(id)
      toast({
        title: "Sukces",
        description: "Zlecenie zostało usunięte.",
      })
      fetchOrders()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się usunąć zlecenia.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      if (currentOrder) {
        await api.updateOrder(currentOrder.id, formState)
        toast({
          title: "Sukces",
          description: "Zlecenie zostało zaktualizowane.",
        })
      }
      setIsFormOpen(false)
      fetchOrders()
    } catch (err: any) {
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się zaktualizować zlecenia.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista Zleceń</CardTitle>
        <CardDescription>Zarządzaj zleceniami analizy dokumentów i pism prawnych.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Szukaj zleceń..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status zlecenia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="pending">Oczekujące</SelectItem>
              <SelectItem value="in_progress">W trakcie</SelectItem>
              <SelectItem value="completed">Zakończone</SelectItem>
              <SelectItem value="cancelled">Anulowane</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Ładowanie zleceń...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 p-4">Brak zleceń do wyświetlenia.</div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{order.title}</h4>
                  <p className="text-sm text-gray-600">{order.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Typ: {order.document_type}</span>
                    <span>Utworzono: {new Date(order.created_at).toLocaleDateString("pl-PL")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadge(order.status)}>{order.status.replace("_", " ")}</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)}>
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
            <DialogTitle>Edytuj zlecenie</DialogTitle>
            <DialogDescription>Zaktualizuj szczegóły zlecenia.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Tytuł
              </Label>
              <Input
                id="title"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Opis
              </Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document_url" className="text-right">
                URL Dokumentu
              </Label>
              <Input
                id="document_url"
                value={formState.document_url}
                onChange={(e) => setFormState({ ...formState, document_url: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document_type" className="text-right">
                Typ Dokumentu
              </Label>
              <Select
                value={formState.document_type}
                onValueChange={(value) => setFormState({ ...formState, document_type: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nakaz_zaplaty">Nakaz zapłaty</SelectItem>
                  <SelectItem value="wezwanie_komornika">Wezwanie komornika</SelectItem>
                  <SelectItem value="umowa">Umowa</SelectItem>
                  <SelectItem value="inne">Inne</SelectItem>
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
                  <SelectItem value="pending">Oczekujące</SelectItem>
                  <SelectItem value="in_progress">W trakcie</SelectItem>
                  <SelectItem value="completed">Zakończone</SelectItem>
                  <SelectItem value="cancelled">Anulowane</SelectItem>
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
