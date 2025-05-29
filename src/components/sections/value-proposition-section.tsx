
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Users, Shield, BarChartBig } from 'lucide-react';

const propositions = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Tecnología Innovadora',
    description: 'Aprovecha el poder de la IA de vanguardia para análisis predictivos y detección de oportunidades que marcan la diferencia.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Enfoque Colaborativo',
    description: 'Nuestra plataforma fusiona la inteligencia artificial con la experiencia humana, permitiendo una toma de decisiones más informada y estratégica.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Seguridad Robusta',
    description: 'Implementamos las más altas medidas de seguridad para proteger tus datos y garantizar la confidencialidad de tus operaciones financieras.',
  },
  {
    icon: <BarChartBig className="h-8 w-8 text-primary" />,
    title: 'Optimización de Decisiones',
    description: 'Transforma datos complejos en insights accionables, ayudándote a optimizar tus estrategias de inversión y maximizar tus rendimientos.',
  },
];

export function ValuePropositionSection() {
  return (
    <section id="soluciones" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            ¿Por Qué FinAI Advisor?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Nuestra ventaja tecnológica para transformar tu enfoque de inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {propositions.map((prop) => (
            <Card key={prop.title} className="bg-card border-border shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                {prop.icon}
                <CardTitle className="text-xl font-semibold text-primary">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

