
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturePresentationSection } from '@/components/sections/feature-presentation-section';
import { SocialProofSection } from '@/components/sections/social-proof-section';
import { ValuePropositionSection } from '@/components/sections/value-proposition-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { LeadMagnetCtaSection } from '@/components/sections/lead-magnet-cta-section';
import { generateTestimonials, type GenerateTestimonialsOutput } from '@/ai/flows/generate-testimonials';
import { ContactSection } from '@/components/sections/contact-section';

export default async function HomePage() {
  let testimonialsData: GenerateTestimonialsOutput = { testimonials: [] };
  try {
    testimonialsData = await generateTestimonials({ numberOfTestimonials: 3 });
  } catch (error) {
    console.error("Failed to generate testimonials:", error);
    // Fallback or default testimonials
    testimonialsData = {
      testimonials: [
        { author: "Elena Vítores", title: "Analista Financiera Senior", text: "Horizont ha revolucionado nuestra capacidad de análisis. La combinación de IA y supervisión humana es simplemente brillante." },
        { author: "Marcos Jiménez", title: "Inversor Particular", text: "Como inversor, valoro la claridad y precisión. Esta plataforma me da la confianza para tomar decisiones informadas." },
        { author: "Sofía Lorente", title: "Gestora de Carteras", text: "La eficiencia y los insights que obtenemos con Horizont son inigualables. Una herramienta esencial en el mercado actual." },
      ]
    };
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturePresentationSection />
        <ValuePropositionSection />
        <SocialProofSection testimonials={testimonialsData.testimonials} />
        <AboutUsSection />
        <LeadMagnetCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
