/**
 * translator.js — Google Translate integration with cross-page persistence
 */

export function initGoogleTranslate() {
  const translateContainer = document.getElementById("google_translate_element");
  if (!translateContainer) return;

  // Define global callback expected by Google Translate script
  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }
  };

  // Dynamically load Google Translate element script if not already present
  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  } else if (
    window.googleTranslateElementInit &&
    window.google &&
    window.google.translate
  ) {
    window.googleTranslateElementInit();
  }

  // Handle language change event to ensure cookie persistence across all pages and paths
  document.addEventListener("change", (e) => {
    if (e.target && e.target.classList.contains("goog-te-combo")) {
      const selectedLang = e.target.value;
      const hostname = window.location.hostname;

      if (selectedLang && selectedLang !== "en") {
        document.cookie = `googtrans=/en/${selectedLang}; path=/;`;
        if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
          document.cookie = `googtrans=/en/${selectedLang}; path=/; domain=.${hostname};`;
        }
      } else {
        document.cookie =
          "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
          document.cookie = `googtrans=; path=/; domain=.${hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        }
      }
    }
  });

  // Prevent Google Translate from shifting body downwards with top inline style
  const observer = new MutationObserver(() => {
    if (document.body.style.top && document.body.style.top !== "0px") {
      document.body.style.top = "0px";
    }
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
}
