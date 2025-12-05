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

    // --- Timelines de Animación ---

    // Timelines para los botones y textos de cabecera
    const navTimeline = gsap
      .timeline()
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" }) // Inicia activo
      .to(browserHeaderText[0], { opacity: 1 }, "<")

      // Transición 1 -> 2
      .to(highlighterBtn[0], { "--highlighter-btn-color": "#B5B7B6" }, "1")
      .to(browserHeaderText[0], { opacity: 0 }, "1")
      .to(highlighterBtn[1], { "--highlighter-btn-color": "#efefef" }, "1")
      .to(browserHeaderText[1], { opacity: 1 }, "1")
      .to(automationVideo, { opacity: 0 }, "1")

      // Transición 2 -> 3
      .to(highlighterBtn[1], { "--highlighter-btn-color": "#B5B7B6" }, "2")
      .to(browserHeaderText[1], { opacity: 0 }, "2")
      .to(highlighterBtn[2], { "--highlighter-btn-color": "#efefef" }, "2")
      .to(browserHeaderText[2], { opacity: 1 }, "2")
      .to(actionDrivenVideo, { opacity: 0 }, "2");

    // Timelines para los videos
    const videoTimeline = gsap
      .timeline()
      .to(aiAppVideo, { opacity: 0 }, "1")
      .to(actionDrivenVideo, { opacity: 1 }, "1")
      .to(actionDrivenVideo, { opacity: 0 }, "2")
      .to(automationVideo, { opacity: 1 }, "2");

    // Timelines para los beacons (círculos)
    const beaconTimeline = gsap
      .timeline()
      .to([beaconA, beaconB, beaconC], { opacity: 0.2 }, 0)
      .to(beaconA, { opacity: 1 }, "aiAppDialog1")
      .to(beaconA, { opacity: 0.2 }, "aiAppDialog1+=1")
      .to(beaconB, { opacity: 1 }, "aiAppDialog2")
      .to(beaconB, { opacity: 0.2 }, "aiAppDialog2+=1")
      .to(beaconC, { opacity: 1 }, "aiAppDialog3")
      .to(beaconC, { opacity: 0.2 }, "aiAppDialog3+=1")

      .to([beaconA, beaconB, beaconC], { opacity: 0.2 }, "actionLogicDialog1")
      .to(beaconA, { opacity: 1 }, "actionLogicDialog1")
      .to(beaconA, { opacity: 0.2 }, "actionLogicDialog1+=1")
      .to(beaconB, { opacity: 1 }, "actionLogicDialog2")
      .to(beaconB, { opacity: 0.2 }, "actionLogicDialog2+=1")
      .to(beaconC, { opacity: 1 }, "actionLogicDialog3")
      .to(beaconC, { opacity: 0.2 }, "actionLogicDialog3+=1")

      .to([beaconA, beaconB, beaconC], { opacity: 0.2 }, "automationDialog1")
      .to(beaconA, { opacity: 1 }, "automationDialog1")
      .to(beaconA, { opacity: 0.2 }, "automationDialog1+=1")
      .to(beaconB, { opacity: 1 }, "automationDialog2")
      .to(beaconB, { opacity: 0.2 }, "automationDialog2+=1")
      .to(beaconC, { opacity: 1 }, "automationDialog3")
      .to(beaconC, { opacity: 0.2 }, "automationDialog3+=1");

    // Timelines para los dialogs
    const dialogsTimeline = gsap
      .timeline()
      .to(dialogsAiApp[0], { opacity: 1, scale: 1 }, "aiAppDialog1")
      .to(dialogsAiApp[0], { opacity: 0, scale: 0.9 }, "aiAppDialog1+=1")
      .to(dialogsAiApp[1], { opacity: 1, scale: 1 }, "aiAppDialog2")
      .to(dialogsAiApp[1], { opacity: 0, scale: 0.9 }, "aiAppDialog2+=1")
      .to(dialogsAiApp[2], { opacity: 1, scale: 1 }, "aiAppDialog3")
      .to(dialogsAiApp[2], { opacity: 0, scale: 0.9 }, "aiAppDialog3+=1")

      .to(dialogsActionLogic[0], { opacity: 1, scale: 1 }, "actionLogicDialog1")
      .to(
        dialogsActionLogic[0],
        { opacity: 0, scale: 0.9 },
        "actionLogicDialog1+=1"
      )
      .to(dialogsActionLogic[1], { opacity: 1, scale: 1 }, "actionLogicDialog2")
      .to(
        dialogsActionLogic[1],
        { opacity: 0, scale: 0.9 },
        "actionLogicDialog2+=1"
      )
      .to(dialogsActionLogic[2], { opacity: 1, scale: 1 }, "actionLogicDialog3")
      .to(
        dialogsActionLogic[2],
        { opacity: 0, scale: 0.9 },
        "actionLogicDialog3+=1"
      )

      .to(dialogsAutomation[0], { opacity: 1, scale: 1 }, "automationDialog1")
      .to(
        dialogsAutomation[0],
        { opacity: 0, scale: 0.9 },
        "automationDialog1+=1"
      )
      .to(dialogsAutomation[1], { opacity: 1, scale: 1 }, "automationDialog2")
      .to(
        dialogsAutomation[1],
        { opacity: 0, scale: 0.9 },
        "automationDialog2+=1"
      )
      .to(dialogsAutomation[2], { opacity: 1, scale: 1 }, "automationDialog3")
      .to(
        dialogsAutomation[2],
        { opacity: 0, scale: 0.9 },
        "automationDialog3+=1"
      );

    // Timeline para la máscara SVG
    const maskTimeline = gsap
      .timeline()
      .to(
        svgMaskPolygon,
        { attr: { points: "1600,445 814,445 814,130 1600,130" } },
        "aiAppDialog1"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1600,900 824,900 824,440 1600,440" } },
        "aiAppDialog2"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1600,509 1426,509 1426,424 1600,424" } },
        "aiAppDialog3"
      )

      .to(
        svgMaskPolygon,
        { attr: { points: "1227,403 358,403 358,204 1227,204" } },
        "actionLogicDialog1"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1227,671 358,671 358,324 1227,324" } },
        "actionLogicDialog2"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1600,292 1532,292 1532,203 1600,203" } },
        "actionLogicDialog3"
      )

      .to(
        svgMaskPolygon,
        { attr: { points: "155,264 48,264 48,185 155,185" } },
        "automationDialog1"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1436,855 1110,855 1110,675 1436,675" } },
        "automationDialog2"
      )
      .to(
        svgMaskPolygon,
        { attr: { points: "1089,602 546,602 546,440 1089,440" } },
        "automationDialog3"
      );

    // --- TIMELINE PRINCIPAL ---
    const totalDuration = 3;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalDuration * 100}%`,
          pin: true,
          scrub: 1.5,
        },
      })
      .addLabel("start", 0)
      .add(navTimeline, "start")
      .add(videoTimeline, "start")
      .addLabel("section1_end", totalDuration / 3)
      .addLabel("section2_start", totalDuration / 3)
      .addLabel("section2_end", (totalDuration / 3) * 2)
      .addLabel("section3_start", (totalDuration / 3) * 2)
      .addLabel("end", totalDuration)
      .add(dialogsTimeline, 0)
      .add(beaconTimeline, 0)
      .add(maskTimeline, 0);

    // Configuración inicial
    gsap.set(highlighterBtn[0], { "--highlighter-btn-color": "#efefef" });
    gsap.set([...dialogsAiApp, ...dialogsActionLogic, ...dialogsAutomation], {
      opacity: 0,
      scale: 0.9,
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
                autoPlay
                loop
                muted
                playsInline
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

              {/* Video Action-Driven */}
              <video
                className="highlighter-video action-driven-screen"
                autoPlay
                loop
                muted
                playsInline
                style={{ opacity: 0 }}
              >
                <source
                  src="https://videos.ctfassets.net/xrfr7uokpv1b/6HuTeCsMfrno2wJ53Wj66Z/d14aa29f633d50d7a851a5c0b06430eb/action-driven-logic.mp4"
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
                autoPlay
                loop
                muted
                playsInline
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
