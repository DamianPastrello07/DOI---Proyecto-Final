import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, CheckCircle, FileText, Clock, ArrowRight } from "lucide-react"

export default function InsuranceCompaniesPage() {
  const insuranceCompanies = [
    "Amec",
    "Amepba",
    "Amffa",
    "Apm",
    "AMOF",
    "Casa",
    "CEO: Odel",
    "CEO: Ospec",
    "CEO: Ospedyc",
    "CEO: Ospep",
    "CEO: Osptv-sat",
    "CEO: Osuthgra",
    "CEO: Suteryh",
    "Choferes",
    "Clero Argentino",
    "Colegio de Escribanos",
    "Consulmed – Osalara (juegos)",
    "Consulmed – Osalara (tintoreros)",
    "Consulmed – Osdop",
    "Consulmed – Osjera",
    "Consulmed – OSPTV",
    "Consulmed – Ostel",
    "Consulmed – Ostel medicus",
    "Coomarpes",
    "Dasuten",
    "Dental Center – Osadra",
    "Dental Center – Osemm",
    "Dental Center – Osoetsyl",
    "Dental Center – Ospat",
    "Docthos",
    "Farmacia",
    "Federada Salud",
    "Fosolyf",
    "Galeno",
    "Grupo San Nicolás GSN",
    "Ioma",
    "Iose",
    "IOSFA",
    "Ired",
    "Jerárquicos",
    "Luis Pasteur",
    "Luz y Fuerza (OSFATLyF)",
    "Maestranza",
    "Maisa",
    "Medicus",
    "Medifè",
    "Medvisur",
    "MSTM",
    "Oam",
    "Odontologia Personalizda",
    "Oseiv",
    "Ospip",
    "Omint",
    "Opsa",
    "Osepjana",
    "Osam",
    "Osarpyh",
    "Osconara",
    "Osde",
    "Osdepym",
    "Osmeba",
    "Ospaca",
    "Ospacarp",
    "Ospepba",
    "Ospercin",
    "Ospesgype",
    "Ospical",
    "Ospil",
    "Ospim",
    "Osplad",
    "Ospoce",
    "Ospren",
    "Osseg",
    "Pami",
    "Perfumistas",
    "Poder judicial",
    "Policia Federal",
    "Prevención salud",
    "Redsom",
    "Sami",
    "Sancor Salud",
    "Scis",
    "Servesalud",
    "Siaco: Obra Social Bancaria Argentina",
    "Siaco: OSFE (Ferroviarios)",
    "Siaco: OSPCRA",
    "Siaco: (OSPIHMP) Obra Social del Personal de la Ind. Hielo",
    "Somu",
    "SOP",
    "Suma",
    "Swiss Medical",
    "Téc. De futbol",
    "Thema",
    "Unión personal",
    "Uom",
    "Uta",
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Shield className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Obras Sociales
            </h1>
            <p className="text-lg text-muted-foreground text-pretty md:text-xl">
              Trabajamos con las principales Obras Sociales del país para facilitar el acceso a nuestros servicios
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Beneficios de Nuestras Obras Sociales</h2>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <FileText className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Facturación Directa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nos encargamos de toda la gestión con tu Obra Social, sin trámites adicionales para ti
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Proceso Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Agilizamos los tiempos de autorización para que recibas tu estudio lo antes posible
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Cobertura Amplia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  La mayoría de nuestros estudios están cubiertos por los seguros de gastos médicos mayores
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance Companies List */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Aseguradoras Afiliadas</h2>
              <p className="text-muted-foreground">
                Contamos con convenio directo con las siguientes compañías de seguros
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {insuranceCompanies.map((company) => (
                    <div key={company} className="flex items-center gap-2 rounded-lg border border-border p-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm font-medium">{company}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-center text-sm text-muted-foreground">
                    Si tu obra social no aparece en la lista, contáctanos. Podemos gestionar tu estudio y proporcionarte
                    la factura para que realices el reembolso directamente con tu obra social.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Requisitos para Atención con Seguro
            </h2>

            <Card>
              <CardHeader>
                <CardTitle>Documentos Necesarios</CardTitle>
                <CardDescription>Por favor, trae los siguientes documentos el día de tu cita</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">Póliza de seguro vigente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">Identificación oficial</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">Orden médica o formato de autorización de la aseguradora</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">Número de póliza y datos del asegurado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-center text-sm font-medium text-foreground">
                    Importante: Te recomendamos verificar con tu aseguradora la cobertura específica de tu póliza antes
                    de tu cita.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 text-3xl md:text-4xl">¿Tienes dudas sobre tu seguro?</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Contáctanos y con gusto te ayudaremos a verificar tu cobertura
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacto">
                  Contactar Ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
