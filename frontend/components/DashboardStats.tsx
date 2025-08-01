"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardApi } from "@/frontend/lib/api"
import { Loader2, Users, FileText, CheckCircle, Clock, Briefcase } from "lucide-react"

interface Stats {
  total_users: number
  total_orders: number
  pending_orders: number
  completed_orders: number
  total_law_firms: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await dashboardApi.getStats()
        setStats(response.data)
      } catch (err) {
        setError("Nie udało się załadować statystyk.")
        console.error("Failed to fetch dashboard stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  if (!stats) {
    return <div className="text-center text-gray-500 p-4">Brak danych statystycznych.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Łączna liczba użytkowników</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_users}</div>
          <p className="text-xs text-muted-foreground">Zarejestrowanych w systemie</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Łączna liczba zleceń</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_orders}</div>
          <p className="text-xs text-muted-foreground">Wszystkie zamówienia</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zlecenia w toku</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending_orders}</div>
          <p className="text-xs text-muted-foreground">Oczekujące na realizację</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Zlecenia zakończone</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed_orders}</div>
          <p className="text-xs text-muted-foreground">Pomyślnie zrealizowane</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Liczba kancelarii</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_law_firms}</div>
          <p className="text-xs text-muted-foreground">Zarejestrowanych partnerów</p>
        </CardContent>
      </Card>
    </div>
  )
}
