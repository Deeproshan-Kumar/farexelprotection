/**
 * main.js — App entry point
 */

import {
  initLenis,
  initDateTime,
  initOfferCountdowns,
  initStatsCounters,
  initTestimonialSwiper,
  initOffersSwiper,
  initTransformationSwiper,
  initStudioTourSwiper,
  initCertificateSwipers,
  initScrollToTop,
  initTextHoverAnimation,
  initTeamCardTilt,
  initLeadershipHoverAnimation,
  initMediaLightbox,
  initJobFilters,
  initBlogFilters,
  initPhotoGalleryFilters,
  initWhatsappWidget,
  initFileUpload,
} from "./init.js";
import { toggleTheme } from "./toggleTheme.js";
import { initPageTransition } from "./pageTransition.js";
import { initScrollAnimations } from "./scrollAnimations.js";
import { initHeroIntro } from "./heroIntro.js";
import {
  initBeforeAfterSliders,
  initCategoryFilters,
} from "./beforeAfterSlider.js";
import { initServicesSummary } from "./servicesSummary.js";

// Mobile Menu
function handleMobileMenu(navbarToggler, target) {
  if (!navbarToggler || !target) return;

  navbarToggler.addEventListener("click", () => {
    const isActive = target.classList.toggle("active");

    navbarToggler
      .querySelector(".icon")
      .setAttribute("name", isActive ? "close" : "menu");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector("#site-header");
  const announcementBar = siteHeader?.querySelector(".announcement-bar");

  if (siteHeader && announcementBar) {
    let announcementHeight = announcementBar.getBoundingClientRect().height;
    siteHeader.style.setProperty(
      "--announcement-height",
      `${announcementHeight}px`,
    );

    const updateHeader = () => {
      const isScrolled = window.scrollY >= announcementHeight;
      siteHeader.classList.toggle("is-scrolled", isScrolled);
      document.body.classList.toggle("header-condensed", isScrolled);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", () => {
      siteHeader.classList.remove("is-scrolled");
      announcementHeight = announcementBar.offsetHeight;
      siteHeader.style.setProperty(
        "--announcement-height",
        `${announcementHeight}px`,
      );
      updateHeader();
    });
  }

  const themeToggleBtn = document.querySelector("#theme-toggle-btn");
  const savedTheme = localStorage.getItem("theme");

  // Dark theme by default
  const theme = savedTheme || "dark";

  // Apply theme
  document.documentElement.setAttribute("data-bs-theme", theme);

  // Initialize toggle button
  toggleTheme(themeToggleBtn);

  // Initialize icon
  const btnIcon = themeToggleBtn?.querySelector(".icon");

  if (btnIcon) {
    btnIcon.setAttribute("name", theme === "dark" ? "sunny" : "moon");
  }

  // Mobile Menu
  const navbarToggler = document.querySelector("#navbar-toggler");
  const mobileMenu = document.querySelector(".mobile-menu");
  handleMobileMenu(navbarToggler, mobileMenu);

  // Init lenis (smooth scroll)
  const lenis = initLenis();

  // Scroll-based reveal animations (GSAP ScrollTrigger)
  initScrollAnimations();

  // Text anim
  initTextHoverAnimation();

  // Team card tilt
  initTeamCardTilt();

  // Leadership insights hover parallax animation
  initLeadershipHoverAnimation();

  // Photo and video lightbox
  initMediaLightbox();

  // Career filters
  initJobFilters();

  // Blog filters
  initBlogFilters();

  // Photo gallery filters
  initPhotoGalleryFilters();

  // Build hero intro timeline (paused)
  const heroIntroTl = initHeroIntro();

  // Page transition pillars wipe, smoothly triggering hero reveal as pillars lift
  initPageTransition(() => heroIntroTl?.play());

  // Live date/time
  initDateTime();

  // Offer countdowns
  initOfferCountdowns();

  // Stats counters
  initStatsCounters();

  // Testimonial swiper
  initTestimonialSwiper();

  // Offers swiper
  initOffersSwiper();

  // Transformation swiper
  initTransformationSwiper();

  // Studio tour swiper
  initStudioTourSwiper();

  // Certificate card swipers
  initCertificateSwipers();

  // File upload
  initFileUpload();

  // Scroll to top
  let scrollToTopBtn = document.querySelector("#scroll-to-top-btn");
  initScrollToTop(scrollToTopBtn, lenis);

  // WhatsApp widget
  let whatsappBtn = document.querySelector("#whatsapp-btn"),
    whatsappChatClose = document.querySelector("#whatsapp-chat-close"),
    whatsappChatPopup = document.querySelector("#whatsapp-chat-popup"),
    launchWhatsappTrigger = document.querySelector("#launch-whatsapp");
  initWhatsappWidget(
    whatsappBtn,
    whatsappChatClose,
    whatsappChatPopup,
    launchWhatsappTrigger,
  );

  // Before and after image slider & category filters
  initBeforeAfterSliders();
  initCategoryFilters();

  // Services page interactive summary & card selection
  initServicesSummary();
});
