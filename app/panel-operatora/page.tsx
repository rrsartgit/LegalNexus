"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth, mockLogin } from "@/lib/auth"
import {
  FileText,
  Filter,
  User,
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock4,
  AlertCircle,
  Search,
} from "lucide-react"

interface Task {
  id: string
  caseId: string
  clientName: string
  type: string
  title: string
  priority: "high" | "medium" | "low"
  deadline: Date
  status: "pending" | "in_progress" | "completed"
  documents: string[]
  clientNotes: string
}

type Template = { id: string; name: string; content: string }

export default function PanelOperatoraPage() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<"zadania" | "statystyki" | "klienci" | "szablony" | "ustawienia">(
    "zadania",
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      mockLogin("operator@example.com", "operator")
    }
  }, [isAuthenticated])

  const mockTasks: Task[] = [
    {
      id: "1",
      caseId: "1",
      clientName: "Jan Kowalski",
      type: "analysis",
      title: "Analiza nakazu zapłaty",
      priority: "high",
      deadline: new Date("2025-07-20"),
      status: "pending",
      documents: ["nakaz_zaplaty.pdf"],
      clientNotes: "Nie zgadzam się z nakazem, uważam że jest bezpodstawny.",
    },
    {
      id: "2",
      caseId: "2",
      clientName: "Anna Nowak",
      type: "document",
      title: "Sprzeciw od nakazu zapłaty",
      priority: "medium",
      deadline: new Date("2025-07-22"),
      status: "in_progress",
      documents: ["analiza_completed.pdf"],
      clientNotes: "Proszę o szybkie przygotowanie sprzeciwu.",
    },
    {
      id: "3",
      caseId: "3",
      clientName: "Piotr Wiśniewski",
      type: "analysis",
      title: "Analiza wezwania komornika",
      priority: "low",
      deadline: new Date("2025-07-25"),
      status: "completed",
      documents: ["wezwanie_komornik.jpg"],
      clientNotes: "",
    },
  ]

  const sidebarItems = [
    { id: "zadania", label: "Zadania do wykonania", icon: FileText },
    { id: "statystyki", label: "Statystyki", icon: BarChart3 },
    { id: "klienci", label: "Klienci", icon: Users },
    { id: "szablony", label: "Szablony odpowiedzi", icon: MessageSquare },
    { id: "ustawienia", label: "Ustawienia", icon: Settings },
  ] as const

  const getPriorityBadge = (priority: Task["priority"]) => {
    const map = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }
    return map[priority]
  }

  const getStatusBadge = (status: Task["status"]) => {
    const map = {
      pending: { label: "Oczekuje", color: "bg-blue-100 text-blue-800", icon: Clock4 },
      in_progress: { label: "W trakcie", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      completed: { label: "Zakończone", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    }
    return map[status]
  }

  if (!isAuthenticated) {
    return <div className="p-10 text-center">Ładowanie...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />

      <div className="flex flex-1">
        <aside
          className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-64 hidden lg:block"}`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{user?.name ?? "Operator"}</p>
                <p className="text-xs text-gray-500">Panel operatora</p>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              {sidebarItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "zadania" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Zadania do wykonania</h1>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtruj
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Oczekujące"
                  value={mockTasks.filter((t) => t.status === "pending").length}
                  color="bg-blue-100 text-blue-800"
                />
                <StatCard
                  title="W trakcie"
                  value={mockTasks.filter((t) => t.status === "in_progress").length}
                  color="bg-yellow-100 text-yellow-800"
                />
                <StatCard
                  title="Zakończone"
                  value={mockTasks.filter((t) => t.status === "completed").length}
                  color="bg-green-100 text-green-800"
                />
              </div>

              <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Tytuł</th>
                      <th className="px-4 py-3">Klient</th>
                      <th className="px-4 py-3">Priorytet</th>
                      <th className="px-4 py-3">Termin</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTasks.map((task) => {
                      const priorityClass = getPriorityBadge(task.priority)
                      const statusMeta = getStatusBadge(task.status)
                      return (
                        <tr key={task.id} className="border-t">
                          <td className="px-4 py-3 whitespace-nowrap">{task.title}</td>
                          <td className="px-4 py-3">{task.clientName}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priorityClass}`}>
                              {task.priority === "high" ? "Wysoki" : task.priority === "medium" ? "Średni" : "Niski"}
                            </span>
                          </td>
                          <td className="px-4 py-3">{task.deadline.toLocaleDateString("pl-PL")}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${statusMeta.color}`}
                            >
                              <statusMeta.icon className="h-3 w-3" />
                              {statusMeta.label}
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

          {activeTab === "statystyki" && (
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
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Wydajność tygodniowa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gradient-to-r from-blue-50 to-green-50 rounded border flex items-center justify-center text-sm text-muted-foreground">
                    Wykres (placeholder)
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "klienci" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Szukaj klienta..." className="max-w-sm" />
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Szukaj
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Kancelaria ABC"].map((name, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-base">{name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Ostatnie pismo: {new Date(Date.now() - i * 86400000).toLocaleDateString("pl-PL")}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "szablony" && <TemplatesManager />}

          {activeTab === "ustawienia" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencje powiadomień</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  E-mail: włączone
                  <br />
                  SMS: wyłączone
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Integracje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  CRM: połączony
                  <br />
                  Archiwum: połączone
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  )
}

function TemplatesManager() {
  const [templates, setTemplates] = useState<Template[]>([
    { id: "t1", name: "Sprzeciw od nakazu zapłaty", content: "Wnoszę sprzeciw od nakazu zapłaty..." },
    { id: "t2", name: "Wezwanie do zapłaty", content: "Wzywam do zapłaty kwoty..." },
  ])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const add = () => {
    if (!name || !content) return
    setTemplates((t) => [{ id: Math.random().toString(36).slice(2), name, content }, ...t])
    setName("")
    setContent```tsx file="app/asystent-ai/page.tsx"
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send } from 'lucide-react'

type ChatMessage = { role: "user" | "assistant"; content: string; sources?: { id: string; title: string }[] }

export default function AsystentAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    const question = input.trim()
    if (!question) return
    setInput("")
    setMessages((m) => [...m, { role: "user", content: question }])

    try {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      })
      const data = await res.json()
      const answer: ChatMessage = {
        role: "assistant",
        content: data.text ?? "Przepraszam, nie mogę teraz odpowiedzieć.",
        sources: data.sources,
      }
      setMessages((m) => [...m, answer])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Wystąpił błąd. Spróbuj ponownie za chwilę." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      void ask()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Asystent AI (RAG)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Zadaj pytanie z zakresu polskiego prawa. Model korzysta z kontekstu z bazy wiedzy (RAG).
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-4 $\
                    m.role === \"user" ? "bg-blue-50 text-gray-900" : "bg-white border"`}
                >
                  <div className="text-xs font-medium mb-2">
                    {m.role === "user" ? "Ty" : "Asystent"}
                  </div>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.sources.map((s) => (
                        <Badge key={s.id} variant="secondary" className="bg-gray-100">
                          Źródło: {s.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Przykład: "Jakie są przesłanki wypowiedzenia umowy o pracę przez pracodawcę?"
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Napisz swoje pytanie. Ctrl/Cmd + Enter, aby wysłać."
              />
              <div className="flex justify-end">
                <Button onClick={() => void ask()} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Wyślij
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
