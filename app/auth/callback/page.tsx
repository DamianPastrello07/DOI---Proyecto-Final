"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const processLogin = async () => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        console.error("Error en callback:", error?.message)
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      router.refresh()
      if (profile?.role === "admin") router.push("/admin")
      else if (profile?.role === "empleado") router.push("/empleado")
      else router.push("/cliente")
    }

    processLogin()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Procesando inicio de sesión...</p>
    </div>
  )
}
