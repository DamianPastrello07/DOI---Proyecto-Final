import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ViewStudies } from "@/components/cliente/view-studies"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ClientePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nombre, apellido, dni")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Mis Estudios</h1>
            <p className="text-sm text-muted-foreground">
              Bienvenido, {profile.nombre} {profile.apellido}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Volver al sitio</Link>
            </Button>
            <form action="/api/auth/signout" method="post">
              <Button variant="ghost" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Estudios Realizados</CardTitle>
            <CardDescription>Visualiza y descarga tus estudios radiológicos</CardDescription>
          </CardHeader>
          <CardContent>
            <ViewStudies userDni={profile.dni} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
