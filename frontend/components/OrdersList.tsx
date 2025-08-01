"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "@/frontend/lib/api"
import { CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { FileText, Eye, Download, DollarSign, Loader2, UploadCloud } from "lucide-react"
import { useAuth } from "@/frontend/lib/auth"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const API_BASE_URL = "http://localhost:8000" // Declare API_BASE_URL here

interface Order {
  id: number
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
  client_id: number
  operator_id: number | null
  documents: { id: number; file_name: string; file_path: string }[]
  analysis: { id: number; preview_content: string; full_content: string } | null
  payments: { id: number; amount: number; status: string }[]
}

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
    default:
      return "outline"
  }
}

export function OrdersList() {
  const { user, loading: authLoading } = useAuth()
  const queryClient = useQueryClient()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [analysisPreview, setAnalysisPreview] = useState("")
  const [analysisFull, setAnalysisFull] = useState("")
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated")
      // Operators and Admins see all orders, Clients only their own
      if (user.role === "client") {
        const response = await ordersApi.getOrders()
        return response.data.filter((order: Order) => order.client_id === user.id)
      } else {
        const response = await ordersApi.getOrders()
        return response.data
      }
    },
    enabled: !authLoading && !!user, // Only fetch if user is loaded and authenticated
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: string }) =>
      ordersApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      toast({ title: "Status zlecenia zaktualizowany." })
    },
    onError: (err: any) => {
      toast({
        title: "Błąd aktualizacji statusu",
        description: err.response?.data?.detail || "Wystąpił błąd.",
        variant: "destructive",
      })
    },
  })

  const addAnalysisMutation = useMutation({
    mutationFn: ({
      orderId,
      preview_content,
      full_content,
    }: { orderId: number; preview_content: string; full_content: string }) =>
      ordersApi.addAnalysis(orderId, { preview_content, full_content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      toast({ title: "Analiza dodana pomyślnie." })
      setSelectedOrder(null) // Close dialog
      setAnalysisPreview("")
      setAnalysisFull("")
    },
    onError: (err: any) => {
      toast({
        title: "Błąd dodawania analizy",
        description: err.response?.data?.detail || "Wystąpił błąd.",
        variant: "destructive",
      })
    },
  })

  const handleAddAnalysis = (order: Order) => {
    setSelectedOrder(order)
    setAnalysisPreview(order.analysis?.preview_content || "")
    setAnalysisFull(order.analysis?.full_content || "")
  }

  const handleSaveAnalysis = () => {
    if (selectedOrder && analysisPreview && analysisFull) {
      addAnalysisMutation.mutate({
        orderId: selectedOrder.id,
        preview_content: analysisPreview,
        full_content: analysisFull,
      })
    } else {
      toast({
        title: "Brak danych",
        description: "Proszę wypełnić zarówno podgląd, jak i pełną treść analizy.",
        variant: "destructive",
      })
    }
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
      await updateStatusMutation.mutateAsync({ orderId: order.id, status: "COMPLETED" })
      toast({ title: "Płatność zakończona pomyślnie!", description: "Pełna analiza jest teraz dostępna." })
    } catch (paymentError: any) {
      toast({
        title: "Błąd płatności",
        description: paymentError.message || "Wystąpił błąd podczas przetwarzania płatności.",
        variant: "destructive",
      })
    }
  }

  if (authLoading || isLoading) {
    return <div className="text-center py-8">Ładowanie zleceń...</div>
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">Błąd: {error?.message || "Nie udało się załadować zleceń."}</div>
    )
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8 text-gray-600">Brak zleceń do wyświetlenia.</div>
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tytuł</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data utworzenia</TableHead>
            <TableHead>Ostatnia aktualizacja</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(order.updated_at).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2">
                {/* Client Actions */}
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
                        <UploadCloud className="h-4 w-4 mr-1" /> Uzupełnij
                      </Button>
                    )}
                    {order.status === "AWAITING_PAYMENT" && (
                      <Button size="sm" onClick={() => handlePayment(order)} disabled={updateStatusMutation.isPending}>
                        {updateStatusMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <DollarSign className="h-4 w-4 mr-1" />
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
                            <CardDescription>{order.title}</CardDescription>
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

                {/* Operator/Admin Actions */}
                {(user?.role === "operator" || user?.role === "admin") && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> Szczegóły
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>Szczegóły Zlecenia #{order.id}</DialogTitle>
                          <CardDescription>{order.title}</CardDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">Opis:</h3>
                            <p className="text-gray-700">{order.description}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Dokumenty:</h3>
                            {order.documents && order.documents.length > 0 ? (
                              <ul className="list-disc pl-5">
                                {order.documents.map((doc) => (
                                  <li key={doc.id} className="flex items-center justify-between">
                                    <span>{doc.file_name}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDownloadDocument(doc.file_path, doc.file_name)}
                                    >
                                      <Download className="h-4 w-4 mr-1" /> Pobierz
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">Brak załączonych dokumentów.</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Status:</h3>
                            <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                          </div>
                          {order.analysis && (
                            <div>
                              <h3 className="text-lg font-semibold">Analiza (podgląd):</h3>
                              <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                                {order.analysis.preview_content}
                              </div>
                              <h3 className="text-lg font-semibold mt-4">Analiza (pełna treść):</h3>
                              <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
                                {order.analysis.full_content}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-2">
                          {order.status === "NEW" && (
                            <Button
                              onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: "IN_PROGRESS" })}
                              disabled={updateStatusMutation.isPending}
                            >
                              {updateStatusMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Rozpocznij Analizę
                            </Button>
                          )}
                          {order.status === "IN_PROGRESS" && (
                            <>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  updateStatusMutation.mutate({ orderId: order.id, status: "AWAITING_CLIENT" })
                                }
                                disabled={updateStatusMutation.isPending}
                              >
                                {updateStatusMutation.isPending ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Oczekuje na Klienta
                              </Button>
                              <Button onClick={() => handleAddAnalysis(order)}>
                                <FileText className="h-4 w-4 mr-1" /> Dodaj Analizę
                              </Button>
                            </>
                          )}
                          {order.status === "AWAITING_CLIENT" && (
                            <Button
                              onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: "IN_PROGRESS" })}
                              disabled={updateStatusMutation.isPending}
                            >
                              {updateStatusMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Wróć do Analizy
                            </Button>
                          )}
                          {order.status === "AWAITING_PAYMENT" && (
                            <Button
                              onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: "COMPLETED" })}
                              disabled={updateStatusMutation.isPending}
                            >
                              {updateStatusMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Oznacz jako Opłacone (ręcznie)
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Analysis Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Dodaj/Edytuj Analizę dla Zlecenia #{selectedOrder.id}</DialogTitle>
              <CardDescription>{selectedOrder.title}</CardDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="analysis-preview">Podgląd analizy (widoczny przed opłatą)</Label>
                <Textarea
                  id="analysis-preview"
                  value={analysisPreview}
                  onChange={(e) => setAnalysisPreview(e.target.value)}
                  rows={5}
                  placeholder="Krótki fragment analizy, np. 'Wstępna analiza wskazuje na...' "
                  disabled={addAnalysisMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="analysis-full">Pełna treść analizy (widoczna po opłacie)</Label>
                <Textarea
                  id="analysis-full"
                  value={analysisFull}
                  onChange={(e) => setAnalysisFull(e.target.value)}
                  rows={10}
                  placeholder="Pełna, szczegółowa analiza prawna..."
                  disabled={addAnalysisMutation.isPending}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedOrder(null)} disabled={addAnalysisMutation.isPending}>
                Anuluj
              </Button>
              <Button onClick={handleSaveAnalysis} disabled={addAnalysisMutation.isPending}>
                {addAnalysisMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Zapisz Analizę
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
