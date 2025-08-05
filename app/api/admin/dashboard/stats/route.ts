import { NextResponse } from "next/server"
import { db } from "@/lib/database/supabase"

export async function GET() {
  try {
    // Get users stats
    const { data: users } = await db.client.from("users").select("role, is_active, created_at")

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const userStats = {
      total: users?.length || 0,
      active: users?.filter((u) => u.is_active).length || 0,
      newThisMonth: users?.filter((u) => new Date(u.created_at) >= startOfMonth).length || 0,
      byRole: {
        clients: users?.filter((u) => u.role === "client").length || 0,
        lawyers: users?.filter((u) => u.role === "lawyer").length || 0,
        admins: users?.filter((u) => u.role === "admin").length || 0,
        operators: users?.filter((u) => u.role === "operator").length || 0,
      },
    }

    // Get law firms stats
    const { data: lawFirms } = await db.client.from("law_firms").select("is_active, is_verified, created_at")

    const lawFirmStats = {
      total: lawFirms?.length || 0,
      active: lawFirms?.filter((f) => f.is_active).length || 0,
      verified: lawFirms?.filter((f) => f.is_verified).length || 0,
      newThisMonth: lawFirms?.filter((f) => new Date(f.created_at) >= startOfMonth).length || 0,
    }

    // Get subscriptions stats
    const { data: subscriptions } = await db.client.from("subscriptions").select("status, price_monthly, price_yearly")

    const subscriptionStats = {
      total: subscriptions?.length || 0,
      active: subscriptions?.filter((s) => s.status === "active").length || 0,
      trial: subscriptions?.filter((s) => s.status === "trial").length || 0,
      revenue: subscriptions?.reduce((sum, s) => sum + (s.price_monthly || 0), 0) || 0,
    }

    // Get API usage stats
    const { data: apiUsage } = await db.client.from("api_usage").select("created_at, response_time_ms")

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const apiStats = {
      totalCalls: apiUsage?.length || 0,
      todayCalls: apiUsage?.filter((a) => new Date(a.created_at) >= today).length || 0,
      avgResponseTime: apiUsage?.reduce((sum, a) => sum + (a.response_time_ms || 0), 0) / (apiUsage?.length || 1) || 0,
    }

    // Get cases stats
    const { data: cases } = await db.client.from("cases").select("created_at")

    const caseStats = {
      total: cases?.length || 0,
      newLastMonth:
        cases?.filter((c) => {
          const createdAt = new Date(c.created_at)
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0)
          return createdAt >= lastMonth && createdAt <= endOfMonth
        }).length || 0,
    }

    // Get orders stats
    const { data: orders } = await db.client.from("orders").select("created_at")

    const orderStats = {
      total: orders?.length || 0,
      newLastMonth:
        orders?.filter((o) => {
          const createdAt = new Date(o.created_at)
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0)
          return createdAt >= lastMonth && createdAt <= endOfMonth
        }).length || 0,
    }

    // Mock data for stats
    const stats = {
      total_users: userStats.total,
      new_users_last_month: userStats.newThisMonth,
      total_law_firms: lawFirmStats.total,
      new_law_firms_last_month: lawFirmStats.newThisMonth,
      total_cases: caseStats.total,
      new_cases_last_month: caseStats.newLastMonth,
      total_orders: orderStats.total,
      new_orders_last_month: orderStats.newLastMonth,
    }

    return NextResponse.json({
      users: userStats,
      lawFirms: lawFirmStats,
      subscriptions: subscriptionStats,
      apiUsage: apiStats,
      cases: caseStats,
      orders: orderStats,
      stats: stats,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
