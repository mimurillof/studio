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
                Designed for AI workflow builders
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Build AI apps, actions, and agents in Workflow Builder — an intuitive workspace
                designed with next-gen AI builders in mind.
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
                        src="https://videos.ctfassets.net/xrfr7uokpv1b/7c7km4JluRKg6jAl2ev8K9/36f8c951a83d94fcd157b138c811cc1e/workflow-builder.mp4"
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
                Evaluate and ship with confidence
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                Ready your AI-driven workflows for production and iteratively improve them with
                end-to-end evaluation tooling.
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
                        src="https://videos.ctfassets.net/xrfr7uokpv1b/yZMDTcftsZFFDvaA09vC9/df497c06a203475e581a7a73c9457f66/aip-evals-product.mp4"
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
                Accelerated AI application development
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>Ontology SDK anchors software development in the operational truth of the enterprise.</p>
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
                        src="https://videos.ctfassets.net/xrfr7uokpv1b/AJSSHfqYFyicvk5T0V5Bg/4def24033d7c3c0dfb6dfb6b43f2aa3a/aip-osdk.mp4"
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
                Explore curated solutions and examples
              </h3>
              <div className="ptcom-design__tabHeaderAction__1oqxfyp"></div>
            </header>
          </div>
          <div>
            <div className="ptcom-design__tabDesc__1oqxfyp">
              <p>
                AIP Now makes it easy to explore pre-built AI applications, examples, and builder
                starter packs.
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
                        src="https://videos.ctfassets.net/xrfr7uokpv1b/2bKyrJp8t1sP8Pz0C9IWko/64023ab262fd1076d40c145b54ebe0d6/aipnow-product.mp4"
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