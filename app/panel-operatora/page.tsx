"use client"

import ClientLayout from "@/frontend/app/ClientLayout"
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function PanelOperatoraPage() {
  const { user, isAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState("panel-operatora") // Default active section for operator
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // quick-and-dirty mock login so the preview works
  useEffect(() => {
    if (!isAuthenticated) {
      mockLogin("operator@example.com", "operator")
    }
  }, [isAuthenticated])

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
    <ClientLayout allowedRoles={["operator"]}>
      <div className="min-h-screen flex flex-col">
        <Header
          onSectionChange={setActiveSection}
          activeSection={activeSection}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton
        />
        <div className="flex flex-1">
          {/* ----------------------------- SIDEBAR ---------------------------- */}
          <aside
            className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-64 hidden lg:block"}`}
          >
            <div className="p-6 h-full flex flex-col">
              {/* operator info */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{user?.name ?? "Operator"}</p>
                  <p className="text-xs text-gray-500">Panel operatora</p>
                </div>
              </div>

              {/* nav */}
              <nav className="space-y-2 flex-1">
                {sidebarItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* -------------------------- MAIN CONTENT -------------------------- */}
          <main className="flex-1 p-6">
            {activeSection === "panel-operatora" && (
              <>
                {/* header row */}
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Zadania do wykonania</h1>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtruj
                  </Button>
                </div>

                {/* simple stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Oczekujące"
                    value={0} // Placeholder value
                    color="bg-blue-100 text-blue-800"
                  />
                  <StatCard
                    title="W trakcie"
                    value={0} // Placeholder value
                    color="bg-yellow-100 text-yellow-800"
                  />
                  <StatCard
                    title="Zakończone"
                    value={0} // Placeholder value
                    color="bg-green-100 text-green-800"
                  />
                </div>

                {/* task list */}
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
                    <tbody>{/* Placeholder for task data */}</tbody>
                  </table>
                </div>
              </>
            )}

            {activeSection !== "panel-operatora" && (
              <div className="text-center text-gray-500 pt-20">
                Funkcjonalność „{activeSection}” jest w trakcie tworzenia.
              </div>
            )}
          </main>
        </div>
        <Footer />
      </div>
    </ClientLayout>
  )
}

/* ---------------------------------------------------------------------- */
/*                               SUB-COMPONENT                            */
/* ---------------------------------------------------------------------- */
function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: number
  color: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
