Stable prototype file structure

Upload all files in this folder to the same GitHub Pages directory.
Do not upload only index.html; it depends on styles.css, districts-data.js, app.js, and the map image files.

To test the latest upload on mobile, use a cache-busting URL such as:
index.html?v=325

Files:
- index.html: page structure
- styles.css: visual layout and responsive styles
- districts-data.js: district data
- app.js: app behavior and filtering
- CHANGELOG.txt: version notes
- district-map-*.png: district map images

Prototype 325 package: includes five Texas district additions plus the mobile/desktop growth display update.


Prototype 344 note: profile salary tile now rates the displayed salary against local median rent rather than the blended Salary Score.

Prototype 345: disables mouse wheel/trackpad scroll zoom on the USA map so desktop zoom is controlled by the + and - buttons. No workbook/scoring changes.

## Prototype 346

Prototype 346 applies the confirmed Alief ISD salary audit correction. It includes the 2025-2026 Teacher Retention Allotment in Alief salary values, recalculates Alief scores/rank, and preserves the Prototype 345 desktop map wheel-scroll zoom fix. No scoring weights changed.


## Prototype 348 GUHSD salary schedule correction
- Corrected Glendale Union High School District using the uploaded 2025-2026 Certified Salary Schedule.
- BA maps to the BA column; Master's maps to BA+30 / MA.
- Updated GUHSD BA/MA start, 5-year, 10-year values, Master's Premium, salary scores, affordability-linked values, overall value score, and rank.
- No scoring weights were changed.
- Browser tab title and cache-busting links updated to Prototype 348.


Prototype 349: adds a 5% State Funding Context factor based on FY2024 Census current spending per pupil by state.


## Prototype 350 State Funding tile color fix
- Updated State Funding Context profile tile colors to use the State Funding label scale directly.
- Fair now displays with the fair/orange treatment instead of inheriting a red color from the underlying numeric score.
- Display-only fix; no data, workbook, scoring weights, or rankings changed.

## Prototype 352 color update
- Replaced all Excellent tile color values with PMS 347 green (#0a843d).
- Updated Salary and 10-Year Growth profile tile icon colors to #0a843d.
- No district data, scoring weights, or rankings changed.
- Browser tab title and cache-busting links updated to Prototype 352.


## Prototype 353
Color and profile tile icon system update. Replace index.html, app.js, and styles.css at minimum if applying through GitHub Desktop.

## Prototype 370 - Phase 2B scoring integration
- Integrated the latest Phase 2B workbook scoring values into districts-data.js.
- Selected Salary Level Score uses the softened $50k-$85k scale.
- Housing Salary Power Score is included and used as the table affordability/housing-power score.
- Salary-share display scoring now matches the Phase 2B scale: ≤20%=95, 20-25%=85, 25-30%=72, 30-35%=58, 35-40%=42, >40%=25.
- Rent Salary % Label and Mortgage Salary % Label are stored as numeric percentages for correct ascending/descending sorting.
- Ocean Springs sub pay is flagged as an unverified licensed/certified rate while preserving the workbook value.
- Browser tab title and cache-busting references updated to Prototype 370.

## Prototype 373 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=373` or `?v=373b`. This version only updates selected district Region labels; scoring and workbook formulas are unchanged.

## Prototype 374 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=374` or `?v=374b`. This version completes the district Region label cleanup across all districts; scoring and workbook formulas are unchanged.
