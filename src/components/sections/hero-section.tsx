
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Fondo abstracto tecnológico"
        fill={true}
        style={{objectFit:"cover"}}
        quality={80}
        className="absolute z-0 opacity-30"
        data-ai-hint="abstract technology finance"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Transformando las finanzas</span>
          <span className="block text-primary">con Datos Inteligentes</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-lg text-foreground/80 sm:max-w-xl md:text-xl lg:text-2xl">
          La Plataforma Definitiva para la inversión asistida por IA, uniendo análisis humano y automatizado para optimizar tus ganancias.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <Button asChild size="lg" className="group">
            <Link href="#contacto">
              Solicitar Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="ml-0 mt-4 sm:mt-0 sm:ml-4 group">
            <Link href="#producto">
              Explorar Plataforma
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
