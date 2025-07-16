"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { FileText, Image } from "lucide-react"

interface NewCaseFormProps {
  onSuccess: () => void
}

export function NewCaseForm({ onSuccess }: NewCaseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientNotes: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const documentTypes = [
    { name: "Nakaz zapłaty", description: "Sądowy nakaz zapłaty" },
    { name: "Wezwanie komornika", description: "Wezwanie do zapłaty od komornika" },
    { name: "Pozew sądowy", description: "Pozew do sądu cywilnego" },
    { name: "Upomnienie", description: "Upomnienie przedsądowe" },
    { name: "Inne", description: "Inny dokument prawny" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter((file) => {
      const isValidType = file.type.includes("pdf") || file.type.includes("image")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      
      if (!isValidType) {
        toast({
          title: "Nieprawidłowy format pliku",
          description: `Plik ${file.name} ma nieprawidłowy format. Akceptujemy tylko PDF, JPG, PNG.`,
          variant: "destructive",
        })
        return false
      }
      
      if (!isValidSize) {
        toast({
          title: "Plik za duży",
          description: `Plik ${file.name} jest za duży. Maksymalny rozmiar to 10MB.`,
          variant: "destructive",
        })
        return false
      }
      
      return true
    })

    setFiles([...files, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <Image className="h-5 w-5 text-blue-500" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: "Błąd walidacji",
        description: "Tytuł sprawy jest wymagany.",
        variant: "destructive",
      })
      return
    }

    if (files.length === 0) {
      toast({
        title: "Błąd walidacji",
        description: "Musisz przesłać przynajmniej jeden dokument.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("clientNotes", formData.clientNotes)
      
      files.forEach((file) => {
        formDataToSend.append("files", file)
      })

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/cases", {
        method: "POST",
        body: formDataToSend,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error("Failed to create case")
      }

      const result = await response.json()

      toast({
        title: "Sprawa utworzona pomyślnie!",
        description: `Sprawa "${formData.title}" została dodana. Rozpoczynamy analizę dokumentów.`,
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        clientNotes: "",
      })
      setFiles([])
      setUploadProgress(0)
      
      // Call success callback
      onSuccess()
    } catch (error) {
      console.error("Error creating case:", error)
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć sprawy. Spróbuj ponownie.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Case Type Selection */}
      <div className="space-y-3">
        <Label>Rodzaj dokumentu *</Label>\
