"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData)
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">Contacto</h1>
            <p className="text-lg text-muted-foreground text-pretty md:text-xl">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros medios
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">Información de Contacto</h2>
                <p className="text-muted-foreground">
                  Puedes comunicarte con nosotros a través de los siguientes medios. Nuestro equipo está listo para
                  atenderte.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <MapPin className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Dirección</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Av. Insurgentes Sur 1605, Piso 8
                    <br />
                    Col. San José Insurgentes
                    <br />
                    03900, Ciudad de México, CDMX
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Teléfono</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:5555555555" className="text-muted-foreground hover:text-primary">
                    55 5555 5555
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">Lunes a Viernes: 8:00 AM - 7:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Correo Electrónico</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:contacto@doi.com.mx" className="text-muted-foreground hover:text-primary">
                    contacto@doi.com.mx
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">Respondemos en menos de 24 horas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Horario de Atención</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <span className="font-medium">Lunes a Viernes:</span> 8:00 AM - 7:00 PM
                    </p>
                    <p>
                      <span className="font-medium">Sábados:</span> 9:00 AM - 2:00 PM
                    </p>
                    <p>
                      <span className="font-medium">Domingos:</span> Cerrado
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="55 1234 5678"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Solicitud de información"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Escribe tu mensaje aquí..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Enviar Mensaje
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Al enviar este formulario, aceptas que procesemos tus datos para responder a tu consulta.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Cómo Llegar</h2>
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.2!2d-99.1867!3d19.3687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIyJzA3LjMiTiA5OcKwMTEnMTIuMSJX!5e0!3m2!1ses!2smx!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de DOI"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Contamos con estacionamiento disponible para nuestros pacientes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
