"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth, mockLogin } from "@/lib/auth"
import { FileText, Filter, User, Settings, BarChart3, Users, MessageSquare } from "lucide-react"

export default function PanelOperatoraPage() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("zadania")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock login as operator if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      mockLogin("operator@example.com", "operator")
    }
  }, [isAuthenticated])

  const mockTasks = [
    {
      id: "1",
      caseId: "1",
      clientName: "Jan Kowalski",
      type: "analysis",
      title: "Analiza nakazu zapłaty",
      priority: "high",
      deadline: new Date("2024-01-20"),
      status: "pending",
      documents: ["nakaz_zaplaty.pdf"],
      clientNotes: "Nie zgadzam się z nakazem, uważam że jest bezpodstawny"
    },
    {
      id: "2", 
      caseId: "2",
      clientName: "Anna Nowak",
      type: "document",
      title: "Sprzeciw od nakazu zapłaty",
      priority: "medium",
      deadline: new Date("2024-01-22"),
      status: "in_progress",
      documents: ["analiza_completed.pdf"],
      clientNotes: "Proszę o szybkie przygotowanie sprzeciwu"
    },
    {
      id: "3",
      caseId: "3", 
      clientName: "Piotr Wiśniewski",
      type: "analysis",
      title: "Analiza wezwania komornika",
      priority: "low",
      deadline: new Date("2024-01-25"),
      status: "pending",
      documents: ["wezwanie_komornik.jpg"],
      clientNotes: ""
    }
  ]

  const sidebarItems = [
    { id: "zadania", label: "Zadania do wykonania", icon: FileText },
    { id: "statystyki", label: "Statystyki", icon: BarChart3 },
    { id: "klienci", label: "Klienci", icon: Users },
    { id: "szablony", label: "Szablony odpowiedzi", icon: MessageSquare },
    { id: "ustawienia", label: "Ustawienia", icon: Settings },
  ]

  const quickResponses = [
    {
      id: "unclear_scan",
      title: "Niewyraźne skany",
      message: "Przesłane dokumenty są niewyraźne. Proszę o przesłanie dokumentów w lepszej jakości."
    },
    {
      id: "missing_info",
      title: "Brak informacji",
      message: "Do przygotowania analizy potrzebujemy dodatkowych informacji. Proszę o kontakt."
    },
    {
      id: "analysis_ready",
      title: "Analiza gotowa",
      message: "Analiza Państwa dokumentów została zakończona i jest dostępna w panelu klienta."
    }
  ]

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { label: "Wysoki", color: "bg-red-100 text-red-800" },
      medium: { label: "Średni", color: "bg-yellow-100 text-yellow-800" },
      low: { label: "Niski", color: "bg-green-100 text-green-800" }
    }
    return config[priority as keyof typeof config] || config.medium
  }

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Oczekuje", color: "bg-blue-100 text-blue-800" },
      in_progress: { label: "W trakcie", color: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Zakończone", color: "bg-green-100 text-green-800" }
    }
    return config[status as keyof typeof config] || config.pending
  }

  if (!isAuthenticated) {
    return <div>Ładowanie...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-64 hidden lg:block'
        }`}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-gray-500">Panel operatora</div>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "zadania" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Zadania do wykonania</h1>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtruj
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        \
