"use client"

import { useQuery } from "@tanstack/react-query"
import { adminApi } from "@/frontend/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, Clock } from "lucide-react"

export function DashboardStats() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: adminApi.getDashboardStats,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ładowanie...</CardTitle>
              <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold h-8 w-3/4 bg-gray-200 animate-pulse rounded" />
              <p className="text-xs text-muted-foreground h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Błąd ładowania statystyk.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Łączna liczba użytkowników</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_users || 0}</div>
          <p className="text-xs text-muted-foreground">W tym {stats?.active_users || 0} aktywnych</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Złożone zlecenia</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_orders || 0}</div>
          <p className="text-xs text-muted-foreground">W tym {stats?.new_orders || 0} nowych</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zakończone analizy</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.completed_analyses || 0}</div>
          <p className="text-xs text-muted-foreground">W tym {stats?.paid_analyses || 0} opłaconych</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Średni czas realizacji</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.avg_completion_time_hours || 0}h</div>
          <p className="text-xs text-muted-foreground">Dla zakończonych zleceń</p>
        </CardContent>
      </Card>
    </div>
  )
}
