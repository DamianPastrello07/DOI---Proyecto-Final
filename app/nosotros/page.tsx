import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Eye, Award, Building2, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">Nosotros</h1>
            <p className="text-lg text-muted-foreground text-pretty md:text-xl">
              Conoce nuestra historia, misión y el equipo que hace posible un diagnóstico de excelencia
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Nuestra Historia</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Desde 1992, DOI - Diagnóstico Odontológico por Imagen ha sido pionero en ofrecer servicios de
                  radiología dental especializada en México. Fundada por un grupo de radiólogos maxilofaciales con
                  visión de futuro, nuestra institución nació con el compromiso de elevar los estándares de diagnóstico
                  por imagen en el campo odontológico.
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  A lo largo de más de tres décadas, hemos sido testigos y protagonistas de la evolución tecnológica en
                  radiología dental. Desde las primeras radiografías panorámicas hasta la implementación de tomografía
                  computarizada de haz cónico (CBCT) de última generación, siempre hemos estado a la vanguardia en la
                  adopción de nuevas tecnologías.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Hoy en día, somos reconocidos como uno de los centros de diagnóstico por imagen dental más confiables
                  del país, atendiendo a miles de profesionales de la salud dental y sus pacientes cada año.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Target className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Proporcionar servicios de diagnóstico por imagen dental de la más alta calidad, utilizando tecnología
                  de vanguardia y un equipo de profesionales altamente capacitados, para contribuir al diagnóstico
                  preciso y al tratamiento exitoso de nuestros pacientes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Ser el centro de referencia líder en diagnóstico por imagen dental en México y Latinoamérica,
                  reconocido por nuestra excelencia técnica, innovación constante y compromiso inquebrantable con la
                  calidad y el servicio al paciente.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Nuestros Valores</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Los principios que guían nuestro trabajo diario</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Award className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Excelencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Buscamos la perfección en cada estudio, manteniendo los más altos estándares de calidad en todos
                  nuestros procesos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Compromiso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nos dedicamos completamente al bienestar de nuestros pacientes y al apoyo de los profesionales de la
                  salud dental.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Integridad</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Actuamos con honestidad y transparencia en todas nuestras relaciones profesionales y comerciales.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Trabajo en Equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Colaboramos estrechamente con odontólogos y especialistas para lograr los mejores resultados para los
                  pacientes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Innovación</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Adoptamos constantemente nuevas tecnologías y metodologías para mejorar nuestros servicios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Precisión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cada detalle cuenta en el diagnóstico. Nos enfocamos en la exactitud y minuciosidad en cada estudio.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Nuestro Equipo</h2>
            <p className="mb-8 text-muted-foreground">
              Contamos con un equipo multidisciplinario de radiólogos maxilofaciales certificados, técnicos
              especializados y personal administrativo comprometido con brindar la mejor experiencia a nuestros
              pacientes.
            </p>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Todos nuestros radiólogos cuentan con certificación vigente del Consejo Mexicano de Radiología e
                  Imagen Maxilofacial, y participan regularmente en programas de educación continua para mantenerse
                  actualizados con los últimos avances en diagnóstico por imagen dental.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
