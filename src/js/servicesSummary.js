/**
 * servicesSummary.js — Interactive Service Card selection & Summary calculation for Services page
 */
export function initServicesSummary() {
  const summarySection = document.querySelector("#selected-services-summary");
  if (!summarySection) return; // Only runs on Services page where summary section exists!

  const summaryVehicleTypeEl = document.querySelector("#summary-vehicle-type");
  const summaryTotalTimeEl = document.querySelector("#summary-total-time");
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
      summaryVehicleTypeEl.innerHTML = `<ion-icon name="car-sport" class="me-1"></ion-icon>${activeVehicle}`;
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
    let totalHours = 0;
    let totalPriceAED = 0;
    const selectedTitles = [];

    selectedCards.forEach((card) => {
      // Extract title
      const titleEl = card.querySelector(".card-body h6");
      let titleText = "Service";
      if (titleEl) {
        const clone = titleEl.cloneNode(true);
        const badge = clone.querySelector(".price");
        if (badge) badge.remove();
        titleText = clone.textContent.trim();
      }

      // Extract price e.g. "AED 350" or "AED 4,400"
      const priceBadge = card.querySelector(".card-body .price");
      if (priceBadge) {
        const priceNum = parseInt(priceBadge.textContent.replace(/[^\d]/g, ""), 10);
        if (!isNaN(priceNum)) totalPriceAED += priceNum;
      }

      // Extract time e.g. "8 Business Hours"
      const cardFooter = card.querySelector(".card-footer");
      const textToSearch = cardFooter ? cardFooter.textContent : card.textContent;
      const normalizedFooter = textToSearch.replace(/\s+/g, " ");
      const match = normalizedFooter.match(/(\d+)\s*Business\s*Hours?/i) ||
        normalizedFooter.match(/(\d+)\s*Hours?/i) ||
        normalizedFooter.match(/(\d+)\s*Hrs?/i);
      if (match) {
        totalHours += parseInt(match[1], 10);
      }

      selectedTitles.push(titleText);
    });

    if (summarySelectedCountEl) {
      summarySelectedCountEl.textContent = selectedCards.length;
    }

    if (summaryTotalTimeEl) {
      summaryTotalTimeEl.innerHTML = `<ion-icon name="time-outline" class="me-1"></ion-icon>${totalHours} Business Hours`;
    }

    if (summaryTotalPriceEl) {
      summaryTotalPriceEl.textContent = `AED ${totalPriceAED.toLocaleString()}`;
    }

    if (summarySelectedServicesEl) {
      if (selectedTitles.length === 0) {
        summarySelectedServicesEl.innerHTML = `<span class="text-muted text-sm fst-italic">No services selected yet. Click any service card above to select.</span>`;
      } else {
        summarySelectedServicesEl.innerHTML = selectedTitles.map(title =>
          `<span class="selected-service-badge"><ion-icon name="checkmark-circle"></ion-icon>${title}</span>`
        ).join("");
      }
    }
  }

  // Toggle card selection via event delegation for maximum reliability across tabs
  const farexelServicesSection = document.querySelector("#farexel-services") || document.body;
  farexelServicesSection.addEventListener("click", (e) => {
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
