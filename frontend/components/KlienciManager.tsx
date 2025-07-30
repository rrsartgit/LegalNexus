"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { klientApi, kancelariaApi, type Klient, type KlientCreate } from "@/lib/api"
import { useForm, Controller } from "react-hook-form"

export default function KlienciManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingKlient, setEditingKlient] = useState<Klient | null>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<KlientCreate>()

  const { data: klienci, isLoading } = useQuery({
    queryKey: ["klienci"],
    queryFn: () => klientApi.getAll().then((res) => res.data),
  })

  const { data: kancelarie } = useQuery({
    queryKey: ["kancelarie"],
    queryFn: () => kancelariaApi.getAll().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: klientApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["klienci"] })
      setIsDialogOpen(false)
      reset()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<KlientCreate> }) => klientApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["klienci"] })
      setIsDialogOpen(false)
      setEditingKlient(null)
      reset()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: klientApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["klienci"] })
    },
  })

  const onSubmit = (data: KlientCreate) => {
    if (editingKlient) {
      updateMutation.mutate({ id: editingKlient.id, data })
    } else {
      createMutation.mutate({ data })
    }
  }

  const handleEdit = (klient: Klient) => {
    setEditingKlient(klient)
    reset(klient)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć tego klienta?")) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Ładowanie...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Klienci</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingKlient(null)
                reset()
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Klienta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingKlient ? "Edytuj Klienta" : "Dodaj Nowego Klienta"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imie">Imię *</Label>
                  <Input id="imie" {...register("imie", { required: "Imię jest wymagane" })} />
                  {errors.imie && <p className="text-sm text-red-600">{errors.imie.message}</p>}
                </div>
                <div>
                  <Label htmlFor="nazwisko">Nazwisko *</Label>
                  <Input id="nazwisko" {...register("nazwisko", { required: "Nazwisko jest wymagane" })} />
                  {errors.nazwisko && <p className="text-sm text-red-600">{errors.nazwisko.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>
                <div>
                  <Label htmlFor="telefon">Telefon</Label>
                  <Input id="telefon" {...register("telefon")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pesel">PESEL</Label>
                  <Input id="pesel" {...register("pesel")} />
                </div>
                <div>
                  <Label htmlFor="nip">NIP</Label>
                  <Input id="nip" {...register("nip")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="typ_klienta">Typ Klienta</Label>
                  <Controller
                    name="typ_klienta"
                    control={control}
                    defaultValue="osoba_fizyczna"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz typ klienta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="osoba_fizyczna">Osoba fizyczna</SelectItem>
                          <SelectItem value="firma">Firma</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
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
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingKlient ? "Zaktualizuj" : "Dodaj"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Klientów</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imię i Nazwisko</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Kancelaria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {klienci?.map((klient) => (
                <TableRow key={klient.id}>
                  <TableCell className="font-medium">
                    {klient.imie} {klient.nazwisko}
                  </TableCell>
                  <TableCell>{klient.email || "-"}</TableCell>
                  <TableCell>{klient.telefon || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {klient.typ_klienta === "osoba_fizyczna" ? "Osoba fizyczna" : "Firma"}
                    </Badge>
                  </TableCell>
                  <TableCell>{kancelarie?.find((k) => k.id === klient.kancelaria_id)?.nazwa || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={klient.aktywny ? "default" : "secondary"}>
                      {klient.aktywny ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(klient)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(klient.id)}
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
