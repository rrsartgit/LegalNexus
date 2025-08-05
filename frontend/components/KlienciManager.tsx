"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types"

export function KlienciManager() {
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      // Mock API call
      const mockUsers: User[] = [
        { id: "user1", email: "client1@example.com", role: "client" },
        { id: "user2", email: "admin1@example.com", role: "admin" },
        { id: "user3", email: "operator1@example.com", role: "operator" },
      ]
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setUsers(mockUsers)
    } catch (err: any) {
      setError(err.message || "Nie udało się załadować użytkowników.")
      toast({
        title: "Błąd",
        description: err.message || "Nie udało się załadować użytkowników.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

      if (currentUser.id === "") {
        // Add new user (mock ID generation)
        const newUser = { ...currentUser, id: `user${users.length + 1}` }
        setUsers((prev) => [...prev, newUser])
        toast({ title: "Użytkownik dodany pomyślnie!" })
      } else {
        // Update existing user
        setUsers((prev) => prev.map((user) => (user.id === currentUser.id ? currentUser : user)))
        toast({ title: "Użytkownik zaktualizowany pomyślnie!" })
      }
      setIsModalOpen(false)
      setCurrentUser(null)
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas zapisu użytkownika.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas zapisu użytkownika.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setUsers((prev) => prev.filter((user) => user.id !== id))
      toast({ title: "Użytkownik usunięty pomyślnie!" })
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas usuwania użytkownika.")
      toast({
        title: "Błąd",
        description: err.message || "Wystąpił błąd podczas usuwania użytkownika.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setCurrentUser({ id: "", email: "", role: "client" }) // Default new user to client role
    setIsModalOpen(true)
  }

  const openEditModal = (user: User) => {
    setCurrentUser(user)
    setIsModalOpen(true)
  }

  if (loading) return <p>Ładowanie użytkowników...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Zarządzanie Klientami</CardTitle>
        <Button onClick={openAddModal}>Dodaj Użytkownika</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Rola</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>
                    Edytuj
                  </Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(user.id)}>
                    Usuń
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser?.id === "" ? "Dodaj nowego użytkownika" : "Edytuj użytkownika"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEdit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={currentUser?.email || ""}
                onChange={(e) => setCurrentUser({ ...currentUser!, email: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rola
              </Label>
              <Select
                value={currentUser?.role || "client"}
                onValueChange={(value) =>
                  setCurrentUser({ ...currentUser!, role: value as "admin" | "client" | "operator" })
                }
              >
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="Wybierz rolę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Klient</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Zapisywanie..." : "Zapisz zmiany"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
