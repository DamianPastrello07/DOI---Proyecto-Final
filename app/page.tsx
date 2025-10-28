import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, Shield, Clock, Award, ArrowRight, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

async function getContent(page: string, section: string, key: string, fallback: string): Promise<string> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("page_content")
      .select("content_value")
      .eq("page_name", page)
      .eq("section_name", section)
      .eq("content_key", key)
      .maybeSingle()

    if (error || !data) {
      return fallback
    }

    return data.content_value || fallback
  } catch (error) {
    // If any error occurs, return fallback
    return fallback
  }
}

export default async function HomePage() {
  const heroTitle = await getContent("home", "hero", "title", "Diagnóstico Odontológico por Imagen")
  const heroSubtitle = await getContent(
    "home",
    "hero",
    "subtitle",
    "Más de 30 años de experiencia en radiología dental y maxilofacial. Tecnología de vanguardia y atención personalizada para profesionales de la salud dental.",
  )
  const heroCtaText = await getContent("home", "hero", "cta_text", "Agendar Cita")
  const aboutTitle = await getContent("home", "about", "title", "¿Por qué elegirnos?")
  const aboutDescription = await getContent(
    "home",
    "about",
    "description",
    "Somos líderes en diagnóstico por imagen dental con el compromiso de ofrecer resultados precisos y confiables",
  )

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">{heroTitle}</h1>
            <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">{heroSubtitle}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contacto">
                  {heroCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios">Ver Servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{aboutTitle}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{aboutDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Award className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Más de 30 años brindando servicios de radiología dental especializada</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Microscope className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Tecnología</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Equipos de última generación para diagnósticos precisos y detallados</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Confianza</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Convenios con las principales aseguradoras del país</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Rapidez</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Resultados entregados en tiempo récord sin comprometer la calidad</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Nuestros Servicios</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Ofrecemos una amplia gama de estudios radiológicos especializados
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Radiografía Panorámica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Vista completa de dientes, maxilares y estructuras circundantes en una sola imagen
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Diagnóstico integral</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Baja radiación</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tomografía Cone Beam</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Imágenes 3D de alta resolución para planificación de implantes y cirugías
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Precisión milimétrica</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Visualización 3D</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cefalometría</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Análisis de estructuras craneofaciales para tratamientos ortodónticos
                </CardDescription>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Análisis detallado</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Planificación precisa</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/servicios">
                Ver Todos los Servicios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 text-3xl md:text-4xl">¿Listo para agendar tu estudio?</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Contamos con convenios con las principales aseguradoras y aceptamos pagos directos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacto">Contactar Ahora</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/aseguradoras">Ver Aseguradoras</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
