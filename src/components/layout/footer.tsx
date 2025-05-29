
import Link from 'next/link';
import { Linkedin, Twitter, Github, BriefcaseBusiness } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <BriefcaseBusiness className="h-7 w-7" />
              <span>Horizont</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Transformando las finanzas con datos inteligentes y colaboración AI-humano.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Producto</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li><Link href="#producto" className="text-sm text-muted-foreground hover:text-primary">Características</Link></li>
                <li><Link href="#soluciones" className="text-sm text-muted-foreground hover:text-primary">Soluciones</Link></li>
                <li><Link href="/lead-magnet" className="text-sm text-muted-foreground hover:text-primary">Whitepaper AI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Compañía</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li><Link href="#nosotros" className="text-sm text-muted-foreground hover:text-primary">Nosotros</Link></li>
                <li><Link href="#recursos" className="text-sm text-muted-foreground hover:text-primary">Recursos</Link></li>
                <li><Link href="#contacto" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
                <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Términos de Servicio</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Horizont. Todos los derechos reservados.</p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
