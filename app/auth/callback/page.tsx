"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()

      // 🔹 Intentamos obtener el usuario autenticado
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        console.error("[CALLBACK] Error al obtener usuario:", error?.message)
        router.push("/login")
        return
      }

      console.log("[CALLBACK] Usuario autenticado:", user.email)

      // 🔹 Verificamos si el perfil existe en la tabla "profiles"
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.warn("[CALLBACK] No se encontró perfil, redirigiendo a /cliente...")
        router.refresh()
        router.push("/cliente")
        return
      }

      console.log("[CALLBACK] Rol detectado:", profile.role)

      // 🔹 Redirigimos según el rol
      router.refresh()
      if (profile.role === "admin") router.push("/admin")
      else if (profile.role === "empleado") router.push("/empleado")
      else router.push("/cliente")
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <p className="text-lg text-muted-foreground">Procesando inicio de sesión...</p>
    </div>
  )
}
