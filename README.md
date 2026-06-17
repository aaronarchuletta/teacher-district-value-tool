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


## Prototype 347 GUHSD salary schedule correction
- Corrected Glendale Union High School District using the uploaded 2025-2026 Certified Salary Schedule.
- BA maps to the BA column; Master's maps to BA+30 / MA.
- Updated GUHSD BA/MA start, 5-year, 10-year values, Master's Premium, salary scores, affordability-linked values, overall value score, and rank.
- No scoring weights were changed.
- Browser tab title and cache-busting links updated to Prototype 347.
