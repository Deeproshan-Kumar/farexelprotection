/**
 * servicesSummary.js — Interactive Service Card selection & Summary calculation for Services page
 */
export function initServicesSummary() {
  const summarySection = document.querySelector("#selected-services-summary");
  if (!summarySection) return; 

  const summaryVehicleTypeEl = document.querySelector("#summary-vehicle-type");
  const summaryTotalPriceEl = document.querySelector("#summary-total-price");
  const summarySelectedCountEl = document.querySelector("#summary-selected-count");
  const summarySelectedServicesEl = document.querySelector("#summary-selected-services");
  const formVehicleTypeSelect = document.querySelector("#vechicle-type");

  // Track active vehicle tab
  function getActiveVehicleName() {
    const activeTabBtn = document.querySelector("#vehicleTabs .nav-link.active");
    return activeTabBtn ? activeTabBtn.textContent.trim() : "Sedan";
  }

  // Recalculate summary totals
  function updateSummary() {
    const activeVehicle = getActiveVehicleName();

    if (summaryVehicleTypeEl) {
      summaryVehicleTypeEl.innerHTML = `${activeVehicle}`;
    }

    // Sync vehicle type in form dropdown if option exists
    if (formVehicleTypeSelect) {
      const vehicleVal = activeVehicle.toLowerCase().replace(/\s+/g, "");
      const matchedOpt = Array.from(formVehicleTypeSelect.options).find(opt =>
        opt.value.toLowerCase() === vehicleVal || opt.text.toLowerCase().includes(vehicleVal)
      );
      if (matchedOpt) {
        formVehicleTypeSelect.value = matchedOpt.value;
      }
    }

    // Select all selected cards across all vehicle tabs
    const selectedCards = document.querySelectorAll(".card.service.selected");
    let totalPriceSAR = 0;
    const regularServices = [];
    const additionalServices = [];

    selectedCards.forEach((card) => {
      // Detect if card is inside the additional-services section
      const isAdditional = !!card.closest("#additional-services");

      // Extract title
      const titleEl = card.querySelector(".card-body h5, .card-body h6");
      let titleText = "Service";
      if (titleEl) {
        const clone = titleEl.cloneNode(true);
        const badge = clone.querySelector(".price");
        if (badge) badge.remove();
        titleText = clone.textContent.trim();
      }

      // Extract price
      const priceBadge = card.querySelector(".card-body .price");
      if (priceBadge) {
        const priceNum = parseInt(priceBadge.textContent.replace(/[^\d]/g, ""), 10);
        if (!isNaN(priceNum)) totalPriceSAR += priceNum;
      }

      if (isAdditional) {
        additionalServices.push(titleText);
      } else {
        regularServices.push(titleText);
      }
    });

    if (summarySelectedCountEl) {
      summarySelectedCountEl.textContent = selectedCards.length;
    }

    if (summaryTotalPriceEl) {
      summaryTotalPriceEl.textContent = `SAR ${totalPriceSAR.toLocaleString()}`;
    }

    if (summarySelectedServicesEl) {
      const totalCount = regularServices.length + additionalServices.length;
      if (totalCount === 0) {
        summarySelectedServicesEl.innerHTML = `<span class="text-muted text-sm fst-italic">No services selected yet. Click any service card above to select.</span>`;
      } else {
        let html = "";
        if (regularServices.length > 0) {
          html += regularServices.map(title =>
            `<span class="selected-service-badge selected-service-badge--regular"><ion-icon name="checkmark-circle"></ion-icon>${title}</span>`
          ).join("");
        }
        if (additionalServices.length > 0) {
          if (regularServices.length > 0) {
            html += `<span class="text-xs text-uppercase tracking-wider text-muted d-block w-100 mt-2"><ion-icon name="add-circle-outline" class="me-1"></ion-icon>Additional &amp; Bespoke Services</span>`;
          }
          html += additionalServices.map(title =>
            `<span class="selected-service-badge selected-service-badge--additional"><ion-icon name="sparkles-outline"></ion-icon>${title}</span>`
          ).join("");
        }
        summarySelectedServicesEl.innerHTML = html;
      }
    }
  }

  // Toggle card selection via event delegation for maximum reliability across all service sections and tabs
  const mainServicesContainer = document.querySelector("#main") || document.body;
  mainServicesContainer.addEventListener("click", (e) => {
    // Avoid triggering toggle if user clicked on collapse toggler or accordion buttons inside card
    if (e.target.closest(".features-toggle, .collapse")) return;
    const card = e.target.closest(".card.service");
    if (!card) return;

    // Toggle selected class
    card.classList.toggle("selected");

    // Prevent link navigation on Book Now button inside card to keep user on page
    const bookBtn = e.target.closest(".btn");
    if (bookBtn) {
      e.preventDefault();
      summarySection.scrollIntoView({ behavior: "smooth" });
    }

    updateSummary();
  });

  // Listen to vehicle tab switches
  const vehicleTabBtns = document.querySelectorAll("#vehicleTabs .nav-link");
  vehicleTabBtns.forEach((btn) => {
    btn.addEventListener("shown.bs.tab", () => {
      updateSummary();
    });
  });

  // Initial update
  updateSummary();
}
