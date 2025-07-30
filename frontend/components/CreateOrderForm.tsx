"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"

export default function CreateOrderForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const queryClient = useQueryClient()

  const createOrderMutation = useMutation({
    mutationFn: (data: { title: string; description?: string }) => apiClient.createOrder(data),
    onSuccess: async (order) => {
      // Upload files if any
      if (files.length > 0) {
        try {
          await Promise.all(files.map((file) => apiClient.uploadDocument(order.id, file)))
        } catch (error) {
          toast({
            title: "Ostrzeżenie",
            description: "Zlecenie zostało utworzone, ale nie udało się przesłać wszystkich plików.",
            variant: "destructive",
          })
        }
      }

      queryClient.invalidateQueries({ queryKey: ["orders"] })
      toast({
        title: "Zlecenie utworzone!",
        description: "Twoje zlecenie zostało pomyślnie utworzone.",
      })

      // Reset form
      setTitle("")
      setDescription("")
      setFiles([])
    },
    onError: (error: any) => {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się utworzyć zlecenia",
        variant: "destructive",
      })
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createOrderMutation.mutate({ title, description: description || undefined })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowe Zlecenie</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tytuł zlecenia *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Opisz krótko czego dotyczy analiza"
              required
              disabled={createOrderMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis szczegółowy</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Podaj więcej szczegółów dotyczących analizy..."
              rows={4}
              disabled={createOrderMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="files">Dokumenty do analizy</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                disabled={createOrderMutation.isPending}
              />
              <label htmlFor="files" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Kliknij aby wybrać pliki lub przeciągnij je tutaj</span>
                <span className="text-xs text-gray-500 mt-1">Obsługiwane formaty: PDF, DOC, DOCX, TXT, JPG, PNG</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Wybrane pliki:</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={createOrderMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={createOrderMutation.isPending || !title.trim()}>
            {createOrderMutation.isPending ? "Tworzenie zlecenia..." : "Utwórz zlecenie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
