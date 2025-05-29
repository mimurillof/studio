
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsOfServicePage() {
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
          <h1>Términos de Servicio</h1>
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Acuerdo de Términos</h2>
          <p>Estos Términos de Servicio constituyen un acuerdo legalmente vinculante hecho entre tú, ya sea personalmente o en nombre de una entidad (“tú”) y FinAI Advisor (“Compañía”, “nosotros”, “nos”, o “nuestro”), concerniente a tu acceso y uso del sitio web FinAI Advisor así como cualquier otra forma de medio, canal de medios, sitio web móvil o aplicación móvil relacionada, enlazada, o de otra manera conectada a ello (colectivamente, el “Sitio”).</p>
          <p>Aceptas que al acceder al Sitio, has leído, entendido, y aceptado estar obligado por todos estos Términos de Servicio. Si no estás de acuerdo con todos estos Términos de Servicio, entonces se te prohíbe expresamente usar el Sitio y debes discontinuar su uso inmediatamente.</p>

          <h2>2. Derechos de Propiedad Intelectual</h2>
          <p>A menos que se indique lo contrario, el Sitio es nuestra propiedad propietaria y todo el código fuente, bases de datos, funcionalidad, software, diseños de sitios web, audio, video, texto, fotografías, y gráficos en el Sitio (colectivamente, el “Contenido”) y las marcas comerciales, marcas de servicio, y logos contenidos en él (las “Marcas”) son propiedad nuestra o están controlados por nosotros o licenciados a nosotros, y están protegidos por leyes de derechos de autor y marcas registradas y varios otros derechos de propiedad intelectual.</p>
          
          <h2>3. Representaciones del Usuario</h2>
          <p>Al usar el Sitio, representas y garantizas que: (1) toda la información de registro que envíes será verdadera, precisa, actual, y completa; (2) mantendrás la exactitud de dicha información y la actualizarás prontamente según sea necesario; (3) tienes la capacidad legal y aceptas cumplir con estos Términos de Servicio; (4) no eres menor de edad en la jurisdicción en la que resides; (5) no accederás al Sitio a través de medios automatizados o no humanos, ya sea a través de un bot, script o de otra manera; (6) no utilizarás el Sitio para ningún propósito ilegal o no autorizado; y (7) tu uso del Sitio no violará ninguna ley o regulación aplicable.</p>
          
          <h2>4. Actividades Prohibidas</h2>
          <p>No puedes acceder o usar el Sitio para ningún propósito que no sea aquel para el cual hacemos disponible el Sitio. El Sitio no puede ser usado en conexión con ningún esfuerzo comercial excepto aquellos que son específicamente endosados o aprobados por nosotros.</p>
          <p>Como usuario del Sitio, aceptas no:</p>
          <ul>
            <li>Recuperar sistemáticamente datos u otro contenido del Sitio para crear o compilar, directa o indirectamente, una colección, compilación, base de datos o directorio sin nuestro permiso por escrito.</li>
            <li>Hacer cualquier uso no autorizado del Sitio, incluyendo la recopilación de nombres de usuario y/o direcciones de correo electrónico de usuarios por medios electrónicos u otros con el fin de enviar correos electrónicos no solicitados, o crear cuentas de usuario por medios automatizados o bajo falsos pretextos.</li>
            <li>Usar un agente de compras o agente de compras para realizar compras en el Sitio.</li>
          </ul>

          <h2>5. Ley Aplicable</h2>
          <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, y renuncias irrevocablemente a la jurisdicción exclusiva de los tribunales de Valencia para resolver cualquier disputa que surja en conexión con estos Términos.</p>

          <h2>6. Limitación de Responsabilidad</h2>
          <p>En ningún caso nosotros o nuestros directores, empleados o agentes seremos responsables ante ti o cualquier tercero por daños directos, indirectos, consecuentes, ejemplares, incidentales, especiales o punitivos, incluyendo lucro cesante, pérdida de ingresos, pérdida de datos u otros daños derivados de tu uso del sitio, incluso si hemos sido advertidos de la posibilidad de tales daños.</p>
          
          <h2>7. Contacto</h2>
          <p>Para resolver una queja concerniente al Sitio o para recibir más información concerniente al uso del Sitio, por favor contáctanos en <a href="mailto:legal@finaivisor.com">legal@finaivisor.com</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
