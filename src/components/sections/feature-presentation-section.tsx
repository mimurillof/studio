"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./interactive-presentation.css";

// Registrar el plugin de ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturePresentationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationInitialized = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || animationInitialized.current) return;

    animationInitialized.current = true;

    const section = sectionRef.current;
    const highlighterBtn = gsap.utils.toArray<HTMLElement>(".highlighter-btn");
    const browserHeaderText = gsap.utils.toArray<HTMLElement>(
      ".browser-header-text"
    );
    const svgMaskPolygon = section.querySelector(
      "#polygon-area polygon"
    ) as SVGPolygonElement;

    // Videos
    const aiAppVideo = section.querySelector(
      ".ai-app-video"
    ) as HTMLVideoElement;
    const actionDrivenVideo = section.querySelector(
      ".action-driven-screen"
    ) as HTMLVideoElement;
    const automationVideo = section.querySelector(
      ".automation-screen"
    ) as HTMLVideoElement;

    // Beacons (Círculos A, B, C)
    const beaconA = section.querySelector(".beacon-A") as SVGCircleElement;
    const beaconB = section.querySelector(".beacon-B") as SVGCircleElement;
    const beaconC = section.querySelector(".beacon-C") as SVGCircleElement;
    const beaconAText = section.querySelector(".beacon-A-text") as SVGTextElement;
    const beaconBText = section.querySelector(".beacon-B-text") as SVGTextElement;
    const beaconCText = section.querySelector(".beacon-C-text") as SVGTextElement;

    // Dialogs
    const dialogsAiApp = gsap.utils.toArray<HTMLElement>(
      ".dialog-ai-app-1, .dialog-ai-app-2, .dialog-ai-app-3"
    );
    const dialogsActionLogic = gsap.utils.toArray<HTMLElement>(
      ".dialog-action-logic-1, .dialog-action-logic-2, .dialog-action-logic-3"
    );
    const dialogsAutomation = gsap.utils.toArray<HTMLElement>(
      ".dialog-automation-1, .dialog-automation-2, .dialog-automation-3"
    );

    // --- Configurar videos para reproducción híbrida (play + scrub) ---
    const videos = [aiAppVideo, actionDrivenVideo, automationVideo];
    
    // Variables para el sistema híbrido
    let lastActiveVideo: HTMLVideoElement | null = null;
    let targetVideoTime: { [key: string]: number } = {};
    const PLAY_INTERVAL = 3; // Segundos que el video puede reproducirse libremente entre updates
    const SEEK_THRESHOLD = 5; // Segundos de diferencia para forzar seek

    // Configurar videos
    videos.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.playbackRate = 1;
      }
    });

    // Función para actualizar el tiempo del video con reproducción híbrida
    const updateVideoTime = (
      video: HTMLVideoElement,
      progress: number,
      startProgress: number,
      endProgress: number
    ) => {
      if (!video || !video.duration) return;
      
      const videoId = video.className;
      
      // Normalizar el progreso dentro del rango de esta sección
      const sectionProgress = Math.max(0, Math.min(1, 
        (progress - startProgress) / (endProgress - startProgress)
      ));
      
      const targetTime = sectionProgress * video.duration;
      
      // Si es un video diferente al último activo
      if (lastActiveVideo !== video) {
        if (lastActiveVideo) {
          lastActiveVideo.pause();
        }
        video.currentTime = targetTime;
        lastActiveVideo = video;
        targetVideoTime[videoId] = targetTime;
        return;
      }
      
      // Guardar el tiempo objetivo
      targetVideoTime[videoId] = targetTime;
      
      // Calcular diferencia entre posición actual y objetivo
      const timeDiff = targetTime - video.currentTime;
      const absDiff = Math.abs(timeDiff);
      
      // Si la diferencia es muy grande, hacer seek directo
      if (absDiff > SEEK_THRESHOLD) {
        video.pause();
        video.currentTime = targetTime;
        return;
      }
      
      // Si estamos detrás del objetivo (scrolling hacia adelante)
      if (timeDiff > 0.5) {
        // Reproducir el video hacia adelante
        video.playbackRate = Math.min(2, 1 + (absDiff / PLAY_INTERVAL));
        if (video.paused) {
          video.play().catch(() => {}); // Ignorar errores de autoplay
        }
      }
      // Si estamos adelante del objetivo (scrolling hacia atrás)
      else if (timeDiff < -0.5) {
        // Hacer seek suave hacia atrás (no podemos reproducir hacia atrás)
        video.pause();
        gsap.to(video, {
          currentTime: targetTime,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true
        });
      }
      // Si estamos cerca del objetivo
      else {
        // Reproducir a velocidad normal
        video.playbackRate = 1;
        if (video.paused && absDiff > 0.1) {
          video.play().catch(() => {});
        }
      }
    };

    // --- Timelines de Animación ---
    
    // Proporciones basadas en requerimiento:
    // - Primer video: 5 scrolls (sección 1+2)
    // - Segundo video: 10 scrolls (sección 3)
    const totalDuration = 15;
    const section1End = 2.5; // Mitad del primer video
    const section2End = 5;   // Fin del primer video / Inicio del segundo

    // Timelines para los botones y textos de cabecera
    const navTimeline = gsap
      .timeline()
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" }) // Inicia activo
      .to(browserHeaderText[0], { opacity: 1 }, "<")

      // Transición 1 -> 2 (en segundo 5, que es 33% del timeline)
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#B5B7B6" }, section1End)
      .to(browserHeaderText[0], { opacity: 0 }, section1End)
      .to(highlighterBtn[1], { "--highlighter-btn-color": "#efefef" }, section1End)
      .to(browserHeaderText[1], { opacity: 1 }, section1End)

      // Transición 2 -> 3 (en segundo 10, que es 66% del timeline)
      .to(highlighterBtn[1], { "--highlighter-btn-color": "#B5B7B6" }, section2End)
      .to(browserHeaderText[1], { opacity: 0 }, section2End)
      .to(highlighterBtn[2], { "--highlighter-btn-color": "#efefef" }, section2End)
      .to(browserHeaderText[2], { opacity: 1 }, section2End);

    // Forzar estados iniciales FUERA del timeline
    // El segundo video debe estar oculto para no bloquear al primero
    gsap.set(aiAppVideo, { opacity: 1, visibility: "visible", zIndex: 2 });
    gsap.set(automationVideo, { opacity: 0, visibility: "hidden", zIndex: 1 });

    // Timelines para los videos
    const videoTimeline = gsap
      .timeline()
      // Mantener video 1 visible durante sección 1 y 2
      .to(aiAppVideo, { opacity: 1, duration: section2End }, 0)
      
      // Transición en section2End (punto 5)
      // Primero hacer visible el segundo video, luego hacer la transición
      .set(automationVideo, { visibility: "visible" }, section2End - 0.1)
      .to(aiAppVideo, { opacity: 0, zIndex: 1, duration: 1 }, section2End) 
      .to(automationVideo, { opacity: 1, zIndex: 2, duration: 1 }, section2End)
      
      // Mantener video 2 visible durante sección 3
      .to(automationVideo, { opacity: 1, duration: totalDuration - section2End - 1 }, section2End + 1);

    // Timelines para los beacons (círculos) - con posiciones dinámicas por sección
    const beaconTimeline = gsap
      .timeline()
      // Inicialización - todos con baja opacidad
      .set([beaconA, beaconB, beaconC], { opacity: 0.2 })
      .set([beaconAText, beaconBText, beaconCText], { opacity: 0.2 })
      
      // === SECCIÓN AI APP ===
      // Posicionar beacons para AI App Video (dentro de las áreas de máscara)
      .to(beaconA, { attr: { cx: 490, cy: 330 } }, 0)      // Centro área noticias
      .to(beaconAText, { attr: { x: 482, y: 338 } }, 0)
      .to(beaconB, { attr: { cx: 490, cy: 740 } }, 0)      // Centro área artículos
      .to(beaconBText, { attr: { x: 482, y: 748 } }, 0)
      .to(beaconC, { attr: { cx: 1240, cy: 600 } }, 0)     // Centro panel derecho
      .to(beaconCText, { attr: { x: 1232, y: 608 } }, 0)
      
      // Dialog 1 - Beacon A activo
      .to(beaconA, { opacity: 1 }, "aiAppDialog1")
      .to(beaconAText, { opacity: 1 }, "aiAppDialog1")
      .to(beaconA, { opacity: 0.2 }, "aiAppDialog1+=1")
      .to(beaconAText, { opacity: 0.2 }, "aiAppDialog1+=1")
      
      // Dialog 2 - Beacon B activo
      .to(beaconB, { opacity: 1 }, "aiAppDialog2")
      .to(beaconBText, { opacity: 1 }, "aiAppDialog2")
      .to(beaconB, { opacity: 0.2 }, "aiAppDialog2+=1")
      .to(beaconBText, { opacity: 0.2 }, "aiAppDialog2+=1")
      
      // Dialog 3 - Beacon C activo
      .to(beaconC, { opacity: 1 }, "aiAppDialog3")
      .to(beaconCText, { opacity: 1 }, "aiAppDialog3")
      .to(beaconC, { opacity: 0.2 }, "aiAppDialog3+=1")
      .to(beaconCText, { opacity: 0.2 }, "aiAppDialog3+=1")

      // === TRANSICIÓN SECCIÓN 1 -> 2 ===
      // Ocultar todos los beacons antes de reposicionar
      .to([beaconA, beaconB, beaconC], { opacity: 0, duration: 0.5 }, "sectionTransition1")
      .to([beaconAText, beaconBText, beaconCText], { opacity: 0, duration: 0.5 }, "sectionTransition1")

      // === SECCIÓN ACTION LOGIC ===
      // Reposicionar beacons (mientras están ocultos) - Solo usamos A para diálogo D
      .to(beaconA, { attr: { cx: 775, cy: 425 }, duration: 0.1 }, "sectionTransition1+=0.5")  // Centro área análisis
      .to(beaconAText, { attr: { x: 767, y: 433 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconB, { attr: { cx: 775, cy: 550 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconBText, { attr: { x: 767, y: 558 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconC, { attr: { cx: 775, cy: 650 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconCText, { attr: { x: 767, y: 658 }, duration: 0.1 }, "sectionTransition1+=0.5")
      
      // Mostrar beacons con baja opacidad después de reposicionar
      .to([beaconA, beaconB, beaconC], { opacity: 0.2, duration: 0.3 }, "sectionTransition1+=0.7")
      .to([beaconAText, beaconBText, beaconCText], { opacity: 0.2, duration: 0.3 }, "sectionTransition1+=0.7")
      
      // Dialog D (usa beacon A) - Beacon A activo
      .to(beaconA, { opacity: 1 }, "actionLogicDialog1")
      .to(beaconAText, { opacity: 1 }, "actionLogicDialog1")
      .to(beaconA, { opacity: 0.2 }, "actionLogicDialog1+=1")
      .to(beaconAText, { opacity: 0.2 }, "actionLogicDialog1+=1")
      
      // Dialog 2 - Beacon B activo
      .to(beaconB, { opacity: 1 }, "actionLogicDialog2")
      .to(beaconBText, { opacity: 1 }, "actionLogicDialog2")
      .to(beaconB, { opacity: 0.2 }, "actionLogicDialog2+=1")
      .to(beaconBText, { opacity: 0.2 }, "actionLogicDialog2+=1")
      
      // Dialog 3 - Beacon C activo
      .to(beaconC, { opacity: 1 }, "actionLogicDialog3")
      .to(beaconCText, { opacity: 1 }, "actionLogicDialog3")
      .to(beaconC, { opacity: 0.2 }, "actionLogicDialog3+=1")
      .to(beaconCText, { opacity: 0.2 }, "actionLogicDialog3+=1")

      // === TRANSICIÓN SECCIÓN 2 -> 3 ===
      // Ocultar todos los beacons antes de reposicionar
      .to([beaconA, beaconB, beaconC], { opacity: 0, duration: 0.5 }, "sectionTransition2")
      .to([beaconAText, beaconBText, beaconCText], { opacity: 0, duration: 0.5 }, "sectionTransition2")

      // === SECCIÓN AUTOMATION ===
      // Reposicionar beacons (mientras están ocultos) - Dentro de las áreas de máscara
      .to(beaconA, { attr: { cx: 425, cy: 450 }, duration: 0.1 }, "sectionTransition2+=0.5")   // Centro área chat
      .to(beaconAText, { attr: { x: 417, y: 458 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconB, { attr: { cx: 1000, cy: 450 }, duration: 0.1 }, "sectionTransition2+=0.5")  // Centro respuestas
      .to(beaconBText, { attr: { x: 992, y: 458 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconC, { attr: { cx: 750, cy: 725 }, duration: 0.1 }, "sectionTransition2+=0.5")   // Centro documentos
      .to(beaconCText, { attr: { x: 742, y: 733 }, duration: 0.1 }, "sectionTransition2+=0.5")
      
      // Mostrar beacons con baja opacidad después de reposicionar
      .to([beaconA, beaconB, beaconC], { opacity: 0.2, duration: 0.3 }, "sectionTransition2+=0.7")
      .to([beaconAText, beaconBText, beaconCText], { opacity: 0.2, duration: 0.3 }, "sectionTransition2+=0.7")
      
      // Dialog 1 - Beacon A activo
      .to(beaconA, { opacity: 1 }, "automationDialog1")
      .to(beaconAText, { opacity: 1 }, "automationDialog1")
      .to(beaconA, { opacity: 0.2 }, "automationDialog1+=1")
      .to(beaconAText, { opacity: 0.2 }, "automationDialog1+=1")
      
      // Dialog 2 - Beacon B activo
      .to(beaconB, { opacity: 1 }, "automationDialog2")
      .to(beaconBText, { opacity: 1 }, "automationDialog2")
      .to(beaconB, { opacity: 0.2 }, "automationDialog2+=1")
      .to(beaconBText, { opacity: 0.2 }, "automationDialog2+=1")
      
      // Dialog 3 - Beacon C activo
      .to(beaconC, { opacity: 1 }, "automationDialog3")
      .to(beaconCText, { opacity: 1 }, "automationDialog3")
      .to(beaconC, { opacity: 0.2 }, "automationDialog3+=1")
      .to(beaconCText, { opacity: 0.2 }, "automationDialog3+=1");

    // Timelines para los dialogs con movimiento Y (duraciones extendidas)
    const dialogsTimeline = gsap
      .timeline()
      .to(dialogsAiApp[0], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog1")
      .to(dialogsAiApp[0], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog1+=2")
      .to(dialogsAiApp[1], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog2")
      .to(dialogsAiApp[1], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog2+=2")
      .to(dialogsAiApp[2], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog3")
      .to(dialogsAiApp[2], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog3+=2")

      .to(dialogsActionLogic[0], { opacity: 1, scale: 1, y: 0 }, "actionLogicDialog1")
      .to(
        dialogsActionLogic[0],
        { opacity: 0, scale: 0.9, y: -20 },
        "actionLogicDialog1+=2"
      )
      .to(dialogsActionLogic[1], { opacity: 1, scale: 1, y: 0 }, "actionLogicDialog2")
      .to(
        dialogsActionLogic[1],
        { opacity: 0, scale: 0.9, y: -20 },
        "actionLogicDialog2+=2"
      )
      .to(dialogsActionLogic[2], { opacity: 1, scale: 1, y: 0 }, "actionLogicDialog3")
      .to(
        dialogsActionLogic[2],
        { opacity: 0, scale: 0.9, y: -20 },
        "actionLogicDialog3+=2"
      )

      .to(dialogsAutomation[0], { opacity: 1, scale: 1, y: 0 }, "automationDialog1")
      .to(
        dialogsAutomation[0],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog1+=2"
      )
      .to(dialogsAutomation[1], { opacity: 1, scale: 1, y: 0 }, "automationDialog2")
      .to(
        dialogsAutomation[1],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog2+=2"
      )
      .to(dialogsAutomation[2], { opacity: 1, scale: 1, y: 0 }, "automationDialog3")
      .to(
        dialogsAutomation[2],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog3+=2"
      );

    // Timeline para la máscara SVG - Sin máscaras, video siempre visible
    const maskTimeline = gsap
      .timeline()
      // Máscara completamente abierta desde el inicio (video totalmente visible)
      .set(svgMaskPolygon, { attr: { points: "1600,900 0,900 0,0 1600,0" } });



    // --- TIMELINE PRINCIPAL ---

    const mainTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalDuration * 100}%`,
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Video scrubbing con zonas de pausa
            // Primer video (5 scrolls): 0% - 33.3% del scroll
            // Segundo video (10 scrolls): 33.3% - 100% del scroll
            const splitPoint = 5 / 15; // 0.3333...
            
            // Zonas de pausa para el primer video (normalizadas al rango 0-splitPoint)
            // Pausa en B: progreso ~8% a ~12% (donde aparece aiAppDialog2)
            // Pausa en C: progreso ~13% a ~20% (donde aparece aiAppDialog3)
            const pauseB_start = 0.08;
            const pauseB_end = 0.12;
            const pauseC_start = 0.13;
            const pauseC_end = 0.20;
            
            if (progress <= splitPoint) {
              // Calcular el tiempo de video ajustado con zonas de pausa
              let adjustedProgress = progress;
              
              // Si estamos en zona de pausa B
              if (progress >= pauseB_start && progress < pauseB_end) {
                adjustedProgress = pauseB_start; // Congelar en el inicio de pausa B
              }
              // Si pasamos la pausa B, ajustar el progreso
              else if (progress >= pauseB_end && progress < pauseC_start) {
                // Restar la duración de la pausa B
                adjustedProgress = progress - (pauseB_end - pauseB_start);
              }
              // Si estamos en zona de pausa C
              else if (progress >= pauseC_start && progress < pauseC_end) {
                adjustedProgress = pauseC_start - (pauseB_end - pauseB_start); // Congelar
              }
              // Si pasamos la pausa C
              else if (progress >= pauseC_end) {
                // Restar ambas pausas
                adjustedProgress = progress - (pauseB_end - pauseB_start) - (pauseC_end - pauseC_start);
              }
              
              updateVideoTime(aiAppVideo, adjustedProgress, 0, splitPoint - (pauseB_end - pauseB_start) - (pauseC_end - pauseC_start));
            }
            // Sección 3: Automation (33.3% - 100%)
            else {
              updateVideoTime(automationVideo, progress, splitPoint, 1);
            }
          },
        },
      })
      .addLabel("start", 0)
      .add(navTimeline, "start")
      .add(videoTimeline, "start")
      
      // === SECCIÓN 1: AI App (0 - 5) - Diálogos distribuidos ===
      .addLabel("aiAppDialog1", 0.5)      // Primer diálogo
      .addLabel("aiAppDialog2", 2.0)      // Segundo diálogo (más espacio)
      .addLabel("aiAppDialog3", 3.5)      // Tercer diálogo
      .addLabel("section1_end", section1End)
      
      // Transición suave entre sección 1 y 2
      .addLabel("sectionTransition1", section1End - 0.2)
      .addLabel("section2_start", section1End)
      
      // === SECCIÓN 2: Action Logic (5 - 8) - Diálogo D ===
      .addLabel("actionLogicDialog1", section2End + 0.5)  // 5.5 - Diálogo D
      .addLabel("actionLogicDialog2", section2End + 1.5)  // 6.5
      .addLabel("actionLogicDialog3", section2End + 2.5)  // 7.5
      .addLabel("section2_end", section2End)
      
      // Transición suave entre sección 2 y 3
      .addLabel("sectionTransition2", section2End - 0.2)
      .addLabel("section3_start", section2End)
      
      // === SECCIÓN 3: Automation (8 - 15) - Diálogos A, B, C distribuidos ===
      .addLabel("automationDialog1", 9)     // Diálogo A del chat
      .addLabel("automationDialog2", 11.5)  // Diálogo B respuestas
      .addLabel("automationDialog3", 14)    // Diálogo C documentos
      .addLabel("end", totalDuration)
      
      .add(dialogsTimeline, 0)
      .add(beaconTimeline, 0)
      .add(maskTimeline, 0);

    // Configuración inicial
    gsap.set(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" });
    gsap.set([...dialogsAiApp, ...dialogsActionLogic, ...dialogsAutomation], {
      opacity: 0,
      scale: 0.9,
      y: 48,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="producto" className="highlighter-section">
      <div className="highlighter-container">
        <header className="highlighter-header">
          <div className="highlighter-headline-wrap">
            <h2 className="highlighter-headline">Más Allá del Chat</h2>
            <p className="highlighter-header-text">Explora AIP</p>
          </div>
          <nav className="highlighter-nav">
            <div
              className="highlighter-btn"
              data-index="01"
              style={
                { "--highlighter-btn-color": "#efefef" } as React.CSSProperties
              }
            >
              App de IA
            </div>
            <div
              className="highlighter-btn"
              data-index="02"
              style={
                { "--highlighter-btn-color": "#B5B7B6" } as React.CSSProperties
              }
            >
              Lógica Dirigida por Acciones
            </div>
            <div
              className="highlighter-btn"
              data-index="03"
              style={
                { "--highlighter-btn-color": "#B5B7B6" } as React.CSSProperties
              }
            >
              Automatización
            </div>
          </nav>
        </header>
        <div className="browser">
          <div className="browser-header">
            <span className="browser-header-text" style={{ opacity: 1 }}>
              App de IA
            </span>
            <span className="browser-header-text" style={{ opacity: 0 }}>
              Lógica Dirigida por Acciones
            </span>
            <span className="browser-header-text" style={{ opacity: 0 }}>
              Automatización
            </span>
          </div>
          <div className="browser-body">
            <div className="highlighter-img-container">
              <svg
                className="highlighter-svg"
                width="1600"
                height="900"
                viewBox="0 0 1600 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="beacon-gradient"
                    gradientTransform="rotate(122)"
                  >
                    <stop offset="0%" stopColor="#9881f3"></stop>
                    <stop offset="100%" stopColor="#13c9ba"></stop>
                  </linearGradient>
                </defs>
                <mask id="polygon-area">
                  <rect width="100%" height="100%" fill="white"></rect>
                  <polygon
                    fill="black"
                    points="1600,900 0,900 0,0 1600,0"
                  ></polygon>
                </mask>
                <polygon
                  points="1600,900 0,900 0,0 1600,0"
                  fill="black"
                  mask="url(#polygon-area)"
                  fillOpacity="0.7"
                ></polygon>
                <circle
                  className="beacon-A"
                  cx="844"
                  cy="175"
                  r="22"
                  fill="url(#beacon-gradient)"
                  stroke="#efefef"
                  style={{ opacity: 1 }}
                ></circle>
                <text
                  className="svg-text beacon-A-text"
                  x="836"
                  y="183"
                  fill="#ffffff"
                >
                  A
                </text>
                <circle
                  className="beacon-B"
                  cx="844"
                  cy="483"
                  r="22"
                  fill="url(#beacon-gradient)"
                  stroke="#efefef"
                  style={{ opacity: 1 }}
                ></circle>
                <text
                  className="svg-text beacon-B-text"
                  x="836"
                  y="491"
                  fill="#ffffff"
                >
                  B
                </text>
                <circle
                  className="beacon-C"
                  cx="1426"
                  cy="463"
                  r="22"
                  fill="url(#beacon-gradient)"
                  stroke="#efefef"
                  style={{ opacity: 1 }}
                ></circle>
                <text
                  className="svg-text beacon-C-text"
                  x="1418"
                  y="471"
                  fill="#ffffff"
                >
                  C
                </text>
              </svg>

              {/* Dialogs para AI App */}
              <div className="dialog dialog-ai-app-1" style={{ opacity: 0 }}>
                <div className="dialog-icon">
                  <span className="dialog-letter">A</span>
                </div>
                <p>
                  Noticias personalizadas y relevantes para tu portafolio
                </p>
              </div>
              <div className="dialog dialog-ai-app-2" style={{ opacity: 0 }}>
                <div className="dialog-icon">
                  <span className="dialog-letter">B</span>
                </div>
                <p>
                  Busqueda activa de opiniones y analisis de expertos
                </p>
              </div>
              <div className="dialog dialog-ai-app-3" style={{ opacity: 0 }}>
                <div className="dialog-icon">
                  <span className="dialog-letter">C</span>
                </div>
                <p>Control total de los activos de tu portafolio</p>
              </div>

              {/* Video AI App */}
              <video
                className="highlighter-video ai-app-video"
                muted
                playsInline
                preload="auto"
                style={{ opacity: 1 }}
              >
                <source
                  src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764891804/video_1_z2fh0y.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Dialogs para Action Logic */}
              <div
                className="dialog dialog-action-logic-1"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">D</span>
                </div>
                <p>
                  Analisis cuantitativo automatico y asistido
                </p>
              </div>
              <div
                className="dialog dialog-action-logic-2"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">B</span>
                </div>
                <p>
                  Las herramientas permiten a la IA proponer y emprender
                  acciones del mundo real
                </p>
              </div>
              <div
                className="dialog dialog-action-logic-3"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">C</span>
                </div>
                <p>Ver automatización vinculada</p>
              </div>



              {/* Dialogs para Automation */}
              <div
                className="dialog dialog-automation-1"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">A</span>
                </div>
                <p>
                  Chat vinculado y personalizado para responder tus preguntas
                </p>
              </div>
              <div
                className="dialog dialog-automation-2"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">B</span>
                </div>
                <p>
                  Respuestas rapidas para toma de decisiones
                </p>
              </div>
              <div
                className="dialog dialog-automation-3"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">C</span>
                </div>
                <p>Añada documentos e imagenes de contexto</p>
              </div>

              {/* Video Automation */}
              <video
                className="highlighter-video automation-screen"
                muted
                playsInline
                preload="auto"
                style={{ opacity: 0 }}
              >
                <source
                  src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764893594/video_2_xnm6ve.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
