"use client"

import { useEffect, useState } from "react"
import { ordersApi } from "@/frontend/lib/api"
import type { Order } from "@/frontend/lib/api" // Assuming Order type is exported from api.ts
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Eye, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/frontend/lib/auth"

const API_BASE_URL = "http://localhost:8000" // Declare API_BASE_URL here

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersApi.getOrders()
      setOrders(response.data)
    } catch (err) {
      setError("Nie udało się załadować listy zleceń.")
      console.error("Failed to fetch orders:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się załadować listy zleceń.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "NEW":
        return "default"
      case "IN_PROGRESS":
        return "secondary"
      case "AWAITING_CLIENT":
        return "destructive"
      case "AWAITING_PAYMENT":
        return "warning" // Assuming 'warning' variant exists or can be styled
      case "COMPLETED":
        return "success" // Assuming 'success' variant exists or can be styled
      case "pending":
        return "secondary"
      case "in_progress":
        return "default"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus)
      toast({
        title: "Sukces",
        description: `Status zlecenia #${orderId} zmieniono na ${newStatus}.`,
      })
      fetchOrders() // Refresh list
    } catch (err) {
      console.error("Failed to update order status:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować statusu zlecenia.",
        variant: "destructive",
      })
    }
  }

  const openViewDialog = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleDownloadDocument = (filePath: string, fileName: string) => {
    // Assuming filePath is a full URL or can be constructed
    // For local FastAPI, it might be something like /static/documents/filename.ext
    const fullUrl = `${API_BASE_URL}/documents/${filePath}` // Adjust based on your FastAPI static files serving
    window.open(fullUrl, "_blank")
  }

  const handlePayment = async (order: Order) => {
    if (!order.analysis) {
      toast({ title: "Błąd", description: "Analiza nie jest jeszcze gotowa do opłaty.", variant: "destructive" })
      return
    }
    try {
      // This is a mock payment flow. In a real app, you'd integrate with Stripe/PayU.
      // For now, we'll simulate success and update order status.
      toast({ title: "Przekierowanie do płatności...", description: "Symulacja płatności..." })
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate payment processing

      // Simulate payment success and update order status to COMPLETED
      await handleUpdateStatus(order.id, "COMPLETED")
      toast({ title: "Płatność zakończona pomyślnie!", description: "Pełna analiza jest teraz dostępna." })
    } catch (paymentError: any) {
      toast({
        title: "Błąd płatności",
        description: paymentError.message || "Wystąpił błąd podczas przetwarzania płatności.",
        variant: "destructive",
      })
    }
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
      <CardHeader>
        <CardTitle>Lista Zleceń</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Zlecenia</TableHead>
              <TableHead>Typ Dokumentu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Utworzenia</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Brak zleceń.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.document_type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openViewDialog(order)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Zobacz</span>
                    </Button>
                    {user?.role === "client" && (
                      <>
                        {order.status === "AWAITING_CLIENT" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({
                                title: "Funkcja w budowie",
                                description: "Możliwość dogrywania plików zostanie dodana.",
                              })
                            }
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Rozpocznij</span>
                          </Button>
                        )}
                        {order.status === "AWAITING_PAYMENT" && (
                          <Button size="sm" onClick={() => handlePayment(order)} disabled={loading}>
                            {loading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                            Zapłać
                          </Button>
                        )}
                        {(order.status === "COMPLETED" || order.status === "AWAITING_PAYMENT") && order.analysis && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" /> Zobacz Analizę
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                              <DialogHeader>
                                <DialogTitle>Analiza Zlecenia #{order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                {order.status === "AWAITING_PAYMENT" ? (
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Podgląd analizy:</h3>
                                    <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                                      {order.analysis.preview_content}
                                    </div>
                                    <p className="text-red-500 mt-4">
                                      Pełna treść analizy dostępna po dokonaniu płatności.
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Pełna treść analizy:</h3>
                                    <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                                      {order.analysis.full_content}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </>
                    )}

                    {(user?.role === "operator" || user?.role === "admin") && (
                      <>
                        {order.status === "NEW" && (
                          <Button onClick={() => handleUpdateStatus(order.id, "IN_PROGRESS")} disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Rozpocznij Analizę
                          </Button>
                        )}
                        {order.status === "IN_PROGRESS" && (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => handleUpdateStatus(order.id, "AWAITING_CLIENT")}
                              disabled={loading}
                            >
                              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                              Oczekuje na Klienta
                            </Button>
                            <Button onClick={() => setSelectedOrder(order)}>
                              <CheckCircle className="h-4 w-4 mr-1" /> Dodaj Analizę
                            </Button>
                          </>
                        )}
                        {order.status === "AWAITING_CLIENT" && (
                          <Button onClick={() => handleUpdateStatus(order.id, "IN_PROGRESS")} disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Wróć do Analizy
                          </Button>
                        )}
                        {order.status === "AWAITING_PAYMENT" && (
                          <Button onClick={() => handleUpdateStatus(order.id, "COMPLETED")} disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Oznacz jako Opłacone (ręcznie)
                          </Button>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Szczegóły Zlecenia #{selectedOrder?.id}</DialogTitle>
              <DialogDescription>Informacje o wybranym zleceniu.</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Typ Dokumentu:</Label>
                  <span className="col-span-3">{selectedOrder.document_type}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status:</Label>
                  <span className="col-span-3">
                    <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
                  </span>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Opis:</Label>
                  <Textarea readOnly value={selectedOrder.description} className="col-span-3 min-h-[120px]" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Utworzono:</Label>
                  <span className="col-span-3">{new Date(selectedOrder.created_at).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Ostatnia aktualizacja:</Label>
                  <span className="col-span-3">{new Date(selectedOrder.updated_at).toLocaleString()}</span>
                </div>
                {/* Add more details like attached files if applicable */}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Dodaj/Edytuj Analizę dla Zlecenia #{selectedOrder.id}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="analysis-preview">Podgląd analizy (widoczny przed opłatą)</Label>
                  <Textarea
                    id="analysis-preview"
                    value={selectedOrder.analysis?.preview_content || ""}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        analysis: { ...selectedOrder.analysis, preview_content: e.target.value },
                      })
                    }
                    rows={5}
                    placeholder="Krótki fragment analizy, np. 'Wstępna analiza wskazuje na...' "
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="analysis-full">Pełna treść analizy (widoczna po opłacie)</Label>
                  <Textarea
                    id="analysis-full"
                    value={selectedOrder.analysis?.full_content || ""}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        analysis: { ...selectedOrder.analysis, full_content: e.target.value },
                      })
                    }
                    rows={10}
                    placeholder="Pełna, szczegółowa analiza prawna..."
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedOrder(null)} disabled={loading}>
                  Anuluj
                </Button>
                <Button onClick={() => handleUpdateStatus(selectedOrder.id, "COMPLETED")} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Zapisz Analizę
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
