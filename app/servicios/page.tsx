import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, Scan, Bone, Tent as Teeth, Brain, Camera, FileText } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">Nuestros Servicios</h1>
            <p className="text-lg text-muted-foreground text-pretty md:text-xl">
              Ofrecemos una amplia gama de estudios radiológicos especializados con tecnología de última generación
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Radiografía Panorámica */}
            <Card>
              <CardHeader>
                <Camera className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Radiografía Panorámica</CardTitle>
                <CardDescription>Vista completa de la cavidad oral en una sola imagen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  La radiografía panorámica proporciona una vista completa de los dientes, maxilares superiores e
                  inferiores, senos maxilares y articulación temporomandibular en una sola imagen.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación general de la dentición</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Detección de dientes impactados</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de estructuras óseas</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Planificación de tratamientos ortodónticos</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Tomografía Cone Beam */}
            <Card>
              <CardHeader>
                <Scan className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Tomografía Cone Beam (CBCT)</CardTitle>
                <CardDescription>Imágenes 3D de alta resolución</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  La tomografía computarizada de haz cónico proporciona imágenes tridimensionales detalladas de las
                  estructuras dentales y maxilofaciales con mínima radiación.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Planificación de implantes dentales</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de vías aéreas</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Cirugía maxilofacial</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de ATM</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cefalometría */}
            <Card>
              <CardHeader>
                <Brain className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Cefalometría</CardTitle>
                <CardDescription>Análisis craneofacial para ortodoncia</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Radiografía lateral de cráneo con análisis cefalométrico digital para planificación de tratamientos
                  ortodónticos y ortopédicos.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Planificación ortodóntica</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de crecimiento craneofacial</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Cirugía ortognática</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Análisis de perfil facial</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Radiografías Periapicales */}
            <Card>
              <CardHeader>
                <Teeth className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Radiografías Periapicales</CardTitle>
                <CardDescription>Imágenes detalladas de dientes individuales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Radiografías intraorales que muestran el diente completo desde la corona hasta el ápice radicular y el
                  hueso circundante.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Detección de caries</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación endodóntica</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Diagnóstico de infecciones periapicales</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de nivel óseo</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Radiografías de Aleta de Mordida */}
            <Card>
              <CardHeader>
                <FileText className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Radiografías de Aleta de Mordida</CardTitle>
                <CardDescription>Detección temprana de caries interproximales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Radiografías que muestran las coronas de los dientes superiores e inferiores simultáneamente, ideales
                  para detectar caries entre dientes.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Detección de caries interproximales</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de restauraciones</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Monitoreo de nivel óseo</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación de ajuste de coronas</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Estudios de ATM */}
            <Card>
              <CardHeader>
                <Bone className="mb-4 h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">Estudios de ATM</CardTitle>
                <CardDescription>Evaluación de articulación temporomandibular</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Estudios especializados para evaluar la articulación temporomandibular y diagnosticar trastornos
                  relacionados.
                </p>
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm">Indicaciones:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Dolor en la articulación</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Limitación de apertura bucal</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Ruidos articulares</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Evaluación pre y post tratamiento</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 text-3xl md:text-4xl">¿Necesitas agendar un estudio?</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Contáctanos para más información sobre nuestros servicios y disponibilidad
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
