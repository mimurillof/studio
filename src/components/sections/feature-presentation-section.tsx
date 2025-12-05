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
    const dialogsAutomation = gsap.utils.toArray<HTMLElement>(
      ".dialog-automation-1, .dialog-automation-2, .dialog-automation-3"
    );

    // --- Configurar videos para video scrubbing ---
    const videos = [aiAppVideo, automationVideo];
    
    // Pausar autoplay y preparar para scrubbing
    videos.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Función para actualizar el tiempo del video basado en el progreso del scroll
    const updateVideoTime = (
      video: HTMLVideoElement,
      progress: number,
      startProgress: number,
      endProgress: number
    ) => {
      if (!video || !video.duration) return;
      
      // Normalizar el progreso dentro del rango de esta sección
      const sectionProgress = Math.max(0, Math.min(1, 
        (progress - startProgress) / (endProgress - startProgress)
      ));
      
      video.currentTime = sectionProgress * video.duration;
    };

    // --- Timelines de Animación ---

    // Timelines para los botones y textos de cabecera
    const navTimeline = gsap
      .timeline()
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" }) // Inicia activo
      .to(browserHeaderText[0], { opacity: 1 }, "<")

      // Transición 1 -> 2 (AI App -> Automation)
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#B5B7B6" }, "1")
      .to(browserHeaderText[0], { opacity: 0 }, "1")
      .to(highlighterBtn[1], { "--highlighter-btn-color": "#efefef" }, "1")
      .to(browserHeaderText[1], { opacity: 1 }, "1");

    // Timelines para los videos (solo opacidad, el tiempo se controla con scroll)
    const videoTimeline = gsap
      .timeline()
      .to(aiAppVideo, { opacity: 1 }, 0)
      .to(aiAppVideo, { opacity: 0 }, "1")
      .to(automationVideo, { opacity: 1 }, "1");

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

      // === SECCIÓN AUTOMATION ===
      // Reposicionar beacons para Automation Video
      .to(beaconA, { attr: { cx: 101, cy: 224 } }, "automationDialog1")
      .to(beaconAText, { attr: { x: 93, y: 232 } }, "automationDialog1")
      .to(beaconB, { attr: { cx: 1273, cy: 765 } }, "automationDialog1")
      .to(beaconBText, { attr: { x: 1265, y: 773 } }, "automationDialog1")
      .to(beaconC, { attr: { cx: 817, cy: 521 } }, "automationDialog1")
      .to(beaconCText, { attr: { x: 809, y: 529 } }, "automationDialog1")
      
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

    // Timelines para los dialogs con movimiento Y
    const dialogsTimeline = gsap
      .timeline()
      .to(dialogsAiApp[0], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog1")
      .to(dialogsAiApp[0], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog1+=1")
      .to(dialogsAiApp[1], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog2")
      .to(dialogsAiApp[1], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog2+=1")
      .to(dialogsAiApp[2], { opacity: 1, scale: 1, y: 0 }, "aiAppDialog3")
      .to(dialogsAiApp[2], { opacity: 0, scale: 0.9, y: -20 }, "aiAppDialog3+=1")

      .to(dialogsAutomation[0], { opacity: 1, scale: 1, y: 0 }, "automationDialog1")
      .to(
        dialogsAutomation[0],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog1+=1"
      )
      .to(dialogsAutomation[1], { opacity: 1, scale: 1, y: 0 }, "automationDialog2")
      .to(
        dialogsAutomation[1],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog2+=1"
      )
      .to(dialogsAutomation[2], { opacity: 1, scale: 1, y: 0 }, "automationDialog3")
      .to(
        dialogsAutomation[2],
        { opacity: 0, scale: 0.9, y: -20 },
        "automationDialog3+=1"
      );

    // Timeline para la máscara SVG (sombras que destacan áreas del video)
    const maskTimeline = gsap
      .timeline()
      // Estado inicial - sin área destacada (todo oscuro)
      .set(svgMaskPolygon, { attr: { points: "0,0 0,0 0,0 0,0" } })
      
      // === SECCIÓN AI APP ===
      // Dialog 1: Destacar área superior donde IA revisa alertas
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1207,287 480,287 480,129 1207,129" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "aiAppDialog1"
      )
      // Dialog 2: Destacar área central donde operadores revisan
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1207,671 480,671 480,390 1207,390" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "aiAppDialog2"
      )
      // Dialog 3: Destacar área lateral - ver lógica subyacente
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1560,509 1292,509 1292,417 1560,417" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "aiAppDialog3"
      )

      // === SECCIÓN AUTOMATION ===
      // Dialog 1: Visibilidad de reglas (área superior izquierda)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "202,288 0,288 0,160 202,160" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "automationDialog1"
      )
      // Dialog 2: Operadores aprueban acciones (área inferior derecha)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1436,855 1110,855 1110,675 1436,675" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "automationDialog2"
      )
      // Dialog 3: Lógica activada (área central)
      .to(
        svgMaskPolygon,
        { 
          attr: { points: "1089,602 546,602 546,440 1089,440" },
          duration: 0.5,
          ease: "power2.inOut"
        },
        "automationDialog3"
      );

    // --- TIMELINE PRINCIPAL ---
    const totalDuration = 6; // 2 secciones x 3 diálogos cada una

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
            
            // Video scrubbing: sincronizar tiempo del video con scroll
            // Sección 1: AI App (0% - 50%)
            if (progress <= 0.5) {
              updateVideoTime(aiAppVideo, progress, 0, 0.5);
            }
            // Sección 2: Automation (50% - 100%)
            else {
              updateVideoTime(automationVideo, progress, 0.5, 1);
            }
          },
        },
      })
      .addLabel("start", 0)
      .add(navTimeline, "start")
      .add(videoTimeline, "start")
      .addLabel("section1_end", totalDuration / 2)
      .addLabel("section2_start", totalDuration / 2)
      .addLabel("end", totalDuration)
      .add(dialogsTimeline, 0)
      .add(beaconTimeline, 0)
      .add(maskTimeline, 0);

    // Configuración inicial
    gsap.set(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" });
    gsap.set([...dialogsAiApp, ...dialogsAutomation], {
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
