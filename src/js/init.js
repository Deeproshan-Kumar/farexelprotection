/**
 * init.js — initiliazes external libraries
 */

// Initialize a new Lenis instance for smooth scrolling
export function initLenis() {
  const lenis = new Lenis({
    // 0.08 is the sweet spot: snappy enough to feel responsive,
    // smooth enough to feel premium — 0.05 felt too floaty/laggy.
    lerp: 0.08,
    smoothWheel: true,
    // Exponential ease-out for silky, natural deceleration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// Initialize a datetime function
export function initDateTime() {
  const el = document.getElementById("datetime");
  if (!el) return;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function update() {
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "pm" : "am";
    const h12 = now.getHours() % 12 || 12;

    el.textContent = `${day}, ${date} ${month} ${year} | ${String(h12).padStart(2, "0")}:${m}:${s} ${ampm}`;
  }

  update();
  setInterval(update, 1000);
}

// Initialize offer countdown timers
export function initOfferCountdowns() {
  const timers = document.querySelectorAll(".countdown-timer[data-countdown]");
  if (!timers.length) return;

  timers.forEach((timer) => {
    const duration = timer.dataset.countdown.match(/(\d+)\s*([dhms])/gi) || [];
    const seconds = duration.reduce((total, part) => {
      const [, value, unit] = part.match(/(\d+)\s*([dhms])/i);
      const multipliers = { d: 86400, h: 3600, m: 60, s: 1 };
      return total + Number(value) * multipliers[unit.toLowerCase()];
    }, 0);
    const endTime = Date.now() + seconds * 1000;
    const values = timer.querySelectorAll(".screen span:first-child");

    function update() {
      const remaining = Math.max(0, endTime - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      [days, hours, minutes, seconds].forEach((value, index) => {
        if (values[index])
          values[index].textContent = String(value).padStart(2, "0");
      });
    }

    update();
    setInterval(update, 1000);
  });
}

// Initialize statistics counters when the section enters the viewport
export function initStatsCounters() {
  const counters = document.querySelectorAll(".counter[data-count]");
  if (!counters.length || !window.countUp) return;

  const observer = new IntersectionObserver(
    (entries, statsObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const animation = new countUp.CountUp(
          counter,
          Number(counter.dataset.count),
          {
            duration: 2.2,
            useEasing: true,
            separator: ",",
          },
        );

        if (!animation.error) animation.start();
        statsObserver.unobserve(counter);
      });
    },
    { threshold: 0.35 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Init testimonial swiper
export function initTestimonialSwiper() {
  const testimonialSwiper = document.querySelector(".testimonial-swiper");
  if (!testimonialSwiper) return;

  new Swiper(".testimonial-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".testimonial-swiper .swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".testimonial-swiper .swiper-button-next",
      prevEl: ".testimonial-swiper .swiper-button-prev",
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

// Init offers swiper
export function initOffersSwiper() {
  const offersSwiper = document.querySelector(".offers-swiper");
  if (!offersSwiper) return;

  new Swiper(offersSwiper, {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".offers-swiper .swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".offers-swiper .swiper-button-next",
      prevEl: ".offers-swiper .swiper-button-prev",
    },

    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
}

// Init tranformation swiper
export function initTransformationSwiper() {
  const offersSwiper = document.querySelector(".transformation-swiper");
  if (!offersSwiper) return;

  new Swiper(offersSwiper, {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".transformation-swiper .swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".transformation-swiper .swiper-button-next",
      prevEl: ".transformation-swiper .swiper-button-prev",
    },

    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
}

// Init studio tour swiper
export function initStudioTourSwiper() {
  const studioSwiper = document.querySelector(
    ".studioToutSwiper, #studioTourSwiper, .studio-tour-swiper",
  );
  if (!studioSwiper) return;

  new Swiper(studioSwiper, {
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 24,
    effect: "fade",
    loop: true,
    speed: 1500,
    allowTouchMove: false,
    simulateTouch: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
  });
}

// Init certificate swipers inside cards
export function initCertificateSwiper() {
  if (typeof Swiper === "undefined") return;
  const certificateSwipers = document.querySelectorAll(".certificate-swiper");
  if (!certificateSwipers.length) return;

  certificateSwipers.forEach((swiperEl) => {
    const slides = swiperEl.querySelectorAll(".swiper-slide");
    const hasMultipleSlides = slides.length > 1;
    const prevBtn = swiperEl.querySelector(".swiper-button-prev");
    const nextBtn = swiperEl.querySelector(".swiper-button-next");

    if (!hasMultipleSlides) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      watchOverflow: true,
    });
  });
}

// Init intro videos swiper
export function initIntroVideosSwiper() {
  if (typeof Swiper === "undefined") return;
  const introVideosSwiper = document.querySelectorAll(".intro-videos-swiper");
  if (!introVideosSwiper.length) return;

  introVideosSwiper.forEach((swiperEl) => {
    const slides = swiperEl.querySelectorAll(".swiper-slide");
    const hasMultipleSlides = slides.length > 1;
    const prevBtn = swiperEl.querySelector(".swiper-button-prev");
    const nextBtn = swiperEl.querySelector(".swiper-button-next");

    if (!hasMultipleSlides) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },

        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      watchOverflow: true,
    });
  });
}

// Init intro videos swiper
export function initCustomerExperienceSwiper() {
  if (typeof Swiper === "undefined") return;
  const introVideosSwiper = document.querySelectorAll(
    ".customer-experience-swiper",
  );
  if (!introVideosSwiper.length) return;

  introVideosSwiper.forEach((swiperEl) => {
    const slides = swiperEl.querySelectorAll(".swiper-slide");
    const hasMultipleSlides = slides.length > 1;
    const prevBtn = swiperEl.querySelector(".swiper-button-prev");
    const nextBtn = swiperEl.querySelector(".swiper-button-next");

    if (!hasMultipleSlides) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      watchOverflow: true,
    });
  });
}

// Init file upload
export function initFileUpload() {
  const file = document.querySelector("#file");
  const fileName = document.querySelector("#file-name");

  if (!file || !fileName) return;

  file.addEventListener("change", function (e) {
    if (this.files.length > 0) {
      fileName.innerHTML = `
                <i class="bi bi-file-earmark-text me-1"></i>
                ${this.files[0].name}
            `;
    } else {
      fileName.innerHTML = "";
    }
  });
}

// Init text hover animation
export function initTextHoverAnimation() {
  if (typeof gsap === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const textElements = document.querySelectorAll(".anim-txt span");

  textElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      if (gsap.isTweening(element)) return;
      gsap.to(element, {
        transformOrigin: "bottom",
        scaleY: 0.75,
        scaleX: 1.25,
        duration: 0.1,
        onComplete: () => {
          gsap.to(element, {
            scaleY: 1,
            scaleX: 1,
            duration: 2.5,
            ease: "elastic.out(1, 0.25)",
          });
        },
      });
    });
  });
}

// Initialize the subtle perspective effect on team member cards
export function initTeamCardTilt() {
  if (typeof VanillaTilt === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const teamCards = document.querySelectorAll(".team .card.team");
  if (!teamCards.length) return;

  VanillaTilt.init(teamCards, {
    max: 8,
    speed: 500,
    scale: 1.02,
    glare: true,
    "max-glare": 0.15,
    gyroscope: false,
  });
}

// Initialize GLightbox for photo and video media
export function initMediaLightbox() {
  if (typeof GLightbox === "undefined") return;
  if (!document.querySelector(".glightbox")) return;

  GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    preload: false,
    autoplayVideos: true,
  });
}

// Filter Career listings from the search bar and sidebar controls
export function initJobFilters() {
  const careerSection = document.querySelector(".careers");
  if (!careerSection) return;

  const searchInput = careerSection.querySelector("#search-job");
  const countrySelect = careerSection.querySelector("#country");
  const typeSelect = careerSection.querySelector("#job-type");
  const applyButton = careerSection.querySelector("#apply-job-filters");
  const resetButton = careerSection.querySelector("#reset-job-filters");
  const cards = [...careerSection.querySelectorAll(".card.job")];
  const sidebar = careerSection.querySelector(".job-filters");

  if (
    !searchInput ||
    !countrySelect ||
    !typeSelect ||
    !applyButton ||
    !resetButton ||
    !cards.length
  )
    return;

  const emptyState = document.createElement("p");
  emptyState.className = "job-filter-empty text-center py-4 mb-0";
  emptyState.textContent =
    "No roles match these filters yet. Try a broader search.";
  emptyState.hidden = true;
  careerSection.querySelector(".job-layout")?.append(emptyState);

  const getChecked = (name) =>
    [...(sidebar?.querySelectorAll(`input[name="${name}"]:checked`) || [])].map(
      (input) => input.value,
    );

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const country = countrySelect.value;
    const type = typeSelect.value;
    const roles = getChecked("role");
    const experiences = getChecked("experience");
    const locations = getChecked("location");
    let visibleCards = 0;

    cards.forEach((card) => {
      const matchesSearch =
        !query || card.textContent.toLowerCase().includes(query);
      const matchesCountry =
        country === "default" || card.dataset.location === country;
      const matchesType = type === "default" || card.dataset.type === type;
      const matchesRole = !roles.length || roles.includes(card.dataset.role);
      const matchesExperience =
        !experiences.length || experiences.includes(card.dataset.experience);
      const matchesLocation =
        !locations.length || locations.includes(card.dataset.location);
      const isVisible =
        matchesSearch &&
        matchesCountry &&
        matchesType &&
        matchesRole &&
        matchesExperience &&
        matchesLocation;

      card.hidden = !isVisible;
      if (isVisible) visibleCards += 1;
    });

    emptyState.hidden = visibleCards > 0;
    if (typeof ScrollTrigger !== "undefined") {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }

  function resetFilters() {
    searchInput.value = "";
    countrySelect.value = "default";
    typeSelect.value = "default";
    sidebar?.querySelectorAll("input[type=checkbox]").forEach((input) => {
      input.checked = false;
    });
    applyFilters();
  }

  applyButton.addEventListener("click", applyFilters);
  resetButton.addEventListener("click", resetFilters);
  searchInput.addEventListener("search", applyFilters);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") applyFilters();
  });
  sidebar?.querySelectorAll("input[type=checkbox]").forEach((input) => {
    input.addEventListener("change", applyFilters);
  });
}

// Filter and sort Blog cards from the top controls
export function initBlogFilters() {
  const blogSection = document.querySelector(".blogs");
  if (!blogSection || !document.querySelector("#blog-search")) return;

  const searchInput = blogSection.querySelector("#blog-search");
  const categorySelect = blogSection.querySelector("#blog-category");
  const sortSelect = blogSection.querySelector("#blog-sort");
  const applyButton = blogSection.querySelector("#apply-blog-filters");
  const resetButton = blogSection.querySelector("#reset-blog-filters");
  const grid = blogSection.querySelector(".row.gy-4");
  const cards = [...(grid?.querySelectorAll(":scope > div") || [])];
  if (
    !searchInput ||
    !categorySelect ||
    !sortSelect ||
    !applyButton ||
    !resetButton ||
    !grid ||
    !cards.length
  )
    return;

  const emptyState = document.createElement("p");
  emptyState.className = "blog-filter-empty text-center py-4 mb-0";
  emptyState.textContent =
    "No articles match these filters yet. Try a broader search.";
  emptyState.hidden = true;
  grid.after(emptyState);

  const getCategory = (card) => {
    if (card.dataset.category) return card.dataset.category;
    const article = card.querySelector("article");
    if (article?.dataset.category) return article.dataset.category;
    const text = card.textContent.toLowerCase();
    if (
      text.includes("ppf") ||
      text.includes("ceramic") ||
      text.includes("paint") ||
      text.includes("protection")
    )
      return "protection";
    if (text.includes("interior")) return "interior";
    if (
      text.includes("rainy") ||
      text.includes("regular") ||
      text.includes("full detail") ||
      text.includes("maintenance") ||
      text.includes("care")
    )
      return "maintenance";
    return "exterior";
  };

  const getDate = (card) => {
    const dateText =
      card.querySelector(".meta-info li")?.textContent.trim() || "";
    return Date.parse(dateText.replace(/^[^A-Za-z]*/, "")) || 0;
  };

  const pagination = blogSection.querySelector(".pagination");

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const sort = sortSelect.value;
    const matchingCards = cards.filter((card) => {
      const matchesSearch =
        !query || card.textContent.toLowerCase().includes(query);
      const matchesCategory =
        category === "default" || getCategory(card) === category;
      return matchesSearch && matchesCategory;
    });

    matchingCards.sort((first, second) => {
      if (sort === "newest") return getDate(second) - getDate(first);
      if (sort === "oldest") return getDate(first) - getDate(second);
      return cards.indexOf(first) - cards.indexOf(second);
    });

    cards.forEach((card) => {
      card.hidden = !matchingCards.includes(card);
    });
    matchingCards.forEach((card) => grid.append(card));
    emptyState.hidden = matchingCards.length > 0;
    if (pagination) {
      pagination.style.display =
        matchingCards.length < cards.length ? "none" : "";
    }
    if (typeof ScrollTrigger !== "undefined") {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }

  function resetFilters() {
    searchInput.value = "";
    categorySelect.value = "default";
    sortSelect.value = "default";
    applyFilters();
  }

  applyButton.addEventListener("click", applyFilters);
  resetButton.addEventListener("click", resetFilters);
  searchInput.addEventListener("search", applyFilters);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") applyFilters();
  });
}

// Filter and sort Photo and Video gallery cards from the sort/filter dropdown and pills
export function initPhotoGalleryFilters() {
  const gallerySections = document.querySelectorAll("#photos, #videos");
  if (!gallerySections.length) return;

  gallerySections.forEach((section) => {
    const sortSelect = section.querySelector("#sort");
    const countEl = section.querySelector("#photos-count, #videos-count");
    const grid = section.querySelector(".masonary-grid, .cinema-grid, .row.gy-4");
    const items = [
      ...(grid?.querySelectorAll(".media, .video-item, .cinema-card") || []),
    ];
    const pagination = section.querySelector(".pagination");
    const filterPills = section.querySelectorAll(".cinema-pill-filter-btn, .gallery-pill-filter-btn");

    if (!grid || !items.length) return;

    function applyFilters(overrideVal) {
      const value = overrideVal || (sortSelect ? sortSelect.value : "all");
      let matchingItems = [];

      if (value === "all") {
        matchingItems = [...items].sort((a, b) => {
          return (
            (Number(a.dataset.order) || 0) - (Number(b.dataset.order) || 0)
          );
        });
      } else if (value === "latest") {
        matchingItems = [...items].sort((a, b) => {
          return (
            (Number(b.dataset.order) || 0) - (Number(a.dataset.order) || 0)
          );
        });
      } else if (value === "oldest") {
        matchingItems = [...items].sort((a, b) => {
          return (
            (Number(a.dataset.order) || 0) - (Number(b.dataset.order) || 0)
          );
        });
      } else {
        matchingItems = items.filter((item) => {
          const categories = (item.dataset.category || "").split(/\s+/);
          return categories.includes(value);
        });
        matchingItems.sort((a, b) => {
          return (
            (Number(a.dataset.order) || 0) - (Number(b.dataset.order) || 0)
          );
        });
      }

      items.forEach((item) => {
        const isVisible = matchingItems.includes(item);
        item.hidden = !isVisible;
        item.style.display = isVisible ? "" : "none";
      });

      matchingItems.forEach((item) => grid.append(item));

      const totalVisible = matchingItems.length;
      if (countEl) {
        if (totalVisible === 0) {
          countEl.textContent = "Showing 0 results";
        } else {
          countEl.textContent = `Showing 1–${totalVisible} of ${totalVisible} results`;
        }
      }

      // Sync active state on pills
      filterPills.forEach((pill) => {
        const pillVal = pill.getAttribute("data-filter");
        pill.classList.toggle("active", pillVal === value);
      });

      // Sync select dropdown
      if (sortSelect && sortSelect.value !== value) {
        const matchingOpt = Array.from(sortSelect.options).find(o => o.value === value);
        if (matchingOpt) sortSelect.value = value;
      }

      if (pagination) {
        pagination.style.display = totalVisible < items.length ? "none" : "";
      }

      if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => applyFilters());
    }

    // Attach click listeners to pill filter buttons
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const filterVal = pill.getAttribute("data-filter");
        applyFilters(filterVal);
      });
    });

    // Cinema Spotlight sound toggle
    const spotlightVideo = section.querySelector("#spotlight-player");
    const soundToggleBtn = section.querySelector("#spotlight-sound-toggle");
    const soundIcon = section.querySelector("#spotlight-sound-icon");
    const soundLabel = section.querySelector("#spotlight-sound-label");

    if (spotlightVideo && soundToggleBtn) {
      soundToggleBtn.addEventListener("click", () => {
        spotlightVideo.muted = !spotlightVideo.muted;
        if (soundIcon) {
          soundIcon.setAttribute("name", spotlightVideo.muted ? "volume-mute-outline" : "volume-high-outline");
        }
        if (soundLabel) {
          soundLabel.textContent = spotlightVideo.muted ? "Unmute" : "Mute";
        }
      });
    }

    // Run initial filter on page load to sync counts
    applyFilters();
  });
}

// Init scroll to top
export function initScrollToTop(el, lenis) {
  if (!el) return;

  const header = document.querySelector(".site-header");
  const getThreshold = () => header?.offsetHeight ?? 0;
  let currentScroll = window.scrollY;

  function updateVisibility(scrollPosition = window.scrollY) {
    currentScroll = scrollPosition;
    const isVisible = scrollPosition >= getThreshold();
    el.classList.toggle("is-visible", isVisible);
    el.setAttribute("aria-hidden", String(!isVisible));
    el.tabIndex = isVisible ? 0 : -1;
  }

  updateVisibility();

  if (lenis) {
    lenis.on("scroll", (event) => {
      const scrollPosition =
        typeof event === "number" ? event : (event?.scroll ?? lenis.scroll);
      updateVisibility(scrollPosition);
    });
  } else {
    window.addEventListener("scroll", updateVisibility, { passive: true });
  }

  el.addEventListener("click", function () {
    if (currentScroll >= getThreshold()) {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  });
}

// Init whatsapp widget
export function initWhatsappWidget(
  whatsappBtn,
  whatsappChatClose,
  whatsappChatPopup,
  launchWhatsappTrigger,
) {
  if (
    !whatsappBtn ||
    !whatsappChatClose ||
    !whatsappChatPopup ||
    !launchWhatsappTrigger
  )
    return;

  whatsappBtn.addEventListener("click", function () {
    whatsappChatPopup.classList.toggle("d-block");

    if (
      typeof gsap === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    gsap.fromTo(
      whatsappChatPopup,
      { autoAlpha: 0, y: 20, scale: 0.96, transformOrigin: "bottom right" },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
  });

  whatsappChatClose.addEventListener("click", function () {
    whatsappChatPopup.classList.remove("d-block");
  });

  launchWhatsappTrigger.addEventListener("click", function () {
    whatsappChatPopup.classList.remove("d-block");

    const whatsappWindow = window.open(
      "https://wa.me/966555188194",
      "_blank",
      "noopener,noreferrer",
    );

    if (!whatsappWindow) window.location.href = "https://wa.me/966555188194";
  });
}

// Init scroll spy for policy and terms pages TOC navigation
export function initPolicyScrollSpy() {
  const tocNav = document.querySelector(".policy-toc-nav");
  if (!tocNav) return;

  const links = tocNav.querySelectorAll("a[href^='#']");
  if (!links.length) return;

  const targets = Array.from(links)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          links.forEach(l => {
            if (l.getAttribute("href") === `#${id}`) {
              l.classList.add("active");
              l.scrollIntoView({ block: "nearest", behavior: "smooth" });
            } else {
              l.classList.remove("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-15% 0 -65% 0",
      threshold: 0,
    }
  );

  targets.forEach(target => observer.observe(target));
}

// Init Cinema Showcase, Reels Swiper, and Spotlight Controls
export function initCinemaShowcase() {
  // 1. Spotlight Audio Toggle
  const spotlightPlayer = document.querySelector("#spotlight-player");
  const audioBtn = document.querySelector("#spotlight-audio-btn");
  const audioIcon = document.querySelector("#spotlight-audio-icon");
  const audioText = document.querySelector("#spotlight-audio-text");

  if (spotlightPlayer && audioBtn) {
    audioBtn.addEventListener("click", () => {
      spotlightPlayer.muted = !spotlightPlayer.muted;
      if (spotlightPlayer.muted) {
        if (audioIcon) audioIcon.setAttribute("name", "volume-mute-outline");
        if (audioText) audioText.textContent = "Unmute Sound";
      } else {
        if (audioIcon) audioIcon.setAttribute("name", "volume-high-outline");
        if (audioText) audioText.textContent = "Mute Sound";
      }
    });
  }

  // 2. 9:16 Viral Reels Swiper
  const reelsSwiperEl = document.querySelector(".reels-swiper");
  if (reelsSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(reelsSwiperEl, {
      slidesPerView: 1.4,
      spaceBetween: 14,
      grabCursor: true,
      navigation: {
        nextEl: ".reels-next",
        prevEl: ".reels-prev",
      },
      breakpoints: {
        480: { slidesPerView: 2.2, spaceBetween: 16 },
        768: { slidesPerView: 3.2, spaceBetween: 18 },
        992: { slidesPerView: 4.2, spaceBetween: 20 },
        1200: { slidesPerView: 5.2, spaceBetween: 22 },
      },
    });

    // Hover auto-preview for reel cards
    const reelCards = reelsSwiperEl.querySelectorAll(".reel-card");
    reelCards.forEach(card => {
      const vid = card.querySelector("video");
      if (!vid) return;
      card.addEventListener("mouseenter", () => {
        vid.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        vid.pause();
        vid.currentTime = 0;
      });
    });
  }

  // 3. Cinema Productions Category Filtering
  const pillsContainer = document.querySelector("#cinema-pills");
  const cinemaGrid = document.querySelector("#cinema-grid");
  const countEl = document.querySelector("#cinema-count");

  if (pillsContainer && cinemaGrid) {
    const pillBtns = pillsContainer.querySelectorAll(".cinema-pill-btn");
    const cards = cinemaGrid.querySelectorAll(".cinema-prod-card");

    pillBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        pillBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        let visibleCount = 0;

        cards.forEach(card => {
          const category = card.dataset.category;
          if (filter === "all" || category === filter) {
            card.style.display = "flex";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });

        if (countEl) countEl.textContent = visibleCount;
      });
    });
  }
}

