
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Análisis Inteligente Potenciado por IA',
    description: 'Nuestra plataforma utiliza algoritmos avanzados de IA para analizar grandes volúmenes de datos financieros, identificar patrones y generar insights precisos para la toma de decisiones.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'AI data analysis finance',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Colaboración Humano-Agente',
    description: 'Combina la potencia de la IA con la experiencia de analistas humanos. Nuestra plataforma facilita una colaboración fluida para un análisis más profundo y estrategias de inversión robustas.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'team collaboration interface',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Seguridad y Confianza',
    description: 'Priorizamos la seguridad de tus datos con encriptación de extremo a extremo y protocolos robustos, asegurando la confidencialidad e integridad de tu información financiera.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'cyber security shield',
  },
];

export function FeaturePresentationSection() {
  return (
    <section id="producto" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Descubre el Poder de Horizont
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Funcionalidades clave diseñadas para potenciar tus decisiones de inversión.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col gap-8 items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="md:w-1/2">
                <Card className="bg-card border-border shadow-xl h-full flex flex-col">
                  <CardHeader className="flex flex-row items-start gap-4 p-6">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <CardTitle className="text-2xl font-semibold text-primary">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-6 pt-0">
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    data-ai-hint={feature.imageHint}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
