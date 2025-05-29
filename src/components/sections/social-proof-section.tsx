
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { GenerateTestimonialsOutput } from '@/ai/flows/generate-testimonials';

interface SocialProofSectionProps {
  testimonials: GenerateTestimonialsOutput['testimonials'];
}

export function SocialProofSection({ testimonials }: SocialProofSectionProps) {
  return (
    <section id="casos-exito" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-card-foreground sm:text-4xl">
            Confían en Nosotros
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Resultados que impulsan el éxito de nuestros clientes.
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-border shadow-lg flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.author.charAt(0)}`} alt={testimonial.author} data-ai-hint="person portrait" />
                      <AvatarFallback>{testimonial.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-primary">{testimonial.author}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/90 italic">&ldquo;{testimonial.text}&rdquo;</p>
                </CardContent>
                <CardFooter className="flex items-center justify-start pt-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Próximamente testimonios de nuestros clientes.</p>
        )}

        {/* Placeholder for client logos - to be filled manually */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-card-foreground mb-6">Algunas empresas que ya potencian sus finanzas con Horizont:</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {['LogoEmpresa1', 'LogoEmpresa2', 'LogoEmpresa3', 'LogoEmpresa4'].map(logo => (
                 <Image key={logo} src={`https://placehold.co/120x60.png?text=${logo}`} alt={logo} width={120} height={60} className="grayscale hover:grayscale-0 transition-all" data-ai-hint="company logo finance" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
