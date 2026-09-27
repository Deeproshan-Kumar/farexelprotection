/**
 * heroIntro.js — GSAP staggered reveal for the header and hero section.
 *
 * The returned timeline is created paused: its `.from()` tweens render
 * their hidden starting state the instant it's built (so nothing flashes
 * fully visible underneath the pillar overlay), and it only plays once the
 * caller triggers it — once the pillar wipe has fully cleared.
 */

const REDUCED_MOTION = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

export function initHeroIntro() {
  if (typeof gsap === "undefined") return null;

  // Respect the user's motion preference
  if (REDUCED_MOTION) return null;

  const hero = document.querySelector("#hero, .hero");
  if (!hero) return null;

  // Animate hero content column direct children and hero image column
  const heroContent = hero.querySelector(".gsap-hero-content-col");
  const heroItems = heroContent?.children;
  const heroImageColumn = hero.querySelector(".gsap-hero-image-col");

  // Paused timeline that triggers during the pillar wipe handoff
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

  if (heroItems?.length) {
    tl.from(heroItems, {
      y: 20,
      opacity: 0,
      duration: 0.45,
      stagger: 0.05,
    });
  }

  if (heroImageColumn) {
    tl.from(
      heroImageColumn,
      {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
      },
      "-=0.35",
    );
  }

  return tl;
}

