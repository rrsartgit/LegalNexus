"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock4,
} from "lucide-react"

type Tab = "zadania" | "statystyki" | "klienci" | "szablony" | "ustawienia"

type Task = {
  id: string
  title: string
  clientName: string
  priority: "high" | "medium" | "low"
  deadline: string
  status: "pending" | "in_progress" | "completed"
}
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Analiza nakazu zapłaty",
    clientName: "Jan Kowalski",
    priority: "high",
    deadline: "2025-08-18",
    status: "pending",
  },
  {
    id: "2",
    title: "Sprzeciw od nakazu",
    clientName: "Anna Nowak",
    priority: "medium",
    deadline: "2025-08-20",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Analiza wezwania",
    clientName: "Piotr Wiśniewski",
    priority: "low",
    deadline: "2025-08-25",
    status: "completed",
  },
]

export default function OperatorPanel() {
  const [tab, setTab] = useState<Tab>("zadania")
  useEffect(() => {
    /* ewentualne sprawdzenie roli */
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 grid lg:grid-cols-[260px,1fr] gap-6">
        <aside className="space-y-2">
          <Button
            variant={tab === "zadania" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setTab("zadania")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Zadania do wykonania
          </Button>
          <Button
            variant={tab === "statystyki" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setTab("statystyki")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Statystyki
          </Button>
          <Button
            variant={tab === "klienci" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setTab("klienci")}
          >
            <Users className="mr-2 h-4 w-4" />
            Klienci
          </Button>
          <Button
            variant={tab === "szablony" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setTab("szablony")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Szablony odpowiedzi
          </Button>
          <Button
            variant={tab === "ustawienia" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setTab("ustawienia")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Ustawienia
          </Button>
        </aside>

        <section className="space-y-6">
          {tab === "zadania" && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Zadania</h2>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtruj
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Oczekujące</CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    {mockTasks.filter((t) => t.status === "pending").length}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>W trakcie</CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    {mockTasks.filter((t) => t.status === "in_progress").length}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Zakończone</CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    {mockTasks.filter((t) => t.status === "completed").length}
                  </CardContent>
                </Card>
              </div>
              <div className="overflow-x-auto rounded bg-white shadow">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-2">Tytuł</th>
                      <th className="px-4 py-2">Klient</th>
                      <th className="px-4 py-2">Termin</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTasks.map((t) => {
                      const meta =
                        t.status === "pending"
                          ? { label: "Oczekuje", icon: Clock4, cls: "bg-blue-100 text-blue-800" }
                          : t.status === "in_progress"
                            ? { label: "W trakcie", icon: AlertCircle, cls: "bg-yellow-100 text-yellow-800" }
                            : { label: "Zakończone", icon: CheckCircle2, cls: "bg-green-100 text-green-800" }
                      return (
                        <tr key={t.id} className="border-t">
                          <td className="px-4 py-2">{t.title}</td>
                          <td className="px-4 py-2">{t.clientName}</td>
                          <td className="px-4 py-2">{new Date(t.deadline).toLocaleDateString("pl-PL")}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${meta.cls}`}>
                              <meta.icon className="h-3 w-3" />
                              {meta.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "statystyki" && (
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Średni czas realizacji</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-semibold">36 h</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pisma w kolejce</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-semibold">12</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Zadowolenie klientów</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-semibold">4.7/5</CardContent>
              </Card>
            </div>
          )}

          {tab === "klienci" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Szukaj klienta..." className="max-w-sm" />
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Szukaj
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Kancelaria ABC"].map((n, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-base">{n}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Ostatnia aktywność: {new Date(Date.now() - i * 86400000).toLocaleDateString("pl-PL")}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tab === "szablony" && <TemplatesManager />}

          {tab === "ustawienia" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Powiadomienia</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  E-mail: włączone
                  <br />
                  SMS: wyłączone
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Integracje</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  CRM: połączony
                  <br />
                  Archiwum: połączone
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function TemplatesManager() {
  const [templates, setTemplates] = useState<{ id: string; name: string; content: string }[]>([
    { id: "t1", name: "Sprzeciw od nakazu zapłaty", content: "Wnoszę sprzeciw od nakazu zapłaty..." },
    { id: "t2", name: "Wezwanie do zapłaty", content: "Wzywam do zapłaty kwoty..." },
  ])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Nowy szablon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Nazwa" value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea placeholder="Treść" rows={8} value={content} onChange={(e) => setContent(e.target.value)} />
          <Button
            onClick={() => {
              if (!name || !content) return
              setTemplates((t) => [{ id: crypto.randomUUID(), name, content }, ...t])
              setName("")
              setContent("")
            }}
          >
            Dodaj
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Szablony</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates.map((t) => (
            <div key={t.id} className="border rounded p-3 bg-white">
              <div className="font-medium">{t.name}</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap mt-1">{t.content}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
