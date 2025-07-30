"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { sprawaApi, kancelariaApi, klientApi, type Sprawa, type SprawaCreate } from "@/lib/api"
import { useForm, Controller } from "react-hook-form"

export default function SprawyManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSprawa, setEditingSprawa] = useState<Sprawa | null>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SprawaCreate>()

  const { data: sprawy, isLoading } = useQuery({
    queryKey: ["sprawy"],
    queryFn: () => sprawaApi.getAll().then((res) => res.data),
  })

  const { data: kancelarie } = useQuery({
    queryKey: ["kancelarie"],
    queryFn: () => kancelariaApi.getAll().then((res) => res.data),
  })

  const { data: klienci } = useQuery({
    queryKey: ["klienci"],
    queryFn: () => klientApi.getAll().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: sprawaApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sprawy"] })
      setIsDialogOpen(false)
      reset()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SprawaCreate> }) => sprawaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sprawy"] })
      setIsDialogOpen(false)
      setEditingSprawa(null)
      reset()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: sprawaApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sprawy"] })
    },
  })

  const onSubmit = (data: SprawaCreate) => {
    if (editingSprawa) {
      updateMutation.mutate({ id: editingSprawa.id, data })
    } else {
      createMutation.mutate({ data })
    }
  }

  const handleEdit = (sprawa: Sprawa) => {
    setEditingSprawa(sprawa)
    reset(sprawa)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć tę sprawę?")) {
      deleteMutation.mutate(id)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "aktywna":
        return "default"
      case "zawieszona":
        return "secondary"
      case "zakonczona":
        return "outline"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Ładowanie...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sprawy</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingSprawa(null)
                reset()
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Sprawę
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSprawa ? "Edytuj Sprawę" : "Dodaj Nową Sprawę"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numer_sprawy">Numer Sprawy *</Label>
                  <Input id="numer_sprawy" {...register("numer_sprawy", { required: "Numer sprawy jest wymagany" })} />
                  {errors.numer_sprawy && <p className="text-sm text-red-600">{errors.numer_sprawy.message}</p>}
                </div>
                <div>
                  <Label htmlFor="kategoria">Kategoria</Label>
                  <Controller
                    name="kategoria"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cywilna">Cywilna</SelectItem>
                          <SelectItem value="karna">Karna</SelectItem>
                          <SelectItem value="administracyjna">Administracyjna</SelectItem>
                          <SelectItem value="gospodarcza">Gospodarcza</SelectItem>
                          <SelectItem value="rodzinna">Rodzinna</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tytul">Tytuł *</Label>
                <Input id="tytul" {...register("tytul", { required: "Tytuł jest wymagany" })} />
                {errors.tytul && <p className="text-sm text-red-600">{errors.tytul.message}</p>}
              </div>

              <div>
                <Label htmlFor="opis">Opis</Label>
                <Textarea id="opis" {...register("opis")} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kancelaria_id">Kancelaria *</Label>
                  <Controller
                    name="kancelaria_id"
                    control={control}
                    rules={{ required: "Kancelaria jest wymagana" }}
                    render={({ field }) => (
                      <Select onValueChange={(value) => field.onChange(Number.parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz kancelarię" />
                        </SelectTrigger>
                        <SelectContent>
                          {kancelarie?.map((kancelaria) => (
                            <SelectItem key={kancelaria.id} value={kancelaria.id.toString()}>
                              {kancelaria.nazwa}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.kancelaria_id && <p className="text-sm text-red-600">{errors.kancelaria_id.message}</p>}
                </div>
                <div>
                  <Label htmlFor="klient_id">Klient *</Label>
                  <Controller
                    name="klient_id"
                    control={control}
                    rules={{ required: "Klient jest wymagany" }}
                    render={({ field }) => (
                      <Select onValueChange={(value) => field.onChange(Number.parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz klienta" />
                        </SelectTrigger>
                        <SelectContent>
                          {klienci?.map((klient) => (
                            <SelectItem key={klient.id} value={klient.id.toString()}>
                              {klient.imie} {klient.nazwisko}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.klient_id && <p className="text-sm text-red-600">{errors.klient_id.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue="aktywna"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aktywna">Aktywna</SelectItem>
                          <SelectItem value="zawieszona">Zawieszona</SelectItem>
                          <SelectItem value="zakonczona">Zakończona</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="wartosc_sprawy">Wartość Sprawy (PLN)</Label>
                  <Input id="wartosc_sprawy" type="number" {...register("wartosc_sprawy", { valueAsNumber: true })} />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingSprawa ? "Zaktualizuj" : "Dodaj"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Spraw</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numer Sprawy</TableHead>
                <TableHead>Tytuł</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wartość</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sprawy?.map((sprawa) => (
                <TableRow key={sprawa.id}>
                  <TableCell className="font-medium">{sprawa.numer_sprawy}</TableCell>
                  <TableCell>{sprawa.tytul}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{sprawa.kategoria || "-"}</Badge>
                  </TableCell>
                  <TableCell>
                    {klienci?.find((k) => k.id === sprawa.klient_id)?.imie}{" "}
                    {klienci?.find((k) => k.id === sprawa.klient_id)?.nazwisko}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(sprawa.status)}>{sprawa.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {sprawa.wartosc_sprawy ? `${(sprawa.wartosc_sprawy / 100).toFixed(2)} PLN` : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(sprawa)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(sprawa.id)}
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
