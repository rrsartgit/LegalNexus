"use client"

import { useState } from "react"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/types"
import { fetchUsers, createUser, updateUser, deleteUser, updateUserStatus } from "@/frontend/lib/api"

export default function UsersPage() {
  const queryClient = useQueryClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Partial<User>>({
    email: "",
    password: "",
    role: "client",
    is_active: true,
  })
  const [newStatus, setNewStatus] = useState<boolean>(true)

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const addMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Sukces", description: "Użytkownik dodany pomyślnie." })
      setIsAddModalOpen(false)
      setNewUser({ email: "", password: "", role: "client", is_active: true })
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się dodać użytkownika: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Sukces", description: "Użytkownik zaktualizowany pomyślnie." })
      setIsEditModalOpen(false)
      setCurrentUser(null)
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się zaktualizować użytkownika: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Sukces", description: "Użytkownik usunięty pomyślnie." })
      setIsDeleteModalOpen(false)
      setCurrentUser(null)
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć użytkownika: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => updateUserStatus(id, is_active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast({ title: "Sukces", description: "Status użytkownika zaktualizowany pomyślnie." })
      setIsStatusModalOpen(false)
      setCurrentUser(null)
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się zaktualizować statusu: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleAddUser = () => {
    addMutation.mutate(newUser as User)
  }

  const handleEditUser = () => {
    if (currentUser) {
      updateMutation.mutate(currentUser)
    }
  }

  const handleDeleteUser = () => {
    if (currentUser?.id) {
      deleteMutation.mutate(currentUser.id)
    }
  }

  const handleUpdateStatus = () => {
    if (currentUser?.id) {
      updateStatusMutation.mutate({ id: currentUser.id, is_active: newStatus })
    }
  }

  const openEditModal = (user: User) => {
    setCurrentUser(user)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setCurrentUser(user)
    setIsDeleteModalOpen(true)
  }

  const openStatusModal = (user: User) => {
    setCurrentUser(user)
    setNewStatus(user.is_active)
    setIsStatusModalOpen(true)
  }

  if (isLoading) return <p>Ładowanie użytkowników...</p>
  if (isError) return <p>Błąd podczas ładowania użytkowników.</p>

  return (
    <div className="grid gap-6 p-6 md:p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Zarządzanie Użytkownikami</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj Użytkownika
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Wszyscy</TabsTrigger>
            <TabsTrigger value="active">Aktywni</TabsTrigger>
            <TabsTrigger value="inactive">Nieaktywni</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Użytkownicy Systemu</CardTitle>
              <CardDescription>Zarządzaj użytkownikami systemu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rola</TableHead>
                    <TableHead>Aktywny</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.is_active ? "Tak" : "Nie"}</TableCell>
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
                            <DropdownMenuItem onClick={() => openEditModal(user)}>Edytuj</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openStatusModal(user)}>Zmień status</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteModal(user)}>Usuń</DropdownMenuItem>
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
              <CardTitle>Aktywni Użytkownicy</CardTitle>
              <CardDescription>Lista aktywnych użytkowników systemu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rola</TableHead>
                    <TableHead>Aktywny</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    ?.filter((u) => u.is_active)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.is_active ? "Tak" : "Nie"}</TableCell>
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
                              <DropdownMenuItem onClick={() => openEditModal(user)}>Edytuj</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openStatusModal(user)}>Zmień status</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDeleteModal(user)}>Usuń</DropdownMenuItem>
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
              <CardTitle>Nieaktywni Użytkownicy</CardTitle>
              <CardDescription>Lista nieaktywnych użytkowników systemu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rola</TableHead>
                    <TableHead>Aktywny</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    ?.filter((u) => !u.is_active)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.is_active ? "Tak" : "Nie"}</TableCell>
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
                              <DropdownMenuItem onClick={() => openEditModal(user)}>Edytuj</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openStatusModal(user)}>Zmień status</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDeleteModal(user)}>Usuń</DropdownMenuItem>
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

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
            <DialogDescription>Wypełnij formularz, aby dodać nowego użytkownika.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Hasło
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rola
              </Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value as "admin" | "operator" | "client" })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Wybierz rolę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="client">Klient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleAddUser} disabled={addMutation.isPending}>
              {addMutation.isPending ? "Dodawanie..." : "Dodaj"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edytuj użytkownika</DialogTitle>
            <DialogDescription>Zaktualizuj dane użytkownika.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Rola
                </Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) =>
                    setCurrentUser({ ...currentUser, role: value as "admin" | "operator" | "client" })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Wybierz rolę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="client">Klient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleEditUser} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Aktualizowanie..." : "Zapisz zmiany"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potwierdź usunięcie</DialogTitle>
            <DialogDescription>
              Czy na pewno chcesz usunąć użytkownika "{currentUser?.email}"? Tej operacji nie można cofnąć.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Anuluj
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Usuwanie..." : "Usuń"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zmień status użytkownika</DialogTitle>
            <DialogDescription>Zmień status aktywności użytkownika.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Aktywny
                </Label>
                <Select value={newStatus ? "true" : "false"} onValueChange={(value) => setNewStatus(value === "true")}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Tak</SelectItem>
                    <SelectItem value="false">Nie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleUpdateStatus} disabled={updateStatusMutation.isPending}>
              {updateStatusMutation.isPending ? "Aktualizowanie..." : "Zapisz zmiany"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
