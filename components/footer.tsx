import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div>
            <div className="mb-4 text-2xl font-bold text-primary">DOI</div>
            <p className="text-sm text-muted-foreground">Diagnóstico Odontológico por Imagen</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Especialistas en radiología dental y maxilofacial desde 1992
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Inicio
              </Link>
              <Link href="/nosotros" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Nosotros
              </Link>
              <Link href="/aseguradoras" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Aseguradoras
              </Link>
              <Link href="/servicios" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Servicios
              </Link>
              <Link href="/contacto" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contacto</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Av. Insurgentes Sur 1605, Piso 8, Col. San José Insurgentes, CDMX
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:5555555555" className="text-sm text-muted-foreground hover:text-primary">
                  55 5555 5555
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contacto@doi.com.mx" className="text-sm text-muted-foreground hover:text-primary">
                  contacto@doi.com.mx
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DOI - Diagnóstico Odontológico por Imagen. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
