"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Profile = {
  id: string
  email: string
  nombre: string
  apellido: string
  dni: string
  role: "admin" | "empleado" | "cliente"
  created_at: string
}

export function UsersManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadProfiles()
    getCurrentUser()
  }, [])

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      setCurrentUserId(user.id)
    }
  }

  async function loadProfiles() {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    if (userId === currentUserId) {
      toast({
        title: "Acción no permitida",
        description: "No puedes cambiar tu propio rol",
        variant: "destructive",
      })
      return
    }

    setUpdatingId(userId)
    try {
      const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

      if (error) throw error

      setProfiles(profiles.map((p) => (p.id === userId ? { ...p, role: newRole as Profile["role"] } : p)))

      toast({
        title: "Rol actualizado",
        description: "El rol del usuario ha sido actualizado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol del usuario",
        variant: "destructive",
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "empleado":
        return "secondary"
      case "cliente":
        return "outline"
      default:
        return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Rol Actual</TableHead>
              <TableHead>Cambiar Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">
                  {profile.nombre} {profile.apellido}
                </TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.dni}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(profile.role)}>{profile.role}</Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={profile.role}
                    onValueChange={(value) => updateUserRole(profile.id, value)}
                    disabled={updatingId === profile.id || profile.id === currentUserId}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente">Cliente</SelectItem>
                      <SelectItem value="empleado">Empleado</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {profile.id === currentUserId && <p className="mt-1 text-xs text-muted-foreground">(Tu cuenta)</p>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(profile.created_at).toLocaleDateString("es-ES")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {profiles.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">No hay usuarios registrados</p>
      )}
    </div>
  )
}
