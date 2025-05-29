
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DownloadCloud } from 'lucide-react';

export function LeadMagnetCtaSection() {
  return (
    <section id="recursos" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-lg shadow-xl p-8 md:p-12 text-center text-primary-foreground">
          <DownloadCloud className="h-16 w-16 mx-auto mb-6 text-white opacity-80" />
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Obtén Nuestro Whitepaper Exclusivo
          </h2>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
            Descubre cómo la sinergia entre la Inteligencia Artificial y los expertos humanos está revolucionando el análisis financiero y la toma de decisiones de inversión.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-white text-primary hover:bg-gray-100 transition-colors">
            <Link href="/lead-magnet">
              Descargar Whitepaper Gratuito
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
