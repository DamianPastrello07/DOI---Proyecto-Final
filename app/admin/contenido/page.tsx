"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Save, Plus, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ContentItem {
  id: string
  page_name: string
  section_name: string
  content_key: string
  content_value: string
}

export default function ContentManagementPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<ContentItem[]>([])
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    page_name: "",
    section_name: "",
    content_key: "",
    content_value: "",
  })

  useEffect(() => {
    checkAuth()
    loadContent()
  }, [])

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      router.push("/")
    }
  }

  const loadContent = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_name", { ascending: true })
      .order("section_name", { ascending: true })

    if (!error && data) {
      setContent(data)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (editingItem) {
      // Update existing
      const { error } = await supabase
        .from("page_content")
        .update({
          page_name: formData.page_name,
          section_name: formData.section_name,
          content_key: formData.content_key,
          content_value: formData.content_value,
        })
        .eq("id", editingItem.id)

      if (error) {
        alert("Error al actualizar: " + error.message)
        return
      }
    } else {
      // Insert new
      const { error } = await supabase.from("page_content").insert({
        page_name: formData.page_name,
        section_name: formData.section_name,
        content_key: formData.content_key,
        content_value: formData.content_value,
      })

      if (error) {
        alert("Error al crear: " + error.message)
        return
      }
    }

    setIsDialogOpen(false)
    setEditingItem(null)
    setFormData({ page_name: "", section_name: "", content_key: "", content_value: "" })
    loadContent()
  }

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item)
    setFormData({
      page_name: item.page_name,
      section_name: item.section_name,
      content_key: item.content_key,
      content_value: item.content_value,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este contenido?")) return

    const { error } = await supabase.from("page_content").delete().eq("id", id)

    if (error) {
      alert("Error al eliminar: " + error.message)
      return
    }

    loadContent()
  }

  const handleNew = () => {
    setEditingItem(null)
    setFormData({ page_name: "", section_name: "", content_key: "", content_value: "" })
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Panel
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Gestión de Contenido</h1>
          <p className="text-muted-foreground">Edita el contenido de las páginas del sitio web</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Contenido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Editar Contenido" : "Nuevo Contenido"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Modifica el contenido existente" : "Agrega nuevo contenido a una página"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_name">Página</Label>
                <Input
                  id="page_name"
                  value={formData.page_name}
                  onChange={(e) => setFormData({ ...formData, page_name: e.target.value })}
                  placeholder="home, nosotros, servicios..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section_name">Sección</Label>
                <Input
                  id="section_name"
                  value={formData.section_name}
                  onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                  placeholder="hero, about, services..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_key">Clave</Label>
                <Input
                  id="content_key"
                  value={formData.content_key}
                  onChange={(e) => setFormData({ ...formData, content_key: e.target.value })}
                  placeholder="title, subtitle, description..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_value">Contenido</Label>
                <Textarea
                  id="content_value"
                  value={formData.content_value}
                  onChange={(e) => setFormData({ ...formData, content_value: e.target.value })}
                  placeholder="El contenido que se mostrará..."
                  rows={5}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contenido del Sitio</CardTitle>
          <CardDescription>Gestiona todo el contenido editable de las páginas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead>Sección</TableHead>
                <TableHead>Clave</TableHead>
                <TableHead>Contenido</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.page_name}</TableCell>
                  <TableCell>{item.section_name}</TableCell>
                  <TableCell>{item.content_key}</TableCell>
                  <TableCell className="max-w-md truncate">{item.content_value}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
