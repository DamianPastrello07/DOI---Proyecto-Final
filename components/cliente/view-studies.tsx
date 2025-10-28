"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Download, Eye, Calendar, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Study = {
  id: string
  patient_nombre: string
  patient_apellido: string
  tipo_estudio: string
  descripcion: string | null
  fecha_estudio: string
  created_at: string
}

type StudyImage = {
  id: string
  image_url: string
  image_name: string
}

type StudyWithImages = Study & {
  images: StudyImage[]
}

export function ViewStudies({ userDni }: { userDni: string }) {
  const [studies, setStudies] = useState<StudyWithImages[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudy, setSelectedStudy] = useState<StudyWithImages | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadStudies()
  }, [])

  async function loadStudies() {
    try {
      // Get studies for this user's DNI
      const { data: studiesData, error: studiesError } = await supabase
        .from("studies")
        .select("*")
        .eq("patient_dni", userDni)
        .order("fecha_estudio", { ascending: false })

      if (studiesError) throw studiesError

      // Get images for each study
      const studiesWithImages = await Promise.all(
        (studiesData || []).map(async (study) => {
          const { data: images, error: imagesError } = await supabase
            .from("study_images")
            .select("*")
            .eq("study_id", study.id)

          if (imagesError) throw imagesError

          return {
            ...study,
            images: images || [],
          }
        }),
      )

      setStudies(studiesWithImages)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los estudios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function downloadImage(imageUrl: string, imageName: string) {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = imageName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Descarga iniciada",
        description: "La imagen se está descargando",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo descargar la imagen",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (studies.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hay estudios disponibles</h3>
        <p className="text-sm text-muted-foreground">Aún no tienes estudios radiológicos registrados en el sistema.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {studies.map((study) => (
        <Card key={study.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{study.tipo_estudio}</CardTitle>
                <CardDescription>
                  Paciente: {study.patient_nombre} {study.patient_apellido}
                </CardDescription>
              </div>
              <Badge variant="secondary">{study.images.length} imagen(es)</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Fecha: {new Date(study.fecha_estudio).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Subido: {new Date(study.created_at).toLocaleDateString("es-ES")}</span>
              </div>
            </div>

            {study.descripcion && (
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm">{study.descripcion}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedStudy(study)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Imágenes
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{study.tipo_estudio}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {study.images.map((image) => (
                      <div key={image.id} className="space-y-2">
                        <img
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.image_name}
                          className="w-full rounded-md border"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={() => downloadImage(image.image_url, image.image_name)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
