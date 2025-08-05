"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { casesApi } from "@/frontend/lib/api"
import type { Case } from "@/frontend/lib/api" // Assuming Case type is exported from api.ts
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, PlusCircle, Eye, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/frontend/lib/auth"

export function SprawyManager() {
  const [cases, setCases] = useState<Case[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCase, setCurrentCase] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      setLoading(true)
      const response = await casesApi.getCases()
      setCases(response.data)
    } catch (err) {
      setError("Nie udało się załadować listy spraw.")
      console.error("Failed to fetch cases:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się załadować listy spraw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentCase) return

    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

      if (currentCase.id === 0) {
        // Add new case (mock ID generation)
        const newCase = {
          ...currentCase,
          id: cases.length + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setCases((prev) => [...prev, newCase])
        toast({ title: "Sprawa dodana pomyślnie!" })
      } else {
        // Update existing case
        setCases((prev) =>
          prev.map((c) => (c.id === currentCase.id ? { ...currentCase, updated_at: new Date().toISOString() } : c)),
        )
        toast({ title: "Sprawa zaktualizowana pomyślnie!" })
      }
      setIsModalOpen(false)
      setCurrentCase(null)
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas zapisu sprawy.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas zapisu sprawy.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setCases((prev) => prev.filter((c) => c.id !== id))
      toast({ title: "Sprawa usunięta pomyślnie!" })
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas usuwania sprawy.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas usuwania sprawy.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setCurrentCase({
      id: 0,
      title: "",
      description: "",
      status: "open",
      client_id: "", // This would typically be pre-filled or selected from a list
      created_at: "",
      updated_at: "",
    })
    setIsModalOpen(true)
  }

  const openEditModal = (caseItem: Case) => {
    setCurrentCase(caseItem)
    setIsModalOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open":
        return "secondary"
      case "in_progress":
        return "default"
      case "closed":
        return "success"
      case "on_hold":
        return "warning" // Assuming 'warning' variant exists or can be styled
      default:
        return "outline"
    }
  }

  const handleUpdateStatus = async (caseId: number, newStatus: string) => {
    try {
      await casesApi.updateCaseStatus(caseId, newStatus)
      toast({
        title: "Sukces",
        description: `Status sprawy #${caseId} zmieniono na ${newStatus}.`,
      })
      fetchCases() // Refresh list
    } catch (err) {
      console.error("Failed to update case status:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować statusu sprawy.",
        variant: "destructive",
      })
    }
  }

  const openViewDialog = (caseItem: Case) => {
    setCurrentCase(caseItem)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Zarządzanie Sprawami</CardTitle>
        {user?.role === "CLIENT" && ( // Only clients can create new cases
          <Button onClick={openAddModal} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Utwórz Nową Sprawę
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Sprawy</TableHead>
              <TableHead>Tytuł</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Utworzenia</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Brak spraw.
                </TableCell>
              </TableRow>
            ) : (
              cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(caseItem.status)}>{caseItem.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(caseItem.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openViewDialog(caseItem)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Zobacz</span>
                    </Button>
                    {(user?.role === "OPERATOR" || user?.role === "ADMIN") && (
                      <>
                        {caseItem.status === "open" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateStatus(caseItem.id, "in_progress")}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Rozpocznij</span>
                          </Button>
                        )}
                        {caseItem.status === "in_progress" && (
                          <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(caseItem.id, "closed")}>
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <span className="sr-only">Zakończ</span>
                          </Button>
                        )}
                        {(caseItem.status === "open" || caseItem.status === "in_progress") && (
                          <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(caseItem.id, "on_hold")}>
                            <XCircle className="h-4 w-4 text-orange-500" />
                            <span className="sr-only">Wstrzymaj</span>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => openEditModal(caseItem)}>
                          Edytuj
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleDelete(caseItem.id)}
                        >
                          Usuń
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCase?.id === 0 ? "Dodaj nową sprawę" : "Edytuj sprawę"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEdit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Tytuł
              </Label>
              <Input
                id="title"
                value={currentCase?.title || ""}
                onChange={(e) => setCurrentCase({ ...currentCase!, title: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Opis
              </Label>
              <Textarea
                id="description"
                value={currentCase?.description || ""}
                onChange={(e) => setCurrentCase({ ...currentCase!, description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={currentCase?.status || "open"}
                onValueChange={(value) =>
                  setCurrentCase({ ...currentCase!, status: value as "open" | "in_progress" | "closed" })
                }
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Wybierz status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Otwarta</SelectItem>
                  <SelectItem value="in_progress">W toku</SelectItem>
                  <SelectItem value="closed">Zamknięta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client_id" className="text-right">
                ID Klienta
              </Label>
              <Input
                id="client_id"
                value={currentCase?.client_id || ""}
                onChange={(e) => setCurrentCase({ ...currentCase!, client_id: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Zapisywanie..." : "Zapisz zmiany"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
