"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Patient = {
  id: string
  nombre: string
  apellido: string
  dni: string
  email: string | null
  telefono: string | null
  fecha_nacimiento: string | null
  direccion: string | null
  created_at: string
}

export function PatientsManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadPatients()
  }, [])

  async function loadPatients() {
    try {
      const { data, error } = await supabase.from("patients").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPatients(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los pacientes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No autenticado")

      if (editingPatient) {
        const { error } = await supabase
          .from("patients")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingPatient.id)

        if (error) throw error

        toast({
          title: "Paciente actualizado",
          description: "Los datos del paciente han sido actualizados correctamente",
        })
      } else {
        const { error } = await supabase.from("patients").insert({
          ...formData,
          created_by: user.id,
        })

        if (error) throw error

        toast({
          title: "Paciente agregado",
          description: "El paciente ha sido agregado correctamente",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadPatients()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el paciente",
        variant: "destructive",
      })
    }
  }

  async function handleDelete(patientId: string) {
    if (!confirm("¿Estás seguro de que deseas eliminar este paciente?")) return

    try {
      const { error } = await supabase.from("patients").delete().eq("id", patientId)

      if (error) throw error

      toast({
        title: "Paciente eliminado",
        description: "El paciente ha sido eliminado correctamente",
      })
      loadPatients()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el paciente",
        variant: "destructive",
      })
    }
  }

  function openEditDialog(patient: Patient) {
    setEditingPatient(patient)
    setFormData({
      nombre: patient.nombre,
      apellido: patient.apellido,
      dni: patient.dni,
      email: patient.email || "",
      telefono: patient.telefono || "",
      fecha_nacimiento: patient.fecha_nacimiento || "",
      direccion: patient.direccion || "",
    })
    setIsDialogOpen(true)
  }

  function resetForm() {
    setEditingPatient(null)
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      telefono: "",
      fecha_nacimiento: "",
      direccion: "",
    })
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
      <div className="flex justify-end">
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPatient ? "Editar Paciente" : "Agregar Nuevo Paciente"}</DialogTitle>
              <DialogDescription>
                {editingPatient ? "Modifica los datos del paciente" : "Completa los datos del nuevo paciente"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingPatient ? "Actualizar" : "Agregar"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha Nac.</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">
                  {patient.nombre} {patient.apellido}
                </TableCell>
                <TableCell>{patient.dni}</TableCell>
                <TableCell>{patient.email || "-"}</TableCell>
                <TableCell>{patient.telefono || "-"}</TableCell>
                <TableCell>
                  {patient.fecha_nacimiento ? new Date(patient.fecha_nacimiento).toLocaleDateString("es-ES") : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(patient)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(patient.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {patients.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">No hay pacientes registrados</p>
      )}
    </div>
  )
}
