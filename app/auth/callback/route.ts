import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if profile exists, if not create one for OAuth users
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

      if (!profile) {
        // Create profile for OAuth user with default role
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          nombre: data.user.user_metadata?.full_name?.split(" ")[0] || "",
          apellido: data.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
          dni: "", // OAuth users don't have DNI initially
          role: "cliente",
        })
      }

      // Fetch the profile to determine redirect
      const { data: userProfile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

      if (userProfile) {
        if (userProfile.role === "admin") {
          return NextResponse.redirect(`${origin}/admin`)
        } else if (userProfile.role === "empleado") {
          return NextResponse.redirect(`${origin}/empleado`)
        }
      }

      return NextResponse.redirect(`${origin}/cliente`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
