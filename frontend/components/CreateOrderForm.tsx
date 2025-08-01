"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "@/frontend/lib/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { UploadCloud, FileText, XCircle } from "lucide-react"

export function CreateOrderForm() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const createOrderMutation = useMutation({
    mutationFn: ordersApi.createOrder,
    onSuccess: async (data) => {
      const orderId = data.data.id
      let allFilesUploaded = true
      for (const file of files) {
        try {
          await ordersApi.uploadDocument(orderId, file)
        } catch (uploadError) {
          console.error(`Failed to upload file ${file.name}:`, uploadError)
          toast({
            title: "Błąd przesyłania pliku",
            description: `Nie udało się przesłać pliku: ${file.name}.`,
            variant: "destructive",
          })
          allFilesUploaded = false
        }
      }

      if (allFilesUploaded) {
        toast({
          title: "Zlecenie utworzone pomyślnie!",
          description: "Twoje zlecenie zostało przyjęte do realizacji.",
        })
        setTitle("")
        setDescription("")
        setFiles([])
        queryClient.invalidateQueries({ queryKey: ["orders"] })
      } else {
        toast({
          title: "Zlecenie utworzone z błędami",
          description: "Niektóre pliki nie zostały przesłane. Spróbuj ponownie lub skontaktuj się z pomocą.",
          variant: "destructive",
        })
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail || "Wystąpił błąd podczas tworzenia zlecenia."
      toast({
        title: "Błąd",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) {
      toast({
        title: "Brak danych",
        description: "Proszę wypełnić wszystkie wymagane pola.",
        variant: "destructive",
      })
      return
    }
    createOrderMutation.mutate({ title, description })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files || [])])
    }
  }

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(e.dataTransfer.files || [])])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="space-y-2">
        <Label htmlFor="title">Tytuł zlecenia</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Np. Analiza umowy najmu"
          required
          disabled={createOrderMutation.isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Opis zlecenia</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Szczegółowy opis sprawy i oczekiwań..."
          rows={5}
          required
          disabled={createOrderMutation.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documents">Dokumenty</Label>
        <div
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
            isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload-input")?.click()}
        >
          <UploadCloud className="h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-600 text-center">
            Przeciągnij i upuść pliki tutaj lub <span className="text-blue-600 font-medium">kliknij, aby wybrać</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">Obsługiwane formaty: PDF, DOC, DOCX, JPG, PNG (max 10MB/plik)</p>
          <input
            id="file-upload-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={createOrderMutation.isPending}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Wybrane pliki:</p>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-800">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(file.name)}
                  disabled={createOrderMutation.isPending}
                >
                  <XCircle className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={createOrderMutation.isPending}>
        {createOrderMutation.isPending ? "Tworzenie zlecenia..." : "Złóż zlecenie"}
      </Button>
    </form>
  )
}
