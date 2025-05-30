import Link from 'next/link';
import { ArrowDown } from 'lucide-react'; // Importar ArrowDown

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={`/videos/Video Hero.mp4?v=${Date.now()}`} type="video/mp4" />
      </video>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: '#EFEFEF' }} // Aplicar color de texto específico
        >
          <span className="block">Transformando datos</span>
          <span className="block">con Inteligencia</span>
        </h1>
      </div>
      {/* Indicador de Scroll to Explore */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" style={{ color: '#EFEFEF' }} />
        <p className="mt-2 text-sm tracking-wider" style={{ color: '#EFEFEF' }}>
          Scroll to Explore
        </p>
      </div>
    </section>
  );
}
