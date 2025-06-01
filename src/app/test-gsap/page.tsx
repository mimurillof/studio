// Prueba simple de GSAP
"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function TestGSAP() {
  useEffect(() => {
    console.log("🎬 GSAP Test iniciando...");
    console.log("GSAP version:", gsap.version);
    
    // Animación simple
    gsap.set(".test-element", { opacity: 0 });
    gsap.to(".test-element", { 
      opacity: 1, 
      duration: 2,
      onComplete: () => console.log("✅ Animación completada")
    });
  }, []);

  return (
    <div style={{ padding: '50px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Prueba GSAP</h1>
      <div className="test-element">
        Este elemento debería aparecer gradualmente
      </div>
    </div>
  );
}
