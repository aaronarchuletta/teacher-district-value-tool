// Teacher District Value Prototype 323 district additions
// Adds: Channelview ISD, Plano ISD, Galena Park ISD, Deer Park ISD, Port Arthur ISD
// Load this file AFTER districts-data.js and BEFORE app.js.

(function () {
  "use strict";

  const NEW_DISTRICTS_V323 = [
  {
    "District": "Channelview ISD",
    "State": "TX",
    "Region": "Houston",
    "BA Start": 68500,
    "BA 5-Year": 70000,
    "BA 10-Year": 71500,
    "MA Start": 70000,
    "MA 5-Year": 71500,
    "MA 10-Year": 73000,
    "Median Home Price": 229862,
    "Median Rent": 1800,
    "Student-Teacher Ratio": 15.6,
    "Licensed Sub Pay": 140,
    "White %": 4.0,
    "Hispanic %": 84.6,
    "Asian %": 1.0,
    "Black %": 8.0,
    "Other %": 2.4,
    "Number of High Schools": 2,
    "Number of Middle Schools": 3,
    "Number of Elementary Schools": 6,
    "Other / Specialty Schools": 1,
    "Total Schools Counted": 12,
    "salarySchedule": {
      "Bachelor's": {
        "0": 68500,
        "1": 68800,
        "2": 69100,
        "3": 69400,
        "4": 69700,
        "5": 70000,
        "6": 70300,
        "7": 70600,
        "8": 70900,
        "9": 71200,
        "10": 71500
      },
      "Master's": {
        "0": 70000,
        "1": 70300,
        "2": 70600,
        "3": 70900,
        "4": 71200,
        "5": 71500,
        "6": 71800,
        "7": 72100,
        "8": 72400,
        "9": 72700,
        "10": 73000
      }
    },
    "Avg Start Salary": 69250.0,
    "Avg 10-Year Salary": 72250.0,
    "Avg Growth %": 0.04332129963898917,
    "Master's Premium": 1500,
    "Demographic Balance Score": 67.02000000000001,
    "Salary Level Score": 60.55555555555555,
    "Growth Score": 6.664815329075256,
    "Master's Premium Score": 10.0,
    "Salary Score": 36.638240920731896,
    "Affordability Score": 79.21104,
    "Student-Teacher Ratio Score": 62.66666666666667,
    "Sub Pay Score": 51.85185185185185,
    "Overall Value Score": 57.545370100033935,
    "Median Home Price per Sq Ft": 151,
    "Price per Sq Ft Score": 92.15384615384616,
    "Sub Pay Housing Power": 1.5555555555555556,
    "Count Notes": "First-pass entry. Salary entered from Channelview's 2025-2026 classroom teacher hiring chart listing; verify exact step/lane values before final ranking. NCES total schools differs slightly from Texas Tribune campus count; NCES total used for total schools counted.",
    "Source URL": "https://www.cvisd.org/documents/departments/human-resources/23858250 ; https://schools.texastribune.org/districts/channelview-isd/ ; https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4813590 ; https://www.redfin.com/city/22005/TX/Channelview/housing-market ; https://www.zillow.com/rental-manager/market-trends/channelview-tx/",
    "Last Verified": "2026-06-16",
    "Area": "Channelview / east Houston, TX",
    "Demographic Balance Note": "Top 2 groups reach 80%+",
    "Daily Sub Pay": 140,
    "Pre-Risk Overall Value Score": 57.545370100033935,
    "Work Environment Risk": "Stable / no current evidence",
    "Work Environment Multiplier": 1.0,
    "Work Environment Note": "No employment-stability penalty applied in this first-pass addition; verify with adopted budget, enrollment trend, board packets, and HR/union notices before final scoring.",
    "Stability Review Stage": "First-pass public-source screening; verify with adopted budget, board packets, audit/ACFR, enrollment trend, and union/HR notices before final scoring.",
    "Data Confidence": "First-pass salary values; verify exact step/lane chart before final ranking."
  },
  {
    "District": "Plano ISD",
    "State": "TX",
    "Region": "Dallas-Fort Worth",
    "BA Start": 64000,
    "BA 5-Year": 67600,
    "BA 10-Year": 69600,
    "MA Start": 66000,
    "MA 5-Year": 69600,
    "MA 10-Year": 71600,
    "Median Home Price": 519689,
    "Median Rent": 2600,
    "Student-Teacher Ratio": 13.75,
    "Licensed Sub Pay": 130,
    "White %": 31.0,
    "Hispanic %": 30.1,
    "Asian %": 24.0,
    "Black %": 12.0,
    "Other %": 2.9,
    "Number of High Schools": 11,
    "Number of Middle Schools": 11,
    "Number of Elementary Schools": 46,
    "Other / Specialty Schools": 9,
    "Total Schools Counted": 77,
    "salarySchedule": {
      "Bachelor's": {
        "0": 64000,
        "1": 64200,
        "2": 64400,
        "3": 64600,
        "4": 64900,
        "5": 67600,
        "6": 68000,
        "7": 68400,
        "8": 68800,
        "9": 69200,
        "10": 69600
      },
      "Master's": {
        "0": 66000,
        "1": 66200,
        "2": 66400,
        "3": 66600,
        "4": 66900,
        "5": 69600,
        "6": 70000,
        "7": 70400,
        "8": 70800,
        "9": 71200,
        "10": 71600
      }
    },
    "Avg Start Salary": 65000.0,
    "Avg 10-Year Salary": 70600.0,
    "Avg Growth %": 0.08615384615384615,
    "Master's Premium": 2000,
    "Demographic Balance Score": 99.93,
    "Salary Level Score": 56.888888888888886,
    "Growth Score": 13.254437869822484,
    "Master's Premium Score": 13.333333333333334,
    "Salary Score": 37.261275476660096,
    "Affordability Score": 36.82488,
    "Student-Teacher Ratio Score": 75.0,
    "Sub Pay Score": 33.33333333333333,
    "Overall Value Score": 51.64942241683104,
    "Median Home Price per Sq Ft": 242,
    "Price per Sq Ft Score": 78.15384615384616,
    "Sub Pay Housing Power": 1.0,
    "Count Notes": "Uses Plano ISD 2026-27 new-hire certified teacher schedule because that current public schedule was available; verify if you want strict 2025-26 comparability. NCES total schools used; Texas Tribune campus counts shown in source.",
    "Source URL": "https://www.pisd.edu/employment/join-our-team/new-hire-salary-schedule-2026-2027 ; https://schools.texastribune.org/districts/plano-isd/ ; https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4835100 ; https://www.redfin.com/city/30868/TX/Plano/housing-market ; https://www.zillow.com/rental-manager/market-trends/plano-tx/ ; https://www.pisd.edu/employment/join-our-team/substitutes",
    "Last Verified": "2026-06-16",
    "Area": "Plano / North Dallas suburbs, TX",
    "Demographic Balance Note": "Top 3 groups reach 80%+",
    "Daily Sub Pay": 130,
    "Pre-Risk Overall Value Score": 51.64942241683104,
    "Work Environment Risk": "Stable / no current evidence",
    "Work Environment Multiplier": 1.0,
    "Work Environment Note": "No employment-stability penalty applied in this first-pass addition; verify with adopted budget, enrollment trend, board packets, and HR/union notices before final scoring.",
    "Stability Review Stage": "First-pass public-source screening; verify with adopted budget, board packets, audit/ACFR, enrollment trend, and union/HR notices before final scoring.",
    "Data Confidence": "Current public schedule is 2026-27; verify if you require same-year comparability."
  },
  {
    "District": "Galena Park ISD",
    "State": "TX",
    "Region": "Houston",
    "BA Start": 66575,
    "BA 5-Year": 71700,
    "BA 10-Year": 73200,
    "MA Start": 68575,
    "MA 5-Year": 73700,
    "MA 10-Year": 75200,
    "Median Home Price": 194134,
    "Median Rent": 1600,
    "Student-Teacher Ratio": 14.97,
    "Licensed Sub Pay": 125,
    "White %": 4.0,
    "Hispanic %": 82.3,
    "Asian %": 1.0,
    "Black %": 10.0,
    "Other %": 2.7,
    "Number of High Schools": 6,
    "Number of Middle Schools": 5,
    "Number of Elementary Schools": 15,
    "Other / Specialty Schools": 0,
    "Total Schools Counted": 26,
    "salarySchedule": {
      "Bachelor's": {
        "0": 66575,
        "1": 66875,
        "2": 67175,
        "3": 68600,
        "4": 68900,
        "5": 71700,
        "6": 72000,
        "7": 72300,
        "8": 72600,
        "9": 72900,
        "10": 73200
      },
      "Master's": {
        "0": 68575,
        "1": 68875,
        "2": 69175,
        "3": 70600,
        "4": 70900,
        "5": 73700,
        "6": 74000,
        "7": 74300,
        "8": 74600,
        "9": 74900,
        "10": 75200
      }
    },
    "Avg Start Salary": 67575.0,
    "Avg 10-Year Salary": 74200.0,
    "Avg Growth %": 0.09803921568627451,
    "Master's Premium": 2000,
    "Demographic Balance Score": 67.56,
    "Salary Level Score": 64.88888888888889,
    "Growth Score": 15.082956259426847,
    "Master's Premium Score": 13.333333333333334,
    "Salary Score": 42.301256913021625,
    "Affordability Score": 86.86928,
    "Student-Teacher Ratio Score": 66.86666666666666,
    "Sub Pay Score": 52.083333333333336,
    "Overall Value Score": 61.77779591955757,
    "Median Home Price per Sq Ft": 153,
    "Price per Sq Ft Score": 91.84615384615384,
    "Sub Pay Housing Power": 1.5625,
    "Count Notes": "Official 2025-26 new-hire guide lists salary by experience and master's stipend. Housing uses a first-pass blend of Redfin sale price and Realtor.com rent/listing data.",
    "Source URL": "https://resources.finalsite.net/images/v1750951951/galenaparkisdcom/jww1mosc7efiovvg7fwq/Compensation2025-2026-6.pdf ; https://schools.texastribune.org/districts/galena-park-isd/ ; https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4820250 ; https://www.redfin.com/city/7154/TX/Galena-Park/housing-market ; https://www.realtor.com/local/market/texas/harris-county/galena-park",
    "Last Verified": "2026-06-16",
    "Area": "Galena Park / east Houston, TX",
    "Demographic Balance Note": "Top 2 groups reach 80%+",
    "Daily Sub Pay": 125,
    "Pre-Risk Overall Value Score": 61.77779591955757,
    "Work Environment Risk": "Stable / no current evidence",
    "Work Environment Multiplier": 1.0,
    "Work Environment Note": "No employment-stability penalty applied in this first-pass addition; verify with adopted budget, enrollment trend, board packets, and HR/union notices before final scoring.",
    "Stability Review Stage": "First-pass public-source screening; verify with adopted budget, board packets, audit/ACFR, enrollment trend, and union/HR notices before final scoring.",
    "Data Confidence": "Rent input is first-pass because rental source coverage is thinner than for larger cities."
  },
  {
    "District": "Deer Park ISD",
    "State": "TX",
    "Region": "Houston",
    "BA Start": 63000,
    "BA 5-Year": 70500,
    "BA 10-Year": 78000,
    "MA Start": 63000,
    "MA 5-Year": 70500,
    "MA 10-Year": 78000,
    "Median Home Price": 272837,
    "Median Rent": 2000,
    "Student-Teacher Ratio": 14.17,
    "Licensed Sub Pay": 130,
    "White %": 23.0,
    "Hispanic %": 66.0,
    "Asian %": 2.0,
    "Black %": 6.0,
    "Other %": 3.0,
    "Number of High Schools": 2,
    "Number of Middle Schools": 4,
    "Number of Elementary Schools": 8,
    "Other / Specialty Schools": 0,
    "Total Schools Counted": 14,
    "salarySchedule": {
      "Bachelor's": {
        "0": 63000,
        "1": 64500,
        "2": 66000,
        "3": 67500,
        "4": 69000,
        "5": 70500,
        "6": 72000,
        "7": 73500,
        "8": 75000,
        "9": 76500,
        "10": 78000
      },
      "Master's": {
        "0": 63000,
        "1": 64500,
        "2": 66000,
        "3": 67500,
        "4": 69000,
        "5": 70500,
        "6": 72000,
        "7": 73500,
        "8": 75000,
        "9": 76500,
        "10": 78000
      }
    },
    "Avg Start Salary": 63000.0,
    "Avg 10-Year Salary": 78000.0,
    "Avg Growth %": 0.23809523809523808,
    "Master's Premium": 0,
    "Demographic Balance Score": 72.1,
    "Salary Level Score": 73.33333333333333,
    "Growth Score": 36.63003663003663,
    "Master's Premium Score": 0,
    "Salary Score": 53.15384615384615,
    "Affordability Score": 70.97304,
    "Student-Teacher Ratio Score": 72.2,
    "Sub Pay Score": 43.333333333333336,
    "Overall Value Score": 62.33845415384615,
    "Median Home Price per Sq Ft": 154,
    "Price per Sq Ft Score": 91.6923076923077,
    "Sub Pay Housing Power": 1.3,
    "Count Notes": "Official DPISD compensation page provides 2025-26 instructional/professional range rather than a detailed new-hire step table; salary progression entered as first-pass estimate within published min/mid/max range.",
    "Source URL": "https://www.dpisd.org/apps/pages/index.jsp?pREC_ID=1697247&type=d&uREC_ID=1567862 ; https://4.files.edl.io/534b/02/20/26/194807-9703d67d-bdec-48cd-88d6-613f9adb963b.pdf ; https://schools.texastribune.org/districts/deer-park-isd/ ; https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4816530 ; https://www.redfin.com/city/5059/TX/Deer-Park/housing-market ; https://www.zillow.com/home-values/4324/deer-park-tx/",
    "Last Verified": "2026-06-16",
    "Area": "Deer Park / southeast Houston, TX",
    "Demographic Balance Note": "Top 2 groups reach 80%+",
    "Daily Sub Pay": 130,
    "Pre-Risk Overall Value Score": 62.33845415384615,
    "Work Environment Risk": "Stable / no current evidence",
    "Work Environment Multiplier": 1.0,
    "Work Environment Note": "No employment-stability penalty applied in this first-pass addition; verify with adopted budget, enrollment trend, board packets, and HR/union notices before final scoring.",
    "Stability Review Stage": "First-pass public-source screening; verify with adopted budget, board packets, audit/ACFR, enrollment trend, and union/HR notices before final scoring.",
    "Data Confidence": "Salary progression is estimated from published range; verify exact schedule if available."
  },
  {
    "District": "Port Arthur ISD",
    "State": "TX",
    "Region": "Beaumont-Port Arthur",
    "BA Start": 55500,
    "BA 5-Year": 60500,
    "BA 10-Year": 60500,
    "MA Start": 56980,
    "MA 5-Year": 61980,
    "MA 10-Year": 61980,
    "Median Home Price": 154907,
    "Median Rent": 1331,
    "Student-Teacher Ratio": 13.19,
    "Licensed Sub Pay": 115,
    "White %": 3.0,
    "Hispanic %": 54.4,
    "Asian %": 2.0,
    "Black %": 39.0,
    "Other %": 1.6,
    "Number of High Schools": 2,
    "Number of Middle Schools": 2,
    "Number of Elementary Schools": 9,
    "Other / Specialty Schools": 2,
    "Total Schools Counted": 15,
    "salarySchedule": {
      "Bachelor's": {
        "0": 55500,
        "1": 58000,
        "2": 58000,
        "3": 58000,
        "4": 58000,
        "5": 60500,
        "6": 60500,
        "7": 60500,
        "8": 60500,
        "9": 60500,
        "10": 60500
      },
      "Master's": {
        "0": 56980,
        "1": 59480,
        "2": 59480,
        "3": 59480,
        "4": 59480,
        "5": 61980,
        "6": 61980,
        "7": 61980,
        "8": 61980,
        "9": 61980,
        "10": 61980
      }
    },
    "Avg Start Salary": 56240.0,
    "Avg 10-Year Salary": 61240.0,
    "Avg Growth %": 0.08890469416785206,
    "Master's Premium": 1480,
    "Demographic Balance Score": 66.27999999999999,
    "Salary Level Score": 36.08888888888889,
    "Growth Score": 13.677645256592625,
    "Master's Premium Score": 9.866666666666667,
    "Salary Score": 25.622731395362976,
    "Affordability Score": 96.46343999999999,
    "Student-Teacher Ratio Score": 78.73333333333333,
    "Sub Pay Score": 57.600801402454294,
    "Overall Value Score": 60.33876419874519,
    "Median Home Price per Sq Ft": 96,
    "Price per Sq Ft Score": 100,
    "Sub Pay Housing Power": 1.7280240420736288,
    "Count Notes": "First-pass entry. Official PAISD page links a Google Drive salary schedule that was not machine-readable here; starting salary / increase bands and master's stipend were taken from the district's public announcement and should be verified against the actual schedule before final ranking.",
    "Source URL": "https://www.paisd.org/departments/human-resources/teacher ; https://www.facebook.com/portarthurisd/photos/-big-news-from-paisd-20252026-pay-increase-new-teacher-starting-salary-55500-pay/1243011057838639/ ; https://schools.texastribune.org/districts/port-arthur-isd/ ; https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4835400&Search=2 ; https://www.redfin.com/city/35689/TX/Port-Arthur/housing-market ; https://www.zillow.com/home-values/13364/port-arthur-tx/ ; https://www.mykelly.com/job/10237246-substitute-teacher-port-arthur-isd-port-arthur-tx-united-states/",
    "Last Verified": "2026-06-16",
    "Area": "Port Arthur, TX",
    "Demographic Balance Note": "Top 2 groups reach 80%+",
    "Daily Sub Pay": 115,
    "Pre-Risk Overall Value Score": 60.33876419874519,
    "Work Environment Risk": "Stable / no current evidence",
    "Work Environment Multiplier": 1.0,
    "Work Environment Note": "No employment-stability penalty applied in this first-pass addition; verify with adopted budget, enrollment trend, board packets, and HR/union notices before final scoring.",
    "Stability Review Stage": "First-pass public-source screening; verify with adopted budget, board packets, audit/ACFR, enrollment trend, and union/HR notices before final scoring.",
    "Data Confidence": "Salary bands are first-pass from announcement; verify against official salary schedule."
  }
];

  const DISTRICT_GEO_ADDITIONS_V323 = {
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
  ]
};

  const DISTRICT_CONTEXT_ADDITIONS_V323 = {
  "Channelview ISD": {
    "cities": [
      "Channelview",
      "Houston east side",
      "Sheldon area"
    ],
    "zips": [
      "77530",
      "77015",
      "77049"
    ],
    "note": "East Houston-area district along the Ship Channel with comparatively low home prices and high Hispanic enrollment."
  },
  "Plano ISD": {
    "cities": [
      "Plano",
      "Richardson area",
      "Murphy",
      "Parker"
    ],
    "zips": [
      "75023",
      "75024",
      "75025",
      "75074",
      "75075"
    ],
    "note": "Large North Dallas suburban district with many campuses and higher local housing costs than many Houston-area districts."
  },
  "Galena Park ISD": {
    "cities": [
      "Galena Park",
      "Jacinto City",
      "Houston east side",
      "North Shore"
    ],
    "zips": [
      "77547",
      "77015",
      "77049"
    ],
    "note": "East Houston-area district including Galena Park and North Shore communities."
  },
  "Deer Park ISD": {
    "cities": [
      "Deer Park",
      "Pasadena area",
      "La Porte area"
    ],
    "zips": [
      "77536",
      "77571",
      "77505"
    ],
    "note": "Southeast Houston-area district near the Ship Channel with stable suburban/industrial context."
  },
  "Port Arthur ISD": {
    "cities": [
      "Port Arthur",
      "Groves area",
      "Sabine Pass area"
    ],
    "zips": [
      "77640",
      "77642",
      "77655"
    ],
    "note": "Golden Triangle district with low housing costs and a lower published teacher starting salary than the Houston-area additions."
  }
};

  function upsertDistricts(target, additions) {
    additions.forEach(addition => {
      const idx = target.findIndex(d => d && d.District === addition.District);
      if (idx >= 0) {
        target[idx] = Object.assign({}, target[idx], addition);
      } else {
        target.push(addition);
      }
    });
  }

  if (typeof DISTRICTS !== "undefined" && Array.isArray(DISTRICTS)) {
    upsertDistricts(DISTRICTS, NEW_DISTRICTS_V323);
  } else {
    window.NEW_DISTRICTS_V323 = NEW_DISTRICTS_V323;
    console.warn("DISTRICTS was not available when districts-additions-v323.js loaded.");
  }

  // Map/profile helpers. These update optional globals if your current app exposes them.
  // If your app stores geo/context data elsewhere, the core district rows still load correctly.
  try {
    if (typeof DISTRICT_GEO !== "undefined" && DISTRICT_GEO) {
      Object.assign(DISTRICT_GEO, DISTRICT_GEO_ADDITIONS_V323);
    }
  } catch (err) {
    window.DISTRICT_GEO_ADDITIONS_V323 = DISTRICT_GEO_ADDITIONS_V323;
  }

  try {
    if (typeof districtGeoContext !== "undefined" && districtGeoContext) {
      Object.assign(districtGeoContext, DISTRICT_CONTEXT_ADDITIONS_V323);
    }
  } catch (err) {
    window.DISTRICT_CONTEXT_ADDITIONS_V323 = DISTRICT_CONTEXT_ADDITIONS_V323;
  }

  window.TEACHER_VALUE_DISTRICT_ADDITIONS_VERSION = "v323";
})();
