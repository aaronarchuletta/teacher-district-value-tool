
  const scoreCols = [
    "Salary Score","Growth Score","Master's Premium Score","Affordability Score",
    "Student-Teacher Ratio Score","Sub Pay Score","Demographic Balance Score","Overall Value Score",
    "Pre-Risk Overall Value Score", "Stability Score"
  ];
  const columns = [
    "District","State","Region","Overall Value Score","Stability Score",
    "Salary Score","Affordability Score","Student-Teacher Ratio Score","Sub Pay Score","Demographic Balance Score"
  ];
  const columnLabels = {
    "Overall Value Score": "Final Value Score",
    "Pre-Risk Overall Value Score": "Pre-Risk Score",
    "Work Environment Risk": "Stability Risk",
    "Work Environment Multiplier": "Stability Multiplier",
    "Stability Score": "Stability Score",
    "Salary Score": "Salary Score",
    "Growth Score": "Growth Score",
    "Master's Premium Score": "Master’s Premium Score",
    "Affordability Score": "Affordability Score",
    "Student-Teacher Ratio Score": "Student-Teacher Ratio Score",
    "Sub Pay Score": "Sub Pay Score",
    "Demographic Balance Score": "Demographic Balance Score"
  };

  let sortKey = "Overall Value Score";
  let sortDir = -1;
  let selectedDistrict = null;
  let selectedEducation = "Bachelor\'s";

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

  let housingSliderDragActive = false;
  let suppressFilterCloseUntil = 0;

  const fmtMoney = v => (typeof v === "number") ? v.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits:0}) : "—";
  const fmtPct = v => (typeof v === "number") ? (v*100).toFixed(1)+"%" : "—";
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
    "Leander ISD": {
      src: "district-map-leander-isd.png",
      alt: "District boundary map for Leander ISD in the Austin metro area"
    },
    "Alief ISD": {
      src: "district-map-alief-isd.png",
      alt: "District boundary map for Alief ISD in the Houston metro area"
    },
    "Portland Public Schools": {
      src: "district-map-portland-public-schools.png",
      alt: "District boundary map for Portland Public Schools in the Portland metro area"
    },
    "Katy ISD": {
      src: "district-map-katy-isd.png",
      alt: "District boundary map for Katy ISD in the Houston metro area"
    },
    "Los Angeles Unified": {
      src: "district-map-los-angeles-unified.png",
      alt: "District boundary map for Los Angeles Unified in the Los Angeles metro area"
    }
  };

  function getDistrictNavigationContext() {
    const selectedState = stateFilter?.value || "";
    if (selectedState) {
      const stateName = stateNames[selectedState] || selectedState;
      const items = [...getFiltered().filter(d => d.State === selectedState)]
        .sort((a,b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0))
        .slice(0, 3);
      return {
        mode: "state",
        label: `${stateName} top matches`,
        items
      };
    }
    const items = [...DISTRICTS].sort((a,b) => (b["Overall Value Score"] || 0) - (a["Overall Value Score"] || 0));
    return {
      mode: "national",
      label: "National browse",
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
      mapImage.src = mapMeta.src;
      mapImage.alt = mapMeta.alt;
      mapImage.hidden = false;
      mapPlaceholder.hidden = true;
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

  function updateSalaryReadouts() {
    const years = getExperience();
    experienceReadout.textContent = `${years} ${years === 1 ? "year" : "years"}`;
    salaryReadout.textContent = `${fmtMoney(getDesiredSalary())}+`;
  }

  function countActiveHousingFilters() {
    let count = 0;
    if (activeHousingFilters.minRent > RENT_MIN || activeHousingFilters.maxRent < RENT_MAX) count++;
    if (activeHousingFilters.minHomePrice > HOME_PRICE_MIN || activeHousingFilters.maxHomePrice < HOME_PRICE_MAX) count++;
    if (showTenPlusHighSchoolsOnly) count++;
    if (showStableDistrictsOnly) count++;
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
    if (rentRangeReadout) rentRangeReadout.textContent = housingRangeLabel(pendingHousingFilters.minRent, pendingHousingFilters.maxRent, RENT_MIN, RENT_MAX);
    if (homePriceRangeReadout) homePriceRangeReadout.textContent = housingRangeLabel(pendingHousingFilters.minHomePrice, pendingHousingFilters.maxHomePrice, HOME_PRICE_MIN, HOME_PRICE_MAX);
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
    if (!summaryEducation || !summaryExperience || !summarySalary || !summaryRent || !summaryHomePrice) return;

    const years = getExperience();
    summaryEducation.textContent = selectedEducation;
    summaryExperience.textContent = `${years} ${years === 1 ? "year" : "years"}`;
    summarySalary.textContent = `${fmtMoney(getDesiredSalary())}+`;
    summaryRent.textContent = housingRangeLabel(activeHousingFilters.minRent, activeHousingFilters.maxRent, RENT_MIN, RENT_MAX);
    summaryHomePrice.textContent = housingRangeLabel(activeHousingFilters.minHomePrice, activeHousingFilters.maxHomePrice, HOME_PRICE_MIN, HOME_PRICE_MAX);
    if (summaryTenHighSchools) summaryTenHighSchools.textContent = showTenPlusHighSchoolsOnly ? "On" : "Off";
    if (summaryStableDistricts) summaryStableDistricts.textContent = showStableDistrictsOnly ? "On" : "Off";
  }

  function updateExtraFilterBadge() {
    const count = countActiveHousingFilters();
    extraFilterCount.textContent = String(count);
    extraFilterCount.style.display = "inline-flex";
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

  function closeMoreFilters() {
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

  function renderMap() {
    const allStates = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
      "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
      "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
      "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
    const selectedState = stateFilter.value;
    const districtsByState = Object.fromEntries(allStates.map(s => [s, DISTRICTS.filter(d => d.State === s)]));
    const hasData = s => districtsByState[s].length > 0;
    const hasMatch = s => districtsByState[s].some(d =>
      matchesSalaryFilters(d) &&
      passesExtraFilters(d) &&
      (!regionFilter.value || d.Region === regionFilter.value)
    );
    const visibleMatch = s => hasMatch(s);

    // Prototype 176 map tile cleanup:
    // Pre-render a visible clickable state-tile map before Plotly runs, without AK/ME corner tiles.
    // If Plotly loads successfully, Plotly.newPlot replaces this content with the USA choropleth.
    // If Plotly fails, is blocked, or renders zero state paths, the user still sees a usable map.
    renderUsaTileFallback(allStates, districtsByState, hasData, hasMatch, selectedState);
    renderStateClickLayer(districtsByState, hasMatch);

    const zvals = allStates.map(s => {
      if (!hasData(s)) return 0;           // no data
      if (!visibleMatch(s)) return 0.5;    // has data, no visible match
      return 1;                            // matching districts
    });
    const baseTrace = {
      type: "choropleth",
      locationmode: "USA-states",
      locations: allStates,
      z: zvals,
      zmin: 0,
      zmax: 1,
      hoverinfo: "skip",
      hovertemplate: null,
      showscale: false,
      colorscale: [
        [0.0, "#9ca3af"],
        [0.24, "#9ca3af"],
        [0.25, "#d1d5db"],
        [0.74, "#d1d5db"],
        [0.75, "#2f5caa"],
        [1.0, "#2f5caa"]
      ],
      marker: {
        line: {
          color: "#ffffff",
          width: 1.1
        }
      }
    };

    const traces = [baseTrace];

    if (selectedState) {
      traces.push({
        type: "choropleth",
        locationmode: "USA-states",
        locations: [selectedState],
        z: [1],
        zmin: 0,
        zmax: 1,
        hoverinfo: "skip",
        hovertemplate: null,
        showscale: false,
        colorscale: [
          [0.0, "rgba(0,0,0,0)"],
          [1.0, "rgba(0,0,0,0)"]
        ],
        marker: {
          line: {
            color: "#BF5700",
            width: 4
          }
        }
      });
    }

    const layout = {
      geo: {
        scope: "usa",
        projection: {type: "albers usa"},
        showlakes: false,
        bgcolor: "rgba(0,0,0,0)"
      },
      margin: {l: 0, r: 0, t: 0, b: 0},
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      dragmode: false,
      hovermode: false
    };

    const config = {
      responsive: true,
      displayModeBar: false,
      staticPlot: false
    };

    const usaMapEl = document.getElementById("usaMap");
    if (!window.Plotly || typeof Plotly.newPlot !== "function") {
      renderUsaTileFallback(allStates, districtsByState, hasData, hasMatch, selectedState);
      return;
    }

    let mapFallbackShown = false;
    const showMapFallback = () => {
      if (mapFallbackShown) return;
      mapFallbackShown = true;
      renderUsaTileFallback(allStates, districtsByState, hasData, hasMatch, selectedState);
    };

    const fallbackTimer = window.setTimeout(() => {
      const pathCount = usaMapEl ? usaMapEl.querySelectorAll(".choroplethlayer path").length : 0;
      if (!pathCount) showMapFallback();
    }, 1400);

    Plotly.newPlot("usaMap", traces, layout, config).then(gd => {
      window.clearTimeout(fallbackTimer);
      const pathCount = gd.querySelectorAll(".choroplethlayer path").length;
      if (!pathCount) {
        showMapFallback();
        return;
      }
      attachNativeStatePathClicks(gd, allStates, hasMatch);
      requestAnimationFrame(() => Plotly.Plots.resize(gd));
    }).catch(() => {
      window.clearTimeout(fallbackTimer);
      showMapFallback();
    });
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
    if (["Avg Start Salary","Avg 10-Year Salary","Median Home Price","Median Rent","Licensed Sub Pay","Master's Premium"].includes(col)) return fmtMoney(v);
    if (col === "Avg Growth %") return fmtPct(v);
    if (col === "Work Environment Multiplier") return typeof v === "number" ? `${Math.round(v * 100)}%` : "—";
    if (col === "Stability Score") {
      const stability = stabilityDisplayScore(d);
      return `<span class="score-pill" style="background:${scoreColor(stability)}" title="Stability Score: ${fmtScore(stability)}. Lower scores mean higher layoff/work-environment risk.">${fmtScore(stability)}</span>`;
    }
    if (scoreCols.includes(col)) return `<span class="score-pill" style="background:${scoreColor(v)}">${fmtScore(v)}</span>`;
    return v ?? "—";
  }

  function renderTable() {
    let rows = getFiltered();
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
    thead.innerHTML = `<tr>${columns.map(c=>`<th class="${typeof rows[0]?.[c]==='number' ? 'num':''}" data-col="${c}">${columnLabels[c] || c}</th>`).join("")}</tr>`;
    tbody.innerHTML = rows.map((d,i) => `<tr data-district="${d.District}">
      ${columns.map(c=>`<td class="${typeof d[c]==='number' ? 'num':''}">${cellValue(d,c)}</td>`).join("")}
    </tr>`).join("");

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
    if (!st) {
      stateResultsTitle.textContent = "Selected State Results";
      stateResultsSub.textContent = "Click any blue state on the map to view district rankings.";
      topDistrictCards.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">No state selected</div><div class="m-value" style="font-size:16px; line-height:1.35">Choose a blue state on the map to see its top district matches.</div></div>`;
      stateKpis.innerHTML = "";
      rankingsTitle.textContent = "Sortable District Rankings";
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
  }

  function renderProfile() {
    if (!selectedDistrict) {
      profileName.textContent = "Select a district";
      profileMetrics.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="m-label">No district selected</div><div class="m-value" style="font-size:14px; font-weight:700; line-height:1.3">Click a district row in the rankings table to view its profile.</div></div>`;
      renderDistrictMap();
      return;
    }
    const d = selectedDistrict;
    profileName.textContent = d.District;
    const placementLabel = placementLabelForDistrict(d);
    const metrics = [
      ["Final Overall Value", fmtScore(d["Overall Value Score"])],
      ["Pre-Risk Overall", fmtScore(d["Pre-Risk Overall Value Score"] ?? d["Overall Value Score"])],
      ["Stability Risk", d["Work Environment Risk"] ?? "Stable / no current evidence"],
      ["Stability Multiplier", typeof d["Work Environment Multiplier"] === "number" ? `${Math.round(d["Work Environment Multiplier"] * 100)}%` : "100%"],
      ["State / Region", `${d.State} · ${d.Region}`],
      ["Selected Salary", fmtMoney(salaryForDistrict(d))],
      ...(placementLabel ? [["Credited Placement", placementLabel]] : []),
      ["Avg Start Salary", fmtMoney(d["Avg Start Salary"])],
      ["Avg 10-Year Salary", fmtMoney(d["Avg 10-Year Salary"])],
      ["10-Year Growth", fmtPct(d["Avg Growth %"])],
      ["Master’s Premium", fmtMoney(d["Master's Premium"])],
      ["Median Home Price", fmtMoney(d["Median Home Price"])],
      ["Median Rent", fmtMoney(d["Median Rent"])],
      ["Licensed Sub Pay", fmtMoney(d["Licensed Sub Pay"])],
      ["Student-Teacher Ratio", d["Student-Teacher Ratio"] ?? "—"],
      ["Schools Counted", d["Total Schools Counted"] ?? "—"]
    ];
    profileMetrics.innerHTML = metrics.map(([label,val]) => `<div class="metric"><div class="m-label">${label}</div><div class="m-value">${val}</div></div>`).join("");
    renderDistrictMap();

  }

  function renderAll(profile=true) {
    updateCurrentSearchSummary();
    updateLegendVisibility();
    renderMap();
    renderTable();
    if (profile) renderProfile();
  }

  stateFilter.addEventListener("input", () => {
    updateRegionOptions();
    selectedDistrict = null;
    renderAll();
    
  });
  regionFilter.addEventListener("input", () => { selectedDistrict = null; renderAll(); });
  experienceFilter.addEventListener("input", () => { updateSalaryReadouts(); selectedDistrict = null; renderAll(); });
  salaryFilter.addEventListener("input", () => { updateSalaryReadouts(); selectedDistrict = null; renderAll(); });
  document.querySelectorAll(".bubble[data-edu]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedEducation = btn.dataset.edu;
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
      if (tenHighSchoolsFilter) tenHighSchoolsFilter.checked = false;
      if (stableDistrictsFilter) stableDistrictsFilter.checked = false;
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
    if (tenHighSchoolsFilter) tenHighSchoolsFilter.checked = false;
    if (stableDistrictsFilter) stableDistrictsFilter.checked = false;
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

  function shouldSuppressFilterClose() {
    return housingSliderDragActive || Date.now() < suppressFilterCloseUntil;
  }

  document.addEventListener("pointerdown", evt => {
    if (!moreFiltersPanel || moreFiltersPanel.hidden) return;

    const path = typeof evt.composedPath === "function" ? evt.composedPath() : [];
    const clickedFilterButton = path.includes(moreFiltersTrigger) || moreFiltersTrigger.contains(evt.target);
    const clickedFilterPanel = path.includes(moreFiltersPanel) || moreFiltersPanel.contains(evt.target);

    if (!clickedFilterButton && !clickedFilterPanel) {
      closeMoreFilters();
    }
  }, true);

  document.addEventListener("click", evt => {
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

  document.getElementById("districtMapPrev")?.addEventListener("click", () => navigateDistrictMap(-1));
  document.getElementById("districtMapNext")?.addEventListener("click", () => navigateDistrictMap(1));

  renderDistrictMap();
  setPendingFromActiveFilters();
  updateExtraFilterBadge();
  renderAll();
