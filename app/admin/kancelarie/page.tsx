"use client"

import { TabsContent } from "@/components/ui/tabs"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { LawFirm, Specialization } from "@/lib/types"
import { createLawFirm, fetchLawFirms, updateLawFirm, deleteLawFirm, fetchSpecializations } from "@/frontend/lib/api"

export default function AdminKancelariePage() {
  const queryClient = useQueryClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentLawFirm, setCurrentLawFirm] = useState<LawFirm | null>(null)
  const [newLawFirm, setNewLawFirm] = useState<Partial<LawFirm>>({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    is_active: true,
    specialization_ids: [],
  })

  const {
    data: lawFirms,
    isLoading,
    isError,
  } = useQuery<LawFirm[]>({
    queryKey: ["lawFirms"],
    queryFn: fetchLawFirms,
  })

  const { data: specializations, isLoading: isLoadingSpecializations } = useQuery<Specialization[]>({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
  })

  const addMutation = useMutation({
    mutationFn: createLawFirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawFirms"] })
      toast({ title: "Sukces", description: "Kancelaria dodana pomyślnie." })
      setIsAddModalOpen(false)
      setNewLawFirm({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        is_active: true,
        specialization_ids: [],
      })
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się dodać kancelarii: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateLawFirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawFirms"] })
      toast({ title: "Sukces", description: "Kancelaria zaktualizowana pomyślnie." })
      setIsEditModalOpen(false)
      setCurrentLawFirm(null)
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się zaktualizować kancelarii: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLawFirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawFirms"] })
      toast({ title: "Sukces", description: "Kancelaria usunięta pomyślnie." })
      setIsDeleteModalOpen(false)
      setCurrentLawFirm(null)
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć kancelarii: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleAddLawFirm = () => {
    addMutation.mutate(newLawFirm as LawFirm)
  }

  const handleEditLawFirm = () => {
    if (currentLawFirm) {
      updateMutation.mutate(currentLawFirm)
    }
  }

  const handleDeleteLawFirm = () => {
    if (currentLawFirm?.id) {
      deleteMutation.mutate(currentLawFirm.id)
    }
  }

  const openEditModal = (lawFirm: LawFirm) => {
    setCurrentLawFirm(lawFirm)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (lawFirm: LawFirm) => {
    setCurrentLawFirm(lawFirm)
    setIsDeleteModalOpen(true)
  }

  if (isLoading) return <p>Ładowanie kancelarii...</p>
  if (isError) return <p>Błąd podczas ładowania kancelarii.</p>

  return (
    <div className="grid gap-6 p-6 md:p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Zarządzanie Kancelariami</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj Kancelarię
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Wszystkie</TabsTrigger>
            <TabsTrigger value="active">Aktywne</TabsTrigger>
            <TabsTrigger value="inactive">Nieaktywne</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Kancelarie Prawne</CardTitle>
              <CardDescription>Zarządzaj swoimi kancelariami prawnymi.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Aktywna</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lawFirms?.map((lawFirm) => (
                    <TableRow key={lawFirm.id}>
                      <TableCell className="font-medium">{lawFirm.name}</TableCell>
                      <TableCell>{lawFirm.email}</TableCell>
                      <TableCell>{lawFirm.phone}</TableCell>
                      <TableCell>{lawFirm.is_active ? "Tak" : "Nie"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditModal(lawFirm)}>Edytuj</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteModal(lawFirm)}>Usuń</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Aktywne Kancelarie Prawne</CardTitle>
              <CardDescription>Lista aktywnych kancelarii prawnych.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Aktywna</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lawFirms
                    ?.filter((lf) => lf.is_active)
                    .map((lawFirm) => (
                      <TableRow key={lawFirm.id}>
                        <TableCell className="font-medium">{lawFirm.name}</TableCell>
                        <TableCell>{lawFirm.email}</TableCell>
                        <TableCell>{lawFirm.phone}</TableCell>
                        <TableCell>{lawFirm.is_active ? "Tak" : "Nie"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openEditModal(lawFirm)}>Edytuj</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDeleteModal(lawFirm)}>Usuń</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Nieaktywne Kancelarie Prawne</CardTitle>
              <CardDescription>Lista nieaktywnych kancelarii prawnych.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Aktywna</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lawFirms
                    ?.filter((lf) => !lf.is_active)
                    .map((lawFirm) => (
                      <TableRow key={lawFirm.id}>
                        <TableCell className="font-medium">{lawFirm.name}</TableCell>
                        <TableCell>{lawFirm.email}</TableCell>
                        <TableCell>{lawFirm.phone}</TableCell>
                        <TableCell>{lawFirm.is_active ? "Tak" : "Nie"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openEditModal(lawFirm)}>Edytuj</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDeleteModal(lawFirm)}>Usuń</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Law Firm Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Dodaj nową kancelarię</DialogTitle>
            <DialogDescription>Wypełnij formularz, aby dodać nową kancelarię prawną.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nazwa
              </Label>
              <Input
                id="name"
                value={newLawFirm.name}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newLawFirm.email}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefon
              </Label>
              <Input
                id="phone"
                value={newLawFirm.phone}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adres
              </Label>
              <Input
                id="address"
                value={newLawFirm.address}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, address: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Strona WWW
              </Label>
              <Input
                id="website"
                value={newLawFirm.website}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, website: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Opis
              </Label>
              <Textarea
                id="description"
                value={newLawFirm.description}
                onChange={(e) => setNewLawFirm({ ...newLawFirm, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specializations" className="text-right">
                Specjalizacje
              </Label>
              <Select
                onValueChange={(value) => {
                  const currentSpecializations = newLawFirm.specialization_ids || []
                  if (currentSpecializations.includes(value)) {
                    setNewLawFirm({
                      ...newLawFirm,
                      specialization_ids: currentSpecializations.filter((id) => id !== value),
                    })
                  } else {
                    setNewLawFirm({
                      ...newLawFirm,
                      specialization_ids: [...currentSpecializations, value],
                    })
                  }
                }}
                value={newLawFirm.specialization_ids?.[0] || ""} // Display first selected for simplicity, or handle multi-select UI
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz specjalizacje" />
                </SelectTrigger>
                <SelectContent>
                  {specializations?.map((spec) => (
                    <SelectItem key={spec.id} value={spec.id}>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_active" className="text-right">
                Aktywna
              </Label>
              <Checkbox
                id="is_active"
                checked={newLawFirm.is_active}
                onCheckedChange={(checked) => setNewLawFirm({ ...newLawFirm, is_active: Boolean(checked) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleAddLawFirm} disabled={addMutation.isPending}>
              {addMutation.isPending ? "Dodawanie..." : "Dodaj"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Law Firm Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edytuj kancelarię</DialogTitle>
            <DialogDescription>Zaktualizuj dane kancelarii prawnej.</DialogDescription>
          </DialogHeader>
          {currentLawFirm && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nazwa
                </Label>
                <Input
                  id="edit-name"
                  value={currentLawFirm.name}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentLawFirm.email}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Telefon
                </Label>
                <Input
                  id="edit-phone"
                  value={currentLawFirm.phone}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Adres
                </Label>
                <Input
                  id="edit-address"
                  value={currentLawFirm.address}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-website" className="text-right">
                  Strona WWW
                </Label>
                <Input
                  id="edit-website"
                  value={currentLawFirm.website}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, website: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Opis
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentLawFirm.description}
                  onChange={(e) => setCurrentLawFirm({ ...currentLawFirm, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specializations" className="text-right">
                  Specjalizacje
                </Label>
                <Select
                  onValueChange={(value) => {
                    const currentSpecializations = currentLawFirm.specialization_ids || []
                    if (currentSpecializations.includes(value)) {
                      setCurrentLawFirm({
                        ...currentLawFirm,
                        specialization_ids: currentSpecializations.filter((id) => id !== value),
                      })
                    } else {
                      setCurrentLawFirm({
                        ...currentLawFirm,
                        specialization_ids: [...currentSpecializations, value],
                      })
                    }
                  }}
                  value={currentLawFirm.specialization_ids?.[0] || ""}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Wybierz specjalizacje" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations?.map((spec) => (
                      <SelectItem key={spec.id} value={spec.id}>
                        {spec.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-is_active" className="text-right">
                  Aktywna
                </Label>
                <Checkbox
                  id="edit-is_active"
                  checked={currentLawFirm.is_active}
                  onCheckedChange={(checked) => setCurrentLawFirm({ ...currentLawFirm, is_active: Boolean(checked) })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleEditLawFirm} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Aktualizowanie..." : "Zapisz zmiany"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Law Firm Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potwierdź usunięcie</DialogTitle>
            <DialogDescription>
              Czy na pewno chcesz usunąć kancelarię "{currentLawFirm?.name}"? Tej operacji nie można cofnąć.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Anuluj
            </Button>
            <Button variant="destructive" onClick={handleDeleteLawFirm} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Usuwanie..." : "Usuń"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
