"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import type { Order } from "@/lib/types"

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      // Mock API call
      const mockOrders: Order[] = [
        {
          id: 1,
          user_id: "user1",
          service_type: "Analiza dokumentów",
          status: "pending",
          created_at: "2023-10-26T10:00:00Z",
          updated_at: "2023-10-26T10:00:00Z",
        },
        {
          id: 2,
          user_id: "user1",
          service_type: "Pisma prawne",
          status: "processing",
          created_at: "2023-10-25T14:30:00Z",
          updated_at: "2023-10-26T09:00:00Z",
        },
        {
          id: 3,
          user_id: "user2",
          service_type: "Konsultacje",
          status: "completed",
          created_at: "2023-10-24T11:00:00Z",
          updated_at: "2023-10-24T12:00:00Z",
        },
      ]
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setOrders(mockOrders)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować zamówień.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować zamówień.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (loading) return <p>Ładowanie zamówień...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Twoje zamówienia</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Zamówienia</TableHead>
              <TableHead>Rodzaj usługi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data złożenia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.service_type}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status === "pending" && "Oczekujące"}
                    {order.status === "processing" && "W realizacji"}
                    {order.status === "completed" && "Zakończone"}
                    {order.status === "cancelled" && "Anulowane"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
