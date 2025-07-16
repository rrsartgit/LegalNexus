"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  Users,
  CreditCard,
  Activity,
  DollarSign,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { db } from "@/lib/database/supabase"

interface DashboardStats {
  totalLawFirms: number
  activeLawFirms: number
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
  apiCalls: number
  searchQueries: number
  conversionRate: number
}

interface RecentActivity {
  id: string
  type: "registration" | "subscription" | "payment" | "search"
  description: string
  timestamp: string
  status: "success" | "pending" | "failed"
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLawFirms: 0,
    activeLawFirms: 0,
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    apiCalls: 0,
    searchQueries: 0,
    conversionRate: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load dashboard statistics
      const [lawFirmsData, usersData, subscriptionsData, analyticsData] = await Promise.all([
        db.searchLawFirms({ limit: 1000 }),
        fetch("/api/admin/users").then((r) => r.json()),
        fetch("/api/admin/subscriptions").then((r) => r.json()),
        fetch("/api/admin/analytics").then((r) => r.json()),
      ])

      setStats({
        totalLawFirms: lawFirmsData.length,
        activeLawFirms: lawFirmsData.filter((f: any) => f.is_active).length,
        totalUsers: usersData.total || 0,
        activeSubscriptions: subscriptionsData.active || 0,
        monthlyRevenue: subscriptionsData.revenue || 0,
        apiCalls: analyticsData.apiCalls || 0,
        searchQueries: analyticsData.searches || 0,
        conversionRate: analyticsData.conversionRate || 0,
      })

      // Mock recent activity data
      setRecentActivity([
        {
          id: "1",
          type: "registration",
          description: "Nowa kancelaria: Kowalski & Associates",
          timestamp: "2024-01-15T10:30:00Z",
          status: "success",
        },
        {
          id: "2",
          type: "subscription",
          description: "Upgrade do planu Professional",
          timestamp: "2024-01-15T09:15:00Z",
          status: "success",
        },
        {
          id: "3",
          type: "payment",
          description: "Płatność 299 PLN - Nowak Legal",
          timestamp: "2024-01-15T08:45:00Z",
          status: "success",
        },
        {
          id: "4",
          type: "search",
          description: "1,247 wyszukiwań w ciągu ostatniej godziny",
          timestamp: "2024-01-15T08:00:00Z",
          status: "success",
        },
      ])
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <Building2 className="h-4 w-4" />
      case "subscription":
        return <CreditCard className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "search":
        return <Search className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Przegląd systemu LegalNexus</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kancelarie</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLawFirms}</div>
            <p className="text-xs text-muted-foreground">{stats.activeLawFirms} aktywnych</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Użytkownicy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% w tym miesiącu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subskrypcje</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">{stats.conversionRate}% konwersja</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Przychody</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} PLN</div>
            <p className="text-xs text-muted-foreground">+8% w tym miesiącu</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ostatnia aktywność</CardTitle>
            <CardDescription>Najnowsze wydarzenia w systemie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString("pl-PL")}</p>
                  </div>
                  <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status systemu</CardTitle>
            <CardDescription>Wydajność i dostępność</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>API Calls</span>
                <span>{stats.apiCalls.toLocaleString()}</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Wyszukiwania</span>
                <span>{stats.searchQueries.toLocaleString()}</span>
              </div>
              <Progress value={60} className="mt-2" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Dostępność</span>
                <span>99.9%</span>
              </div>
              <Progress value={99.9} className="mt-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Wszystkie systemy działają</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analityka</CardTitle>
          <CardDescription>Szczegółowe statystyki użytkowania</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Przegląd</TabsTrigger>
              <TabsTrigger value="searches">Wyszukiwania</TabsTrigger>
              <TabsTrigger value="subscriptions">Subskrypcje</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dzisiejsze wyszukiwania</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-muted-foreground">+15% vs wczoraj</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Nowe rejestracje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-xs text-muted-foreground">+8% vs wczoraj</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Konwersja</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12.5%</div>
                    <p className="text-xs text-muted-foreground">+2.1% vs wczoraj</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="searches" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zapytanie</TableHead>
                    <TableHead>Miasto</TableHead>
                    <TableHead>Wyniki</TableHead>
                    <TableHead>Czas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>prawo gospodarcze</TableCell>
                    <TableCell>Gdańsk</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>10:30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>adwokat karny</TableCell>
                    <TableCell>Warszawa</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>10:25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>prawo rodzinne</TableCell>
                    <TableCell>Kraków</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>10:20</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Plany subskrypcji</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Trial</span>
                      <Badge variant="secondary">45</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Basic</span>
                      <Badge variant="secondary">23</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Enterprise</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status płatności</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Aktywne</span>
                      <Badge variant="default">38</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Zaległe</span>
                      <Badge variant="destructive">2</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Anulowane</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
