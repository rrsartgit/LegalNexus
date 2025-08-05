"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCase } from "@/frontend/lib/api"
import { toast } from "@/components/ui/use-toast"
import type { CaseCreate } from "@/lib/types"

export function NewCaseForm() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<Partial<CaseCreate>>({
    title: "",
    description: "",
    status: "Nowa",
    priority: "Normalny",
    client_id: 1, // Placeholder, should be dynamic based on logged-in user
  })

  const mutation = useMutation({
    mutationFn: createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] })
      toast({
        title: "Sukces",
        description: "Sprawa została pomyślnie utworzona.",
      })
      setFormData({
        title: "",
        description: "",
        status: "Nowa",
        priority: "Normalny",
        client_id: 1,
      })
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się utworzyć sprawy: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData as CaseCreate)
  }

  return (
    <div className="max-w-2xl mx-auto bg-card text-card-foreground p-8 rounded-lg shadow-lg mt-12">
      <h3 className="text-2xl font-bold mb-6 text-center">Utwórz nową sprawę</h3>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Tytuł Sprawy</Label>
          <Input
            id="title"
            placeholder="Np. Sprawa o odszkodowanie"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Opis Sprawy</Label>
          <Textarea
            id="description"
            placeholder="Szczegółowy opis sprawy..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Wybierz status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nowa">Nowa</SelectItem>
                <SelectItem value="W toku">W toku</SelectItem>
                <SelectItem value="Zakończona">Zakończona</SelectItem>
                <SelectItem value="Anulowana">Anulowana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priorytet</Label>
            <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Wybierz priorytet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Niski">Niski</SelectItem>
                <SelectItem value="Normalny">Normalny</SelectItem>
                <SelectItem value="Wysoki">Wysoki</SelectItem>
                <SelectItem value="Pilny">Pilny</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Tworzenie..." : "Utwórz Sprawę"}
        </Button>
      </form>
    </div>
  )
}
