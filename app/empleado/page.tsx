import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientsManagement } from "@/components/empleado/patients-management"
import { UploadStudies } from "@/components/empleado/upload-studies"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function EmpleadoPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }

  // Check if user is empleado or admin
  const { data: profile } = await supabase.from("profiles").select("role, nombre, apellido").eq("id", user.id).single()

  if (!profile || (profile.role !== "empleado" && profile.role !== "admin")) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Panel de Empleado</h1>
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
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="upload">Cargar Estudios</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Pacientes</CardTitle>
                <CardDescription>Administra la información de los pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Cargar Estudios</CardTitle>
                <CardDescription>Sube estudios radiológicos para los pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <UploadStudies />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
