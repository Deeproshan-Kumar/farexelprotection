/**
 * scrollAnimations.js — premium scroll-based reveals powered by GSAP + ScrollTrigger
 *
 * Two building blocks:
 *  - revealGroup(): a simple fade/slide-up reveal for standalone elements
 *    (headings, images, timeline entries, footer columns, etc.)
 *  - waveReveal(): the signature "card wave" — cards in a row rise into place
 *    one after another. Each card only ever travels along the Y axis, but the
 *    sine-eased stagger across the row makes the cascade read as a wave.
 *
 * Selector discipline: always target by meaningful class names or IDs,
 * never by bare tag names. Where no suitable class existed, gsap- prefixed
 * classes have been added to the HTML so GSAP has an unambiguous handle.
 */

const REDUCED_MOTION = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Fade + slide-up reveal, one ScrollTrigger per element so long lists (like
// the journey timeline) reveal as the viewport actually reaches each entry.
function revealGroup(selector, vars = {}) {
  const els = gsap.utils.toArray(selector);
  if (!els.length) return;

  els.forEach((el) => {
    gsap.from(el, {
      y: 48,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      ...vars,
    });
  });
}

// Vertical "wave" reveal for card grids/rows.
// playOnce: set to true for Swiper wrappers (avoid re-animating cloned slides)
function waveReveal(
  containerSelector,
  itemSelector,
  vars = {},
  playOnce = false,
) {
  const containers = gsap.utils.toArray(containerSelector);

  containers.forEach((container) => {
    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    gsap.from(items, {
      y: 90,
      skewY: 8,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: {
        each: 0.1,
        from: "start",
        ease: "sine.inOut",
      },
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        // Swiper loop clones slides — don't reverse-animate them on scroll-up
        toggleActions: playOnce
          ? "play none none none"
          : "play none none none",
      },
      ...vars,
    });
  });
}

// Service card wave stagger — IntersectionObserver-based lazy animator.
// Directly watches every .our-services container; fires once when each
// enters the viewport. Avoids ScrollTrigger entirely and correctly handles
// the nested tab structure on services.html.
function initServiceCardAnimations() {
  const containers = document.querySelectorAll(".our-services");
  if (!containers.length) return;

  const seen = new WeakSet();

  // Pre-hide ALL service items immediately so there's no flash before
  // the IntersectionObserver fires and kicks off the reveal animation.
  containers.forEach((c) => {
    const items = c.querySelectorAll("ul.services li");
    if (items.length) gsap.set(items, { opacity: 0, y: 36, skewY: 8 });
  });

  function animateContainer(container) {
    if (seen.has(container)) return;

    const items = container.querySelectorAll("ul.services li");
    if (!items.length) return;

    // Skip if inside a hidden tab pane (offsetParent is null when not rendered)
    if (!container.offsetParent) return;

    seen.add(container);

    gsap.to(items, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 0.45,
      ease: "power3.out",
      stagger: { each: 0.05, from: "start", ease: "sine.inOut" },
      overwrite: "auto",
    });
  }

  // IntersectionObserver fires when each container scrolls into view
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateContainer(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  containers.forEach((c) => io.observe(c));

  // On tab switch the newly shown container may already be in viewport
  // but was previously hidden — recheck all after Bootstrap toggles classes
  document.addEventListener("shown.bs.tab", () => {
    setTimeout(() => containers.forEach((c) => animateContainer(c)), 80);
  });
}

// Letter-by-letter wave for the "FAREXEL" text-anim heading — same wave
// mechanic as the card grids, applied to individual glyphs.
function waveTextReveal(containerSelector) {
  const containers = gsap.utils.toArray(containerSelector);

  containers.forEach((container) => {
    const letters = container.querySelectorAll(":scope > span");
    if (!letters.length) return;

    gsap.from(letters, {
      y: 60,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: {
        each: 0.06,
        from: "start",
        ease: "sine.inOut",
      },
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}

// Blog intro pin animation
function pinBlogIntro() {
  const intro = document.querySelector(".blogs-intro");
  const section = document.querySelector(".blogs");

  if (!intro || !section || window.matchMedia("(max-width: 991px)").matches)
    return;

  ScrollTrigger.create({
    trigger: section,
    start: "top top+=96",
    end: () => {
      const scrollDistance = section.offsetHeight - intro.offsetHeight;
      return `+=${Math.max(scrollDistance, 1)}`;
    },
    pin: intro,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}

// Keep the recent-blogs sidebar visible while the detail article is read.
function pinRecentBlogs() {
  const sidebar = document.querySelector(".recent-blogs");
  const article = document.querySelector(".blog-content");

  if (!sidebar || !article || window.matchMedia("(max-width: 991px)").matches)
    return;

  ScrollTrigger.create({
    trigger: sidebar,
    start: "top top+=128",
    endTrigger: article,
    end: "bottom bottom",
    pin: sidebar,
    pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}

// Scroll animations
export function initScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  // Respect the user's motion preference — leave everything in its natural,
  // fully-visible state instead of animating it in.
  if (REDUCED_MOTION) return;

  gsap.registerPlugin(ScrollTrigger);

  // ─── Section headings & subpage banner ──────────────────────────────────────
  revealGroup(".section-header");
  revealGroup("#subpage-banner h1", { y: 32, duration: 0.8 });
  revealGroup("#subpage-banner > .container > p", { y: 24, duration: 0.7 });
  revealGroup("#subpage-banner .breadcrumb", { y: 20, duration: 0.6 });

  // ─── #about (homepage — Who We Are) ─────────────────────────────────────────
  revealGroup("#about .gsap-about-img", { scale: 0.94, y: 16 });
  revealGroup("#about .gsap-about-text", { y: 24, duration: 0.7 });
  revealGroup("#about .gsap-icon-boxes .icon-box", {
    y: 24,
    duration: 0.6,
    delay: 0.12,
  });
  waveReveal("#about .counters", ".counter", { y: 36, skewY: 0 });

  // ─── #achievements (homepage counters band) ──────────────────────────────────
  revealGroup("#achievements", { y: 20, duration: 0.7 });

  // ─── #farexel-services (homepage services strip) ─────────────────────────────
  revealGroup("#farexel-services .service-item", { y: 32, duration: 0.8 });
  revealGroup(".gsap-booking-form-col", { y: 32, duration: 0.8 });
  revealGroup(".service-marquee", { y: 20, duration: 0.7 });

  // ─── #about-hero (about page hero) ──────────────────────────────────────────
  revealGroup("#about-hero .gsap-about-intro-img", { scale: 0.93, y: 16 });
  revealGroup("#about-hero .gsap-about-intro-content", { y: 32, duration: 0.85 });

  // ─── About page — values grid & stats ───────────────────────────────────────
  waveReveal(".gsap-about-values-grid", ".gsap-value-card", { y: 40, skewY: 0 });
  revealGroup(".gsap-about-stats-item", { y: 24, duration: 0.7 });

  // ─── #our-mission-vision ────────────────────────────────────────────────────
  waveReveal("#our-mission-vision", ".gsap-mission-vision-card", {
    y: 36,
    skewY: 0,
  });

  // ─── Why Choose Us ──────────────────────────────────────────────────────────
  waveReveal(".why-choose-us .panel.left", ".card");
  waveReveal(".why-choose-us .panel.right", ".card");
  revealGroup(".why-choose-us .panel.middle img", { scale: 0.9, y: 0 });

  // ─── Service cards — tab-aware lazy animator (Services + Homepage) ───────────
  // Uses a WeakSet to avoid re-creating ScrollTrigger instances for hidden panes;
  // this prevents the "hundreds of triggers" problem on the tabbed services page.
  initServiceCardAnimations();

  // ─── #showcase-of-excellence ─────────────────────────────────────────────────
  waveReveal("#showcase-of-excellence", ".gsap-showcase-card", {
    y: 48,
    skewY: 0,
  });

  // ─── #offers — Swiper (play once — avoids re-animating cloned slides) ────────
  waveReveal("#offers .swiper-wrapper", ".swiper-slide", {}, true);

  // ─── #customer-stories — Testimonial swiper (blog-style wave) ──────────────
  waveReveal("#customer-stories .swiper-wrapper", ".gsap-testimonial-card", {
    y: 48,
    skewY: 0,
  }, true);

  // ─── #our-amenities ──────────────────────────────────────────────────────────
  waveReveal("#our-amenities", ".amenity");

  // ─── #customer-experiences (Homepage & Testimonials page) ───────────────────
  revealGroup("#customer-experiences .gsap-cx-img-col", {
    x: -36,
    y: 0,
    scale: 0.96,
    duration: 0.85,
  });
  revealGroup("#customer-experiences .gsap-cx-content-col > h4", {
    y: 28,
    duration: 0.7,
  });
  revealGroup("#customer-experiences .gsap-cx-content-col > p", {
    y: 28,
    duration: 0.7,
  });

  // ─── Rating platforms & testimonials grid ────────────────────────────────────
  waveReveal(".gsap-cx-platform-cards", ".gsap-platform-card", { y: 48, skewY: 0 });

  // ─── Reviews grid (Customer Experience page) ─────────────────────────────────
  waveReveal(".gsap-cx-reviews-row", ".gsap-testimonial-card", { y: 48, skewY: 0 });

  // ─── Testimonials page grid ───────────────────────────────────────────────────
  waveReveal(".testimonial-grid, #customer-experiences", ".gsap-testimonial-card", {
    y: 48,
    skewY: 0,
  });

  // ─── Selected Services Summary ───────────────────────────────────────────────
  revealGroup(".selected-services-summary .summary-card", {
    y: 32,
    duration: 0.8,
  });

  // ─── Customer experiences stats band ─────────────────────────────────────────
  revealGroup(".gsap-cx-stat-item", { y: 24, duration: 0.7 });

  // ─── #ce-hero (Customer Experience page hero) ────────────────────────────────
  const ceHero = document.querySelector("#ce-hero");
  if (ceHero) {
    const heroImg = ceHero.querySelector(".gsap-ce-hero-img img") || ceHero.querySelector("img");
    const heroContent = ceHero.querySelector(".gsap-ce-hero-content");
    const heroItems = heroContent ? heroContent.children : [];

    if (heroImg) {
      gsap.from(heroImg, {
        x: -60,
        opacity: 0,
        scale: 0.92,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ceHero,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    if (heroItems.length) {
      gsap.from(heroItems, {
        x: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ceHero,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }

  // ─── #before-after — filter buttons + comparison cards ───────────────────────
  waveReveal("#before-after .gsap-ba-grid", ".gsap-ba-card", { y: 40, skewY: 0 });

  const beforeAfterSection = document.querySelector("#before-after");
  if (beforeAfterSection) {
    const baFilterBtns = beforeAfterSection.querySelectorAll(
      ".ba-filter-group .ba-filter-btn",
    );
    if (baFilterBtns.length) {
      gsap.from(baFilterBtns, {
        y: 25,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: beforeAfterSection.querySelector(".ba-filter-group"),
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }
  }

  // ─── #our-works (Customer Experience page) ───────────────────────────────────
  const ourWorksSection = document.querySelector("#our-works");
  if (ourWorksSection) {
    const worksImages = ourWorksSection.querySelectorAll(".masonary-grid img");
    const worksBtns = ourWorksSection.querySelectorAll(".works-actions .btn");

    if (worksImages.length) {
      gsap.from(worksImages, {
        y: 80,
        opacity: 0,
        scale: 0.85,
        rotation: 2,
        skewY: 2,
        duration: 0.85,
        ease: "power3.out",
        stagger: { each: 0.08, from: "start", ease: "sine.out" },
        scrollTrigger: {
          trigger: ourWorksSection.querySelector(".masonary-grid"),
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }

    if (worksBtns.length) {
      gsap.from(worksBtns, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: worksBtns[0].closest("div") || ourWorksSection,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }
  }

  // ─── #how-we-works ───────────────────────────────────────────────────────────
  waveReveal("#how-we-works .row.gy-4", ":scope > div");

  // ─── #experience (Customer Experience workflow) ───────────────────────────────
  waveReveal("#experience .row", ":scope > div");

  // ─── #certificates ───────────────────────────────────────────────────────────
  waveReveal("#certificates .row.gy-4", ":scope > div", { y: 48, skewY: 0 });

  // ─── #photos ─────────────────────────────────────────────────────────────────
  waveReveal("#photos .row.gy-4", ":scope > div", { y: 48, skewY: 0 });

  // ─── #videos ─────────────────────────────────────────────────────────────────
  waveReveal("#videos .row.gy-4", ":scope > div", { y: 48, skewY: 0 });

  // ─── #team ───────────────────────────────────────────────────────────────────
  waveReveal("#team .col-lg-10 > .row", ":scope > div", { y: 48, skewY: 0 });

  // ─── #selection-process ──────────────────────────────────────────────────────
  waveReveal("#selection-process .row", ":scope > div", { y: 48, skewY: 0 });

  // ─── #careers ────────────────────────────────────────────────────────────────
  waveReveal("#careers .job-layout", ".job", { y: 48, skewY: 0 });

  // ─── #blogs ──────────────────────────────────────────────────────────────────
  waveReveal("#blogs > .container > .row.gy-4", ":scope > div", { y: 48, skewY: 0 });
  waveReveal("#blogs .col-lg-7 > .blogs-list", ":scope > article");
  pinBlogIntro();
  pinRecentBlogs();

  // ─── #blog-detail ────────────────────────────────────────────────────────────
  revealGroup("#blog-detail .blog-content", { y: 32, duration: 0.8 });
  revealGroup("#blog-detail .recent-blogs", { x: 32, y: 0, duration: 0.8 });

  // ─── #contact-form ───────────────────────────────────────────────────────────
  revealGroup(".gsap-contact-form-cols", { y: 32, duration: 0.8 });
  waveReveal("#contact-form .consultation-list", ".consulation", { y: 40, skewY: 0 });

  // ─── #studio-location ────────────────────────────────────────────────────────
  revealGroup("#studio-location .map-container", { scale: 0.96, y: 0 });
  waveReveal("#studio-location .our-locations", ":scope > div", { y: 48, skewY: 0 });

  // ─── #text-anim — letter-by-letter wave ──────────────────────────────────────
  waveTextReveal("#text-anim .anim-txt");

  // ─── #studio-tour ────────────────────────────────────────────────────────────
  revealGroup("#studio-tour .tour-video-container", { scale: 0.96, y: 0 });

  // ─── #contact-us ─────────────────────────────────────────────────────────────
  revealGroup("#contact-us .social-handles > li", { y: 24, duration: 0.6 });

  // ─── #faqs ───────────────────────────────────────────────────────────────────
  revealGroup("#faqs .accordion-item", { y: 24 });
  revealGroup("#faqs .faq-visual > img", { scale: 0.94, y: 0 });

  // ─── #fullwidth-cta ──────────────────────────────────────────────────────────
  revealGroup("#fullwidth-cta .wrapper", { x: -32, y: 0 });
  revealGroup("#fullwidth-cta .col-lg-4", { x: 32, y: 0 });

  // ─── Footer (desktop only — avoids cutting off mobile quick scroll) ───────────
  if (window.matchMedia("(min-width: 768px)").matches) {
    revealGroup(".gsap-footer-col", { y: 24, duration: 0.7 });
  }

  // ─── Re-measure once everything (images, fonts) has loaded ───────────────────
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // ─── Re-measure on Bootstrap tab / accordion toggle ──────────────────────────
  const handleLayoutChange = () => {
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  document.addEventListener("shown.bs.tab", handleLayoutChange);
  document.addEventListener("shown.bs.collapse", handleLayoutChange);
  document.addEventListener("hidden.bs.collapse", handleLayoutChange);
}
