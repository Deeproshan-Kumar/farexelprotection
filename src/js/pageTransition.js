/**
 * pageTransition.js — GSAP page transition pillars animation
 */

function hideOverlay() {
  const overlay = document.getElementById("page-transition");
  if (overlay) overlay.style.display = "none";
}

export function initPageTransition(onIntroComplete) {
  const pillars = document.querySelectorAll(".pillar");
  const overlay = document.getElementById("page-transition");
  if (!pillars.length || !overlay) {
    onIntroComplete?.();
    return;
  }

  overlay.style.display = "flex";

  // The overlay covers the viewport, so never leave it up if GSAP is missing
  if (typeof gsap === "undefined") {
    hideOverlay();
    onIntroComplete?.();
    return;
  }

  // Snappy, energetic pillar wipe (total ~0.5s)
  requestAnimationFrame(() => {
    gsap.set(pillars, { scaleY: 1 });

    gsap.to(pillars, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.45,
      stagger: 0.04,
      ease: "power3.inOut",
      onComplete: () => {
        hideOverlay();
      },
    });

    // Seamless handoff: trigger hero intro as pillars lift
    if (onIntroComplete) {
      setTimeout(onIntroComplete, 160);
    }
  });
}

