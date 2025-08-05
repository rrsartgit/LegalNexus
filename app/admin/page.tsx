"use client"

import type React from "react"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { fetchAdminDashboardStats, fetchAdminDashboardActivity } from "@/frontend/lib/api"
import type { Activity, Stats } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboardPage() {
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useQuery<Stats>({
    queryKey: ["adminStats"],
    queryFn: fetchAdminDashboardStats,
  })

  const {
    data: activity,
    isLoading: isLoadingActivity,
    isError: isErrorActivity,
  } = useQuery<Activity[]>({
    queryKey: ["adminActivity"],
    queryFn: fetchAdminDashboardActivity,
  })

  const [activeTab, setActiveTab] = useState("overview")

  if (isLoadingStats || isLoadingActivity) return <p>Ładowanie danych...</p>
  if (isErrorStats || isErrorActivity) return <p>Błąd podczas ładowania danych.</p>

  const chartData = [
    { name: "Użytkownicy", value: stats?.total_users || 0 },
    { name: "Kancelarie", value: stats?.total_law_firms || 0 },
    { name: "Sprawy", value: stats?.total_cases || 0 },
    { name: "Zamówienia", value: stats?.total_orders || 0 },
  ]

  return (
    <div className="grid gap-6 p-6 md:p-8 lg:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Panel Administratora</h1>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="activity">Aktywność</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Łączna liczba użytkowników</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_users}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.new_users_last_month} nowych użytkowników w ostatnim miesiącu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Łączna liczba kancelarii</CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_law_firms}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.new_law_firms_last_month} nowych kancelarii w ostatnim miesiącu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Łączna liczba spraw</CardTitle>
                <FolderOpenIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_cases}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.new_cases_last_month} nowych spraw w ostatnim miesiącu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Łączna liczba zamówień</CardTitle>
                <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_orders}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.new_orders_last_month} nowych zamówień w ostatnim miesiącu
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statystyki Systemu</CardTitle>
              <CardDescription>Wizualizacja kluczowych danych systemowych.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnia Aktywność</CardTitle>
              <CardDescription>Przegląd najnowszych działań w systemie.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Użytkownik</TableHead>
                    <TableHead>Akcja</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activity?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user_email}</TableCell>
                      <TableCell>{item.action}</TableCell>
                      <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

function FolderOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 11V5l-3-3H2v16h14v-2" />
      <path d="M22 11V5l-3-3H7v4" />
      <path d="M2 15h10" />
      <path d="M10 19h12" />
      <path d="M10 15h2" />
    </svg>
  )
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
