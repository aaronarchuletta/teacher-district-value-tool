
## 340 clean active-file reset
- Rebuilt the package using standard active filenames only: index.html, districts-data.js, app.js, and styles.css.
- districts-data.js now contains all 75 districts directly in the main DISTRICTS array.
- index.html loads districts-data.js?v=340 and app.js?v=340.
- This package is intended to remove confusion caused by older versioned data/app filenames remaining in GitHub.


## Prototype 341 clean map-coordinate fix
- Keeps standard active filenames: index.html, styles.css, districts-data.js, app.js.
- Fixes district map/count behavior by letting app.js use each district's lat/lng fields when a district is not in the older hard-coded DISTRICT_GEO lookup.
- This makes the 10 v336 districts appear in the map/count/search views and keeps all 75 districts active.

## 342 Kern High School District salary correction
- Corrected Kern High School District salary values using uploaded KHSD 2025-26 Certificated Base Salary Schedule.
- Mapped Bachelor's to Class I without masters and Master's to Class III with masters for the simplified prototype model.
- Corrected the Master's + 1 year value from the prior rough estimate to $71,426.
- Updated Kern salary score and overall value score; no scoring weights changed.
- Browser tab title updated to Prototype 342.


## Prototype 343 candidate additions
- Added 10 candidate districts for first-pass value scoring.
- No scoring weight changes.
- Test with `?v=343`.


## Prototype 344 - Salary-to-rent profile salary tile
- Changed the district profile salary tile rating/bar to use a local salary-to-rent ratio instead of the blended Salary Score.
- The displayed dollar amount remains the selected Bachelor's or Master's salary.
- Salary-to-rent score uses selected annual salary divided by 12, then divided by median monthly rent.
- Overall scoring weights and district data were not changed.

## Prototype 345 desktop map wheel-zoom fix
- Disabled mouse wheel / trackpad scroll zoom on the desktop USA map.
- Map zoom is now controlled by the Leaflet + and - buttons while keeping drag/pan behavior and mobile touch zoom intact.
- No district data, workbook values, or scoring weights changed.

## Prototype 346 - Master’s premium audit correction pass
- Updated Alief ISD salary values to include the 2025-2026 Teacher Retention Allotment (TRA) because Alief’s compensation handbook states the approved beginning teaching salary is $66,500.
- Alief BA/MA start, 5-year, and 10-year values, salary scores, affordability score, pre-risk overall, overall value score, and rank were recalculated.
- Master’s premium remains $500 for Alief because the 2025-2026 schedule shows Master’s as $500 above Bachelor’s at each listed experience level.
- Barbers Hill ISD and Glendale Union HSD were not changed in this package because the current accessible 2025-2026 Barbers Hill schedules do not show a separate master’s column, and the current GUHSD certified schedule is behind a Google Doc view that still needs direct extraction before changing values.
- No scoring weights were changed.


## Prototype 347 GUHSD salary schedule correction
- Corrected Glendale Union High School District using the uploaded 2025-2026 Certified Salary Schedule.
- BA maps to the BA column; Master's maps to BA+30 / MA.
- Updated GUHSD BA/MA start, 5-year, 10-year values, Master's Premium, salary scores, affordability-linked values, overall value score, and rank.
- No scoring weights were changed.
- Browser tab title and cache-busting links updated to Prototype 347.


## Prototype 348 - Master’s Premium tile rating scale
- Changed the district profile Master’s Premium tile rating/bar to use a clearer dollar-based display scale.
- New tile labels: $0 = None; $1–$2,499 = Low; $2,500–$4,999 = Fair; $5,000–$7,499 = Good; $7,500–$9,999 = Very Good; $10,000+ = Excellent.
- This is a profile display/rating-scale change only; district salary values, workbook data, and scoring weights were not changed.
- Browser tab title and cache-busting links updated to Prototype 348.


## Prototype 349 state funding context
- Added State Funding Context using FY2024 Census current spending per pupil by state.
- Overall Value now applies a 5% state funding context factor: previous overall × 95% + state funding score × 5%.
- Added State Funding Context Score, State Current Spending Per Pupil, rating, and source fields to districts-data.js.
- Added State Funding tile to district profile display.
- No salary values or existing salary/rent/source fields were changed in this version.


## Prototype 350 State Funding tile color fix
- Updated State Funding Context profile tile colors to use the State Funding label scale directly.
- Fair now displays with the fair/orange treatment instead of inheriting a red color from the underlying numeric score.
- Display-only fix; no data, workbook, scoring weights, or rankings changed.

## Prototype 352 color update
- Replaced all Excellent tile color values with PMS 347 green (#0a843d).
- Updated Salary and 10-Year Growth profile tile icon colors to #0a843d.
- No district data, scoring weights, or rankings changed.
- Browser tab title and cache-busting links updated to Prototype 352.

## Prototype 353 color and icon system update
- Applied the updated rating color palette: Excellent #0A843D, Very Good #489D46, Good #8ABB40, Fair #BF5700, Low #C8102E, Very Low #9E1B32.
- Updated profile tile icon colors for Salary/Growth/Master’s Premium, Affordability, Class Size, Stability, Sub Pay, State Funding, and Demographics.
- Updated profile tile icon artwork for both mobile and desktop, including Master’s Premium graduation cap, State Funding building, Sub Pay hand/coin, Stability shield/check, and Class Size seating-grid icon.
- Browser tab title and cache-busting links updated to Prototype 353.
- No district data, workbook formulas, scoring weights, or rankings were changed.

## Prototype 354
- Updated general profile tile rating thresholds to support Very Low (0–39) and Low (40–59).
- Changed Fair rating color to Bright Gold (#D39F10).
- Updated Sub Pay icon artwork to the approved hand-with-dollar design.
- Updated Demographics icon artwork to match the approved generated example.
- Bumped cache-busting references in index.html to v=354.
