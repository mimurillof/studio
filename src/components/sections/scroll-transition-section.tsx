"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function ScrollTransitionSection() {
  useEffect(() => {
    // Elementos del header section
    const headerWrap = document.querySelector(".ptcom-design__headerSectionWrap__1a95jg7");
    const headerOverlay = document.querySelector(".ptcom-design__headerSectionOverlay__1a95jg7");
    const headlineText = document.querySelector(".ptcom-design__headlineText__1a95jg7");
    const highlightText = document.querySelector(".ptcom-design__highlight__1a95jg7");
    const subFooter = document.querySelector(".ptcom-design__subFooter__1a95jg7");
    const subHeaderContent = document.querySelector(".ptcom-design__subHeader__13ywd4e");
    
    // Estados iniciales
    if (highlightText) gsap.set(highlightText, { yPercent: 50, opacity: 0 }); 
    if (subFooter) gsap.set(subFooter, { yPercent: 50, opacity: 0 }); 
    if (subHeaderContent) gsap.set(subHeaderContent, { opacity: 0 }); 
    if (headlineText) gsap.set(headlineText, { opacity: 0, y: 20 });    // Timeline principal de scroll
    const scrollAnimTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerWrap,
        start: "top top", 
        end: "+=100%",   
        pin: true,
        scrub: 1, 
      }
    });

    // Animaciones del timeline
    if (headerOverlay) {
      scrollAnimTimeline.to(headerOverlay, { 
        opacity: 0, 
        duration: 0.2
      });
    }

    if (subHeaderContent) {
      scrollAnimTimeline.to(subHeaderContent, { 
        opacity: 1,
        duration: 0.15 
      }, (headerOverlay ? "-=0.1" : ">"));
    }

    if (headlineText) {
      scrollAnimTimeline.to(headlineText, { 
        opacity: 1, 
        y: 0, 
        duration: 0.3 
      }, ">+=0.1");
    }

    if (highlightText) {
      scrollAnimTimeline.to(highlightText, {
        yPercent: 0,
        opacity: 1,
        duration: 0.3 
      }, ">+=0.1") 
      .to(highlightText, { 
        backgroundImage: "linear-gradient(122deg,#1e1f2b 100%,#36A8DC 120%,#13c9ba 250%)",
        duration: 0.3 
      }, "<");
    }

    if (subFooter) {
      scrollAnimTimeline.to(subFooter, {
        yPercent: 0,
        opacity: 1,
        duration: 0.25 
      }, ">+=0.1");
    }

    // Limpieza
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="ptcom-design__headerSectionWrap__1a95jg7">
      <div className="ptcom-design__headerSection__1a95jg7">
        <div className="ptcom-design__headerSectionOverlay__1a95jg7" aria-hidden="true"></div>
        
        <div className="ptcom-design__subHeader__1a95jg7">
          <div className="ptcom-design__subHeader__13ywd4e">
            <div>Software</div>
            <div>{"{ HORIZONT }"}</div>
            <a className="ptcom-design__link__13ywd4e" href="#producto">Empezar</a>
          </div>
        </div>
        
        <h2 className="ptcom-design__headline__1a95jg7">
          <span className="ptcom-design__headlineText__1a95jg7">Más allá del chat.</span> 
          <span className="ptcom-design__highlight__1a95jg7">Autonomía Empresarial</span>
        </h2>
        
        <div className="ptcom-design__subFooter__1a95jg7">
          <div className="ptcom-design__subFooter__ddgibq">
            <p className="ptcom-design__subFooterText__ddgibq">
              <span>Convierte la IA en tus Aplicaciones</span><br/>
              en Agentes y Automatizaciones
            </p>
            <svg className="ptcom-design__scrollIcon__ddgibq" xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
              <path d="M8.97491 1.93314V15.7689L16 9.8314V12.2892L8 19.0276L0 12.2892V9.8314L6.96774 15.7689V1.93314H0V0H16V1.93314H8.97491Z" fill="#1F1F2D"></path>
            </svg>
            <p className="ptcom-design__scrollIconText__ddgibq">Scroll para Explorar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
