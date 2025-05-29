
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutUsSection() {
  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Equipo de FinAI Advisor trabajando en innovación financiera"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="team meeting technology"
              />
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-primary">
              Nuestra Misión: Impulsando la Innovación Financiera
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              En FinAI Advisor, estamos dedicados a democratizar el acceso a herramientas de análisis financiero de nivel experto. Creemos en la sinergia entre la inteligencia artificial y el conocimiento humano para desbloquear nuevas oportunidades de inversión y empoderar a nuestros usuarios para que tomen decisiones financieras más inteligentes y seguras.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Nuestro equipo está compuesto por expertos en finanzas, científicos de datos e ingenieros de software apasionados por construir el futuro de la tecnología financiera.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8">
              <Link href="#contacto">Conoce más sobre nosotros</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
