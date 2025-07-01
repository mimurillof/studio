import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutUsSection() {
  return (
    <section
      id="nosotros"
      className="py-16 sm:py-24 bg-[#efefef] text-card-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="relative md:col-span-6">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/image (1).png"
                alt="Logo de Horizont - Transformando las finanzas con Datos Inteligentes"
                width={2000}
                height={2000}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary mb-6">
              Nuestra Misión: Impulsando la Innovación Financiera
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              En Horizont, estamos dedicados a democratizar el acceso a herramientas de análisis financiero de nivel experto. Creemos en la sinergia entre la inteligencia artificial y el conocimiento humano para desbloquear nuevas oportunidades de inversión y empoderar a nuestros usuarios para que tomen decisiones financieras más inteligentes y seguras.
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
