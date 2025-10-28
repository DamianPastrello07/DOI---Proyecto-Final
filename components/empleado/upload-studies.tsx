"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const STUDY_TYPES = [
  "Radiografía Panorámica",
  "Radiografía Periapical",
  "Radiografía de Aleta de Mordida",
  "Tomografía Computarizada (TC)",
  "Resonancia Magnética (RM)",
  "Cefalometría",
  "Radiografía de ATM",
  "Otro",
]

export function UploadStudies() {
  const [formData, setFormData] = useState({
    patient_nombre: "",
    patient_apellido: "",
    patient_dni: "",
    tipo_estudio: "",
    descripcion: "",
    fecha_estudio: new Date().toISOString().split("T")[0],
  })
  const [images, setImages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])
    }
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Debes subir al menos una imagen del estudio",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No autenticado")

      // Insert study record
      const { data: study, error: studyError } = await supabase
        .from("studies")
        .insert({
          patient_dni: formData.patient_dni,
          patient_nombre: formData.patient_nombre,
          patient_apellido: formData.patient_apellido,
          tipo_estudio: formData.tipo_estudio,
          descripcion: formData.descripcion,
          fecha_estudio: formData.fecha_estudio,
          uploaded_by: user.id,
        })
        .select()
        .single()

      if (studyError) throw studyError

      // Upload images to Vercel Blob and save references
      for (const image of images) {
        const formDataBlob = new FormData()
        formDataBlob.append("file", image)

        const response = await fetch(`/api/upload?filename=${image.name}`, {
          method: "POST",
          body: formDataBlob,
        })

        if (!response.ok) throw new Error("Error al subir imagen")

        const { url } = await response.json()

        // Save image reference in database
        const { error: imageError } = await supabase.from("study_images").insert({
          study_id: study.id,
          image_url: url,
          image_name: image.name,
        })

        if (imageError) throw imageError
      }

      toast({
        title: "Estudio cargado",
        description: "El estudio ha sido cargado correctamente",
      })

      // Reset form
      setFormData({
        patient_nombre: "",
        patient_apellido: "",
        patient_dni: "",
        tipo_estudio: "",
        descripcion: "",
        fecha_estudio: new Date().toISOString().split("T")[0],
      })
      setImages([])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo cargar el estudio",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datos del Paciente</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient_nombre">Nombre *</Label>
            <Input
              id="patient_nombre"
              value={formData.patient_nombre}
              onChange={(e) => setFormData({ ...formData, patient_nombre: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patient_apellido">Apellido *</Label>
            <Input
              id="patient_apellido"
              value={formData.patient_apellido}
              onChange={(e) => setFormData({ ...formData, patient_apellido: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patient_dni">DNI *</Label>
            <Input
              id="patient_dni"
              value={formData.patient_dni}
              onChange={(e) => setFormData({ ...formData, patient_dni: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datos del Estudio</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipo_estudio">Tipo de Estudio *</Label>
            <Select
              value={formData.tipo_estudio}
              onValueChange={(value) => setFormData({ ...formData, tipo_estudio: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {STUDY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha_estudio">Fecha del Estudio *</Label>
            <Input
              id="fecha_estudio"
              type="date"
              value={formData.fecha_estudio}
              onChange={(e) => setFormData({ ...formData, fecha_estudio: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción / Observaciones</Label>
          <Textarea
            id="descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Agrega notas o observaciones sobre el estudio..."
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Imágenes del Estudio *</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                <Upload className="h-4 w-4" />
                <span>Seleccionar Imágenes</span>
              </div>
            </Label>
            <span className="text-sm text-muted-foreground">{images.length} imagen(es) seleccionada(s)</span>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground truncate">{image.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Cargar Estudio
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
