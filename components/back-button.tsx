"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export function BackButton({ onClick, label = "Powrót" }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
