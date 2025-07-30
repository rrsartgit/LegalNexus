"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiClient, type Order } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { FileText, Clock, CheckCircle, AlertCircle, CreditCard } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pl } from "date-fns/locale"

export default function OrdersList() {
  const { user } = useAuth()

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => apiClient.getOrders(),
  })

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "NEW":
        return <Clock className="h-4 w-4" />
      case "IN_PROGRESS":
        return <AlertCircle className="h-4 w-4" />
      case "AWAITING_CLIENT":
        return <FileText className="h-4 w-4" />
      case "AWAITING_PAYMENT":
        return <CreditCard className="h-4 w-4" />
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusMap = {
      NEW: { label: "Nowe", variant: "default" as const },
      IN_PROGRESS: { label: "W trakcie", variant: "secondary" as const },
      AWAITING_CLIENT: { label: "Oczekuje na klienta", variant: "outline" as const },
      AWAITING_PAYMENT: { label: "Oczekuje na płatność", variant: "destructive" as const },
      COMPLETED: { label: "Zakończone", variant: "default" as const },
    }

    const config = statusMap[status] || statusMap.NEW
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {config.label}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Ładowanie zleceń...</div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">Błąd podczas ładowania zleceń: {(error as Error).message}</div>
        </CardContent>
      </Card>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            {user?.role === "CLIENT" ? "Nie masz jeszcze żadnych zleceń." : "Brak zleceń do obsługi."}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{order.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Zlecenie #{order.id}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardHeader>
          <CardContent>
            {order.description && <p className="text-gray-700 mb-3">{order.description}</p>}

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>
                  Utworzono:{" "}
                  {formatDistanceToNow(new Date(order.created_at), {
                    addSuffix: true,
                    locale: pl,
                  })}
                </span>
                {order.operator && <span>Operator: {order.operator.email}</span>}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Szczegóły
                </Button>
                {order.status === "AWAITING_PAYMENT" && user?.role === "CLIENT" && <Button size="sm">Zapłać</Button>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
