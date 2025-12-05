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
      // Posicionar beacons para AI App Video
      .to(beaconA, { attr: { cx: 844, cy: 175 } }, 0)
      .to(beaconAText, { attr: { x: 836, y: 183 } }, 0)
      .to(beaconB, { attr: { cx: 844, cy: 483 } }, 0)
      .to(beaconBText, { attr: { x: 836, y: 491 } }, 0)
      .to(beaconC, { attr: { cx: 1426, cy: 463 } }, 0)
      .to(beaconCText, { attr: { x: 1418, y: 471 } }, 0)
      
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
      // Reposicionar beacons (mientras están ocultos)
      .to(beaconA, { attr: { cx: 792, cy: 303 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconAText, { attr: { x: 784, y: 311 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconB, { attr: { cx: 792, cy: 497 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconBText, { attr: { x: 784, y: 505 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconC, { attr: { cx: 1566, cy: 247 }, duration: 0.1 }, "sectionTransition1+=0.5")
      .to(beaconCText, { attr: { x: 1558, y: 255 }, duration: 0.1 }, "sectionTransition1+=0.5")
      
      // Mostrar beacons con baja opacidad después de reposicionar
      .to([beaconA, beaconB, beaconC], { opacity: 0.2, duration: 0.3 }, "sectionTransition1+=0.7")
      .to([beaconAText, beaconBText, beaconCText], { opacity: 0.2, duration: 0.3 }, "sectionTransition1+=0.7")
      
      // Dialog 1 - Beacon A activo
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
      // Reposicionar beacons (mientras están ocultos)
      .to(beaconA, { attr: { cx: 101, cy: 224 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconAText, { attr: { x: 93, y: 232 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconB, { attr: { cx: 1273, cy: 765 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconBText, { attr: { x: 1265, y: 773 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconC, { attr: { cx: 817, cy: 521 }, duration: 0.1 }, "sectionTransition2+=0.5")
      .to(beaconCText, { attr: { x: 809, y: 529 }, duration: 0.1 }, "sectionTransition2+=0.5")
      
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

    // Timeline para la máscara SVG (sombras que destacan áreas del video)
    const maskTimeline = gsap
      .timeline()
      // Estado inicial - sin área destacada (todo oscuro)
      .set(svgMaskPolygon, { attr: { points: "0,0 0,0 0,0 0,0" } })
      
      // === SECCIÓN AI APP ===
      // Intro: Área completa visible brevemente
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1600,900 0,900 0,0 1600,0" },
          duration: 0.3,
          ease: "power2.inOut"
        },
        "aiAppIntro"
      )
      // Dialog 1: Destacar área superior donde IA revisa alertas
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1207,287 480,287 480,129 1207,129" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "aiAppDialog1"
      )
      // Transición intermedia 1->2
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1207,450 480,450 480,200 1207,200" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "aiAppDialog1+=1.5"
      )
      // Dialog 2: Destacar área central donde operadores revisan
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1207,671 480,671 480,390 1207,390" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "aiAppDialog2"
      )
      // Transición intermedia 2->3
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1400,580 800,580 800,400 1400,400" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "aiAppDialog2+=1.5"
      )
      // Dialog 3: Destacar área lateral - ver lógica subyacente
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1560,509 1292,509 1292,417 1560,417" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "aiAppDialog3"
      )

      // === SECCIÓN ACTION LOGIC ===
      // Transición a sección 2: expandir área
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1400,500 300,500 300,150 1400,150" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "actionLogicDialog1-=0.3"
      )
      // Dialog 1: Herramientas y orientación
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1227,403 358,403 358,204 1227,204" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "actionLogicDialog1"
      )
      // Transición intermedia 1->2
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1227,550 358,550 358,280 1227,280" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "actionLogicDialog1+=1.5"
      )
      // Dialog 2: Herramientas para proponer acciones
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1227,671 358,671 358,324 1227,324" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "actionLogicDialog2"
      )
      // Transición intermedia 2->3
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1500,400 1200,400 1200,200 1500,200" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "actionLogicDialog2+=1.5"
      )
      // Dialog 3: Ver automatización vinculada
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1600,292 1532,292 1532,203 1600,203" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "actionLogicDialog3"
      )

      // === SECCIÓN AUTOMATION ===
      // Transición a sección 3: área completa
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1600,900 0,900 0,0 1600,0" },
          duration: 0.3,
          ease: "power2.inOut"
        },
        "automationDialog1-=0.3"
      )
      // Dialog 1: Visibilidad de reglas (área superior izquierda)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "202,288 0,288 0,160 202,160" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "automationDialog1"
      )
      // Transición intermedia 1->2
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "800,600 400,600 400,400 800,400" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "automationDialog1+=1.5"
      )
      // Dialog 2: Operadores aprueban acciones (área inferior derecha)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1436,855 1110,855 1110,675 1436,675" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "automationDialog2"
      )
      // Transición intermedia 2->3
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1200,650 500,650 500,420 1200,420" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "automationDialog2+=1.5"
      )
      // Dialog 3: Lógica activada (área central)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1089,602 546,602 546,440 1089,440" },
          duration: 0.8,
          ease: "power2.inOut"
        },
        "automationDialog3"
      );

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
            
            // Video scrubbing basado en duración real de videos
            // Primer video (5 scrolls): 0% - 33.3% del scroll
            // Segundo video (10 scrolls): 33.3% - 100% del scroll
            const splitPoint = 5 / 15; // 0.3333...
            
            if (progress <= splitPoint) {
              updateVideoTime(aiAppVideo, progress, 0, splitPoint);
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
      
      // === SECCIÓN 1: AI App (0 - 2.5) ===
      .addLabel("aiAppDialog1", 0.5)
      .addLabel("aiAppDialog2", 1.2)
      .addLabel("aiAppDialog3", 2.0)
      .addLabel("section1_end", section1End)
      
      // Transición suave entre sección 1 y 2
      .addLabel("sectionTransition1", section1End - 0.2)
      .addLabel("section2_start", section1End)
      
      // === SECCIÓN 2: Action Logic (2.5 - 5) ===
      .addLabel("actionLogicDialog1", section1End + 0.5) // 3.0
      .addLabel("actionLogicDialog2", section1End + 1.3) // 3.8
      .addLabel("actionLogicDialog3", section1End + 2.0) // 4.5
      .addLabel("section2_end", section2End)
      
      // Transición suave entre sección 2 y 3
      .addLabel("sectionTransition2", section2End - 0.2)
      .addLabel("section3_start", section2End)
      
      // === SECCIÓN 3: Automation (5 - 15) ===
      .addLabel("automationDialog1", section2End + 1)    // 6
      .addLabel("automationDialog2", section2End + 4.5)  // 9.5
      .addLabel("automationDialog3", section2End + 8)    // 13
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
                  La IA revisa alertas y propone automáticamente resoluciones
                </p>
              </div>
              <div className="dialog dialog-ai-app-2" style={{ opacity: 0 }}>
                <div className="dialog-icon">
                  <span className="dialog-letter">B</span>
                </div>
                <p>
                  Los operadores humanos revisan propuestas para aprobar
                  resoluciones sugeridas por IA
                </p>
              </div>
              <div className="dialog dialog-ai-app-3" style={{ opacity: 0 }}>
                <div className="dialog-icon">
                  <span className="dialog-letter">C</span>
                </div>
                <p>Ver lógica subyacente</p>
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
                  <span className="dialog-letter">A</span>
                </div>
                <p>
                  Dale a tu IA herramientas y orientación sobre cómo realizar su
                  tarea
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
                  Los operadores humanos tienen total visibilidad de las reglas
                  de ejecución e historial de automatizaciones
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
                  Los operadores humanos permanecen en el bucle para aprobar
                  acciones propuestas por IA
                </p>
              </div>
              <div
                className="dialog dialog-automation-3"
                style={{ opacity: 0 }}
              >
                <div className="dialog-icon">
                  <span className="dialog-letter">C</span>
                </div>
                <p>Ver lógica activada por esta automatización</p>
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
