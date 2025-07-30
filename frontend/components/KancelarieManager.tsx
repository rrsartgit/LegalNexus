"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { kancelariaApi, type Kancelaria, type KancelariaCreate } from "@/lib/api"
import { useForm } from "react-hook-form"

export default function KancelarieManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingKancelaria, setEditingKancelaria] = useState<Kancelaria | null>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KancelariaCreate>()

  const { data: kancelarie, isLoading } = useQuery({
    queryKey: ["kancelarie"],
    queryFn: () => kancelariaApi.getAll().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: kancelariaApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kancelarie"] })
      setIsDialogOpen(false)
      reset()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<KancelariaCreate> }) => kancelariaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kancelarie"] })
      setIsDialogOpen(false)
      setEditingKancelaria(null)
      reset()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: kancelariaApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kancelarie"] })
    },
  })

  const onSubmit = (data: KancelariaCreate) => {
    if (editingKancelaria) {
      updateMutation.mutate({ id: editingKancelaria.id, data })
    } else {
      createMutation.mutate({ data })
    }
  }

  const handleEdit = (kancelaria: Kancelaria) => {
    setEditingKancelaria(kancelaria)
    reset(kancelaria)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć tę kancelarię?")) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Ładowanie...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kancelarie Prawne</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingKancelaria(null)
                reset()
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Kancelarię
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingKancelaria ? "Edytuj Kancelarię" : "Dodaj Nową Kancelarię"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nazwa">Nazwa *</Label>
                  <Input id="nazwa" {...register("nazwa", { required: "Nazwa jest wymagana" })} />
                  {errors.nazwa && <p className="text-sm text-red-600">{errors.nazwa.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefon">Telefon</Label>
                  <Input id="telefon" {...register("telefon")} />
                </div>
                <div>
                  <Label htmlFor="nip">NIP</Label>
                  <Input id="nip" {...register("nip")} />
                </div>
              </div>

              <div>
                <Label htmlFor="adres">Adres</Label>
                <Textarea id="adres" {...register("adres")} />
              </div>

              <div>
                <Label htmlFor="opis">Opis</Label>
                <Textarea id="opis" {...register("opis")} />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingKancelaria ? "Zaktualizuj" : "Dodaj"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Kancelarii</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kancelarie?.map((kancelaria) => (
                <TableRow key={kancelaria.id}>
                  <TableCell className="font-medium">{kancelaria.nazwa}</TableCell>
                  <TableCell>{kancelaria.email || "-"}</TableCell>
                  <TableCell>{kancelaria.telefon || "-"}</TableCell>
                  <TableCell>{kancelaria.nip || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={kancelaria.aktywna ? "default" : "secondary"}>
                      {kancelaria.aktywna ? "Aktywna" : "Nieaktywna"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(kancelaria)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(kancelaria.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
