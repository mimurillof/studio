
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>
        </Button>
        <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground text-foreground/90">
          <h1>Política de Privacidad</h1>
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2>1. Introducción</h2>
          <p>Bienvenido a FinAI Advisor. Nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web y utilizas nuestros servicios.</p>

          <h2>2. Información que Recopilamos</h2>
          <p>Podemos recopilar información personal identificable, como tu nombre, dirección de correo electrónico, y cualquier otra información que nos proporciones voluntariamente.</p>
          <p>También podemos recopilar información no personal identificable, como el tipo de navegador, el sistema operativo, y datos de uso del sitio web.</p>

          <h2>3. Cómo Usamos Tu Información</h2>
          <p>Usamos la información que recopilamos para:</p>
          <ul>
            <li>Proveer, operar y mantener nuestro sitio web y servicios.</li>
            <li>Mejorar, personalizar y expandir nuestro sitio web y servicios.</li>
            <li>Entender y analizar cómo utilizas nuestro sitio web y servicios.</li>
            <li>Desarrollar nuevos productos, servicios, características y funcionalidades.</li>
            <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, incluyendo para servicio al cliente, para proporcionarte actualizaciones y otra información relacionada con el sitio web, y para fines de marketing y promoción.</li>
            <li>Enviarte correos electrónicos.</li>
            <li>Encontrar y prevenir fraudes.</li>
          </ul>

          <h2>4. Divulgación de Tu Información</h2>
          <p>No venderemos, distribuiremos ni alquilaremos tu información personal a terceros a menos que tengamos tu permiso o la ley nos obligue a hacerlo.</p>

          <h2>5. Seguridad de Tu Información</h2>
          <p>Hemos implementado medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger tu información personal. Si bien hemos tomado medidas razonables para asegurar la información personal que nos proporcionas, ten en cuenta que ninguna medida de seguridad es perfecta o impenetrable.</p>
          
          <h2>6. Cambios a Esta Política de Privacidad</h2>
          <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.</p>

          <h2>7. Contáctanos</h2>
          <p>Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en <a href="mailto:privacidad@finaivisor.com">privacidad@finaivisor.com</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
