import { NextResponse } from "next/server"
import { db } from "@/lib/database/supabase"

export async function GET() {
  try {
    // Get recent activities from different tables
    const [users, lawFirms, subscriptions] = await Promise.all([
      db.client
        .from("users")
        .select("id, email, full_name, avatar_url, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      db.client
        .from("law_firms")
        .select("id, name, created_at, owner_id")
        .order("created_at", { ascending: false })
        .limit(10),
      db.client
        .from("subscriptions")
        .select("id, plan_name, created_at, law_firm_id")
        .order("created_at", { ascending: false })
        .limit(10),
    ])

    const activities = []

    // Add user registrations
    users.data?.forEach((user) => {
      activities.push({
        id: `user_${user.id}`,
        type: "user_registered",
        description: `Nowy użytkownik zarejestrował się: ${user.email}`,
        timestamp: user.created_at,
        user: {
          name: user.full_name || user.email.split("@")[0],
          email: user.email,
          avatar: user.avatar_url,
        },
      })
    })

    // Add law firm creations
    lawFirms.data?.forEach((firm) => {
      activities.push({
        id: `firm_${firm.id}`,
        type: "law_firm_created",
        description: `Nowa kancelaria została utworzona: ${firm.name}`,
        timestamp: firm.created_at,
      })
    })

    // Add subscription creations
    subscriptions.data?.forEach((sub) => {
      activities.push({
        id: `sub_${sub.id}`,
        type: "subscription_created",
        description: `Nowa subskrypcja: ${sub.plan_name}`,
        timestamp: sub.created_at,
      })
    })

    // Mock data for activity
    const mockActivity = [
      { id: "1", user_email: "admin@example.com", action: "Login", timestamp: new Date().toISOString() },
      {
        id: "2",
        user_email: "client1@example.com",
        action: "Created new order",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "3",
        user_email: "operator1@example.com",
        action: "Updated case status",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: "4",
        user_email: "client2@example.com",
        action: "Viewed legal document",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
      },
    ]

    // Combine activities with mock data
    const combinedActivities = [...activities, ...mockActivity]

    // Sort by timestamp and limit to 20
    const sortedActivities = combinedActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20)

    return NextResponse.json({ activities: sortedActivities })
  } catch (error) {
    console.error("Error fetching dashboard activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
