/* Prototype 230: pinch zoom + pan for the USA map on phones */
function initMobileUsaMapZoom() {
  const wrap = document.querySelector(".top-map-card .usa-map-wrap");
  const map = document.getElementById("usaMap");
  const layer = document.getElementById("stateClickLayer");
  if (!wrap || !map || !layer || wrap.dataset.mobileZoomReady === "true") return;
  wrap.dataset.mobileZoomReady = "true";

  let scale = 1;
  let minScale = 1;
  let maxScale = 3.5;
  let x = 0;
  let y = 0;
  let startScale = 1;
  let startX = 0;
  let startY = 0;
  let startDistance = 0;
  let startMid = { x: 0, y: 0 };
  let lastTapTime = 0;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  function isMobileMapZoomEnabled() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function clampPan() {
    const rect = wrap.getBoundingClientRect();
    const scaledW = rect.width * scale;
    const scaledH = rect.height * scale;

    if (scaledW <= rect.width) {
      x = 0;
    } else {
      x = Math.min(0, Math.max(rect.width - scaledW, x));
    }

    if (scaledH <= rect.height) {
      y = 0;
    } else {
      y = Math.min(0, Math.max(rect.height - scaledH, y));
    }
  }

  function applyTransform() {
    clampPan();
    const transform = `translate(${x}px, ${y}px) scale(${scale})`;
    map.style.transform = transform;
    layer.style.transform = transform;
  }

  function distance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function midpoint(t1, t2) {
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2
    };
  }

  function resetZoom() {
    scale = 1;
    x = 0;
    y = 0;
    applyTransform();
  }

  wrap.addEventListener("touchstart", (event) => {
    if (!isMobileMapZoomEnabled()) return;

    if (event.touches.length === 2) {
      event.preventDefault();
      startDistance = distance(event.touches[0], event.touches[1]);
      startMid = midpoint(event.touches[0], event.touches[1]);
      startScale = scale;
      startX = x;
      startY = y;
      isDragging = false;
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime < 280) {
        event.preventDefault();
        resetZoom();
        lastTapTime = 0;
        return;
      }
      lastTapTime = now;

      if (scale > 1.01) {
        isDragging = true;
        dragStart = {
          x: event.touches[0].clientX - x,
          y: event.touches[0].clientY - y
        };
      }
    }
  }, { passive: false });

  wrap.addEventListener("touchmove", (event) => {
    if (!isMobileMapZoomEnabled()) return;

    if (event.touches.length === 2 && startDistance) {
      event.preventDefault();
      const nextDistance = distance(event.touches[0], event.touches[1]);
      const nextMid = midpoint(event.touches[0], event.touches[1]);
      const rect = wrap.getBoundingClientRect();

      const nextScale = Math.max(minScale, Math.min(maxScale, startScale * (nextDistance / startDistance)));
      const contentX = (startMid.x - rect.left - startX) / startScale;
      const contentY = (startMid.y - rect.top - startY) / startScale;

      scale = nextScale;
      x = nextMid.x - rect.left - contentX * scale;
      y = nextMid.y - rect.top - contentY * scale;
      applyTransform();
      return;
    }

    if (event.touches.length === 1 && isDragging && scale > 1.01) {
      event.preventDefault();
      x = event.touches[0].clientX - dragStart.x;
      y = event.touches[0].clientY - dragStart.y;
      applyTransform();
    }
  }, { passive: false });

  wrap.addEventListener("touchend", () => {
    if (!isMobileMapZoomEnabled()) return;
    if (scale < 1.03) resetZoom();
    isDragging = false;
    startDistance = 0;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!isMobileMapZoomEnabled()) {
      resetZoom();
      return;
    }
    applyTransform();
  });
}

initMobileUsaMapZoom();

/* Prototype 244: allow the top filter button to open the unified filter overlay on desktop too */
(function initUnifiedTopFilterButton() {
  const btn = document.getElementById("mobileFilterButton");
  if (!btn || btn.dataset.unifiedDesktopReady === "true") return;
  btn.dataset.unifiedDesktopReady = "true";
  btn.addEventListener("click", () => {
    if (typeof openMobileFilters === "function") {
      openMobileFilters();
    } else {
      document.body.classList.add("mobile-filters-open");
    }
  });
})();

/* Prototype 246: make desktop top search use the same custom dropdown as mobile */
(function initDesktopSearchDropdownSafety() {
  const input = document.getElementById("mobileDistrictSearch");
  const results = document.getElementById("mobileDistrictSearchResults");
  if (!input || !results || input.dataset.desktopDropdownReady === "true") return;
  input.dataset.desktopDropdownReady = "true";

  const showDropdown = () => {
    if (typeof renderMobileDistrictSearchResults === "function") {
      renderMobileDistrictSearchResults();
    }
  };

  input.addEventListener("input", showDropdown);
  input.addEventListener("focus", showDropdown);
})();

/* Prototype 247: reinforce desktop filter button behavior */
(function initDesktopMobileStyleFilterButton() {
  const btn = document.getElementById("mobileFilterOpenBtn");
  if (!btn || btn.dataset.desktopMobileFilterReady === "true") return;
  btn.dataset.desktopMobileFilterReady = "true";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (typeof openMobileFilters === "function") {
      openMobileFilters();
    } else {
      document.body.classList.add("mobile-filters-open");
    }
  });
})();

/* Prototype 249: move filter controls into a separate desktop right sheet so the map remains visible */
(function initDesktopFilterSheet() {
  const desktopQuery = window.matchMedia("(min-width: 769px)");
  const body = document.body;
  const moved = new Map();
  const nodesToMove = [
    ".mobile-filter-overlay-head",
    ".vertical-filter-stack",
    ".more-filters-shell",
    ".current-search-card",
    ".mobile-filter-sticky-footer"
  ];

  function getSheet() {
    let sheet = document.getElementById("desktopFilterSheet");
    if (!sheet) {
      sheet = document.createElement("aside");
      sheet.id = "desktopFilterSheet";
      sheet.className = "desktop-filter-sheet";
      sheet.setAttribute("aria-label", "Filters");
      document.body.appendChild(sheet);
    }
    return sheet;
  }

  function moveToSheet() {
    if (!desktopQuery.matches || !body.classList.contains("mobile-filters-open")) return;
    const sheet = getSheet();
    nodesToMove.forEach(selector => {
      const node = document.querySelector(selector);
      if (!node || sheet.contains(node)) return;
      const placeholder = document.createComment(`desktop-filter-sheet-placeholder:${selector}`);
      node.parentNode.insertBefore(placeholder, node);
      moved.set(node, placeholder);
      sheet.appendChild(node);
    });
  }

  function restoreFromSheet() {
    moved.forEach((placeholder, node) => {
      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(node, placeholder);
        placeholder.remove();
      }
    });
    moved.clear();
    const sheet = document.getElementById("desktopFilterSheet");
    if (sheet) sheet.remove();
  }

  const observer = new MutationObserver(() => {
    if (body.classList.contains("mobile-filters-open") && desktopQuery.matches) {
      moveToSheet();
    } else {
      restoreFromSheet();
    }
  });

  observer.observe(body, { attributes: true, attributeFilter: ["class"] });
  desktopQuery.addEventListener("change", () => {
    if (body.classList.contains("mobile-filters-open") && desktopQuery.matches) {
      moveToSheet();
    } else {
      restoreFromSheet();
    }
  });
})();

/* Prototype 251: clear width constraints on desktop housing range sliders after moving into sheet */
(function initDesktopHousingSliderWidthFix() {
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  function widenHousingSliders() {
    if (!desktopQuery.matches || !document.body.classList.contains("mobile-filters-open")) return;
    [
      "#rentRangeControl",
      "#homePriceRangeControl",
      "#rentRangeControl input",
      "#homePriceRangeControl input",
      "#rentRangeControl .dual-range-track",
      "#homePriceRangeControl .dual-range-track",
      "#rentRangeControl .dual-range-fill",
      "#homePriceRangeControl .dual-range-fill"
    ].forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.maxWidth = "none";
        if (!el.classList.contains("dual-range-fill")) el.style.width = "100%";
      });
    });
  }

  document.addEventListener("input", widenHousingSliders, true);
  document.getElementById("mobileFilterOpenBtn")?.addEventListener("click", () => {
    requestAnimationFrame(widenHousingSliders);
    setTimeout(widenHousingSliders, 50);
  });
  new MutationObserver(widenHousingSliders).observe(document.body, {attributes:true, attributeFilter:["class"]});
})();

/* Prototype 255: move desktop district-map arrows into the map frame */
(function initDistrictMapSideArrows() {
  function moveArrows() {
    if (!window.matchMedia("(min-width: 769px)").matches) return;
    const frame = document.getElementById("districtMapFrame");
    const controls = document.querySelector(".district-map-nav-controls");
    if (!frame || !controls || frame.contains(controls)) return;
    frame.appendChild(controls);
  }

  moveArrows();
  window.addEventListener("resize", moveArrows);
  new MutationObserver(moveArrows).observe(document.body, { childList: true, subtree: true });
})();

const scoreCols = [
    "Salary Score","Growth Score","Master's Premium Score","Affordability Score",
    "Student-Teacher Ratio Score","Sub Pay Score","Demographic Balance Score","Overall Value Score",
    "Pre-Risk Overall Value Score", "Stability Score"
  ];
  const columns = [
    "District","State","Region","Overall Value Score","Stability Score",
    "Avg Growth %","Affordability Score","Student-Teacher Ratio Score","Sub Pay Score","Demographic Balance Score"
  ];
  const columnLabels = {
    "Overall Value Score": "Final Value",
    "Pre-Risk Overall Value Score": "Pre-Risk",
    "Work Environment Risk": "Stability Risk",
    "Work Environment Multiplier": "Stability Multiplier",
    "Stability Score": "Stability",
    "Salary Score": "Salary",
    "Avg Growth %": "Salary Growth %",
    "Growth Score": "Growth",
    "Master's Premium Score": "Master’s Premium",
    "Affordability Score": "Affordability",
    "Student-Teacher Ratio Score": "Class Size",
    "Sub Pay Score": "Sub Pay",
    "Demographic Balance Score": "Demographic<br>Balance"
  };

  let sortKey = "Overall Value Score";
  let sortDir = -1;
  let selectedDistrict = null;
  let selectedEducation = "Bachelor\'s";
  let forceFilteredRankings = false;

  const RENT_MIN = 500;
  const RENT_MAX = 5000;
  const HOME_PRICE_MIN = 100000;
  const HOME_PRICE_MAX = 1500000;

  let activeHousingFilters = {
    minRent: RENT_MIN,
    maxRent: RENT_MAX,
    minHomePrice: HOME_PRICE_MIN,
    maxHomePrice: HOME_PRICE_MAX
  };
  let pendingHousingFilters = {
    minRent: RENT_MIN,
    maxRent: RENT_MAX,
    minHomePrice: HOME_PRICE_MIN,
    maxHomePrice: HOME_PRICE_MAX
  };

  let showTenPlusHighSchoolsOnly = false;
  let showStableDistrictsOnly = false;
  let showOverall60PlusOnly = false;
  let showBalancedDemographicsOnly = false;

  let housingSliderDragActive = false;
  let suppressFilterCloseUntil = 0;

  const fmtMoney = v => (typeof v === "number") ? v.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits:0}) : "—";
  const fmtPct = v => (typeof v === "number") ? (v*100).toFixed(1)+"%" : "—";
  const fmtWholePct = v => (typeof v === "number") ? v.toFixed(1)+"%" : "—";
  const fmtScore = v => (typeof v === "number") ? v.toFixed(1) : "—";
  const fmtCount = v => (typeof v === "number" && Number.isFinite(v)) ? v.toLocaleString("en-US", {maximumFractionDigits:0}) : "—";
  const scoreColor = v => {
    if (typeof v !== "number") return "#d1d5db";
    const clamp = Math.max(0, Math.min(100, v));
    const red = [248, 105, 107];     // Excel-style low value
    const yellow = [255, 235, 132];  // Excel-style midpoint
    const green = [99, 190, 123];    // Excel-style high value
    const mix = (a, b, t) => Math.round(a + (b - a) * t);
    const start = clamp < 50 ? red : yellow;
    const end = clamp < 50 ? yellow : green;
    const t = clamp < 50 ? clamp / 50 : (clamp - 50) / 50;
    const rgb = [
      mix(start[0], end[0], t),
      mix(start[1], end[1], t),
      mix(start[2], end[2], t)
    ];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

  const stabilityDisplayScore = d => {
    if (typeof d?.["Stability Score"] === "number") return d["Stability Score"];
    const m = typeof d?.["Work Environment Multiplier"] === "number" ? d["Work Environment Multiplier"] : 1;
    if (m <= 0.80) return 25;
    if (m <= 0.85) return 40;
    if (m <= 0.90) return 60;
    if (m <= 0.95) return 75;
    return 100;
  };
  const stateAvgScore = state => {
    const rows = DISTRICTS.filter(d => d.State === state);
    if (!rows.length) return null;
    return rows.reduce((s,d)=>s+(d["Overall Value Score"]||0),0)/rows.length;
  };

  const stateNames = {
    AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO:"Colorado", CT:"Connecticut",
    DE:"Delaware", FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana",
    IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts",
    MI:"Michigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Nevada",
    NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina", ND:"North Dakota",
    OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina",
    SD:"South Dakota", TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia", WA:"Washington",
    WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming", DC:"District of Columbia"
  };


  const DISTRICT_MAPS = {
    "Alief ISD": {
      src: "district-map-alief-isd.png",
      alt: "Boundary map for Alief ISD"
    },
    "Katy ISD": {
      src: "district-map-katy-isd.png",
      alt: "Boundary map for Katy ISD"
    },
    "Leander ISD": {
      src: "district-map-leander-isd.png",
      alt: "Boundary map for Leander ISD"
    },
    "Los Angeles Unified School District": {
      src: "district-map-los-angeles-unified.png",
      alt: "Boundary map for Los Angeles Unified School District"
    },
    "Jordan District": {
      src: "district-map-jordan-district.png",
      alt: "Boundary map for Jordan District"
    },
    "Eanes ISD": {
      src: "district-map-eanes-isd.png",
      alt: "Boundary map for Eanes ISD"
    },
    "Portland Public Schools": {
      src: "district-map-portland-public-schools.png",
      alt: "Boundary map for Portland Public Schools"
    }
  };

  function getDistrictNavigationContext() {
    const selectedState = stateFilter?.value || "";
    if (selectedState) {
      const stateName = stateNames[selectedState] || selectedState;
      const items = [...getFiltered().filter(d => d.State === selectedState)]
        .sort((a,b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0));
      return {
        mode: "state",
        label: `${stateName} matching districts`,
        items
      };
    }

    // Desktop district-map arrows should browse only the districts currently
    // visible in the main Leaflet map viewport. This keeps the lower district
    // map/profile navigation synced with regions like Houston, Austin, or Utah
    // after the user pans or zooms the map.
    if (isDesktopMapViewportRankingMode()) {
      const items = [...getMapViewportRows()]
        .sort((a,b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0));
      return {
        mode: "viewport",
        label: "Visible map districts",
        items
      };
    }

    const items = [...getFiltered()].sort((a,b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0));
    return {
      mode: "national",
      label: "Filtered national browse",
      items
    };
  }

  function updateDistrictMapNavigation() {
    const navMeta = document.getElementById("districtMapNavMetaText");
    const prevBtn = document.getElementById("districtMapPrev");
    const nextBtn = document.getElementById("districtMapNext");
    if (!navMeta || !prevBtn || !nextBtn) return;

    const context = getDistrictNavigationContext();
    const items = context.items || [];
    const hasItems = items.length > 0;
    prevBtn.disabled = !hasItems;
    nextBtn.disabled = !hasItems;

    if (!hasItems) {
      navMeta.textContent = context.mode === "state"
        ? `${context.label} · No matching districts`
        : "National browse · No districts available";
      return;
    }

    const currentIndex = selectedDistrict
      ? items.findIndex(d => d.District === selectedDistrict.District)
      : -1;

    if (currentIndex >= 0) {
      navMeta.textContent = `${context.label} · ${currentIndex + 1} of ${items.length}`;
    } else {
      navMeta.textContent = `${context.label} · Use arrows to browse ${items.length} ${items.length === 1 ? "district" : "districts"}`;
    }
  }

  function navigateDistrictMap(step) {
    const context = getDistrictNavigationContext();
    const items = context.items || [];
    if (!items.length) return;

    const currentIndex = selectedDistrict
      ? items.findIndex(d => d.District === selectedDistrict.District)
      : -1;

    let nextIndex;
    if (currentIndex === -1) {
      nextIndex = step < 0 ? items.length - 1 : 0;
    } else {
      nextIndex = (currentIndex + step + items.length) % items.length;
    }

    selectedDistrict = items[nextIndex];
    renderProfile();
  }

  function renderDistrictMap() {
    const mapTitle = document.getElementById("districtMapTitle");
    const mapStatus = document.getElementById("districtMapStatus");
    const mapPlaceholder = document.getElementById("districtMapPlaceholder");
    const mapImage = document.getElementById("districtMapImage");

    if (!mapTitle || !mapStatus || !mapPlaceholder || !mapImage) return;

    if (!selectedDistrict) {
      mapTitle.textContent = "Select a district";
      mapStatus.textContent = "Map will appear here when available.";
      mapPlaceholder.textContent = "Select a district to view its map.";
      mapPlaceholder.hidden = false;
      mapImage.hidden = true;
      mapImage.removeAttribute("src");
      mapImage.alt = "";
      updateDistrictMapNavigation();
      return;
    }

    mapTitle.textContent = selectedDistrict.District;
    const mapMeta = DISTRICT_MAPS[selectedDistrict.District];

    if (mapMeta) {
      mapStatus.textContent = "District boundary map";
      mapPlaceholder.textContent = "";
      mapPlaceholder.hidden = true;
      mapImage.src = mapMeta.src;
      mapImage.alt = mapMeta.alt;
      mapImage.hidden = false;
    } else {
      mapStatus.textContent = "Map not added yet for this district.";
      mapPlaceholder.textContent = `Map coming soon for ${selectedDistrict.District}.`;
      mapPlaceholder.hidden = false;
      mapImage.hidden = true;
      mapImage.removeAttribute("src");
      mapImage.alt = "";
    }

    updateDistrictMapNavigation();
  }

  function describeSalaryFilters() {
    return `${selectedEducation} · ${getExperience()} ${getExperience() === 1 ? "year" : "years"} · ${fmtMoney(getDesiredSalary())}+`;
  }


  const getExperience = () => Number(experienceFilter?.value ?? 0);
  const getDesiredSalary = () => Number(salaryFilter?.value ?? 40000);

  function creditedExperienceForDistrict(d, actualYears = getExperience()) {
    const rule = d.salaryPlacementRule;
    if (!rule || rule.scheduleAlreadyAdjusted) return actualYears;
    if (rule.type === "cap" && Number.isFinite(Number(rule.maxCredit))) {
      return Math.min(actualYears, Number(rule.maxCredit));
    }
    if (rule.type === "map" && rule.creditByActualYears) {
      const mapped = rule.creditByActualYears[String(actualYears)];
      return Number.isFinite(Number(mapped)) ? Number(mapped) : actualYears;
    }
    return actualYears;
  }

  function placementLabelForDistrict(d) {
    const actual = getExperience();
    const credited = creditedExperienceForDistrict(d, actual);
    if (credited === actual) return null;
    return `${actual} actual → ${credited} credited`;
  }

  function selectedEducationSalaryLabel() {
    return selectedEducation === "Master's" ? "Master's Salary" : "Bachelor's Salary";
  }

  function selectedSalaryDollarValue(d) {
    return fmtMoney(salaryForDistrict(d));
  }

  function formatDailySubPay(d) {
    const subPay = d["Daily Sub Pay"] ?? d["Licensed Sub Pay"];
    return typeof subPay === "number" ? `${fmtMoney(subPay)}/day` : "—";
  }

  function stabilityTextLabel(d) {
    // Keep the visible Stability value concise. Detailed risk notes stay in source data,
    // but the profile tile should show a simple status such as Stable, Watch, Elevated, etc.
    const rawLabel = d.stabilityLabel || d["Stability Label"] || "";
    if (rawLabel) {
      const normalized = String(rawLabel).trim();
      if (/^moderate$/i.test(normalized)) return "Watch";
      if (/^stable/i.test(normalized)) return "Stable";
      return normalized;
    }
    const score = stabilityDisplayScore(d);
    if (!Number.isFinite(Number(score))) return "—";
    if (score >= 100) return "Stable";
    if (score >= 75) return "Watch";
    if (score >= 60) return "Elevated";
    if (score >= 40) return "Severe";
    if (score >= 25) return "Extreme";
    return "Extreme";
  }

  function salaryForDistrict(d) {
    const schedule = d.salarySchedule?.[selectedEducation];
    if (!schedule) return null;
    const lookupYears = creditedExperienceForDistrict(d);
    const val = schedule[String(lookupYears)];
    return typeof val === "number" ? val : null;
  }

  function matchesSalaryFilters(d) {
    const salary = salaryForDistrict(d);
    return typeof salary === "number" && salary >= getDesiredSalary();
  }

  function salaryFiltersActive() {
    return selectedEducation !== "Bachelor's" || getExperience() !== 0 || getDesiredSalary() !== 40000;
  }

  function updateSingleRangeVisual(rangeEl) {
    if (!rangeEl) return;
    const min = Number(rangeEl.min ?? 0);
    const max = Number(rangeEl.max ?? 100);
    const value = Number(rangeEl.value ?? min);
    const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;
    rangeEl.style.setProperty("--range-percent", `${percent}%`);
  }

  function updateSalaryReadouts() {
    const years = getExperience();
    const desiredSalary = getDesiredSalary();
    experienceReadout.textContent = `${years} ${years === 1 ? "year" : "years"}`;
    salaryReadout.textContent = `${fmtMoney(desiredSalary)}+`;
    experienceReadout.classList.toggle("is-active", years !== 0);
    salaryReadout.classList.toggle("is-active", desiredSalary !== 40000);
    updateSingleRangeVisual(experienceFilter);
    updateSingleRangeVisual(salaryFilter);
  }

  function countActiveHousingFilters() {
    let count = 0;
    if (activeHousingFilters.minRent > RENT_MIN || activeHousingFilters.maxRent < RENT_MAX) count++;
    if (activeHousingFilters.minHomePrice > HOME_PRICE_MIN || activeHousingFilters.maxHomePrice < HOME_PRICE_MAX) count++;
    if (showTenPlusHighSchoolsOnly) count++;
    if (showStableDistrictsOnly) count++;
    if (showOverall60PlusOnly) count++;
    if (showBalancedDemographicsOnly) count++;
    return count;
  }

  function countActiveFilters() {
    let count = countActiveHousingFilters();

    // Count education as active when the user changes away from the default Bachelor's option.
    if (selectedEducation !== "Bachelor's") count++;

    // Count Years Experience and Desired Salary as active filters once moved away from their defaults.
    if (Number(experienceFilter?.value || 0) > 0) count++;
    if (Number(salaryFilter?.value || 40000) > 40000) count++;

    return count;
  }

  function housingRangeLabel(minValue, maxValue, defaultMin, defaultMax) {
    if (Number(minValue) <= defaultMin && Number(maxValue) >= defaultMax) return "Any";
    return `${fmtMoney(Number(minValue))} – ${fmtMoney(Number(maxValue))}`;
  }

  function setDualRangeFill(fillEl, minValue, maxValue, defaultMin, defaultMax) {
    if (!fillEl) return;
    const span = defaultMax - defaultMin;
    const leftPct = ((minValue - defaultMin) / span) * 100;
    const rightPct = 100 - ((maxValue - defaultMin) / span) * 100;
    fillEl.style.left = `${leftPct}%`;
    fillEl.style.right = `${rightPct}%`;
  }

  function syncHousingFilterControls() {
    if (minRentFilter) minRentFilter.value = String(pendingHousingFilters.minRent);
    if (maxRentFilter) maxRentFilter.value = String(pendingHousingFilters.maxRent);
    if (minHomePriceFilter) minHomePriceFilter.value = String(pendingHousingFilters.minHomePrice);
    if (maxHomePriceFilter) maxHomePriceFilter.value = String(pendingHousingFilters.maxHomePrice);
    updateHousingReadouts();
  }

  function updateHousingReadouts() {
    const rentActive = pendingHousingFilters.minRent > RENT_MIN || pendingHousingFilters.maxRent < RENT_MAX;
    const homePriceActive = pendingHousingFilters.minHomePrice > HOME_PRICE_MIN || pendingHousingFilters.maxHomePrice < HOME_PRICE_MAX;
    if (rentRangeReadout) {
      rentRangeReadout.textContent = housingRangeLabel(pendingHousingFilters.minRent, pendingHousingFilters.maxRent, RENT_MIN, RENT_MAX);
      rentRangeReadout.classList.toggle("is-active", rentActive);
    }
    if (homePriceRangeReadout) {
      homePriceRangeReadout.textContent = housingRangeLabel(pendingHousingFilters.minHomePrice, pendingHousingFilters.maxHomePrice, HOME_PRICE_MIN, HOME_PRICE_MAX);
      homePriceRangeReadout.classList.toggle("is-active", homePriceActive);
    }
    setDualRangeFill(rentRangeFill, pendingHousingFilters.minRent, pendingHousingFilters.maxRent, RENT_MIN, RENT_MAX);
    setDualRangeFill(homePriceRangeFill, pendingHousingFilters.minHomePrice, pendingHousingFilters.maxHomePrice, HOME_PRICE_MIN, HOME_PRICE_MAX);
  }


  function updateCurrentSearchSummary() {
    const summaryEducation = document.getElementById("summaryEducation");
    const summaryExperience = document.getElementById("summaryExperience");
    const summarySalary = document.getElementById("summarySalary");
    const summaryRent = document.getElementById("summaryRent");
    const summaryHomePrice = document.getElementById("summaryHomePrice");
    const summaryTenHighSchools = document.getElementById("summaryTenHighSchools");
    const summaryStableDistricts = document.getElementById("summaryStableDistricts");
    const summaryOverall60 = document.getElementById("summaryOverall60");
    const summaryBalancedDemographics = document.getElementById("summaryBalancedDemographics");
    if (!summaryEducation || !summaryExperience || !summarySalary || !summaryRent || !summaryHomePrice) return;

    const years = getExperience();
    summaryEducation.textContent = selectedEducation;
    summaryExperience.textContent = `${years} ${years === 1 ? "year" : "years"}`;
    summarySalary.textContent = `${fmtMoney(getDesiredSalary())}+`;
    summaryRent.textContent = housingRangeLabel(activeHousingFilters.minRent, activeHousingFilters.maxRent, RENT_MIN, RENT_MAX);
    summaryHomePrice.textContent = housingRangeLabel(activeHousingFilters.minHomePrice, activeHousingFilters.maxHomePrice, HOME_PRICE_MIN, HOME_PRICE_MAX);
    if (summaryTenHighSchools) summaryTenHighSchools.textContent = showTenPlusHighSchoolsOnly ? "On" : "Off";
    if (summaryStableDistricts) summaryStableDistricts.textContent = showStableDistrictsOnly ? "On" : "Off";
    if (summaryOverall60) summaryOverall60.textContent = showOverall60PlusOnly ? "On" : "Off";
    if (summaryBalancedDemographics) summaryBalancedDemographics.textContent = showBalancedDemographicsOnly ? "On" : "Off";
  }

  function updateExtraFilterBadge() {
    const count = countActiveFilters();
    if (extraFilterCount) {
      extraFilterCount.textContent = String(count);
      extraFilterCount.style.display = "inline-flex";
    }
    const mobileBadge = document.getElementById("mobileFilterBadge");
    const filterButton = document.getElementById("mobileFilterOpenBtn");
    if (filterButton) {
      filterButton.classList.toggle("has-active-filters", count > 0);
      filterButton.setAttribute("aria-label", count > 0 ? `Open filters, ${count} active` : "Open filters");
    }
    if (mobileBadge) {
      mobileBadge.textContent = String(count);
      mobileBadge.hidden = count <= 0;
      mobileBadge.style.display = count > 0 ? "inline-flex" : "none";
    }
    const mobileToolbarFilterCount = document.getElementById("mobileToolbarFilterCount");
    if (mobileToolbarFilterCount) {
      mobileToolbarFilterCount.textContent = String(count);
      mobileToolbarFilterCount.hidden = count <= 0;
    }
  }

  function setPendingFromActiveFilters() {
    pendingHousingFilters = {...activeHousingFilters};
    syncHousingFilterControls();
  }

  function openMoreFilters() {
    setPendingFromActiveFilters();
    moreFiltersPanel.hidden = false;
    moreFiltersTrigger.classList.add("is-open");
    moreFiltersTrigger.setAttribute("aria-expanded", "true");
  }

  function closeMoreFilters(force = false) {
    if (!force && document.body.classList.contains("mobile-filters-open")) return;
    moreFiltersPanel.hidden = true;
    moreFiltersTrigger.classList.remove("is-open");
    moreFiltersTrigger.setAttribute("aria-expanded", "false");
  }

  function toggleMoreFilters() {
    if (moreFiltersPanel.hidden) openMoreFilters();
    else closeMoreFilters();
  }

  function isStableDistrict(d) {
    if (typeof d["Stability Score"] === "number") return d["Stability Score"] >= 100;
    if (typeof d["Work Environment Multiplier"] === "number") return d["Work Environment Multiplier"] >= 1;
    return true;
  }

  function isBalancedDemographicsDistrict(d) {
    return typeof d["Demographic Balance Score"] === "number" && d["Demographic Balance Score"] >= 80;
  }

  function passesExtraFilters(d) {
    const rent = d["Median Rent"];
    const homePrice = d["Median Home Price"];

    if (activeHousingFilters.minRent > RENT_MIN || activeHousingFilters.maxRent < RENT_MAX) {
      if (typeof rent !== "number" || rent < activeHousingFilters.minRent || rent > activeHousingFilters.maxRent) return false;
    }
    if (activeHousingFilters.minHomePrice > HOME_PRICE_MIN || activeHousingFilters.maxHomePrice < HOME_PRICE_MAX) {
      if (typeof homePrice !== "number" || homePrice < activeHousingFilters.minHomePrice || homePrice > activeHousingFilters.maxHomePrice) return false;
    }
    if (showTenPlusHighSchoolsOnly && !(Number(d["Number of High Schools"]) >= 10)) return false;
    if (showStableDistrictsOnly && !isStableDistrict(d)) return false;
    if (showOverall60PlusOnly && !(Number(d["Overall Value Score"]) >= 60)) return false;
    if (showBalancedDemographicsOnly && !isBalancedDemographicsDistrict(d)) return false;
    return true;
  }


  function initFilters() {
    const states = [...new Set(DISTRICTS.map(d=>d.State))].sort();
    states.forEach(s => stateFilter.insertAdjacentHTML("beforeend", `<option>${s}</option>`));
    updateRegionOptions();
  }

  function updateRegionOptions() {
    const selectedState = stateFilter.value;
    const previousRegion = regionFilter.value;
    const regions = [...new Set(
      DISTRICTS
        .filter(d => !selectedState || d.State === selectedState)
        .map(d => d.Region)
        .filter(Boolean)
    )].sort();

    regionFilter.innerHTML = `<option value="">All regions</option>`;
    regions.forEach(r => regionFilter.insertAdjacentHTML("beforeend", `<option>${r}</option>`));

    if (regions.includes(previousRegion)) {
      regionFilter.value = previousRegion;
    } else {
      regionFilter.value = "";
    }
  }

  function getFiltered() {
    const st = stateFilter.value, reg = regionFilter.value;
    return DISTRICTS.filter(d =>
      (!st || d.State === st) &&
      (!reg || d.Region === reg) &&
      matchesSalaryFilters(d) &&
      passesExtraFilters(d)
    );
  }


  function updateLegendVisibility() {
    if (typeof mapLegend !== "undefined" && mapLegend) {
      mapLegend.style.display = "flex";
    }
  }

  function selectState(s, doScroll=false) {
    stateFilter.value = s;
    updateRegionOptions();
    selectedDistrict = null;
    renderAll();
    if (doScroll && stateResults) {
      stateResults.scrollIntoView({behavior:"smooth", block:"nearest"});
    }
  }

  function renderStateClickLayer(districtsByState, hasMatch) {
    const stateClickLayer = document.getElementById("stateClickLayer");
    if (stateClickLayer) stateClickLayer.innerHTML = "";
  }


  function closeStateResults() {
    return;
  }

  function clearStateSelectionToNational() {
    if (!stateFilter.value && !regionFilter.value) return;
    stateFilter.value = "";
    updateRegionOptions();
    regionFilter.value = "";
    selectedDistrict = null;
    renderAll();
  }

  function attachNativeStatePathClicks(gd, allStates, hasMatch) {
    // Plotly draws one SVG path per choropleth location, generally in the same order
    // as the locations array. Attaching directly to those paths makes the clickable
    // area follow the actual rendered state shape instead of a rectangular hotspot.
    setTimeout(() => {
      const paths = gd.querySelectorAll(".choroplethlayer path");
      paths.forEach((path, i) => {
        const s = allStates[i];
        if (!s) return;

        path.style.cursor = hasMatch(s) ? "pointer" : "default";
        path.style.pointerEvents = hasMatch(s) ? "auto" : "none";

        path.onclick = evt => {
          evt.preventDefault();
          evt.stopPropagation();
          if (!hasMatch(s)) return;
          selectState(s, false);
        };
      });

      gd.onclick = evt => {
        const clickedStatePath = evt.target.closest && evt.target.closest(".choroplethlayer path");
        const clickedStateHotspot = evt.target.closest && evt.target.closest(".state-hotspot");
        if (clickedStatePath || clickedStateHotspot) return;
        clearStateSelectionToNational();
      };
    }, 60);
  }


  const STATE_TILE_POSITIONS = {
    VT:[2,10], NH:[2,11], WA:[2,1], MT:[2,2], ND:[2,3], MN:[2,4], WI:[2,5], MI:[2,6], NY:[2,9], MA:[2,12],
    OR:[3,1], ID:[3,2], SD:[3,3], IA:[3,4], IL:[3,5], IN:[3,6], OH:[3,7], PA:[3,8], NJ:[3,9], CT:[3,10], RI:[3,11],
    CA:[4,1], NV:[4,2], WY:[4,3], NE:[4,4], MO:[4,5], KY:[4,6], WV:[4,7], VA:[4,8], MD:[4,9], DE:[4,10], DC:[4,11],
    HI:[5,1], UT:[5,2], CO:[5,3], KS:[5,4], AR:[5,5], TN:[5,6], NC:[5,7], SC:[5,8],
    AZ:[6,2], NM:[6,3], OK:[6,4], LA:[6,5], MS:[6,6], AL:[6,7], GA:[6,8],
    TX:[7,4], FL:[7,9]
  };

  function renderUsaTileFallback(allStates, districtsByState, hasData, hasMatch, selectedState) {
    const usaMap = document.getElementById("usaMap");
    if (!usaMap) return;
    usaMap.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "usa-tile-map";
    allStates.forEach(s => {
      const pos = STATE_TILE_POSITIONS[s];
      if (!pos) return;
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "usa-state-tile";
      tile.textContent = s;
      tile.style.gridRow = pos[0];
      tile.style.gridColumn = pos[1];
      if (hasMatch(s)) {
        tile.classList.add("has-match");
        tile.title = `${stateNames[s] || s}: click to view matching districts`;
        tile.addEventListener("click", evt => {
          evt.preventDefault();
          evt.stopPropagation();
          selectState(s, false);
        });
      } else if (hasData(s)) {
        tile.classList.add("has-data-no-match");
        tile.title = `${stateNames[s] || s}: data entered, but no current match`;
      } else {
        tile.classList.add("no-data");
        tile.title = `${stateNames[s] || s}: no districts entered yet`;
      }
      if (s === selectedState) tile.classList.add("selected");
      grid.appendChild(tile);
    });
    usaMap.appendChild(grid);
  }

  const DISTRICT_GEO = {

  "Dublin City Schools": [
    40.0992,
    -83.1141
  ],
  "Mariemont City Schools": [
    39.1453,
    -84.3744
  ],
  "Channelview ISD": [
    29.7925,
    -95.1255
  ],
  "Plano ISD": [
    33.0198,
    -96.6989
  ],
  "Galena Park ISD": [
    29.7336,
    -95.2302
  ],
  "Deer Park ISD": [
    29.7052,
    -95.1238
  ],
  "Port Arthur ISD": [
    29.8849,
    -93.9399
  ],
  "Alief ISD": [
    29.711,
    -95.596
  ],
  "Arcadia Unified School District": [
    34.1397,
    -118.0353
  ],
  "Austin ISD": [
    30.2672,
    -97.7431
  ],
  "Barbers Hill ISD": [
    29.8405,
    -94.8908
  ],
  "Beaverton School District": [
    45.4871,
    -122.8037
  ],
  "Canyons School District": [
    40.572,
    -111.86
  ],
  "Chandler Unified School District": [
    33.3062,
    -111.8413
  ],
  "Chapel Hill-Carrboro City Schools": [
    35.9132,
    -79.0558
  ],
  "Cherry Creek School District": [
    39.642,
    -104.827
  ],
  "Chicago Public Schools": [
    41.8781,
    -87.6298
  ],
  "Cobb County School District": [
    33.9526,
    -84.5499
  ],
  "Denver Public Schools": [
    39.7392,
    -104.9903
  ],
  "Eanes ISD": [
    30.2807,
    -97.8197
  ],
  "Eden Prairie Schools": [
    44.8547,
    -93.4708
  ],
  "Edina Public Schools": [
    44.8897,
    -93.3499
  ],
  "Flagstaff Unified School District": [
    35.1983,
    -111.6513
  ],
  "Glenbrook High School District 225": [
    42.1275,
    -87.829
  ],
  "Glendale Union High School District": [
    33.5387,
    -112.186
  ],
  "Glendora Unified School District": [
    34.1361,
    -117.8653
  ],
  "Gwinnett County Public Schools": [
    33.9562,
    -84.0144
  ],
  "Indian Prairie School District 204": [
    41.7508,
    -88.1535
  ],
  "Jordan District": [
    40.5622,
    -111.9297
  ],
  "Katy ISD": [
    29.7858,
    -95.8245
  ],
  "La Ca\u00f1ada Unified School District": [
    34.2068,
    -118.2
  ],
  "Lake Washington School District": [
    47.6769,
    -122.206
  ],
  "Leander ISD": [
    30.5788,
    -97.8531
  ],
  "Los Angeles Unified School District": [
    34.0522,
    -118.2437
  ],
  "Loudoun County Public Schools": [
    39.1157,
    -77.5636
  ],
  "Madison Metropolitan School District": [
    43.0731,
    -89.4012
  ],
  "Metro Nashville Public Schools": [
    36.1627,
    -86.7816
  ],
  "Middleton-Cross Plains Area School District": [
    43.0972,
    -89.5043
  ],
  "Minnetonka Public Schools": [
    44.9212,
    -93.4687
  ],
  "Mounds View Public Schools": [
    45.0791,
    -93.1472
  ],
  "Naperville CUSD 203": [
    41.7508,
    -88.1535
  ],
  "Nassau County School District": [
    30.6319,
    -81.6065
  ],
  "New Trier Township High School District 203": [
    42.1025,
    -87.7357
  ],
  "North Clackamas School District": [
    45.4076,
    -122.5704
  ],
  "Oakland Unified School District": [
    37.8044,
    -122.2712
  ],
  "Ocean Springs School District": [
    30.4113,
    -88.8278
  ],
  "Oxnard Union High School District": [
    34.1975,
    -119.1771
  ],
  "Portland Public Schools": [
    45.5152,
    -122.6784
  ],
  "Provo City School District": [
    40.2338,
    -111.6585
  ],
  "Rosemount-Apple Valley-Eagan ISD 196": [
    44.7319,
    -93.1261
  ],
  "Royal ISD": [
    29.8255,
    -96.0125
  ],
  "Saint Helena Unified School District": [
    38.5052,
    -122.4703
  ],
  "Salt Lake School District": [
    40.7608,
    -111.891
  ],
  "San Antonio ISD": [
    29.4241,
    -98.4936
  ],
  "San Diego Unified School District": [
    32.7157,
    -117.1611
  ],
  "San Jose Unified School District": [
    37.3382,
    -121.8863
  ],
  "Scarsdale Union Free School District": [
    40.9882,
    -73.795
  ],
  "South Pasadena Unified School District": [
    34.1161,
    -118.1503
  ],
  "Sun Prairie Area School District": [
    43.1836,
    -89.2137
  ],
  "Tahoe-Truckee Unified School District": [
    39.32796,
    -120.18325
  ],
  "Syosset Central School District": [
    40.8262,
    -73.5021
  ],
  "Verona Area School District": [
    42.9908,
    -89.5332
  ],
  "Waunakee Community School District": [
    43.1919,
    -89.4557
  ],
  "Wayzata Public Schools": [
    44.9741,
    -93.5066
  ],
  "West Des Moines Community Schools": [
    41.5772,
    -93.7113
  ]
};
  let leafletUsaMap = null;
  let leafletDistrictLayer = null;
  let leafletStateBoundaryLayer = null;
  let leafletMoveTimer = null;

  

  function getDistrictGeo(d) {
    if (!d) return null;
    const point = DISTRICT_GEO[d.District];
    if (point) return point;
    const lat = Number(d.lat ?? d.Latitude ?? d.latitude);
    const lng = Number(d.lng ?? d.Lng ?? d.Longitude ?? d.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
    return null;
  }
const STATE_FIT_BOUNDS = {
    AL:[[30.2,-88.6],[35.1,-84.8]], AK:[[51.2,-179.2],[71.6,-129.9]], AZ:[[31.2,-114.9],[37.1,-109.0]], AR:[[33.0,-94.7],[36.6,-89.6]],
    CA:[[32.4,-124.5],[42.1,-114.1]], CO:[[36.9,-109.1],[41.1,-102.0]], CT:[[40.9,-73.8],[42.1,-71.7]], DE:[[38.4,-75.8],[39.9,-75.0]],
    FL:[[24.4,-87.8],[31.1,-80.0]], GA:[[30.3,-85.7],[35.1,-80.8]], HI:[[18.8,-160.3],[22.4,-154.7]], ID:[[42.0,-117.3],[49.1,-111.0]],
    IL:[[37.0,-91.6],[42.6,-87.0]], IN:[[37.7,-88.2],[41.8,-84.7]], IA:[[40.3,-96.7],[43.6,-90.1]], KS:[[36.9,-102.1],[40.1,-94.5]],
    KY:[[36.5,-89.6],[39.2,-81.9]], LA:[[28.9,-94.1],[33.1,-88.8]], ME:[[42.9,-71.1],[47.5,-66.9]], MD:[[37.9,-79.5],[39.8,-75.0]],
    MA:[[41.2,-73.6],[42.9,-69.9]], MI:[[41.7,-90.5],[48.4,-82.1]], MN:[[43.4,-97.3],[49.5,-89.5]], MS:[[30.1,-91.7],[35.1,-88.1]],
    MO:[[35.9,-95.8],[40.7,-89.1]], MT:[[44.3,-116.1],[49.1,-104.0]], NE:[[39.9,-104.1],[43.1,-95.3]], NV:[[35.0,-120.1],[42.1,-114.0]],
    NH:[[42.7,-72.6],[45.4,-70.5]], NJ:[[38.8,-75.6],[41.4,-73.9]], NM:[[31.2,-109.1],[37.1,-103.0]], NY:[[40.4,-79.8],[45.1,-71.8]],
    NC:[[33.8,-84.4],[36.7,-75.3]], ND:[[45.9,-104.1],[49.1,-96.5]], OH:[[38.3,-84.9],[41.9,-80.5]], OK:[[33.6,-103.1],[37.1,-94.4]],
    OR:[[41.9,-124.7],[46.4,-116.4]], PA:[[39.6,-80.6],[42.6,-74.7]], RI:[[41.1,-71.9],[42.1,-71.1]], SC:[[32.0,-83.4],[35.3,-78.5]],
    SD:[[42.4,-104.1],[45.9,-96.4]], TN:[[34.9,-90.4],[36.7,-81.6]], TX:[[25.7,-106.7],[36.6,-93.5]], UT:[[36.9,-114.1],[42.1,-109.0]],
    VT:[[42.7,-73.5],[45.1,-71.4]], VA:[[36.5,-83.8],[39.6,-75.2]], WA:[[45.5,-124.8],[49.1,-116.9]], WV:[[37.1,-82.7],[40.7,-77.7]],
    WI:[[42.4,-92.9],[47.3,-86.8]], WY:[[40.9,-111.1],[45.1,-104.0]], DC:[[38.78,-77.13],[39.0,-76.9]]
  };

  function codeFromStateFeature(feature) {
    const props = feature?.properties || {};
    const rawCode = props.STUSPS || props.postal || props.STATE_ABBR || props.state_code || props.abbr || props.id || feature?.id;
    if (rawCode && /^[A-Z]{2}$/.test(String(rawCode).toUpperCase())) return String(rawCode).toUpperCase();
    const name = props.name || props.NAME || props.State || props.state || props.STATE_NAME;
    if (!name) return "";
    const entry = Object.entries(stateNames).find(([, fullName]) => fullName.toLowerCase() === String(name).toLowerCase());
    return entry ? entry[0] : "";
  }

  function fitMapToStateDistricts(st) {
    if (!leafletUsaMap || !window.L || !st) return;
    const filteredRows = DISTRICTS.filter(d => d.State === st && districtHasMapMatch(d));
    const fallbackRows = DISTRICTS.filter(d => d.State === st && getDistrictGeo(d));
    const rows = filteredRows.length ? filteredRows : fallbackRows;
    const latLngs = rows
      .map(d => getDistrictGeo(d))
      .filter(Boolean)
      .map(point => L.latLng(point[0], point[1]));

    if (latLngs.length === 1) {
      leafletUsaMap.setView(latLngs[0], 8, { animate: true });
      return;
    }
    if (latLngs.length > 1) {
      leafletUsaMap.fitBounds(L.latLngBounds(latLngs).pad(0.35), { maxZoom: 8, animate: true });
      return;
    }
    const stateBounds = STATE_FIT_BOUNDS[st];
    if (stateBounds) leafletUsaMap.fitBounds(stateBounds, { maxZoom: 6, animate: true });
  }

  function focusStateFromMapClick(st) {
    if (!st || !stateFilter) return;
    stateFilter.value = st;
    updateRegionOptions();
    regionFilter.value = "";
    selectedDistrict = null;
    renderAll(false);
    window.setTimeout(() => {
      fitMapToStateDistricts(st);
      renderLeafletDistrictMarkers();
      renderMapViewportTopMatches();
      updateDistrictMapNavigation();
    }, 80);
  }

  function initLeafletStateBoundaryClicks() {
    if (!leafletUsaMap || !window.L || leafletStateBoundaryLayer) return;

    const addBoundaryLayer = geojson => {
      if (!leafletUsaMap || leafletStateBoundaryLayer || !geojson) return;
      leafletStateBoundaryLayer = L.geoJSON(geojson, {
        style: feature => {
          const st = codeFromStateFeature(feature);
          const hasRows = DISTRICTS.some(d => d.State === st);
          return {
            color: hasRows ? "#2f5caa" : "#94a3b8",
            weight: 1,
            opacity: 0.18,
            fillOpacity: hasRows ? 0.025 : 0.01,
            fillColor: hasRows ? "#2f5caa" : "#94a3b8"
          };
        },
        onEachFeature: (feature, layer) => {
          const st = codeFromStateFeature(feature);
          if (!st) return;
          const hasRows = DISTRICTS.some(d => d.State === st);
          layer.options.interactive = true;
          layer.on("click", evt => {
            if (evt.originalEvent) L.DomEvent.stopPropagation(evt.originalEvent);
            if (!hasRows) return;
            focusStateFromMapClick(st);
          });
          layer.on("mouseover", () => {
            if (hasRows) layer.setStyle({ weight: 2, opacity: 0.35, fillOpacity: 0.06 });
          });
          layer.on("mouseout", () => {
            if (leafletStateBoundaryLayer) leafletStateBoundaryLayer.resetStyle(layer);
          });
          if (hasRows) layer.bindTooltip(stateNames[st] || st, { sticky: true, direction: "top" });
        }
      }).addTo(leafletUsaMap);
      if (leafletDistrictLayer) leafletDistrictLayer.bringToFront();
    };

    const urls = [
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
      "https://cdn.jsdelivr.net/gh/PublicaMundi/MappingAPI@master/data/geojson/us-states.json"
    ];

    const tryUrl = index => {
      if (index >= urls.length) return;
      fetch(urls[index])
        .then(resp => {
          if (!resp.ok) throw new Error(`State boundary fetch failed: ${resp.status}`);
          return resp.json();
        })
        .then(addBoundaryLayer)
        .catch(() => tryUrl(index + 1));
    };
    tryUrl(0);
  }

  function renderMap() {
    const usaMapEl = document.getElementById("usaMap");
    if (!usaMapEl) return;

    if (!window.L) {
      usaMapEl.innerHTML = `<div class="metric" style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center"><div><div class="m-label">Interactive map unavailable</div><div class="m-value" style="font-size:14px;line-height:1.35">This prototype needs an internet connection to load OpenStreetMap/Leaflet map tiles.</div></div></div>`;
      return;
    }

    usaMapEl.classList.add("leaflet-map");

    if (!leafletUsaMap) {
      leafletUsaMap = L.map(usaMapEl, {
        center: [39.5, -98.35],
        zoom: 4,
        minZoom: 3,
        maxZoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        touchZoom: true,
        dragging: true,
        worldCopyJump: false
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletUsaMap);

      initLeafletStateBoundaryClicks();
      leafletDistrictLayer = L.layerGroup().addTo(leafletUsaMap);

      leafletUsaMap.on("moveend zoomend", () => {
        window.clearTimeout(leafletMoveTimer);
        leafletMoveTimer = window.setTimeout(() => {
          renderLeafletDistrictMarkers();
          renderMapViewportTopMatches();
          renderMobileMapResultsSheetFromViewport();
          updateDistrictMapNavigation();
          if (window.matchMedia("(min-width: 769px)").matches) renderTable(false);
        }, 80);
      });

      leafletUsaMap.on("click", () => {
        resetMapSelectionToDefaultView();
      });

      if (window.matchMedia("(max-width: 768px)").matches) {
        leafletUsaMap.setView([39.2, -98.6], 3, { animate: false });
        scheduleMobileInitialMapFit();
      }
    }

    setTimeout(() => {
      if (leafletUsaMap) {
        leafletUsaMap.invalidateSize(true);
        if (window.matchMedia("(max-width: 768px)").matches && !document.body.classList.contains("has-selected-district")) {
          fitMobileMapToAllAvailableDistricts();
        }
      }
    }, 50);
    renderLeafletDistrictMarkers();
    renderMapViewportTopMatches();
    renderMobileMapResultsSheetFromViewport();
  }

  function districtHasMapMatch(d) {
    return matchesSalaryFilters(d) &&
      passesExtraFilters(d) &&
      (!stateFilter.value || d.State === stateFilter.value) &&
      (!regionFilter.value || d.Region === regionFilter.value);
  }

  function getMapDefaultRows() {
    return DISTRICTS.filter(d => {
      const point = getDistrictGeo(d);
      return point && districtHasMapMatch(d);
    });
  }

  function fitMapToDefaultDistrictView() {
    if (!leafletUsaMap || !window.L) return;
    const rows = getMapDefaultRows();
    if (!rows.length) {
      leafletUsaMap.setView([39.5, -98.35], 4);
      return;
    }
    const latLngs = rows
      .map(d => getDistrictGeo(d))
      .filter(Boolean)
      .map(point => L.latLng(point[0], point[1]));

    if (!latLngs.length) {
      leafletUsaMap.setView([39.5, -98.35], 4);
      return;
    }

    const bounds = L.latLngBounds(latLngs);
    if (latLngs.length === 1) {
      leafletUsaMap.setView(latLngs[0], 8);
    } else {
      leafletUsaMap.fitBounds(bounds.pad(0.2), {
        maxZoom: 7,
        animate: true
      });
    }
  }

  function updateMobileViewportHeightVar() {
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const height = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
    if (height) document.documentElement.style.setProperty("--app-vh", `${height}px`);
    if (leafletUsaMap) {
      window.setTimeout(() => {
        leafletUsaMap.invalidateSize(true);
        if (!document.body.classList.contains("has-selected-district")) {
          renderLeafletDistrictMarkers();
          renderMobileMapResultsSheetFromViewport();
        }
      }, 40);
    }
  }

  function fitMobileMapToAllAvailableDistricts() {
    if (!leafletUsaMap || !window.L) return;

    // Reliable startup view: full contiguous USA with all database districts visible.
    // This avoids mobile fitBounds timing issues when browser chrome changes viewport size.
    leafletUsaMap.setView([39.2, -98.6], 3, { animate: false });
    renderLeafletDistrictMarkers();
    renderMobileMapResultsSheetFromViewport();
  }

  function scheduleMobileInitialMapFit() {
    if (!leafletUsaMap || !window.matchMedia("(max-width: 768px)").matches) return;
    [80, 250, 650, 1200].forEach(delay => {
      window.setTimeout(() => {
        if (!leafletUsaMap || document.body.classList.contains("has-selected-district")) return;
        leafletUsaMap.invalidateSize(true);
        fitMobileMapToAllAvailableDistricts();
      }, delay);
    });
  }

  function resetMapSelectionToDefaultView() {
    if (!selectedDistrict) return;
    selectedDistrict = null;
    renderProfile();
    renderLeafletDistrictMarkers();
    fitMapToDefaultDistrictView();
    renderMapViewportTopMatches();
  }

  function renderLeafletDistrictMarkers() {
    if (!leafletUsaMap || !leafletDistrictLayer || !window.L) return;
    leafletDistrictLayer.clearLayers();

    const bounds = leafletUsaMap.getBounds();
    DISTRICTS.forEach(d => {
      const point = getDistrictGeo(d);
      if (!point) return;
      const latLng = L.latLng(point[0], point[1]);
      if (!bounds.pad(0.25).contains(latLng)) return;

      const isMatch = districtHasMapMatch(d);
      const isSelected = selectedDistrict?.District === d.District;

      const icon = L.divIcon({
        className: "",
        html: `<div class="district-map-marker ${isMatch ? "" : "no-match"} ${isSelected ? "selected" : ""}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      const marker = L.marker(latLng, { icon, title: d.District }).addTo(leafletDistrictLayer);
      marker.bindPopup(`
        <div class="district-map-popup">
          <strong>${escapeHtml(d.District)}</strong>
          <span>${escapeHtml(d.Region ?? "—")}, ${escapeHtml(d.State ?? "—")}</span>
          <span>Overall: ${fmtScore(d["Overall Value Score"])} · Salary: ${fmtMoney(salaryForDistrict(d))}</span>
        </div>
      `);

      marker.on("click", evt => {
        if (evt.originalEvent) {
          L.DomEvent.stopPropagation(evt.originalEvent);
        }
        selectedDistrict = d;
        collapseMobileMapResultsSheet();
        renderProfile();
        renderLeafletDistrictMarkers();
        document.querySelector("#mobileDistrictDetailsAnchor")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  function getMapViewportRows() {
    if (!leafletUsaMap || !window.L) return [];
    const bounds = leafletUsaMap.getBounds();
    return DISTRICTS.filter(d => {
      const point = getDistrictGeo(d);
      if (!point) return false;
      return bounds.contains(L.latLng(point[0], point[1])) && districtHasMapMatch(d);
    });
  }

  function mapDistrictMatchMessage(count) {
    if (count === 1) return "1 district matches";
    return `${count} districts match`;
  }

  function collapseMobileMapResultsSheet() {
    document.getElementById("mobileMapResultsSheet")?.classList.remove("is-expanded");
  }

  function clearSelectedDistrictFromMobileProfile() {
    selectedDistrict = null;
    document.body.classList.remove("has-selected-district");
    renderProfile();
    renderLeafletDistrictMarkers();
    renderMobileMapResultsSheetFromViewport();
    window.setTimeout(() => {
      if (leafletUsaMap) leafletUsaMap.invalidateSize(true);
    }, 80);
  }

  function initMobileProfilePullDownDismiss() {
    const wrapper = document.getElementById("mobileDistrictDetailsAnchor");
    if (!wrapper || wrapper.dataset.pullDismissReady === "true") return;
    wrapper.dataset.pullDismissReady = "true";

    let startY = 0;
    let currentY = 0;
    let tracking = false;
    let dragging = false;

    const isNearTop = () => wrapper.scrollTop <= 4;
    const isTopGrabArea = touch => (touch.clientY - wrapper.getBoundingClientRect().top) <= 110;

    const resetPosition = () => {
      wrapper.classList.remove("is-dragging-dismiss");
      wrapper.style.transition = "transform 180ms ease";
      wrapper.style.transform = "translateY(0px)";
      window.setTimeout(() => {
        wrapper.style.removeProperty("transform");
        wrapper.style.removeProperty("transition");
      }, 190);
    };

    const animateClose = () => {
      wrapper.classList.remove("is-dragging-dismiss");
      wrapper.style.transition = "transform 180ms ease";
      wrapper.style.transform = `translateY(${Math.max(window.innerHeight, currentY)}px)`;
      window.setTimeout(() => {
        wrapper.style.removeProperty("transform");
        wrapper.style.removeProperty("transition");
        clearSelectedDistrictFromMobileProfile();
      }, 185);
    };

    wrapper.addEventListener("touchstart", evt => {
      if (!document.body.classList.contains("has-selected-district")) return;
      if (!isNearTop()) return;
      const touch = evt.touches?.[0];
      if (!touch || !isTopGrabArea(touch)) return;
      startY = touch.clientY;
      currentY = 0;
      tracking = true;
      dragging = false;
    }, { passive: true });

    wrapper.addEventListener("touchmove", evt => {
      if (!tracking) return;
      const touch = evt.touches?.[0];
      if (!touch) return;
      const delta = Math.max(0, touch.clientY - startY);
      if (delta <= 0) return;
      if (!dragging && delta > 6) {
        dragging = true;
        wrapper.classList.add("is-dragging-dismiss");
        wrapper.style.transition = "none";
      }
      if (!dragging) return;
      currentY = Math.min(delta, window.innerHeight * 0.92);
      wrapper.style.transform = `translateY(${currentY}px)`;
      evt.preventDefault();
    }, { passive: false });

    const finish = () => {
      if (!tracking) return;
      tracking = false;
      if (!dragging) return;
      dragging = false;
      if (currentY > 110 && isNearTop()) animateClose();
      else resetPosition();
      currentY = 0;
    };

    wrapper.addEventListener("touchend", finish);
    wrapper.addEventListener("touchcancel", finish);
  }

  function renderMobileMapResultsSheet(rows) {
    const sheet = document.getElementById("mobileMapResultsSheet");
    const summary = document.getElementById("mobileMapResultsSummary");
    const list = document.getElementById("mobileMapResultsList");
    if (!sheet || !summary || !list) return;

    const sorted = [...rows].sort((a,b)=>(b["Overall Value Score"]||0)-(a["Overall Value Score"]||0));
    summary.textContent = mapDistrictMatchMessage(sorted.length);

    if (!sorted.length) {
      list.innerHTML = `<div class="mobile-map-results-empty">Move or zoom the map to a region with matching districts.</div>`;
      return;
    }

    list.innerHTML = sorted.slice(0, 12).map((d, i) => {
      const salary = salaryForDistrict(d);
      const overall = d["Overall Value Score"];
      const overallBg = scoreColor(overall);
      const subPay = d["Daily Sub Pay"] ?? d["Licensed Sub Pay"];
      const totalSchools = d["Total Schools Counted"] ?? ((d["Number of Elementary Schools"] || 0) + (d["Number of Middle Schools"] || 0) + (d["Number of High Schools"] || 0) + (d["Other / Specialty Schools"] || 0));
      return `<article class="mobile-ranking-card" data-mobile-map-district="${escapeAttr(d.District)}">
        <div class="mobile-ranking-head">
          <div class="mobile-rank-badge">#${i + 1}</div>
          <div class="mobile-ranking-title">
            <h3>${escapeHtml(d.District)}</h3>
            <p>${escapeHtml(d.Region ?? "—")}, ${escapeHtml(d.State ?? "—")}</p>
          </div>
          ${favoriteButton(d.District, "mobile-ranking-favorite")}
          <div class="mobile-ranking-score" style="background:${overallBg}; border-color:${overallBg}; color:#172033;">${fmtScore(overall)}<span>Overall</span></div>
        </div>
        <div class="mobile-ranking-metrics">
          <div class="mobile-ranking-metric"><span>${selectedEducationSalaryLabel()}</span><strong>${fmtMoney(salary)}</strong></div>
          <div class="mobile-ranking-metric"><span>Rent</span><strong>${fmtMoney(d["Median Rent"])}</strong></div>
          <div class="mobile-ranking-metric"><span>Total Schools</span><strong>${fmtCount(totalSchools)}</strong></div>
          <div class="mobile-ranking-metric"><span>Sub Pay</span><strong>${typeof subPay === "number" ? `${fmtMoney(subPay)}/day` : "—"}</strong></div>
        </div>
        <button type="button" class="mobile-ranking-view" data-mobile-map-district="${escapeAttr(d.District)}">View district details →</button>
      </article>`;
    }).join("");

    const openDistrict = districtName => {
      selectedDistrict = DISTRICTS.find(d => d.District === districtName);
      if (!selectedDistrict) return;
      collapseMobileMapResultsSheet();
      renderProfile();
      renderLeafletDistrictMarkers();
      const target = document.querySelector("#mobileDistrictDetailsAnchor") || document.querySelector(".profile-card");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    list.querySelectorAll(".mobile-ranking-card[data-mobile-map-district]").forEach(card => {
      card.addEventListener("click", evt => {
        if (evt.target.closest("button")) return;
        openDistrict(card.dataset.mobileMapDistrict);
      });
    });

    list.querySelectorAll(".mobile-ranking-view[data-mobile-map-district]").forEach(btn => {
      btn.addEventListener("click", evt => {
        evt.stopPropagation();
        openDistrict(btn.dataset.mobileMapDistrict);
      });
    });

    renderFavoriteStates();
  }

  function renderMobileMapResultsSheetFromViewport() {
    if (!leafletUsaMap) return;
    renderMobileMapResultsSheet(getMapViewportRows());
  }

  function renderMapViewportTopMatches() {
    if (!leafletUsaMap || !stateResults || stateFilter.value) return;

    const rows = getMapViewportRows();
    const zoom = leafletUsaMap.getZoom();
    const sorted = [...rows].sort((a,b)=>(b["Overall Value Score"]||0)-(a["Overall Value Score"]||0));
    const topMatches = sorted.slice(0, 3);
    const viewportSummaryText = topMatches.length
      ? `${rows.length} matching district${rows.length === 1 ? "" : "s"} visible at zoom ${zoom.toFixed(1)}. Pan or pinch-zoom to change the list.`
      : "Pan or pinch-zoom into a region to see matching districts appear here.";

    // Mobile Top Matches uses the card list, so keep it synced to the current map viewport too.
    renderMobileRankings(sorted, {
      title: "Top Matches in Map View",
      text: viewportSummaryText,
      totalComparisonCount: rows.length
    });

    stateResults.classList.add("active");
    stateResults.classList.add("has-state");
    stateResultsTitle.textContent = "Top Matches in Map View";
    stateResultsSub.textContent = viewportSummaryText;
    if (!isDesktopMapViewportRankingMode()) rankingsTitle.textContent = "Sortable District Rankings";

    if (!topMatches.length) {
      topDistrictCards.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">No visible matches</div><div class="m-value" style="font-size:16px; line-height:1.35">Zoom toward Southern California, Texas, Utah, Arizona, or another region with entered districts.</div></div>`;
      return;
    }

    const placeholderCount = Math.max(0, 3 - topMatches.length);
    topDistrictCards.innerHTML = [
      ...topMatches.map((d,i) => `
        <div class="top-card" data-district="${escapeHtml(d.District)}">
          ${favoriteButton(d.District, "top-card-favorite")}
          <div class="rank">#${i+1} in View</div>
          <h3>${escapeHtml(d.District)}</h3>
          <div class="top-card-grid">
            <div><span>Overall</span>${fmtScore(d["Overall Value Score"])}</div>
            <div><span>Salary</span>${fmtMoney(salaryForDistrict(d))}</div>
            <div><span>High Schools</span>${fmtCount(d["Number of High Schools"])}</div>
            <div><span>Region</span>${escapeHtml(d.Region ?? "—")}</div>
            <div><span>Rent</span>${fmtMoney(d["Median Rent"])}</div>
            <div><span>State</span>${escapeHtml(d.State ?? "—")}</div>
          </div>
        </div>
      `),
      ...Array.from({ length: placeholderCount }, (_, idx) => `
        <div class="top-card top-card-placeholder" aria-hidden="true">
          <div class="rank">#${topMatches.length + idx + 1} in View</div>
          <h3>No additional district</h3>
          <div class="top-card-grid">
            <div><span>Overall</span>—</div>
            <div><span>Salary</span>—</div>
            <div><span>High Schools</span>—</div>
            <div><span>Region</span>—</div>
            <div><span>Rent</span>—</div>
            <div><span>State</span>—</div>
          </div>
        </div>
      `)
    ].join("");

    topDistrictCards.querySelectorAll(".top-card[data-district]").forEach(card => {
      card.onclick = () => {
        selectedDistrict = DISTRICTS.find(d=>d.District === card.dataset.district);
        renderProfile();
        renderLeafletDistrictMarkers();
        document.querySelector(".profile-card")?.scrollIntoView({behavior:"smooth", block:"start"});
      };
    });
    renderFavoriteStates();
  }



  function renderKpis(rows) {
    const kpiDistrictsEl = document.getElementById("kpiDistricts");
    const kpiStatesEl = document.getElementById("kpiStates");

    if (kpiDistrictsEl) kpiDistrictsEl.textContent = DISTRICTS.length;
    if (kpiStatesEl) kpiStatesEl.textContent = new Set(DISTRICTS.map(d=>d.State)).size;

    const extraCount = countActiveHousingFilters();
    const extra = extraCount ? ` ${extraCount} housing filter(s) applied.` : "";
    if (statusLine) statusLine.textContent = `${rows.length} district(s) match your current filters.${extra}`;
  }

  function cellValue(d, col) {
    const v = d[col];
    if (col === "District") {
      return `<div class="district-name-with-favorite">${favoriteButton(d.District, "table-favorite-toggle")}<span>${escapeHtml(d.District)}</span></div>`;
    }
    if (["Avg Start Salary","Avg 10-Year Salary","Median Home Price","Median Rent","Licensed Sub Pay","Master's Premium"].includes(col)) return fmtMoney(v);
    if (col === "Avg Growth %") {
      const growthScore = d["Growth Score"];
      const title = Number.isFinite(Number(growthScore))
        ? `Salary Growth Score: ${fmtScore(Number(growthScore))}`
        : "Salary Growth";
      return `<span class="score-pill" style="background:${scoreColor(growthScore)}" title="${title}">${fmtPct(v)}</span>`;
    }
    if (col === "Student-Teacher Ratio Score") {
      const ratio = d["Student-Teacher Ratio"];
      const classSizeScore = d["Student-Teacher Ratio Score"];
      const title = Number.isFinite(Number(classSizeScore))
        ? `Class Size Score: ${fmtScore(Number(classSizeScore))}`
        : "Student-Teacher Ratio";
      return `<span class="score-pill" style="background:${scoreColor(classSizeScore)}" title="${title}">${formatClassSizeRatio(ratio)}</span>`;
    }
    if (["White %","Hispanic %","Asian %","Black %","Other %"].includes(col)) return fmtWholePct(v);
    if (col === "Work Environment Multiplier") return typeof v === "number" ? `${Math.round(v * 100)}%` : "—";
    if (col === "Stability Score") {
      const stability = stabilityDisplayScore(d);
      return `<span class="score-pill" style="background:${scoreColor(stability)}" title="Stability Score: ${fmtScore(stability)}. Lower scores mean higher layoff/work-environment risk.">${fmtScore(stability)}</span>`;
    }
    if (scoreCols.includes(col)) return `<span class="score-pill" style="background:${scoreColor(v)}">${fmtScore(v)}</span>`;
    return v ?? "—";
  }


  function renderMobileRankings(rows, options = {}) {
    const mobileList = document.getElementById("mobileRankingsList");
    if (!mobileList) return;

    const selectedStateCode = stateFilter.value;
    const selectedStateName = selectedStateCode ? (stateNames[selectedStateCode] || selectedStateCode) : "";
    const totalComparisonCount = options.totalComparisonCount ?? (selectedStateCode
      ? DISTRICTS.filter(d => d.State === selectedStateCode).length
      : DISTRICTS.length);
    const mobileSummaryTitle = options.title ?? (selectedStateCode ? `Top Matches from ${selectedStateName}` : "Top 3 Matches");
    const mobileSummaryText = options.text ?? `${rows.length} of ${totalComparisonCount} district${totalComparisonCount === 1 ? "" : "s"} match: ${describeSalaryFilters()}`;

    if (!rows.length) {
      mobileList.innerHTML = `
      <div class="mobile-results-summary">
        <strong>${mobileSummaryTitle}</strong>
        <span>${mobileSummaryText}</span>
      </div>
      <div class="mobile-ranking-card">
        <div class="mobile-ranking-title">
          <h3>No matching districts</h3>
          <p>Try changing your filters to see more results.</p>
        </div>
      </div>`;
      return;
    }

    const visibleRows = rows.slice(0, 3);

    mobileList.innerHTML = `
      <div class="mobile-results-summary">
        <strong>${mobileSummaryTitle}</strong>
        <span>${mobileSummaryText}</span>
      </div>
      ${visibleRows.map((d, i) => {
        const salary = salaryForDistrict(d);
        const overall = d["Overall Value Score"];
        const overallBg = scoreColor(overall);
        const subPay = d["Daily Sub Pay"] ?? d["Licensed Sub Pay"];
        const totalSchools = d["Total Schools Counted"] ?? ((d["Number of Elementary Schools"] || 0) + (d["Number of Middle Schools"] || 0) + (d["Number of High Schools"] || 0) + (d["Other / Specialty Schools"] || 0));
        return `<article class="mobile-ranking-card" data-district="${escapeAttr(d.District)}">
          <div class="mobile-ranking-head">
            <div class="mobile-rank-badge">#${i + 1}</div>
            <div class="mobile-ranking-title">
              <h3>${escapeHtml(d.District)}</h3>
              <p>${escapeHtml(d.Region ?? "—")}, ${escapeHtml(d.State ?? "—")}</p>
            </div>
            ${favoriteButton(d.District, "mobile-ranking-favorite")}
            <div class="mobile-ranking-score" style="background:${overallBg}; border-color:${overallBg}; color:#172033;">${fmtScore(overall)}<span>Overall</span></div>
          </div>
          <div class="mobile-ranking-metrics">
            <div class="mobile-ranking-metric"><span>${selectedEducationSalaryLabel()}</span><strong>${fmtMoney(salary)}</strong></div>
            <div class="mobile-ranking-metric"><span>Rent</span><strong>${fmtMoney(d["Median Rent"])}<\/strong><\/div>
            <div class="mobile-ranking-metric"><span>Total Schools</span><strong>${fmtCount(totalSchools)}<\/strong><\/div>
            <div class="mobile-ranking-metric"><span>Sub Pay</span><strong>${typeof subPay === "number" ? `${fmtMoney(subPay)}/day` : "—"}<\/strong><\/div>
          </div>
          <button type="button" class="mobile-ranking-view" data-district="${escapeAttr(d.District)}">View district details →</button>
        </article>`;
      }).join("")}
    `;

    const openDistrict = districtName => {
      selectedDistrict = DISTRICTS.find(d => d.District === districtName);
      collapseMobileMapResultsSheet();
      renderProfile();
      const target = document.querySelector("#mobileDistrictDetailsAnchor") || document.querySelector(".profile-card");
      target?.scrollIntoView({behavior:"smooth", block:"start"});
    };

    mobileList.querySelectorAll(".mobile-ranking-card[data-district]").forEach(card => {
      card.addEventListener("click", evt => {
        if (evt.target.closest("button")) return;
        openDistrict(card.dataset.district);
      });
    });

    mobileList.querySelectorAll(".mobile-ranking-view[data-district]").forEach(btn => {
      btn.addEventListener("click", evt => {
        evt.stopPropagation();
        openDistrict(btn.dataset.district);
      });
    });

    renderFavoriteStates();
  }


  function isDesktopMapViewportRankingMode() {
    return Boolean(leafletUsaMap && window.matchMedia("(min-width: 769px)").matches);
  }

  function getRowsForSortableRankings() {
    // Default desktop behavior still lets the ranking table follow the visible map area.
    // When the user clicks the filter overlay's “See results” button, temporarily switch
    // this table to the full filtered set so the button shows all matching districts,
    // ranked by the active sort, instead of only the districts currently inside the map viewport.
    if (forceFilteredRankings) {
      return getFiltered();
    }
    if (isDesktopMapViewportRankingMode()) {
      return getMapViewportRows();
    }
    return getFiltered();
  }

  function updateRankingsViewportCopy(rowCount) {
    const help = document.querySelector(".rankings-help-text");
    if (forceFilteredRankings) {
      rankingsTitle.textContent = "Filtered District Rankings";
      if (help) help.textContent = rowCount
        ? `${rowCount} district${rowCount === 1 ? "" : "s"} match the selected filters, ranked by the active sort.`
        : "No districts match the selected filters.";
    } else if (isDesktopMapViewportRankingMode()) {
      rankingsTitle.textContent = "Visible Map District Rankings";
      if (help) help.textContent = rowCount
        ? `${rowCount} district${rowCount === 1 ? "" : "s"} visible in the current map view. Pan or zoom the map to change this table.`
        : "No districts are visible in the current map view. Pan or zoom toward entered districts to update this table.";
    } else {
      rankingsTitle.textContent = "Sortable District Rankings";
      if (help) help.textContent = "Click any column header to sort. Click a district row to view its profile card.";
    }
  }

  function renderTable() {
    let rows = getRowsForSortableRankings();
    updateRankingsViewportCopy(rows.length);
    rows.sort((a,b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === "Stability Score") {
        av = stabilityDisplayScore(a);
        bv = stabilityDisplayScore(b);
      }
      if (typeof av === "number" && typeof bv === "number") return (av-bv)*sortDir;
      return String(av ?? "").localeCompare(String(bv ?? "")) * sortDir;
    });

    const thead = document.querySelector("#districtTable thead");
    const tbody = document.querySelector("#districtTable tbody");
    thead.innerHTML = `<tr>${columns.map(c=> { const extraClass = c === "District" ? "district-head" : ""; const numericClass = typeof rows[0]?.[c]==='number' ? 'num' : ''; const className = `${numericClass} ${extraClass}`.trim(); const label = c === "District" ? `<span class="district-head-label">${columnLabels[c] || c}</span>` : (columnLabels[c] || c); return `<th class="${className}" data-col="${c}">${label}</th>`; }).join("")}</tr>`;
    tbody.innerHTML = rows.map((d,i) => `<tr data-district="${d.District}">
      ${columns.map(c=>`<td class="${typeof d[c]==='number' ? 'num':''}">${cellValue(d,c)}</td>`).join("")}
    </tr>`).join("");

    renderMobileRankings(rows);

    thead.querySelectorAll("th").forEach(th => {
      th.onclick = () => {
        const col = th.dataset.col;
        if (sortKey === col) sortDir *= -1;
        else { sortKey = col; sortDir = -1; }
        renderAll(false);
      };
    });
    tbody.querySelectorAll("tr").forEach(tr => {
      tr.onclick = () => {
        selectedDistrict = DISTRICTS.find(d=>d.District === tr.dataset.district);
        renderProfile();
        document.querySelector(".profile-card")?.scrollIntoView({behavior:"smooth", block:"start"});
      };
    });
    renderKpis(rows);
    renderStateResults(rows);
  }


  function setCalloutArrowForState(st) {
    if (!stateResults) return;

    const centers = {
      CA:[18,56], AZ:[29,68], UT:[34,54], CO:[43,56], TX:[52,76],
      WA:[18,25], OR:[17,38], NV:[25,51], ID:[30,36], NM:[39,68],
      IL:[64,50], TN:[70,63], NC:[82,62], FL:[84,80], NY:[83,36],
      GA:[78,72], AL:[73,72], LA:[62,77], OK:[52,66], KS:[50,57], MO:[59,57]
    };

    const [x, y] = centers[st] || [50, 50];
    stateResults.style.setProperty("--state-origin-x", `${x}%`);
    stateResults.style.setProperty("--state-origin-y", `${y}%`);
    stateResults.style.left = "50%";
    stateResults.style.top = "50%";
  }

  function renderStateResults(rows) {
    const st = stateFilter.value;
    stateResults.classList.add("active");
    stateResults.classList.toggle("has-state", Boolean(st));
    if (!st) {
      stateKpis.innerHTML = "";
      if (leafletUsaMap) {
        renderMapViewportTopMatches();
        return;
      }
      stateResultsTitle.textContent = "Top Matches in Map View";
      stateResultsSub.textContent = "Pan or pinch-zoom the map to see matching districts below.";
      topDistrictCards.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">Move the map</div><div class="m-value" style="font-size:16px; line-height:1.35">Zoom toward a region with entered districts to see its top matches.</div></div>`;
      if (!isDesktopMapViewportRankingMode()) rankingsTitle.textContent = "Sortable District Rankings";
      return;
    }
    const stateName = stateNames[st] || st;
    setCalloutArrowForState(st);
    const allStateRows = DISTRICTS.filter(d => d.State === st);
    const matchingRows = rows.filter(d => d.State === st);
    const sorted = [...matchingRows].sort((a,b)=>(b["Overall Value Score"]||0)-(a["Overall Value Score"]||0));
    const best = sorted[0];
    const highestSalary = [...matchingRows].sort((a,b)=>(salaryForDistrict(b)||0)-(salaryForDistrict(a)||0))[0];

    stateResultsTitle.textContent = `Top Matches from ${stateName}`;
    stateResultsSub.textContent = `${matchingRows.length} of ${allStateRows.length} district(s) match: ${describeSalaryFilters()}`;
    rankingsTitle.textContent = `${stateName} Sortable District Rankings`;

    stateKpis.innerHTML = "";

    if (!sorted.length) {
      topDistrictCards.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">No matching districts</div><div class="m-value" style="font-size:16px; line-height:1.35">Try lowering the desired salary or changing education/experience filters.</div></div>`;
      return;
    }

    const topMatches = sorted.slice(0,3);
    const placeholderCount = Math.max(0, 3 - topMatches.length);
    topDistrictCards.innerHTML = [
      ...topMatches.map((d,i) => `
        <div class="top-card" data-district="${d.District}">
          ${favoriteButton(d.District, "top-card-favorite")}
          <div class="rank">#${i+1} Match</div>
          <h3>${d.District}</h3>
          <div class="top-card-grid">
            <div><span>Overall</span>${fmtScore(d["Overall Value Score"])}</div>
            <div><span>Salary</span>${fmtMoney(salaryForDistrict(d))}</div>
            <div><span>High Schools</span>${fmtCount(d["Number of High Schools"])}</div>
            <div><span>Region</span>${d.Region ?? "—"}</div>
            <div><span>Rent</span>${fmtMoney(d["Median Rent"])}</div>
            <div><span>Middle Schools</span>${fmtCount(d["Number of Middle Schools"])}</div>
          </div>
        </div>
      `),
      ...Array.from({ length: placeholderCount }, (_, idx) => `
        <div class="top-card top-card-placeholder" aria-hidden="true">
          <div class="rank">#${topMatches.length + idx + 1} Match</div>
          <h3>No additional district</h3>
          <div class="top-card-grid">
            <div><span>Overall</span>—</div>
            <div><span>Salary</span>—</div>
            <div><span>High Schools</span>—</div>
            <div><span>Region</span>—</div>
            <div><span>Rent</span>—</div>
            <div><span>Middle Schools</span>—</div>
          </div>
        </div>
      `)
    ].join("");

    topDistrictCards.querySelectorAll(".top-card[data-district]").forEach(card => {
      card.onclick = () => {
        selectedDistrict = DISTRICTS.find(d=>d.District === card.dataset.district);
        renderProfile();
        document.querySelector(".profile-card")?.scrollIntoView({behavior:"smooth", block:"start"});
      };
    });
    renderFavoriteStates();
  }


  function mobileScoreRating(score) {
    const n = Number(score);
    if (!Number.isFinite(n)) return "—";
    if (n >= 90) return "Excellent";
    if (n >= 80) return "Very Good";
    if (n >= 70) return "Good";
    if (n >= 60) return "Fair";
    return "Low";
  }

  function mobileScoreColor(score) {
    const n = Number(score);
    if (!Number.isFinite(n)) return "#172033";
    if (n >= 90) return "#178a4f";
    if (n >= 80) return "#2f9e44";
    if (n >= 70) return "#6f9f3a";
    if (n >= 60) return "#c67a12";
    return "#cf3f3f";
  }

  function mobileScoreWidth(score) {
    const n = Number(score);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }

  function formatClassSizeRatio(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return "—";
    return `${Math.round(n)}:1`;
  }


  function salaryToRentRatio(d) {
    const salary = salaryForDistrict(d);
    const rent = Number(d["Median Rent"]);
    if (!Number.isFinite(salary) || salary <= 0 || !Number.isFinite(rent) || rent <= 0) return null;
    return (salary / 12) / rent;
  }

  function salaryToRentScore(d) {
    const ratio = salaryToRentRatio(d);
    if (!Number.isFinite(ratio)) return null;
    let score;
    if (ratio < 2.5) {
      score = (ratio / 2.5) * 59;
    } else if (ratio < 3.0) {
      score = 60 + ((ratio - 2.5) / 0.5) * 9.9;
    } else if (ratio < 3.5) {
      score = 70 + ((ratio - 3.0) / 0.5) * 19.9;
    } else {
      score = 90 + Math.min(10, ((ratio - 3.5) / 0.5) * 10);
    }
    return Math.max(0, Math.min(100, score));
  }

  function mastersPremiumAmount(d) {
    const premium = Number(d["Master's Premium"]);
    return Number.isFinite(premium) ? Math.max(0, premium) : null;
  }

  function mastersPremiumTileScore(d) {
    const premium = mastersPremiumAmount(d);
    if (!Number.isFinite(premium)) return null;
    if (premium <= 0) return 0;
    if (premium < 2500) return 20 + (premium / 2500) * 39;
    if (premium < 5000) return 60 + ((premium - 2500) / 2500) * 9.9;
    if (premium < 7500) return 70 + ((premium - 5000) / 2500) * 9.9;
    if (premium < 10000) return 80 + ((premium - 7500) / 2500) * 9.9;
    return 90 + Math.min(10, ((premium - 10000) / 5000) * 10);
  }

  function mastersPremiumTileRating(d) {
    const premium = mastersPremiumAmount(d);
    if (!Number.isFinite(premium)) return "—";
    if (premium <= 0) return "None";
    if (premium < 2500) return "Low";
    if (premium < 5000) return "Fair";
    if (premium < 7500) return "Good";
    if (premium < 10000) return "Very Good";
    return "Excellent";
  }

  function mastersPremiumTileColor(d) {
    const premium = mastersPremiumAmount(d);
    if (!Number.isFinite(premium)) return "#172033";
    if (premium <= 0) return "#667085";
    return mobileScoreColor(mastersPremiumTileScore(d));
  }

  function mobileDetailIcon(kind) {
    const icons = {
      salary: '<span aria-hidden="true">$</span>',
      affordability: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/></svg>`,
      subpay: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="5.5" ry="2.5"/><path d="M6.5 5.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4"/><path d="M6.5 9.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4"/><path d="M6.5 13.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4"/></svg>`,
      stability: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5h10v15H7z"/></svg>`,
      demographics: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="9" r="2.3" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="2.3" fill="currentColor" stroke="none"/><circle cx="12" cy="7.2" r="2.3" fill="currentColor" stroke="none"/><path d="M4.8 17.4c.8-2.2 2.6-3.4 4.8-3.4s4 1.2 4.8 3.4"/><path d="M11 17.4c.6-1.9 2.1-3 4-3 1.8 0 3.4 1.1 4.2 3"/></svg>`,
      studentTeacher: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 5.5h15v9h-15z"/><path d="M9 18.5h6"/><path d="M12 14.5v4"/></svg>`,
      growth: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 15.5 9 11l3.2 3.2L19.5 7"/><path d="M14.5 7h5v5"/></svg>`
    };
    return icons[kind] || '<span aria-hidden="true">•</span>';
  }

  function formatDistrictNameForProfile(name) {
    const safe = escapeHtml(name || "—");
    return safe.replace(/School District\b/g, "School&nbsp;District");
  }

  function renderMobileDistrictDetail() {
    const nameEl = document.getElementById("mobileDetailName");
    const regionEl = document.getElementById("mobileDetailRegion");
    const scoreEl = document.getElementById("mobileDetailOverallScore");
    const utilityStackEl = document.getElementById("mobileDetailUtilityStack");
    const favoriteBtnEl = document.getElementById("mobileDetailFavoriteBtn");
    const infoBtnEl = document.getElementById("mobileDetailInfoBtn");
    const imgEl = document.getElementById("mobileDetailMapImage");
    const placeholderEl = document.getElementById("mobileDetailMapPlaceholder");
    const highlightsEl = document.getElementById("mobileDetailHighlights");
    const navMetaEl = document.getElementById("mobileDetailNavMeta");
    const prevEl = document.getElementById("mobileDetailPrev");
    const nextEl = document.getElementById("mobileDetailNext");
    if (!nameEl || !regionEl || !scoreEl || !imgEl || !placeholderEl || !highlightsEl) return;

    if (!selectedDistrict) {
      nameEl.textContent = "Select a district";
      regionEl.textContent = "Choose a district to view details.";
      scoreEl.style.color = "";
      scoreEl.style.background = "";
      scoreEl.style.borderColor = "";
      scoreEl.innerHTML = buildScoreBadgeMarkup("—", "mobile");
      if (favoriteBtnEl) favoriteBtnEl.hidden = true;
      if (infoBtnEl) infoBtnEl.hidden = true;
      if (utilityStackEl) utilityStackEl.hidden = true;
      setMobileScoreGuideOpen(false);
      placeholderEl.textContent = "Select a district to view its map.";
      placeholderEl.hidden = false;
      imgEl.hidden = true;
      imgEl.removeAttribute("src");
      imgEl.alt = "";
      highlightsEl.innerHTML = `<div class="mobile-detail-highlight wide"><div class="mobile-detail-highlight-value" style="font-size:16px;line-height:1.35;letter-spacing:0">Tap a district card to view the profile here.</div></div>`;
      if (navMetaEl) navMetaEl.textContent = "Browse matching districts";
      if (prevEl) prevEl.disabled = true;
      if (nextEl) nextEl.disabled = true;
      return;
    }

    const d = selectedDistrict;
    const overall = d["Overall Value Score"];
    nameEl.innerHTML = formatDistrictNameForProfile(d.District);
    regionEl.textContent = `${d.Region ?? "—"}, ${stateNames[d.State] || d.State || "—"}`;
    const overallBg = scoreColor(overall);
    scoreEl.style.background = overallBg;
    scoreEl.style.borderColor = overallBg;
    scoreEl.style.color = "#172033";
    scoreEl.innerHTML = buildScoreBadgeMarkup(fmtScore(overall), "mobile");
    if (utilityStackEl) utilityStackEl.hidden = false;
    if (favoriteBtnEl) {
      favoriteBtnEl.hidden = false;
      favoriteBtnEl.dataset.favoriteDistrict = d.District;
      favoriteBtnEl.setAttribute("aria-label", `${isFavoriteDistrict(d.District) ? "Remove" : "Add"} ${d.District} ${isFavoriteDistrict(d.District) ? "from" : "to"} favorites`);
    }
    if (infoBtnEl) infoBtnEl.hidden = false;
    setMobileScoreGuideOpen(false);

    const mapMeta = DISTRICT_MAPS[d.District];
    if (mapMeta) {
      placeholderEl.hidden = true;
      imgEl.src = mapMeta.src;
      imgEl.alt = mapMeta.alt;
      imgEl.hidden = false;
    } else {
      placeholderEl.textContent = `Map coming soon for ${d.District}.`;
      placeholderEl.hidden = false;
      imgEl.hidden = true;
      imgEl.removeAttribute("src");
      imgEl.alt = "";
    }

    const context = getDistrictNavigationContext();
    const items = context.items || [];
    const idx = items.findIndex(x => x.District === d.District);
    if (navMetaEl) {
      if (idx >= 0 && items.length) {
        const label = (stateFilter?.value ? `${stateNames[stateFilter.value] || stateFilter.value} districts` : "matching districts");
        navMetaEl.innerHTML = `Browsing <strong>${idx + 1} of ${items.length}</strong><br>${label}`;
      } else {
        navMetaEl.textContent = "Browse matching districts";
      }
    }
    if (prevEl) prevEl.disabled = !items.length;
    if (nextEl) nextEl.disabled = !items.length;

    const highlightData = [
      {label:selectedEducationSalaryLabel(), value:salaryToRentScore(d), displayValue:selectedSalaryDollarValue(d), icon:mobileDetailIcon("salary"), color:"#1f9d55"},
      {label:"Affordability", value:d["Affordability Score"], icon:mobileDetailIcon("affordability"), color:"#2f5caa"},
      {label:"10-Year Growth", value:d["Growth Score"], displayValue:fmtPct(d["Avg Growth %"]), icon:mobileDetailIcon("growth"), color:"#2f9e44"},
      {label:"Stability", value:stabilityDisplayScore(d), displayValue:stabilityTextLabel(d), icon:mobileDetailIcon("stability"), color:"#BF5700"},
      {label:"Demographic Balance", value:d["Demographic Balance Score"], icon:mobileDetailIcon("demographics"), color:"#268c9a"},
      {label:"Class Size", value:d["Student-Teacher Ratio Score"], displayValue:formatClassSizeRatio(d["Student-Teacher Ratio"]), icon:mobileDetailIcon("studentTeacher"), color:"#5468c8"}
    ];

    highlightsEl.innerHTML = highlightData.map(item => {
      const value = Number(item.value);
      const safeValue = item.displayValue ?? (Number.isFinite(value) ? fmtScore(value) : "—");
      const width = mobileScoreWidth(value);
      const scoreColor = mobileScoreColor(value);
      return `<div class="mobile-detail-highlight ${item.wide ? "wide" : ""}">
        <div class="mobile-detail-highlight-head">
          <div class="mobile-detail-highlight-icon" style="background:${item.color}">${item.icon}</div>
          <div class="mobile-detail-highlight-label">${item.label}</div>
        </div>
        <div class="mobile-detail-highlight-value">${safeValue}</div>
        <div class="mobile-detail-highlight-rating" style="color:${scoreColor}">${mobileScoreRating(value)}</div>
        <div class="mobile-detail-highlight-bar"><span style="--bar-width:${width}%;--bar-color:${scoreColor}"></span></div>
      </div>`;
    }).join("");
  }

  function renderDesktopProfileMetricTile(item) {
    const hasScore = Number.isFinite(Number(item.score));
    if (!hasScore) {
      return `<div class="metric plain-centered-tile"><div class="m-label">${item.label}</div><div class="m-value">${item.value}</div></div>`;
    }
    const value = Number(item.score);
    const width = mobileScoreWidth(value);
    const ratingColor = item.ratingColor || mobileScoreColor(value);
    const ratingLabel = item.ratingLabel || mobileScoreRating(value);
    const icon = item.icon || "";
    const iconColor = item.color || "#667085";
    return `<div class="metric score-feature-tile">
      <div class="desktop-score-icon" style="background:${iconColor}">${icon}</div>
      <div class="m-label">${item.label}</div>
      <div class="m-value">${item.value}</div>
      <div class="desktop-score-rating" style="color:${ratingColor}">${ratingLabel}</div>
      <div class="desktop-score-bar"><span style="--bar-width:${width}%;--bar-color:${ratingColor}"></span></div>
    </div>`;
  }

  function renderProfile() {
    document.body.classList.toggle("has-selected-district", Boolean(selectedDistrict));
    if (!selectedDistrict) {
      profileName.textContent = "Select a district";
      const desktopProfileRegion = document.getElementById("desktopProfileRegion");
      const desktopProfileOverallScore = document.getElementById("desktopProfileOverallScore");
      if (desktopProfileRegion) desktopProfileRegion.textContent = "Choose a district to view details.";
      if (desktopProfileOverallScore) {
        desktopProfileOverallScore.style.background = "";
        desktopProfileOverallScore.style.borderColor = "";
        desktopProfileOverallScore.innerHTML = buildScoreBadgeMarkup("—", "desktop");
      }
      const desktopProfileFavoriteBtn = document.getElementById("desktopProfileFavoriteBtn");
      const desktopProfileInfoBtn = document.getElementById("desktopProfileInfoBtn");
      const desktopProfileUtilityStack = document.getElementById("desktopProfileUtilityStack");
      if (desktopProfileFavoriteBtn) desktopProfileFavoriteBtn.hidden = true;
      if (desktopProfileInfoBtn) desktopProfileInfoBtn.hidden = true;
      if (desktopProfileUtilityStack) desktopProfileUtilityStack.hidden = true;
      setDesktopScoreGuideOpen(false);
      profileMetrics.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">No district selected</div><div class="m-value" style="font-size:14px; font-weight:700; line-height:1.3">Click a district row in the rankings table to view its profile.</div></div>`;
      renderDistrictMap();
      renderMobileDistrictDetail();
      return;
    }
    const d = selectedDistrict;
    profileName.innerHTML = formatDistrictNameForProfile(d.District);
    const desktopProfileRegion = document.getElementById("desktopProfileRegion");
    const desktopProfileOverallScore = document.getElementById("desktopProfileOverallScore");
    if (desktopProfileRegion) desktopProfileRegion.textContent = `${d.Region ?? "—"}, ${stateNames[d.State] || d.State || "—"}`;
    if (desktopProfileOverallScore) {
      const overallBg = scoreColor(d["Overall Value Score"]);
      desktopProfileOverallScore.style.background = overallBg;
      desktopProfileOverallScore.style.borderColor = overallBg;
      desktopProfileOverallScore.innerHTML = buildScoreBadgeMarkup(fmtScore(d["Overall Value Score"]), "desktop");
    }
    const desktopProfileFavoriteBtn = document.getElementById("desktopProfileFavoriteBtn");
    const desktopProfileInfoBtn = document.getElementById("desktopProfileInfoBtn");
    const desktopProfileUtilityStack = document.getElementById("desktopProfileUtilityStack");
    if (desktopProfileUtilityStack) desktopProfileUtilityStack.hidden = false;
    if (desktopProfileFavoriteBtn) {
      desktopProfileFavoriteBtn.hidden = false;
      desktopProfileFavoriteBtn.dataset.favoriteDistrict = d.District;
      desktopProfileFavoriteBtn.setAttribute("aria-label", `${isFavoriteDistrict(d.District) ? "Remove" : "Add"} ${d.District} ${isFavoriteDistrict(d.District) ? "from" : "to"} favorites`);
    }
    if (desktopProfileInfoBtn) desktopProfileInfoBtn.hidden = false;
    setDesktopScoreGuideOpen(false);
    const placementLabel = placementLabelForDistrict(d);
    const metrics = [
      {label:"Stability", value:stabilityTextLabel(d), score:stabilityDisplayScore(d), icon:mobileDetailIcon("stability"), color:"#BF5700"},
      {label:selectedEducationSalaryLabel(), value:selectedSalaryDollarValue(d), score:salaryToRentScore(d), icon:mobileDetailIcon("salary"), color:"#1f9d55"},
      ...(placementLabel ? [{label:"Credited Placement", value:placementLabel}] : []),
      {label:"10-Year Growth", value:fmtPct(d["Avg Growth %"]), score:d["Growth Score"], icon:mobileDetailIcon("growth"), color:"#2f9e44"},
      {label:"Master’s Premium", value:fmtMoney(d["Master's Premium"]), score:mastersPremiumTileScore(d), ratingLabel:mastersPremiumTileRating(d), ratingColor:mastersPremiumTileColor(d), icon:mobileDetailIcon("salary"), color:"#1f9d55"},
      {label:"Median Home Price", value:fmtMoney(d["Median Home Price"]), score:d["Affordability Score"], icon:mobileDetailIcon("affordability"), color:"#2f5caa"},
      {label:"Median Rent", value:fmtMoney(d["Median Rent"]), score:d["Affordability Score"], icon:mobileDetailIcon("affordability"), color:"#2f5caa"},
      {label:"Sub Pay", value:formatDailySubPay(d), score:d["Sub Pay Score"], icon:mobileDetailIcon("subpay"), color:"#6b35b5"},
      {label:"Student-Teacher Ratio", value:d["Student-Teacher Ratio"] ?? "—", score:d["Student-Teacher Ratio Score"], icon:mobileDetailIcon("studentTeacher"), color:"#5468c8"},
      {label:"Schools Counted", value:d["Total Schools Counted"] ?? "—"}
    ];
    profileMetrics.innerHTML = metrics.map(item => renderDesktopProfileMetricTile(item)).join("");
    renderDistrictMap();
    renderMobileDistrictDetail();

  }


  function updateMobileResultsButton() {
    const btn = document.getElementById("mobileFilterSeeResultsBtn");
    if (!btn) return;
    const count = getFiltered().length;
    btn.textContent = `See ${count} result${count === 1 ? "" : "s"}`;
  }

  function openMobileFilters() {
    document.body.classList.add("mobile-filters-open");
    if (moreFiltersPanel) {
      setPendingFromActiveFilters();
      moreFiltersPanel.hidden = false;
      moreFiltersTrigger?.classList.add("is-open");
      moreFiltersTrigger?.setAttribute("aria-expanded", "true");
    }
    updateMobileResultsButton();
  }

  function closeMobileFilters() {
    document.body.classList.remove("mobile-filters-open");
    closeMoreFilters(true);

    // Leaflet needs its size recalculated after a full-screen overlay is hidden.
    [60, 240].forEach(delay => {
      window.setTimeout(() => {
        if (leafletUsaMap) {
          leafletUsaMap.invalidateSize(true);
          renderLeafletDistrictMarkers();
          renderMapViewportTopMatches();
          renderMobileMapResultsSheetFromViewport();
          if (window.matchMedia("(max-width: 768px)").matches && !document.body.classList.contains("has-selected-district")) {
            scheduleMobileInitialMapFit();
          }
        }
      }, delay);
    });
  }

  function initMobileFilterOverlay() {
    const openBtn = document.getElementById("mobileFilterOpenBtn");
    const closeBtn = document.getElementById("mobileFilterCloseBtn");
    const seeResultsBtn = document.getElementById("mobileFilterSeeResultsBtn");

    if (openBtn) {
      openBtn.addEventListener("click", evt => {
        evt.preventDefault();
        openMobileFilters();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", evt => {
        evt.preventDefault();
        closeMobileFilters();
      });
    }

    if (seeResultsBtn) {
      seeResultsBtn.addEventListener("click", evt => {
        evt.preventDefault();
        forceFilteredRankings = true;
        sortKey = "Overall Value Score";
        sortDir = -1;
        renderTable();
        closeMobileFilters();
        document.querySelector("#mobileResultsAnchor")?.scrollIntoView({behavior:"smooth", block:"start"});
      });
    }

    document.addEventListener("keydown", evt => {
      if (evt.key === "Escape" && document.body.classList.contains("mobile-filters-open")) {
        closeMobileFilters();
      }
    });
  }


  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function populateMobileDistrictSearch() {
    const list = document.getElementById("mobileDistrictSearchList");
    if (!list) return;
    const options = [...DISTRICTS]
      .sort((a, b) => String(a.District).localeCompare(String(b.District)))
      .map(d => `<option value="${escapeHtml(d.District)}">${escapeHtml(d.Region ?? "")}${d.State ? `, ${escapeHtml(d.State)}` : ""}</option>`)
      .join("");
    list.innerHTML = options;
  }

  function findDistrictBySearchValue(value) {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) return null;
    return DISTRICTS.find(d => String(d.District).toLowerCase() === normalized)
      || DISTRICTS.find(d => String(d.District).toLowerCase().includes(normalized));
  }

  function getMobileDistrictSearchMatches(value) {
    const query = String(value || "").trim().toLowerCase();
    if (!query) return [];
    return [...DISTRICTS]
      .filter(d => {
        const district = String(d.District || "").toLowerCase();
        return district.startsWith(query);
      })
      .sort((a, b) => String(a.District).localeCompare(String(b.District)))
      .slice(0, 8);
  }

  function renderMobileDistrictSearchResults() {
    const input = document.getElementById("mobileDistrictSearch");
    const results = document.getElementById("mobileDistrictSearchResults");
    if (!input || !results) return;

    const value = input.value.trim();
    if (!value) {
      results.classList.remove("active");
      results.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      return;
    }

    const matches = getMobileDistrictSearchMatches(value);
    if (!matches.length) {
      results.innerHTML = `<div class="mobile-search-no-results">No district names begin with those letters</div>`;
      results.classList.add("active");
      input.setAttribute("aria-expanded", "true");
      return;
    }

    results.innerHTML = matches.map((d, index) => {
      const meta = [d.Region, d.State].filter(Boolean).join(", ");
      return `<button type="button" class="mobile-search-result-item" role="option" data-district-index="${index}">
        <span class="mobile-search-result-name">${escapeHtml(d.District)}</span>
        <span class="mobile-search-result-meta">${escapeHtml(meta)}</span>
      </button>`;
    }).join("");

    [...results.querySelectorAll(".mobile-search-result-item")].forEach((button, index) => {
      button.addEventListener("mousedown", evt => evt.preventDefault());
      button.addEventListener("click", evt => {
        evt.preventDefault();
        openDistrictFromMobileSearch(matches[index]);
      });
    });

    results.classList.add("active");
    input.setAttribute("aria-expanded", "true");
  }

  function hideMobileDistrictSearchResults() {
    const input = document.getElementById("mobileDistrictSearch");
    const results = document.getElementById("mobileDistrictSearchResults");
    if (!input || !results) return;
    results.classList.remove("active");
    input.setAttribute("aria-expanded", "false");
  }

  function openDistrictFromMobileSearch(districtOverride=null) {
    const input = document.getElementById("mobileDistrictSearch");
    const district = districtOverride || findDistrictBySearchValue(input?.value);
    if (!district) return;

    if (input) input.value = district.District;
    updateMobileDistrictSearchClearButton();
    hideMobileDistrictSearchResults();

    // Search is for finding a district profile only. It should not change filters,
    // state/region selectors, map marker matching, or the map viewport results.
    selectedDistrict = district;
    collapseMobileMapResultsSheet();
    renderProfile();
    renderLeafletDistrictMarkers();
    renderMobileMapResultsSheetFromViewport();

    const target = document.querySelector("#mobileDistrictDetailsAnchor") || document.querySelector(".profile-card");
    target?.scrollIntoView({behavior: "smooth", block: "start"});
  }

  function updateMobileDistrictSearchClearButton() {
    const input = document.getElementById("mobileDistrictSearch");
    const clearBtn = document.getElementById("mobileDistrictSearchClear");
    if (!input || !clearBtn) return;
    clearBtn.hidden = !input.value;
  }

  function initMobileDistrictSearch() {
    populateMobileDistrictSearch();
    const input = document.getElementById("mobileDistrictSearch");
    const results = document.getElementById("mobileDistrictSearchResults");
    const clearBtn = document.getElementById("mobileDistrictSearchClear");
    if (!input) return;

    input.addEventListener("input", () => {
      updateMobileDistrictSearchClearButton();
      renderMobileDistrictSearchResults();
    });
    input.addEventListener("focus", () => {
      updateMobileDistrictSearchClearButton();
      renderMobileDistrictSearchResults();
    });
    if (clearBtn) {
      clearBtn.addEventListener("mousedown", evt => evt.preventDefault());
      clearBtn.addEventListener("click", evt => {
        evt.preventDefault();
        input.value = "";
        updateMobileDistrictSearchClearButton();
        hideMobileDistrictSearchResults();
        input.focus();
        renderLeafletDistrictMarkers();
        renderMobileMapResultsSheetFromViewport();
      });
    }
    input.addEventListener("keydown", evt => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        const firstResult = results?.querySelector(".mobile-search-result-item");
        if (firstResult) firstResult.click();
        else openDistrictFromMobileSearch();
        input.blur();
      }
      if (evt.key === "Escape") {
        hideMobileDistrictSearchResults();
        input.blur();
      }
    });
    input.addEventListener("blur", () => {
      window.setTimeout(hideMobileDistrictSearchResults, 120);
    });
    updateMobileDistrictSearchClearButton();
  }

  function renderAll(profile=true) {
    updateCurrentSearchSummary();
    updateExtraFilterBadge();
    updateLegendVisibility();
    renderMap();
    renderTable();
    renderMobileMapResultsSheetFromViewport();
    updateMobileResultsButton();
    if (profile) renderProfile();
  }


  window.addEventListener("resize", () => {
    window.clearTimeout(window.__desktopViewportRankingResizeTimer);
    window.__desktopViewportRankingResizeTimer = window.setTimeout(() => {
      if (leafletUsaMap) {
        leafletUsaMap.invalidateSize(true);
        renderLeafletDistrictMarkers();
        renderMapViewportTopMatches();
        renderMobileMapResultsSheetFromViewport();
        renderTable(false);
      }
    }, 120);
  });

  stateFilter.addEventListener("input", () => {
    updateRegionOptions();
    selectedDistrict = null;
    renderAll();
    
  });
  regionFilter.addEventListener("input", () => { selectedDistrict = null; renderAll(); });
  experienceFilter.addEventListener("input", () => {
    updateSalaryReadouts();
    requestAnimationFrame(updateSalaryReadouts);
    selectedDistrict = null;
    renderAll();
  });
  salaryFilter.addEventListener("input", () => {
    updateSalaryReadouts();
    requestAnimationFrame(updateSalaryReadouts);
    selectedDistrict = null;
    renderAll();
  });
  document.querySelectorAll(".bubble[data-edu]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedEducation = btn.dataset.edu;
      updateExtraFilterBadge();
      document.querySelectorAll(".bubble[data-edu]").forEach(b => b.classList.toggle("active", b === btn));
      selectedDistrict = null;
      renderAll();
    });
  });
  moreFiltersTrigger.addEventListener("click", evt => {
    evt.stopPropagation();
    toggleMoreFilters();
  });

  function commitHousingFilters() {
    updateHousingReadouts();
    updateExtraFilterBadge();
    selectedDistrict = null;
    renderAll();
  }

  minRentFilter.addEventListener("input", () => {
    const nextValue = Math.min(Number(minRentFilter.value), pendingHousingFilters.maxRent);
    pendingHousingFilters.minRent = nextValue;
    activeHousingFilters.minRent = nextValue;
    minRentFilter.value = String(nextValue);
    commitHousingFilters();
  });

  maxRentFilter.addEventListener("input", () => {
    const nextValue = Math.max(Number(maxRentFilter.value), pendingHousingFilters.minRent);
    pendingHousingFilters.maxRent = nextValue;
    activeHousingFilters.maxRent = nextValue;
    maxRentFilter.value = String(nextValue);
    commitHousingFilters();
  });

  minHomePriceFilter.addEventListener("input", () => {
    const nextValue = Math.min(Number(minHomePriceFilter.value), pendingHousingFilters.maxHomePrice);
    pendingHousingFilters.minHomePrice = nextValue;
    activeHousingFilters.minHomePrice = nextValue;
    minHomePriceFilter.value = String(nextValue);
    commitHousingFilters();
  });

  maxHomePriceFilter.addEventListener("input", () => {
    const nextValue = Math.max(Number(maxHomePriceFilter.value), pendingHousingFilters.minHomePrice);
    pendingHousingFilters.maxHomePrice = nextValue;
    activeHousingFilters.maxHomePrice = nextValue;
    maxHomePriceFilter.value = String(nextValue);
    commitHousingFilters();
  });

  if (tenHighSchoolsFilter) {
    tenHighSchoolsFilter.addEventListener("change", () => {
      showTenPlusHighSchoolsOnly = tenHighSchoolsFilter.checked;
      updateExtraFilterBadge();
      selectedDistrict = null;
      renderAll();
    });
  }

  if (stableDistrictsFilter) {
    stableDistrictsFilter.addEventListener("change", () => {
      showStableDistrictsOnly = stableDistrictsFilter.checked;
      updateExtraFilterBadge();
      selectedDistrict = null;
      renderAll();
    });
  }

  const overall60Filter = document.getElementById("overall60Filter");
  if (overall60Filter) {
    overall60Filter.addEventListener("change", () => {
      showOverall60PlusOnly = overall60Filter.checked;
      updateExtraFilterBadge();
      selectedDistrict = null;
      renderAll();
    });
  }

  if (balancedDemographicsFilter) {
    balancedDemographicsFilter.addEventListener("change", () => {
      showBalancedDemographicsOnly = balancedDemographicsFilter.checked;
      updateExtraFilterBadge();
      selectedDistrict = null;
      renderAll();
    });
  }

  function beginHousingSliderDrag() {
    housingSliderDragActive = true;
    suppressFilterCloseUntil = Date.now() + 350;
  }

  function endHousingSliderDrag() {
    suppressFilterCloseUntil = Date.now() + 350;
    setTimeout(() => {
      housingSliderDragActive = false;
    }, 250);
  }

  [minRentFilter, maxRentFilter, minHomePriceFilter, maxHomePriceFilter].forEach(slider => {
    slider.addEventListener("pointerdown", beginHousingSliderDrag, true);
    slider.addEventListener("mousedown", beginHousingSliderDrag, true);
    slider.addEventListener("touchstart", beginHousingSliderDrag, {capture: true, passive: true});
    slider.addEventListener("input", () => {
      suppressFilterCloseUntil = Date.now() + 350;
    });
  });

  ["pointerup", "mouseup", "touchend", "touchcancel"].forEach(eventName => {
    document.addEventListener(eventName, endHousingSliderDrag, true);
  });

  const clearExtraFiltersBtn = document.getElementById("clearExtraFilters");
  if (clearExtraFiltersBtn) {
    clearExtraFiltersBtn.addEventListener("click", () => {
      pendingHousingFilters = {minRent: RENT_MIN, maxRent: RENT_MAX, minHomePrice: HOME_PRICE_MIN, maxHomePrice: HOME_PRICE_MAX};
      activeHousingFilters = {...pendingHousingFilters};
      showTenPlusHighSchoolsOnly = false;
      showStableDistrictsOnly = false;
      showOverall60PlusOnly = false;
      showBalancedDemographicsOnly = false;
      if (tenHighSchoolsFilter) tenHighSchoolsFilter.checked = false;
      if (stableDistrictsFilter) stableDistrictsFilter.checked = false;
      if (overall60Filter) overall60Filter.checked = false;
      if (balancedDemographicsFilter) balancedDemographicsFilter.checked = false;
      syncHousingFilterControls();
      updateExtraFilterBadge();
      closeMoreFilters();
      selectedDistrict = null;
      renderAll();
    });
  }

function resetAllFilters() {
    stateFilter.value = "";
    updateRegionOptions();
    regionFilter.value = "";
    selectedEducation = "Bachelor's";
    document.querySelectorAll(".bubble[data-edu]").forEach(b => b.classList.toggle("active", b.dataset.edu === selectedEducation));
    experienceFilter.value = 0;
    salaryFilter.value = 40000;
    activeHousingFilters = {minRent: RENT_MIN, maxRent: RENT_MAX, minHomePrice: HOME_PRICE_MIN, maxHomePrice: HOME_PRICE_MAX};
    pendingHousingFilters = {...activeHousingFilters};
    showTenPlusHighSchoolsOnly = false;
    showStableDistrictsOnly = false;
    showOverall60PlusOnly = false;
    showBalancedDemographicsOnly = false;
    if (tenHighSchoolsFilter) tenHighSchoolsFilter.checked = false;
    if (stableDistrictsFilter) stableDistrictsFilter.checked = false;
    if (overall60Filter) overall60Filter.checked = false;
    if (balancedDemographicsFilter) balancedDemographicsFilter.checked = false;
    syncHousingFilterControls();
    updateExtraFilterBadge();
    updateSalaryReadouts();
    closeMoreFilters();
    selectedDistrict = null;
    renderAll();
  }

  if (resetBtn) resetBtn.onclick = resetAllFilters;
  const resetAllFiltersBtn = document.getElementById("resetAllFiltersBtn");
  if (resetAllFiltersBtn) resetAllFiltersBtn.addEventListener("click", resetAllFilters);
  const mobileFilterResetBtn = document.getElementById("mobileFilterResetBtn");
  if (mobileFilterResetBtn) mobileFilterResetBtn.addEventListener("click", resetAllFilters);

  function shouldSuppressFilterClose() {
    return housingSliderDragActive || Date.now() < suppressFilterCloseUntil;
  }

  document.addEventListener("pointerdown", evt => {
    if (document.body.classList.contains("mobile-filters-open")) return;
    if (!moreFiltersPanel || moreFiltersPanel.hidden) return;

    const path = typeof evt.composedPath === "function" ? evt.composedPath() : [];
    const clickedFilterButton = path.includes(moreFiltersTrigger) || moreFiltersTrigger.contains(evt.target);
    const clickedFilterPanel = path.includes(moreFiltersPanel) || moreFiltersPanel.contains(evt.target);

    if (!clickedFilterButton && !clickedFilterPanel) {
      closeMoreFilters();
    }
  }, true);

  document.addEventListener("click", evt => {
    if (document.body.classList.contains("mobile-filters-open")) return;
    const clickedStateHotspot = evt.target.closest && evt.target.closest(".state-hotspot");
    const clickedStatePath = evt.target.closest && evt.target.closest(".choroplethlayer path");
    const clickedFilterButton = moreFiltersTrigger.contains(evt.target);
    const clickedFilterPanel = moreFiltersPanel.contains(evt.target);

    if (
      !moreFiltersPanel.hidden &&
      !clickedFilterButton &&
      !clickedFilterPanel &&
      !clickedStateHotspot &&
      !clickedStatePath &&
      !shouldSuppressFilterClose()
    ) {
      closeMoreFilters();
    }
  });

  initFilters();
  updateSalaryReadouts();
  initMobileFilterOverlay();
  initMobileDistrictSearch();

  document.getElementById("districtMapPrev")?.addEventListener("click", () => navigateDistrictMap(-1));
  document.getElementById("districtMapNext")?.addEventListener("click", () => navigateDistrictMap(1));
  document.getElementById("mobileDetailPrev")?.addEventListener("click", () => navigateDistrictMap(-1));
  document.getElementById("mobileDetailNext")?.addEventListener("click", () => navigateDistrictMap(1));

/* Prototype 276: favorites rail and district favorite state */
const FAVORITES_STORAGE_KEY = "teacherValueFavoriteDistricts";
let favoriteDistricts = new Set();
try {
  favoriteDistricts = new Set(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]"));
} catch {
  favoriteDistricts = new Set();
}

/* Prototype 317: remove stale saved favorites that no longer match current district names */
try {
  const validFavoriteNames = new Set(DISTRICTS.map(d => d.District));
  const cleanedFavoriteDistricts = [...favoriteDistricts].filter(name => validFavoriteNames.has(name));
  if (cleanedFavoriteDistricts.length !== favoriteDistricts.size) {
    favoriteDistricts = new Set(cleanedFavoriteDistricts);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(cleanedFavoriteDistricts));
  }
} catch {
  favoriteDistricts = new Set();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[ch]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}


function buildScoreBadgeMarkup(valueDisplay, mode) {
  const label = mode === "mobile" ? "Overall Value Score" : "Overall score";
  return `${valueDisplay}<span>${label}</span>`;
}

function setDesktopScoreGuideOpen(open) {
  const pop = document.getElementById("desktopScoreGuidePopover");
  const trigger = document.querySelector('[data-score-guide-trigger="desktop"]');
  if (pop) pop.hidden = !open;
  if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
}

function setMobileScoreGuideOpen(open) {
  const sheet = document.getElementById("mobileScoreGuideSheet");
  const backdrop = document.getElementById("mobileScoreGuideBackdrop");
  const trigger = document.querySelector('[data-score-guide-trigger="mobile"]');
  if (sheet) {
    sheet.hidden = !open;
    if (!open) {
      sheet.classList.remove("is-dragging-dismiss");
      sheet.style.removeProperty("transform");
      sheet.style.removeProperty("transition");
    }
  }
  if (backdrop) {
    backdrop.hidden = !open;
    if (!open) {
      backdrop.style.removeProperty("opacity");
      backdrop.style.removeProperty("transition");
    }
  }
  if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.classList.toggle("score-guide-sheet-open", open);
}

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-score-guide-trigger]");
  if (trigger) {
    const mode = trigger.dataset.scoreGuideTrigger;
    event.preventDefault();
    event.stopPropagation();
    if (mode === "mobile") {
      const sheet = document.getElementById("mobileScoreGuideSheet");
      setMobileScoreGuideOpen(sheet ? sheet.hidden : true);
      setDesktopScoreGuideOpen(false);
    } else {
      const pop = document.getElementById("desktopScoreGuidePopover");
      setDesktopScoreGuideOpen(pop ? pop.hidden : true);
      setMobileScoreGuideOpen(false);
    }
    return;
  }

  if (event.target.closest("#mobileScoreGuideBackdrop")) {
    setMobileScoreGuideOpen(false);
    return;
  }

  if (!event.target.closest("#desktopScoreGuidePopover")) {
    setDesktopScoreGuideOpen(false);
  }
}, false);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    setDesktopScoreGuideOpen(false);
    setMobileScoreGuideOpen(false);
  }
});

function isFavoriteDistrict(name) {
  return favoriteDistricts.has(name);
}

function saveFavoriteDistricts() {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteDistricts]));
}

function pruneInvalidFavoriteDistricts() {
  const validDistrictNames = new Set(DISTRICTS.map(d => d.District));
  let changed = false;
  [...favoriteDistricts].forEach(name => {
    if (!validDistrictNames.has(name)) {
      favoriteDistricts.delete(name);
      changed = true;
    }
  });
  if (changed) saveFavoriteDistricts();
}

function favoriteButton(districtName, extraClass = "") {
  const active = isFavoriteDistrict(districtName);
  const label = `${active ? "Remove" : "Add"} ${districtName} ${active ? "from" : "to"} favorites`;
  return `<button type="button" class="favorite-toggle ${extraClass} ${active ? "is-favorited" : ""}" data-favorite-district="${escapeAttr(districtName)}" aria-label="${escapeAttr(label)}">${active ? "♥" : "♡"}</button>`;
}

function toggleFavoriteDistrict(districtName) {
  if (!districtName) return;
  if (favoriteDistricts.has(districtName)) favoriteDistricts.delete(districtName);
  else favoriteDistricts.add(districtName);
  saveFavoriteDistricts();
  renderFavoriteStates();
  renderFavoritesPanel();
}

function renderFavoriteStates() {
  document.querySelectorAll("[data-favorite-district]").forEach(btn => {
    const name = btn.dataset.favoriteDistrict;
    const active = isFavoriteDistrict(name);
    btn.classList.toggle("is-favorited", active);
    btn.textContent = active ? "♥" : "♡";
    btn.setAttribute("aria-label", `${active ? "Remove" : "Add"} ${name} ${active ? "from" : "to"} favorites`);
  });

  const count = favoriteDistricts.size;
  const countEl = document.getElementById("favoriteRailCount");
  if (countEl) {
    countEl.textContent = String(count);
    countEl.hidden = count === 0;
  }
  const mobileCountEl = document.getElementById("mobileFavoriteCount");
  if (mobileCountEl) {
    mobileCountEl.textContent = String(count);
    mobileCountEl.hidden = count === 0;
  }
  const sub = document.getElementById("favoritesPanelSub");
  if (sub) sub.textContent = count ? `${count} favorite district${count === 1 ? "" : "s"} saved.` : "Save districts to compare later.";
}

function favoriteDistrictCard(d) {
  return `<article class="favorite-district-card" data-open-favorite-district="${escapeAttr(d.District)}">
    ${favoriteButton(d.District)}
    <h3>${escapeHtml(d.District)}</h3>
    <div class="favorite-card-region">${escapeHtml(d.Region ?? "—")}, ${escapeHtml(stateNames[d.State] || d.State || "—")}</div>
    <div class="favorite-card-grid">
      <div class="favorite-card-stat"><span>Overall</span><strong>${fmtScore(d["Overall Value Score"])}</strong></div>
      <div class="favorite-card-stat"><span>${selectedEducationSalaryLabel()}</span><strong>${fmtMoney(salaryForDistrict(d))}</strong></div>
      <div class="favorite-card-stat"><span>Rent</span><strong>${fmtMoney(d["Median Rent"])}</strong></div>
      <div class="favorite-card-stat"><span>Class Size</span><strong>${formatClassSizeRatio(d["Student-Teacher Ratio"])}</strong></div>
    </div>
  </article>`;
}

function renderFavoritesPanel() {
  const grid = document.getElementById("favoritesPanelGrid");
  if (!grid) return;
  const favoriteRows = [...favoriteDistricts]
    .map(name => DISTRICTS.find(d => d.District === name))
    .filter(Boolean)
    .sort((a, b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0));

  if (!favoriteRows.length) {
    grid.innerHTML = `<div class="favorites-empty">No favorite districts yet. Use the heart button beside a district to save it here.</div>`;
  } else {
    grid.innerHTML = favoriteRows.map(favoriteDistrictCard).join("");
  }
  renderFavoriteStates();
}

function openFavoritesPanel() {
  renderFavoritesPanel();
  const panel = document.getElementById("favoritesPanel");
  const btn = document.getElementById("desktopRailFavorites");
  if (panel) panel.hidden = false;
  if (btn) btn.classList.add("is-active");
}

function closeFavoritesPanel() {
  const panel = document.getElementById("favoritesPanel");
  const btn = document.getElementById("desktopRailFavorites");
  if (panel) panel.hidden = true;
  if (btn) btn.classList.remove("is-active");
}

document.addEventListener("click", event => {
  const favoriteBtn = event.target.closest("[data-favorite-district]");
  if (favoriteBtn) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavoriteDistrict(favoriteBtn.dataset.favoriteDistrict);
    return;
  }

  const favoriteCard = event.target.closest("[data-open-favorite-district]");
  if (favoriteCard) {
    const district = DISTRICTS.find(d => d.District === favoriteCard.dataset.openFavoriteDistrict);
    if (district) {
      selectedDistrict = district;
      closeFavoritesPanel();
      renderProfile();
      document.querySelector(".profile-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}, true);

document.getElementById("desktopRailSearch")?.addEventListener("click", () => {
  closeFavoritesPanel();
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => document.getElementById("mobileDistrictSearch")?.focus(), 150);
});

function goHomeToDefaultMapView() {
  closeFavoritesPanel();
  stateFilter.value = "";
  regionFilter.value = "";
  updateRegionOptions();
  selectedDistrict = null;
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => {
    if (leafletUsaMap) {
      leafletUsaMap.invalidateSize(true);
      fitMapToDefaultDistrictView();
      renderLeafletDistrictMarkers();
      renderMapViewportTopMatches();
      renderMobileMapResultsSheetFromViewport();
    }
  }, 120);
}

document.getElementById("desktopRailHome")?.addEventListener("click", goHomeToDefaultMapView);
document.getElementById("mobileToolbarHome")?.addEventListener("click", goHomeToDefaultMapView);

document.getElementById("desktopRailFavorites")?.addEventListener("click", openFavoritesPanel);
document.getElementById("favoritesPanelClose")?.addEventListener("click", closeFavoritesPanel);

document.getElementById("mobileToolbarSearch")?.addEventListener("click", () => {
  closeFavoritesPanel();
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => document.getElementById("mobileDistrictSearch")?.focus(), 150);
});

document.getElementById("mobileToolbarFavorites")?.addEventListener("click", openFavoritesPanel);

function initMobileScoreGuidePullDownDismiss() {
  const sheet = document.getElementById("mobileScoreGuideSheet");
  const backdrop = document.getElementById("mobileScoreGuideBackdrop");
  if (!sheet || sheet.dataset.pullDismissReady === "true") return;
  sheet.dataset.pullDismissReady = "true";

  let startY = 0;
  let currentY = 0;
  let tracking = false;
  let dragging = false;

  const isTopGrabArea = touch => (touch.clientY - sheet.getBoundingClientRect().top) <= 96;

  const resetPosition = () => {
    sheet.classList.remove("is-dragging-dismiss");
    sheet.style.transition = "transform 180ms ease";
    sheet.style.transform = "translateY(0px)";
    if (backdrop) backdrop.style.transition = "opacity 180ms ease";
    if (backdrop) backdrop.style.opacity = "1";
    window.setTimeout(() => {
      sheet.style.removeProperty("transform");
      sheet.style.removeProperty("transition");
      if (backdrop) {
        backdrop.style.removeProperty("opacity");
        backdrop.style.removeProperty("transition");
      }
    }, 190);
  };

  const animateClose = () => {
    sheet.classList.remove("is-dragging-dismiss");
    sheet.style.transition = "transform 180ms ease";
    sheet.style.transform = `translateY(${Math.max(window.innerHeight * 0.5, currentY + 180)}px)`;
    if (backdrop) backdrop.style.transition = "opacity 180ms ease";
    if (backdrop) backdrop.style.opacity = "0";
    window.setTimeout(() => {
      setMobileScoreGuideOpen(false);
    }, 185);
  };

  sheet.addEventListener("touchstart", evt => {
    if (sheet.hidden) return;
    const touch = evt.touches?.[0];
    if (!touch || !isTopGrabArea(touch)) return;
    startY = touch.clientY;
    currentY = 0;
    tracking = true;
    dragging = false;
  }, { passive: true });

  sheet.addEventListener("touchmove", evt => {
    if (!tracking) return;
    const touch = evt.touches?.[0];
    if (!touch) return;
    const delta = Math.max(0, touch.clientY - startY);
    if (delta <= 0) return;
    if (!dragging && delta > 6) {
      dragging = true;
      sheet.classList.add("is-dragging-dismiss");
      sheet.style.transition = "none";
      if (backdrop) backdrop.style.transition = "none";
    }
    if (!dragging) return;
    currentY = Math.min(delta, window.innerHeight * 0.85);
    sheet.style.transform = `translateY(${currentY}px)`;
    if (backdrop) backdrop.style.opacity = String(Math.max(0, 1 - currentY / 220));
    evt.preventDefault();
  }, { passive: false });

  const finish = () => {
    if (!tracking) return;
    tracking = false;
    if (!dragging) return;
    dragging = false;
    if (currentY > 95) animateClose();
    else resetPosition();
    currentY = 0;
  };

  sheet.addEventListener("touchend", finish);
  sheet.addEventListener("touchcancel", finish);
}

function initMobileMapResultsSheetDrag() {
  const sheet = document.getElementById("mobileMapResultsSheet");
  const handle = document.getElementById("mobileMapResultsSheetToggle");
  const summary = document.getElementById("mobileMapResultsSummary");
  if (!sheet || !handle || sheet.dataset.dragReady === "true") return;
  sheet.dataset.dragReady = "true";

  let startY = 0;
  let startHeight = 0;
  let currentHeight = 0;
  let dragging = false;
  let moved = false;
  let pointerId = null;

  function isMobileSheetEnabled() {
    return window.matchMedia("(max-width: 768px)").matches && !document.body.classList.contains("mobile-filters-open");
  }

  function collapsedHeight() {
    return window.matchMedia("(max-width: 768px)").matches ? 50 : 74;
  }

  function expandedHeight() {
    return Math.min(window.innerHeight * 0.58, 560);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setSheetHeight(px) {
    const height = `${Math.round(px)}px`;
    sheet.style.setProperty("height", height, "important");
    sheet.style.setProperty("min-height", height, "important");
    sheet.style.setProperty("max-height", height, "important");
  }

  function clearSheetHeight() {
    sheet.style.removeProperty("height");
    sheet.style.removeProperty("min-height");
    sheet.style.removeProperty("max-height");
  }

  function startDrag(event) {
    if (!isMobileSheetEnabled()) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target;
    if (target && target.closest && target.closest("button:not(#mobileMapResultsSheetToggle), a, input, select, textarea")) return;

    pointerId = event.pointerId;
    startY = event.clientY;
    startHeight = sheet.getBoundingClientRect().height || (sheet.classList.contains("is-expanded") ? expandedHeight() : collapsedHeight());
    currentHeight = startHeight;
    moved = false;
    dragging = true;
    sheet.classList.add("is-dragging");
    setSheetHeight(startHeight);
    try { event.currentTarget.setPointerCapture(pointerId); } catch (e) {}
    event.preventDefault();
  }

  function moveDrag(event) {
    if (!dragging || event.pointerId !== pointerId) return;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaY) > 4) moved = true;
    currentHeight = clamp(startHeight - deltaY, collapsedHeight(), expandedHeight());
    setSheetHeight(currentHeight);
    event.preventDefault();
  }

  function finishDrag(event) {
    if (!dragging || (event && event.pointerId !== pointerId)) return;
    dragging = false;
    sheet.classList.remove("is-dragging");

    const minH = collapsedHeight();
    const maxH = expandedHeight();
    const midpoint = minH + (maxH - minH) * 0.38;
    const shouldExpand = currentHeight >= midpoint;

    sheet.classList.toggle("is-expanded", shouldExpand);
    clearSheetHeight();
    pointerId = null;
  }

  function toggleFromTap(event) {
    if (moved) {
      moved = false;
      event.preventDefault();
      return;
    }
    sheet.classList.toggle("is-expanded");
  }

  [handle, summary].forEach(el => {
    el.addEventListener("pointerdown", startDrag, { passive: false });
    el.addEventListener("pointermove", moveDrag, { passive: false });
    el.addEventListener("pointerup", finishDrag);
    el.addEventListener("pointercancel", finishDrag);
    el.addEventListener("lostpointercapture", finishDrag);
    el.addEventListener("click", toggleFromTap);
  });

  window.addEventListener("resize", () => {
    if (!isMobileSheetEnabled()) return;
    clearSheetHeight();
  });
}

updateMobileViewportHeightVar();
window.addEventListener("resize", updateMobileViewportHeightVar);
window.visualViewport?.addEventListener("resize", updateMobileViewportHeightVar);
window.visualViewport?.addEventListener("scroll", updateMobileViewportHeightVar);
initMobileMapResultsSheetDrag();
initMobileProfilePullDownDismiss();
initMobileScoreGuidePullDownDismiss();
pruneInvalidFavoriteDistricts();
renderFavoriteStates();


  renderDistrictMap();
  setPendingFromActiveFilters();
  updateExtraFilterBadge();
  renderAll();
/* Prototype 230: pinch zoom + pan for the USA map on phones */
function initMobileUsaMapZoom() {
  const wrap = document.querySelector(".top-map-card .usa-map-wrap");
  const map = document.getElementById("usaMap");
  const layer = document.getElementById("stateClickLayer");
  if (!wrap || !map || !layer || wrap.dataset.mobileZoomReady === "true") return;
  wrap.dataset.mobileZoomReady = "true";

  let scale = 1;
  let minScale = 1;
  let maxScale = 3.5;
  let x = 0;
  let y = 0;
  let startScale = 1;
  let startX = 0;
  let startY = 0;
  let startDistance = 0;
  let startMid = { x: 0, y: 0 };
  let lastTapTime = 0;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  function isMobileMapZoomEnabled() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function clampPan() {
    const rect = wrap.getBoundingClientRect();
    const scaledW = rect.width * scale;
    const scaledH = rect.height * scale;

    if (scaledW <= rect.width) {
      x = 0;
    } else {
      x = Math.min(0, Math.max(rect.width - scaledW, x));
    }

    if (scaledH <= rect.height) {
      y = 0;
    } else {
      y = Math.min(0, Math.max(rect.height - scaledH, y));
    }
  }

  function applyTransform() {
    clampPan();
    const transform = `translate(${x}px, ${y}px) scale(${scale})`;
    map.style.transform = transform;
    layer.style.transform = transform;
  }

  function distance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function midpoint(t1, t2) {
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2
    };
  }

  function resetZoom() {
    scale = 1;
    x = 0;
    y = 0;
    applyTransform();
  }

  wrap.addEventListener("touchstart", (event) => {
    if (!isMobileMapZoomEnabled()) return;

    if (event.touches.length === 2) {
      event.preventDefault();
      startDistance = distance(event.touches[0], event.touches[1]);
      startMid = midpoint(event.touches[0], event.touches[1]);
      startScale = scale;
      startX = x;
      startY = y;
      isDragging = false;
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime < 280) {
        event.preventDefault();
        resetZoom();
        lastTapTime = 0;
        return;
      }
      lastTapTime = now;

      if (scale > 1.01) {
        isDragging = true;
        dragStart = {
          x: event.touches[0].clientX - x,
          y: event.touches[0].clientY - y
        };
      }
    }
  }, { passive: false });

  wrap.addEventListener("touchmove", (event) => {
    if (!isMobileMapZoomEnabled()) return;

    if (event.touches.length === 2 && startDistance) {
      event.preventDefault();
      const nextDistance = distance(event.touches[0], event.touches[1]);
      const nextMid = midpoint(event.touches[0], event.touches[1]);
      const rect = wrap.getBoundingClientRect();

      const nextScale = Math.max(minScale, Math.min(maxScale, startScale * (nextDistance / startDistance)));
      const contentX = (startMid.x - rect.left - startX) / startScale;
      const contentY = (startMid.y - rect.top - startY) / startScale;

      scale = nextScale;
      x = nextMid.x - rect.left - contentX * scale;
      y = nextMid.y - rect.top - contentY * scale;
      applyTransform();
      return;
    }

    if (event.touches.length === 1 && isDragging && scale > 1.01) {
      event.preventDefault();
      x = event.touches[0].clientX - dragStart.x;
      y = event.touches[0].clientY - dragStart.y;
      applyTransform();
    }
  }, { passive: false });

  wrap.addEventListener("touchend", () => {
    if (!isMobileMapZoomEnabled()) return;
    if (scale < 1.03) resetZoom();
    isDragging = false;
    startDistance = 0;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!isMobileMapZoomEnabled()) {
      resetZoom();
      return;
    }
    applyTransform();
  });
}

initMobileUsaMapZoom();

/* Prototype 244: allow the top filter button to open the unified filter overlay on desktop too */
(function initUnifiedTopFilterButton() {
  const btn = document.getElementById("mobileFilterButton");
  if (!btn || btn.dataset.unifiedDesktopReady === "true") return;
  btn.dataset.unifiedDesktopReady = "true";
  btn.addEventListener("click", () => {
    if (typeof openMobileFilters === "function") {
      openMobileFilters();
    } else {
      document.body.classList.add("mobile-filters-open");
    }
  });
})();

/* Prototype 246: make desktop top search use the same custom dropdown as mobile */
(function initDesktopSearchDropdownSafety() {
  const input = document.getElementById("mobileDistrictSearch");
  const results = document.getElementById("mobileDistrictSearchResults");
  if (!input || !results || input.dataset.desktopDropdownReady === "true") return;
  input.dataset.desktopDropdownReady = "true";

  const showDropdown = () => {
    if (typeof renderMobileDistrictSearchResults === "function") {
      renderMobileDistrictSearchResults();
    }
  };

  input.addEventListener("input", showDropdown);
  input.addEventListener("focus", showDropdown);
})();

/* Prototype 247: reinforce desktop filter button behavior */
(function initDesktopMobileStyleFilterButton() {
  const btn = document.getElementById("mobileFilterOpenBtn");
  if (!btn || btn.dataset.desktopMobileFilterReady === "true") return;
  btn.dataset.desktopMobileFilterReady = "true";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (typeof openMobileFilters === "function") {
      openMobileFilters();
    } else {
      document.body.classList.add("mobile-filters-open");
    }
  });
})();

/* Prototype 249: move filter controls into a separate desktop right sheet so the map remains visible */
(function initDesktopFilterSheet() {
  const desktopQuery = window.matchMedia("(min-width: 769px)");
  const body = document.body;
  const moved = new Map();
  const nodesToMove = [
    ".mobile-filter-overlay-head",
    ".vertical-filter-stack",
    ".more-filters-shell",
    ".current-search-card",
    ".mobile-filter-sticky-footer"
  ];

  function getSheet() {
    let sheet = document.getElementById("desktopFilterSheet");
    if (!sheet) {
      sheet = document.createElement("aside");
      sheet.id = "desktopFilterSheet";
      sheet.className = "desktop-filter-sheet";
      sheet.setAttribute("aria-label", "Filters");
      document.body.appendChild(sheet);
    }
    return sheet;
  }

  function moveToSheet() {
    if (!desktopQuery.matches || !body.classList.contains("mobile-filters-open")) return;
    const sheet = getSheet();
    nodesToMove.forEach(selector => {
      const node = document.querySelector(selector);
      if (!node || sheet.contains(node)) return;
      const placeholder = document.createComment(`desktop-filter-sheet-placeholder:${selector}`);
      node.parentNode.insertBefore(placeholder, node);
      moved.set(node, placeholder);
      sheet.appendChild(node);
    });
  }

  function restoreFromSheet() {
    moved.forEach((placeholder, node) => {
      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(node, placeholder);
        placeholder.remove();
      }
    });
    moved.clear();
    const sheet = document.getElementById("desktopFilterSheet");
    if (sheet) sheet.remove();
  }

  const observer = new MutationObserver(() => {
    if (body.classList.contains("mobile-filters-open") && desktopQuery.matches) {
      moveToSheet();
    } else {
      restoreFromSheet();
    }
  });

  observer.observe(body, { attributes: true, attributeFilter: ["class"] });
  desktopQuery.addEventListener("change", () => {
    if (body.classList.contains("mobile-filters-open") && desktopQuery.matches) {
      moveToSheet();
    } else {
      restoreFromSheet();
    }
  });
})();

/* Prototype 251: clear width constraints on desktop housing range sliders after moving into sheet */
(function initDesktopHousingSliderWidthFix() {
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  function widenHousingSliders() {
    if (!desktopQuery.matches || !document.body.classList.contains("mobile-filters-open")) return;
    [
      "#rentRangeControl",
      "#homePriceRangeControl",
      "#rentRangeControl input",
      "#homePriceRangeControl input",
      "#rentRangeControl .dual-range-track",
      "#homePriceRangeControl .dual-range-track",
      "#rentRangeControl .dual-range-fill",
      "#homePriceRangeControl .dual-range-fill"
    ].forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.maxWidth = "none";
        if (!el.classList.contains("dual-range-fill")) el.style.width = "100%";
      });
    });
  }

  document.addEventListener("input", widenHousingSliders, true);
  document.getElementById("mobileFilterOpenBtn")?.addEventListener("click", () => {
    requestAnimationFrame(widenHousingSliders);
    setTimeout(widenHousingSliders, 50);
  });
  new MutationObserver(widenHousingSliders).observe(document.body, {attributes:true, attributeFilter:["class"]});
})();

/* Prototype 255: move desktop district-map arrows into the map frame */
(function initDistrictMapSideArrows() {
  function moveArrows() {
    if (!window.matchMedia("(min-width: 769px)").matches) return;
    const frame = document.getElementById("districtMapFrame");
    const controls = document.querySelector(".district-map-nav-controls");
    if (!frame || !controls || frame.contains(controls)) return;
    frame.appendChild(controls);
  }

  moveArrows();
  window.addEventListener("resize", moveArrows);
  new MutationObserver(moveArrows).observe(document.body, { childList: true, subtree: true });
})();
