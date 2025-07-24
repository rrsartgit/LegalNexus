export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "lawyer"
  avatar?: string
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@legalapinexus.pl",
    name: "Administrator",
    role: "admin",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Jan Kowalski",
    role: "user",
    avatar: "/placeholder-user.jpg",
  },
]

// Mock authentication functions
export async function signIn(email: string, password: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication logic
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password") {
    // Store user in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }
    return user
  }
  return null
}

export async function signUp(email: string, password: string, name: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock user creation
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: "user",
  }

  // Store user in localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(newUser))
  }

  return newUser
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("currentUser")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function mockLogout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
    // Redirect to home page
    window.location.href = "/"
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(role: string): boolean {
  const user = getCurrentUser()
  return user?.role === role
}
