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
        toggleActions: playOnce ? "play none none none" : "play none none none",
      },
      ...vars,
    });
  });
}

// Service card reveal — Tab-aware & mobile-resilient luxury elevation
function initServiceCardAnimations() {
  const containers = document.querySelectorAll(".our-services");
  if (!containers.length) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const animatedContainers = new WeakSet();

  function isElementVisible(el) {
    if (!el) return false;
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function revealItems(container, isTabSwitch = false) {
    if (!isElementVisible(container)) return;
    if (!isTabSwitch && animatedContainers.has(container)) return;

    const items = container.querySelectorAll("ul.services li");
    if (!items.length) return;

    animatedContainers.add(container);
    gsap.killTweensOf(items);

    if (isMobile) {
      // Mobile: snappy, fluid lift to avoid frame drops or stuck opacity
      gsap.fromTo(
        items,
        { opacity: isTabSwitch ? 0 : 0.2, y: 12 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          skewY: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
          overwrite: "auto",
        },
      );
    } else if (isTabSwitch) {
      // Desktop Tab Switch: refined subtle lift & cascade
      gsap.fromTo(
        items,
        { y: 16, opacity: 0, scale: 0.985, skewY: 1.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          skewY: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: {
            amount: 0.18,
            grid: "auto",
            from: "start",
          },
          clearProps: "transform,opacity,visibility",
          overwrite: "auto",
        },
      );
    } else {
      // Desktop Scroll reveal: silky automotive elevation
      gsap.fromTo(
        items,
        { y: 22, opacity: 0, scale: 0.96, skewY: 2 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          skewY: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: {
            amount: 0.2,
            grid: "auto",
            from: "start",
          },
          clearProps: "transform,opacity,visibility",
          overwrite: "auto",
        },
      );
    }
  }

  // Handle intersection observer with threshold: 0 and generous rootMargin so it triggers reliably on mobile & desktop
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isElementVisible(entry.target)) {
            revealItems(entry.target, false);
          }
        });
      },
      { threshold: 0, rootMargin: "150px 0px 100px 0px" },
    );

    containers.forEach((c) => io.observe(c));
  } else {
    // Fallback: reveal all immediately if IO not supported
    containers.forEach((c) => revealItems(c, false));
  }

  // Check immediately on load for visible containers
  containers.forEach((c) => {
    if (isElementVisible(c)) {
      const rect = c.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        revealItems(c, false);
      }
    }
  });

  // Tab switch handler: activates both parent tabs and nested sub-tabs
  function handleTabChange(targetPane) {
    if (!targetPane) return;

    const paneContainers = targetPane.querySelectorAll(".our-services");
    paneContainers.forEach((c) => {
      if (isElementVisible(c)) {
        revealItems(c, true);
      }
    });

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  document.addEventListener("shown.bs.tab", (e) => {
    const targetSelector = e.target
      ? e.target.getAttribute("data-bs-target") || e.target.getAttribute("href")
      : null;

    if (targetSelector && targetSelector.startsWith("#")) {
      const pane = document.querySelector(targetSelector);
      handleTabChange(pane);

      // Secondary check after tab transition completes to guarantee visibility
      setTimeout(() => {
        handleTabChange(pane);
      }, 150);
    }
  });

  // Failsafe safety net: On scroll or after load, ensure any visible card in view is never stuck at opacity 0
  const ensureVisibilitySafetyNet = () => {
    containers.forEach((c) => {
      if (isElementVisible(c)) {
        const rect = c.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const items = c.querySelectorAll("ul.services li");
          items.forEach((item) => {
            if (window.getComputedStyle(item).opacity === "0") {
              gsap.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                skewY: 0,
                duration: 0.3,
                clearProps: "all",
                overwrite: "auto",
              });
            }
          });
        }
      }
    });
  };

  window.addEventListener("scroll", ensureVisibilitySafetyNet, {
    passive: true,
  });
  setTimeout(ensureVisibilitySafetyNet, 500);
  setTimeout(ensureVisibilitySafetyNet, 1200);
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
  revealGroup(".gsap-booking-form-col", { y: 32, duration: 0.8 });
  revealGroup(".service-marquee", { y: 20, duration: 0.7 });

  // ─── #about-hero (about page hero) ──────────────────────────────────────────
  revealGroup("#about-hero .about-hero-img", { scale: 0.8, y: 16, duration: 1 });

  // ─── Our vision and mission ────────────────────────────────────────────────────
  waveReveal("#our-vision-mission", ".vm-card .card-container", {
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
  waveReveal(
    "#customer-stories .swiper-wrapper",
    ".gsap-testimonial-card",
    {
      y: 48,
      skewY: 0,
    },
    true,
  );

  // ─── #studio-tour — Swiper ──────────────────────────────────────────────────
  waveReveal("#studio-tour .swiper-wrapper", ".swiper-slide", {}, true);

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
  waveReveal(".gsap-cx-platform-cards", ".gsap-platform-card", {
    y: 48,
    skewY: 0,
  });

  // ─── Reviews grid (Customer Experience page) ─────────────────────────────────
  waveReveal(".gsap-cx-reviews-row", { y: 48, skewY: 0 });

  // ─── Testimonials page grid ───────────────────────────────────────────────────
  waveReveal(
    ".testimonial-grid, #customer-experiences",
    ".gsap-testimonial-card",
    {
      y: 48,
      skewY: 0,
    },
  );

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
    const heroImg =
      ceHero.querySelector(".gsap-ce-hero-img img") ||
      ceHero.querySelector("img");
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
  waveReveal("#before-after .gsap-ba-grid", ".gsap-ba-card", {
    y: 40,
    skewY: 0,
  });

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

  // ─── #leadership-insights ───────────────────────────────────────────────────
  const insightRows = gsap.utils.toArray("#leadership-insights .insight");
  if (insightRows.length) {
    insightRows.forEach((row, idx) => {
      const textCol = row.querySelector(".col-lg-6:not(.img-col)");
      const imgCol = row.querySelector(".img-col");
      const isEven = idx % 2 === 1;

      if (textCol) {
        gsap.fromTo(
          textCol.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "restart none restart none",
            },
          },
        );
      }

      if (imgCol) {
        const profilePic = imgCol.querySelector(".profile-pic");
        const shapes = imgCol.querySelectorAll(
          ".circle, .rect, .triangle, #circle, #rect, #triangle, #rectange, .img-decoration",
        );

        if (profilePic) {
          gsap.fromTo(
            profilePic,
            { scale: 0.85, opacity: 0, x: isEven ? -40 : 40 },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "restart none restart none",
              },
            },
          );
        }

        if (shapes.length) {
          gsap.fromTo(
            shapes,
            { scale: 0, opacity: 0, rotation: 45 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "back.out(1.7)",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "restart none restart none",
              },
            },
          );
        }
      }
    });
  }

  // ─── #video-in-text (Leadership Insights video section) ──────────────────────
  const videoInText = document.querySelector("#video-in-text");
  if (videoInText) {
    const vH2 = videoInText.querySelector("h2");
    const vLogo = videoInText.querySelector(".logo");
    if (vH2) {
      gsap.fromTo(
        vH2,
        { scale: 0.92, y: 32, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoInText,
            start: "top 85%",
            toggleActions: "restart none restart none",
          },
        },
      );
    }
    if (vLogo) {
      gsap.fromTo(
        vLogo,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoInText,
            start: "top 85%",
            toggleActions: "restart none restart none",
          },
        },
      );
    }
  }

  // ─── #selection-process ──────────────────────────────────────────────────────
  waveReveal("#selection-process .row", ":scope > div", { y: 48, skewY: 0 });

  // ─── #careers ────────────────────────────────────────────────────────────────
  waveReveal("#careers .job-layout", ".job", { y: 48, skewY: 0 });

  // ─── #blogs ──────────────────────────────────────────────────────────────────
  waveReveal("#blogs > .container > .row.gy-4", ":scope > div", {
    y: 48,
    skewY: 0,
  });
  waveReveal("#blogs .col-lg-7 > .blogs-list", ":scope > article");
  pinBlogIntro();
  pinRecentBlogs();

  // ─── #blog-detail ────────────────────────────────────────────────────────────
  revealGroup("#blog-detail .blog-content", { y: 32, duration: 0.8 });
  revealGroup("#blog-detail .recent-blogs", { x: 32, y: 0, duration: 0.8 });

  // ─── #contact-form ───────────────────────────────────────────────────────────
  revealGroup(".gsap-contact-form-cols", { y: 32, duration: 0.8 });
  waveReveal("#contact-form .consultation-list", ".consulation", {
    y: 40,
    skewY: 0,
  });

  // ─── #studio-location ────────────────────────────────────────────────────────
  revealGroup("#studio-location .map-container", { scale: 0.96, y: 0 });
  waveReveal("#studio-location .our-locations", ":scope > div", {
    y: 48,
    skewY: 0,
  });

  // ─── #text-anim — letter-by-letter wave ──────────────────────────────────────
  waveTextReveal("#text-anim .anim-txt");

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

  // ─── Re-measure when lazy-loaded images finish downloading (debounced) ──────
  let imgRefreshTimer;
  document.addEventListener(
    "load",
    (e) => {
      if (e.target && e.target.tagName === "IMG") {
        clearTimeout(imgRefreshTimer);
        imgRefreshTimer = setTimeout(() => ScrollTrigger.refresh(), 350);
      }
    },
    true,
  );

  // ─── Re-measure on Bootstrap tab / accordion toggle ──────────────────────────
  const handleLayoutChange = () => {
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  document.addEventListener("shown.bs.tab", handleLayoutChange);
  document.addEventListener("shown.bs.collapse", handleLayoutChange);
  document.addEventListener("hidden.bs.collapse", handleLayoutChange);
}
