"use client";

import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoughEase } from 'gsap/EasePack'; // Importar RoughEase

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, RoughEase); // Registrar RoughEase

export function HeroSection() {
  useEffect(() => {
    console.log("🎬 Iniciando animaciones de HORIZON...");
    
    // Animación inicial del hero - basada en el código original
    const heroVideo = document.querySelector(".ptcom-design__heroVideo__190xlxe") as HTMLVideoElement;
    const heroVideoFrame = document.querySelector(".ptcom-design__heroVideoFrame__190xlxe") as HTMLElement;
    const heroSection = document.querySelector(".ptcom-design__hero__190xlxe") as HTMLElement;
    
    console.log("🎯 Elementos encontrados:", {
      video: !!heroVideo,
      videoFrame: !!heroVideoFrame, 
      heroSection: !!heroSection,
      letters: document.querySelectorAll(".letter").length,
      polylines: document.querySelectorAll(".polyline").length
    });
    
    // Timeline principal como en el código original
    const mainTimeline = gsap.timeline();

    // Animación del video (si está presente)
    if (heroVideo) {
      const videoAnim = gsap.timeline().to(heroVideo, {
        opacity: 1,
        duration: 0.75,
        ease: "power4.in",        onComplete: function() {
          setTimeout(function() {
            if (heroVideo && heroVideo.play) {
              heroVideo.play();
            }
          }, 500); // 0.5 segundos de retraso
        }
      });
      mainTimeline.add(videoAnim);
    }    // Animación de los elementos con clase "polyline" (PRIMERO)
    const polylineAnim = gsap.timeline().to(".polyline", {
      delay: 0.25,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.05, // Duración ajustada como en el código de ejemplo
      stagger: {
        each: 0.05,
        from: "end" // Desde el final como en el original
      }
    });    // Animación de las letras del logo (SEGUNDO)
    const letterAnim = gsap.timeline().fromTo(".letter", {
      opacity: 0,
    }, {
      opacity: 1,
      // No se especifica duración explícita para que GSAP use la predeterminada (0.5s)
      // como en el script de ejemplo.
      ease: "rough({ template: circ.easeOut, strength: 4, points: 50, taper: 'out', randomize: true, clamp: true})",
      stagger: {
        each: 0.05,
        from: "random" // Random como en el original
      }
    });

    // Orquestación de las animaciones como en el original
    mainTimeline.add(polylineAnim) // Primero las polyline
                .add(letterAnim, "<+=0.15"); // Luego las letras, 0.15s después del inicio

    console.log("✨ Timeline configurado, iniciando animaciones...");

    // Animación para ocultar el video cuando salgamos de la sección hero
    if (heroVideoFrame && heroSection) {
      ScrollTrigger.create({
        trigger: heroSection,
        start: "bottom 90%",
        end: "bottom top",
        onLeave: () => {
          gsap.to(heroVideoFrame, { opacity: 0, duration: 0.3, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(heroVideoFrame, { opacity: 1, duration: 0.3, ease: "power2.out" });
        }
      });
    }    // Limpieza al desmontar el componente
    return () => {
      mainTimeline.kill();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Video Frame Fijo */}
      <div className="ptcom-design__heroVideoFrame__190xlxe">
        <video
          className="ptcom-design__heroVideo__190xlxe"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Video Hero.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </div>

      {/* Sección Hero */}
      <section className="ptcom-design__hero__190xlxe">
        <h1 className="visually-hidden">Explore Horizont, nuestra plataforma de inteligencia artificial para finanzas.</h1>
        <div className="ptcom-design__heroContent__190xlxe">
          <svg className="ptcom-design__logo__190xlxe" width="741" height="205" viewBox="0 0 741 205" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet">
            <title>HORIZON</title>
            {/* Letras H, O, R, I, Z, O, N */}
            <text x="220" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">H</text>
            <text x="300" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">O</text>
            <text x="385" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">R</text>
            <text x="465" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">I</text>
            <text x="500" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">Z</text>
            <text x="570" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">O</text>            <text x="655" y="140" fontFamily="Arial, Helvetica, sans-serif" fontSize="100" fontWeight="bold" fill="currentColor" className="letter">N</text>              {/* Icono: Usando la imagen HORIZON */}
            <image className="letter" x="0" y="0" width="205" height="205" href="/HORIZON.png" xlinkHref="/HORIZON.png" aria-label="HORIZON Logo" />
          </svg>

          <ul className="ptcom-design__heroList__190xlxe">
            <li className="polyline">Explore<br/>our artificial<br/>intelligence platform</li>
            <li className="polyline">Time: 3 mins<br/>scroll<br/>to explore</li>
            <li className="polyline">Integrate AI into<br/>operational<br/>decision making</li>
            <li className="polyline">Copyright &#169;2025<br/>HORIZON<br/>Technologies Inc.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
