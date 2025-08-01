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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/frontend/lib/auth"

export function SprawyManager() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

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

  useEffect(() => {
    fetchCases()
  }, [])

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

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      client_id: user?.id || 0, // Assuming client_id is current user's ID
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    }

    if (!data.client_id) {
      toast({
        title: "Błąd",
        description: "Brak ID klienta. Upewnij się, że jesteś zalogowany.",
        variant: "destructive",
      })
      return
    }

    try {
      await casesApi.createCase(data)
      toast({
        title: "Sukces",
        description: "Nowa sprawa została utworzona.",
      })
      setIsCreateDialogOpen(false)
      fetchCases() // Refresh list
    } catch (err) {
      console.error("Failed to create case:", err)
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć sprawy.",
        variant: "destructive",
      })
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
    setSelectedCase(caseItem)
    setIsViewDialogOpen(true)
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
          <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
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
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Szczegóły Sprawy #{selectedCase?.id}</DialogTitle>
              <DialogDescription>Informacje o wybranej sprawie.</DialogDescription>
            </DialogHeader>
            {selectedCase && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Tytuł:</Label>
                  <span className="col-span-3">{selectedCase.title}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status:</Label>
                  <span className="col-span-3">
                    <Badge variant={getStatusBadgeVariant(selectedCase.status)}>{selectedCase.status}</Badge>
                  </span>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Opis:</Label>
                  <Textarea readOnly value={selectedCase.description} className="col-span-3 min-h-[120px]" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Utworzono:</Label>
                  <span className="col-span-3">{new Date(selectedCase.created_at).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Ostatnia aktualizacja:</Label>
                  <span className="col-span-3">{new Date(selectedCase.updated_at).toLocaleString()}</span>
                </div>
                {/* Add more details like associated documents, client info etc. */}
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Utwórz Nową Sprawę</DialogTitle>
              <DialogDescription>Wypełnij formularz, aby zgłosić nową sprawę prawną.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCase} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Tytuł Sprawy</Label>
                <Input id="title" name="title" placeholder="Krótki tytuł sprawy" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Opis Sprawy</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Szczegółowy opis sprawy"
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit">Utwórz Sprawę</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
