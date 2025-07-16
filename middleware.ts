import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database/types"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Admin routes protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/logowanie?redirect=/admin", req.url))
    }

    // Check if user has admin role
    const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Panel klienta protection
  if (req.nextUrl.pathname.startsWith("/panel-klienta")) {
    if (!session) {
      return NextResponse.redirect(new URL("/logowanie?redirect=/panel-klienta", req.url))
    }
  }

  // Panel operatora protection
  if (req.nextUrl.pathname.startsWith("/panel-operatora")) {
    if (!session) {
      return NextResponse.redirect(new URL("/logowanie?redirect=/panel-operatora", req.url))
    }

    const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (!user || !["operator", "admin"].includes(user.role)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // API routes protection
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (!userData || userData.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
  }

  return res
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/panel-klienta/:path*",
    "/panel-operatora/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
