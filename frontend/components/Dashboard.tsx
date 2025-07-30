"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, TrendingUp } from "lucide-react"
import { kancelariaApi, klientApi, sprawaApi } from "@/lib/api"

export default function Dashboard() {
  const { data: kancelarie } = useQuery({
    queryKey: ["kancelarie"],
    queryFn: () => kancelariaApi.getAll().then((res) => res.data),
  })

  const { data: klienci } = useQuery({
    queryKey: ["klienci"],
    queryFn: () => klientApi.getAll().then((res) => res.data),
  })

  const { data: sprawy } = useQuery({
    queryKey: ["sprawy"],
    queryFn: () => sprawaApi.getAll().then((res) => res.data),
  })

  const stats = [
    {
      title: "Kancelarie",
      value: kancelarie?.length || 0,
      description: "Zarejestrowane kancelarie",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Klienci",
      value: klienci?.length || 0,
      description: "Aktywni klienci",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Sprawy",
      value: sprawy?.length || 0,
      description: "Prowadzone sprawy",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Aktywne Sprawy",
      value: sprawy?.filter((s) => s.status === "aktywna").length || 0,
      description: "Sprawy w toku",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Przegląd systemu zarządzania kancelarią prawną</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ostatnie Sprawy</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {sprawy?.slice(0, 5).map((sprawa) => (
                <div key={sprawa.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sprawa.numer_sprawy}</p>
                    <p className="text-sm text-muted-foreground">{sprawa.tytul}</p>
                  </div>
                  <div className="ml-auto font-medium">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sprawa.status === "aktywna"
                          ? "bg-green-100 text-green-800"
                          : sprawa.status === "zawieszona"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sprawa.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Statystyki Spraw</CardTitle>
            <CardDescription>Podział spraw według statusu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["aktywna", "zawieszona", "zakonczona"].map((status) => {
                const count = sprawy?.filter((s) => s.status === status).length || 0
                const percentage = sprawy?.length ? (count / sprawy.length) * 100 : 0

                return (
                  <div key={status} className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium capitalize">{status}</div>
                        <div className="text-sm text-muted-foreground">{count}</div>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${
                            status === "aktywna"
                              ? "bg-green-500"
                              : status === "zawieszona"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
