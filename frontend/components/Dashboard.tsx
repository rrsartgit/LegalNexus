"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react"

export function Dashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    kancelarie: 12,
    klienci: 156,
    sprawy: 89,
    sprawyAktywne: 34,
  }

  const recentActivity = [
    {
      id: 1,
      type: "kancelaria",
      action: "Dodano nową kancelarię",
      name: "Kancelaria Kowalski & Partnerzy",
      time: "2 godziny temu",
    },
    { id: 2, type: "klient", action: "Zarejestrowano klienta", name: "Jan Nowak", time: "4 godziny temu" },
    { id: 3, type: "sprawa", action: "Zaktualizowano sprawę", name: "Sprawa rozwodowa #123", time: "6 godzin temu" },
    { id: 4, type: "sprawa", action: "Zamknięto sprawę", name: "Sprawa spadkowa #98", time: "1 dzień temu" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "kancelaria":
        return <Building2 className="h-4 w-4" />
      case "klient":
        return <Users className="h-4 w-4" />
      case "sprawa":
        return <FileText className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "kancelaria":
        return "bg-blue-100 text-blue-800"
      case "klient":
        return "bg-green-100 text-green-800"
      case "sprawa":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kancelarie</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.kancelarie}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 w tym miesiącu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Klienci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.klienci}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12 w tym miesiącu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wszystkie Sprawy</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sprawy}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8 w tym miesiącu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Sprawy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sprawyAktywne}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />W trakcie realizacji
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Ostatnia Aktywność</CardTitle>
          <CardDescription>Najnowsze zmiany w systemie</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.name}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie Akcje</CardTitle>
          <CardDescription>Najczęściej wykonywane operacje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Building2 className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Dodaj Kancelarię</h3>
              <p className="text-sm text-muted-foreground">Zarejestruj nową kancelarię prawną</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium">Dodaj Klienta</h3>
              <p className="text-sm text-muted-foreground">Zarejestruj nowego klienta</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <FileText className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium">Utwórz Sprawę</h3>
              <p className="text-sm text-muted-foreground">Rozpocznij nową sprawę prawną</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
