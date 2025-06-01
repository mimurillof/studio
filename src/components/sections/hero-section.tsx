"use client";

import Link from 'next/link';
import { ArrowDown } from 'lucide-react'; // Importar ArrowDown
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { RoughEase } from 'gsap/EasePack'; // Asegúrate de que EasePack esté disponible o instala un paquete compatible si es necesario

// Registrar plugins de GSAP
gsap.registerPlugin(RoughEase);

export function HeroSection() {
  useEffect(() => {
    // Script de animación GSAP
    const mainTimeline = gsap.timeline();

    const polylineAnim = gsap.timeline().to(".polyline", {
        delay: .25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: .05,
        stagger: {
            each: .05,
            from: "end"
        }
    });

    const letterAnim = gsap.timeline().fromTo(".letter", {
        opacity: 0,
        ease: "rough"
    }, {
        opacity: 1,
        ease: "rough({ template: circ.easeOut, strength: 4, points: 50, taper: 'out', randomize: true, clamp: true})",
        stagger: {
            each: .05,
            from: "random"
        }
    });

    mainTimeline.add(polylineAnim)
                .add(letterAnim, "<+=0.15");

    // Limpieza al desmontar el componente
    return () => {
        mainTimeline.kill();
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      {/* El video de fondo se mantiene si lo deseas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={`/videos/Video Hero.mp4?v=${Date.now()}`} type="video/mp4" />
      </video>

      {/* Contenedor para la animación de Horizon */}
      {/* Se integra el HTML de animacion.html aquí, ajustando las rutas de imágenes si es necesario */}
      <div className="ptcom-design__hero__190xlxe z-10"> {/* Asegúrate de que z-index sea apropiado */}
        <div className="ptcom-design__heroContent__190xlxe">
            <svg className="ptcom-design__logo__190xlxe" width="741" height="205" viewBox="0 0 741 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>HORIZON</title>
                {/* Letras H, O, R, I, Z, O, N */}
                <text x="220" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">H</text>
                <text x="300" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">O</text>
                <text x="385" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">R</text>
                <text x="465" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">I</text>
                <text x="500" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">Z</text>
                <text x="570" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">O</text>
                <text x="655" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">N</text>
                
                {/* Icono: Asegúrate de que la ruta a icon.png sea correcta desde la carpeta public */}
                <image className="letter" x="0" y="0" width="205" height="205" href="/icon.png" />
            </svg>

            <ul className="ptcom-design__heroList__190xlxe">
                <li className="polyline">Explore<br/>our artifical<br/>intelligence platform</li>
                <li className="polyline">Time: 3 mns<br/>scroll<br/>to explore</li>
                <li className="polyline">Integrate AI into<br/>operational<br/>decision making</li>
                <li className="polyline">Copyright &#169;2025<br/>HORIZON<br/>Technologies Inc.</li>
            </ul>
        </div>
      </div>

      {/* El indicador de Scroll to Explore se puede mantener o eliminar según prefieras */}
      {/* <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" style={{ color: '#EFEFEF' }} />
        <p className="mt-2 text-sm tracking-wider" style={{ color: '#EFEFEF' }}>
          Scroll to Explore
        </p>
      </div> */}
    </section>
  );
}
