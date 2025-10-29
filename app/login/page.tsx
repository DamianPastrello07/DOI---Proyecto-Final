"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, LogIn } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Cuenta creada exitosamente. Por favor inicia sesión.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      console.log("[Attempting login with email:", formData.email)

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      console.log("Auth response:", { data, authError })

      if (authError) {
        console.log("Auth error:", authError.message)
        throw new Error("Credenciales incorrectas")
      }

      if (!data.user) {
        console.log("No user data returned")
        throw new Error("No se pudo obtener la información del usuario")
      }

      console.log("[v0] User authenticated:", data.user.id)
      console.log("[v0] Fetching profile for user:", data.user.id)

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      console.log("Profile response:", { profile, profileError })

      if (profileError) {
        console.log("Profile error:", profileError.message)
        router.refresh()
        router.push("/cliente")
        return
      }

      console.log("User role:", profile.role)
      console.log("Redirecting based on role...")

      router.refresh()
      if (profile.role === "admin") {
        router.push("/admin")
      } else if (profile.role === "empleado") {
        router.push("/empleado")
      } else {
        router.push("/cliente")
      }
    } catch (error: unknown) {
      console.log("Caught error:", error)
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // ✅ Nuevo: Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://nqghmkthmbxgozlndmej.supabase.co/auth/v1/callback",
          queryParams: {
            client_id: "448208271515-pcatdabglhmtjgslper4rj4dvhehqoqa.apps.googleusercontent.com",
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      console.error("Error al iniciar sesión con Google:", error)
      setError("No se pudo iniciar sesión con Google.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 text-3xl font-bold text-primary">DOI</div>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para gestionar tus estudios</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/recuperar-password" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              {/* 🔹 Nuevo botón Google */}
              <div className="relative my-4 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-xs text-gray-500">o</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <LogIn className="h-4 w-4" />
                Iniciar sesión con Google
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-2">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="font-medium text-primary hover:underline">
                  Regístrate aquí
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
