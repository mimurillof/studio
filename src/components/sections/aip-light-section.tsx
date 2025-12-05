"use client"

import { useEffect } from "react";

export function AipLightSection() {
  useEffect(() => {
    // Assign letter classes for animation
    document
      .querySelectorAll(
        ".ptcom-design__tabHeading__1oqxfyp > span > span"
      )
      .forEach((el) => el.classList.add("letter"));

    // Intersection observer to toggle active section
    const sections = document.querySelectorAll<HTMLElement>(
      ".ptcom-design__tabSection__1oqxfyp"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-active");
          } else {
            entry.target.classList.remove("section-active");
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((sec) => io.observe(sec));

    // Tab switch behaviour (Video / Details)
    document.querySelectorAll<HTMLElement>(".ptcom-design__tabs__496b3x").forEach((tabs) => {
      const buttons = tabs.querySelectorAll<HTMLButtonElement>("button");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          // glitch effect
          btn.classList.add("glitch-active");
          setTimeout(() => btn.classList.remove("glitch-active"), 600);

          // visual state switch
          buttons.forEach((b) =>
            b.classList.remove("ptcom-design__tabSelected__496b3x")
          );
          btn.classList.add("ptcom-design__tabSelected__496b3x");

          // mask sliding
          const tabContent = tabs.nextElementSibling as HTMLElement | null;
          if (!tabContent) return;
          const mask = tabContent.querySelector<HTMLElement>(
            ".ptcom-design__mask__496b3x"
          );
          if (!mask) return;
          if (btn.textContent?.trim() === "Video") {
            mask.style.transform = "translateX(100%) skew(15deg,0)";
          } else {
            mask.style.transform = "translateX(-100%) skew(15deg,0)";
          }
        });
      });
    });

    return () => {
      sections.forEach((sec) => io.unobserve(sec));
    };
  }, []);

  return (
    <div className="bg-aip-light">
      <div className="container">
        {/* Section 1 */}
        <section
          className="ptcom-design__tabSection__1oqxfyp ptcom-design__tabSectionAip__1oqxfyp"
          id="designed-for-ai-workflow-builders"
        >
          <div>
            <header className="ptcom-design__tabHeader__1oqxfyp">
              <div className="ptcom-design__tabHeaderIndexes__1oqxfyp">
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp ptcom-design__tabHeaderIndexActive__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexTextActive__1oqxfyp" style={{ opacity: 0 }}>
                      0.1
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.2
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.3
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.4
                    </span>
                  </span>
                </div>
                <div
                  className="ptcom-design__tabHeaderIndexesDivider__1oqxfyp"
                  aria-hidden="true"
                  style={{ transform: "translate(0px, 0px)" }}
                ></div>
              </div>
              <h3 className="ptcom-design__tabHeading__1oqxfyp">
                Inteligencia de Mercado y Sentimiento Social
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Centraliza el pulso financiero global con un feed de noticias en tiempo real (Yahoo Finance, Bloomberg) y videos integrados. Mide la psicología del inversor al instante mediante un indicador de "Sentimiento Social" (Miedo vs. Codicia), permitiéndote anticipar tendencias antes de que impacten los precios.
              </p>
            </div>
            <div className="ptcom-design__switchContainer__496b3x ptcom-design__switchContainerDark__496b3x">
              <div className="ptcom-design__tabs__496b3x">
                <button className="ptcom-design__tab__496b3x ptcom-design__tabSelected__496b3x">
                  <span className="ptcom-design__bubble__496b3x" style={{ opacity: 1 }}></span>
                  <span className="ptcom-design__tabText__496b3x">Video</span>
                </button>
                <button className="ptcom-design__tab__496b3x">
                  <span className="ptcom-design__tabText__496b3x">Details</span>
                </button>
              </div>
              <div className="ptcom-design__tabContent__496b3x ptcom-design__border__496b3x">
                <div style={{ backgroundColor: "var(--light)" }}>
                  <div style={{ opacity: 1 }}>
                    <video
                      className="gotham-video"
                      autoPlay
                      loop
                      playsInline
                      muted
                    >
                      <source
                        src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764945513/V%C3%ADdeo_sin_t%C3%ADtulo_Hecho_con_Clipchamp_1_fv3zcx.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
                <div
                  className="ptcom-design__mask__496b3x"
                  style={{ transform: "translate(-100%, 0px) skew(15deg, 0deg)" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section
          className="ptcom-design__tabSection__1oqxfyp ptcom-design__tabSectionAip__1oqxfyp"
          id="evaluate-and-ship-with-confidence"
        >
          <div>
            <header className="ptcom-design__tabHeader__1oqxfyp">
              <div className="ptcom-design__tabHeaderIndexes__1oqxfyp">
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.1
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp ptcom-design__tabHeaderIndexActive__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexTextActive__1oqxfyp" style={{ opacity: 0 }}>
                      0.2
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.3
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.4
                    </span>
                  </span>
                </div>
                <div
                  className="ptcom-design__tabHeaderIndexesDivider__1oqxfyp"
                  aria-hidden="true"
                  style={{ transform: "translate(-555.391px, 0px)" }}
                ></div>
              </div>
              <h3 className="ptcom-design__tabHeading__1oqxfyp">
                Gestión Dinámica de Portafolios
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Administra tus activos con precisión quirúrgica, permitiendo añadir, modificar o eliminar inversiones mientras visualizas el rendimiento histórico de tu capital. Compara el crecimiento de tu dinero frente a benchmarks del mercado mediante gráficos interactivos que facilitan el seguimiento de tu patrimonio neto.
              </p>
            </div>
            <div className="ptcom-design__switchContainer__496b3x ptcom-design__switchContainerDark__496b3x">
              <div className="ptcom-design__tabs__496b3x">
                <button className="ptcom-design__tab__496b3x ptcom-design__tabSelected__496b3x">
                  <span className="ptcom-design__bubble__496b3x" style={{ opacity: 1 }}></span>
                  <span className="ptcom-design__tabText__496b3x">Video</span>
                </button>
                <button className="ptcom-design__tab__496b3x">
                  <span className="ptcom-design__tabText__496b3x">Details</span>
                </button>
              </div>
              <div className="ptcom-design__tabContent__496b3x ptcom-design__border__496b3x">
                <div style={{ backgroundColor: "var(--light)" }}>
                  <div style={{ opacity: 1 }}>
                    <video className="gotham-video" autoPlay loop playsInline muted>
                      <source
                        src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764945512/no_Hecho_con_Clipchamp_ymtnxv.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
                <div
                  className="ptcom-design__mask__496b3x"
                  style={{ transform: "translate(-100%, 0px) skew(15deg, 0deg)" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section
          className="ptcom-design__tabSection__1oqxfyp ptcom-design__tabSectionAip__1oqxfyp"
          id="accelerated-ai-application-development"
        >
          <div>
            <header className="ptcom-design__tabHeader__1oqxfyp">
              <div className="ptcom-design__tabHeaderIndexes__1oqxfyp">
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.1
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.2
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp ptcom-design__tabHeaderIndexActive__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexTextActive__1oqxfyp" style={{ opacity: 0 }}>
                      0.3
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.4
                    </span>
                  </span>
                </div>
                <div
                  className="ptcom-design__tabHeaderIndexesDivider__1oqxfyp"
                  aria-hidden="true"
                  style={{ transform: "translate(-555.391px, 0px)" }}
                ></div>
              </div>
              <h3 className="ptcom-design__tabHeading__1oqxfyp">
                Analítica Cuantitativa de Grado Institucional
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Evalúa la salud financiera de tu estrategia mediante métricas avanzadas como el Ratio de Sharpe, Volatilidad Anualizada y Máximo Drawdown. Utiliza matrices de correlación de calor y desgloses de composición para entender matemáticamente cómo interactúan tus activos y dónde se concentra tu riesgo.
              </p>
            </div>
            <div className="ptcom-design__switchContainer__496b3x ptcom-design__switchContainerDark__496b3x">
              <div className="ptcom-design__tabs__496b3x">
                <button className="ptcom-design__tab__496b3x ptcom-design__tabSelected__496b3x">
                  <span className="ptcom-design__bubble__496b3x" style={{ opacity: 1 }}></span>
                  <span className="ptcom-design__tabText__496b3x">Video</span>
                </button>
                <button className="ptcom-design__tab__496b3x">
                  <span className="ptcom-design__tabText__496b3x">Details</span>
                </button>
              </div>
              <div className="ptcom-design__tabContent__496b3x ptcom-design__border__496b3x">
                <div style={{ backgroundColor: "var(--light)" }}>
                  <div style={{ opacity: 1 }}>
                    <video className="gotham-video" autoPlay loop playsInline muted>
                      <source
                        src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764945518/re_Hecho_con_Clipchamp_qo2lbe.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
                <div
                  className="ptcom-design__mask__496b3x"
                  style={{ transform: "translate(-100%, 0px) skew(15deg, 0deg)" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section
          className="ptcom-design__tabSection__1oqxfyp ptcom-design__tabSectionAip__1oqxfyp"
          id="explore-curated-solutions-and-examples"
        >
          <div>
            <header className="ptcom-design__tabHeader__1oqxfyp">
              <div className="ptcom-design__tabHeaderIndexes__1oqxfyp">
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.1
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.2
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexText__1oqxfyp" style={{ opacity: 0 }}>
                      0.3
                    </span>
                  </span>
                </div>
                <div className="ptcom-design__tabHeaderIndex__1oqxfyp ptcom-design__tabHeaderIndexActive__1oqxfyp">
                  <span className="ptcom-design__tabBg__1oqxfyp">
                    <span className="ptcom-design__indexTextActive__1oqxfyp" style={{ opacity: 0 }}>
                      0.4
                    </span>
                  </span>
                </div>
                <div
                  className="ptcom-design__tabHeaderIndexesDivider__1oqxfyp"
                  aria-hidden="true"
                  style={{ transform: "translate(-555.391px, 0px)" }}
                ></div>
              </div>
              <h3 className="ptcom-design__tabHeading__1oqxfyp">
                Asesoría Estratégica con Inteligencia Artificial
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Potencia tus decisiones con un Agente de IA capaz de diagnosticar tu cartera, detectar anomalías y sugerir estrategias de diversificación mediante un chat interactivo. Genera reportes automáticos que transforman datos complejos en resúmenes ejecutivos y recomendaciones de rebalanceo accionables.
              </p>
            </div>
            <div className="ptcom-design__switchContainer__496b3x ptcom-design__switchContainerDark__496b3x">
              <div className="ptcom-design__tabs__496b3x">
                <button className="ptcom-design__tab__496b3x ptcom-design__tabSelected__496b3x">
                  <span className="ptcom-design__bubble__496b3x" style={{ opacity: 1 }}></span>
                  <span className="ptcom-design__tabText__496b3x">Video</span>
                </button>
                <button className="ptcom-design__tab__496b3x">
                  <span className="ptcom-design__tabText__496b3x">Details</span>
                </button>
              </div>
              <div className="ptcom-design__tabContent__496b3x ptcom-design__border__496b3x">
                <div style={{ backgroundColor: "var(--light)" }}>
                  <div style={{ opacity: 1 }}>
                    <video className="gotham-video" autoPlay loop playsInline muted>
                      <source
                        src="https://res.cloudinary.com/dmjixvqbn/video/upload/v1764945519/cha_Hecho_con_Clipchamp_dkvl0v.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
                <div
                  className="ptcom-design__mask__496b3x"
                  style={{ transform: "translate(-100%, 0px) skew(15deg, 0deg)" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 