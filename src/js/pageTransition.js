/**
 * pageTransition.js — GSAP page transition pillars animation
 */

function hideOverlay() {
  const overlay = document.getElementById("page-transition");
  if (overlay) overlay.style.display = "none";
}

export function initPageTransition(onIntroComplete) {
  const pillars = document.querySelectorAll(".pillar");
  if (!pillars.length) {
    onIntroComplete?.();
    return;
  }

  // The overlay covers the viewport, so never leave it up if GSAP is missing
  if (typeof gsap === "undefined") {
    hideOverlay();
    onIntroComplete?.();
    return;
  }

  // Use rAF so the browser has painted the overlay before GSAP runs,
  // otherwise pillars appear and vanish in a single frame (invisible).
  requestAnimationFrame(() => {
    gsap.set(pillars, { scaleY: 1 });

    gsap.to(pillars, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.7,
      stagger: 0.06,
      ease: "power4.inOut",
      delay: 0.05,
      onComplete: () => {
        hideOverlay();
        onIntroComplete?.();
      },
    });
  });
}
