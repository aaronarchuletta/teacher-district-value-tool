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

## Prototype 375 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=375` or `?v=375b`. This version completes the district Region label cleanup across all districts; scoring and workbook formulas are unchanged.

Prototype 375 note: Port Arthur ISD region label corrected to Port Arthur. No scoring or formula changes.

## Prototype 376 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=376` or `?v=376b`. This version updates the district profile 10-Year Growth tile rating scale only; scoring formulas, rankings, and workbook values are unchanged.

## Prototype 377 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=377` or `?v=377b`. This version aligns profile tile bars/ratings to stored workbook score fields that feed the Overall Value Score where available. No scoring formulas, rankings, workbook values, or district data were recalculated.


## Prototype 378 tile-to-overall scoring alignment
- Updated workbook/data scoring so Overall Value follows the current profile tile scales.
- Selected Salary Level Score now uses the dynamic career-stage salary bands.
- Growth Score now uses a 48% growth ceiling.
- Rent and mortgage salary-share scores now reach 100 at 25% of selected salary or lower.
- Recalculated Career Earnings, Housing Salary Power, Base Value, Overall Value, and ranks from the updated score fields.
- Browser title/cache-busting updated to Prototype 378.


## Prototype 381 dynamic filter-aligned scoring
- Website scoring now recalculates dynamically when education or experience filters change.
- Selected Salary Level Score, Career Earnings, Rent Salary Share, Mortgage Salary Share, Post-Rent Income, Housing Salary Power, Base Value, and Overall Value are recomputed in-browser from the selected salary for the active education/experience filter combination.
- Profile tile bars now follow those dynamic score fields.
- Removed the visible Housing Salary Power and Post-Rent Income profile tiles while keeping their underlying scoring contributions.
- Browser title and cache-busting links updated to Prototype 381.


## Prototype 381 - Post-rent income scoring ceiling
- Updated Post-Rent Income Score so $4,000+ monthly after median rent reaches 100 / Excellent.
- Score still floors at $2,500 monthly after median rent.
- Because Post-Rent Income remains a 10% component of Housing Salary Power, this affects Housing Salary Power, Base Value, Overall Value, and rankings in the workbook/dynamic website scoring.
- Visible Housing Salary Power and Post-Rent Income profile tiles remain removed from the profile display.
- Browser title/cache-busting updated to Prototype 381.

## Prototype 383
Upload the standard active website files and test with `?v=383`. This update splits the desktop profile school-count display into Middle Schools and High Schools tiles only; scoring and workbook data are unchanged.


## Prototype 384
Upload the standard active website files and test with `?v=384`. This update restores the Total Schools tile alongside Middle Schools and High Schools in the desktop profile, and removes the duplicate gray `% of Salary` subvalue under the Median Rent and Median Home Price dollar amounts. The green bar rating label remains. No scoring or workbook formulas changed.

Prototype 385
- Restored nearest-city district region labels on top of Prototype 384.
- Includes prior region cleanup such as Kern → Bakersfield, Clovis → Fresno, Chaffey → Ontario, Grossmont → San Diego, Saint Helena → East Santa Rosa, Tahoe-Truckee → Lake Tahoe, and Port Arthur ISD → Port Arthur.
- No scoring/formula/ranking/workbook changes.
- Website cache-busting updated to v385.


## Prototype 387 - Flagstaff pay update
- Updated Flagstaff Unified School District salary values using the official FUSD 2025-2026 Certified Salary Schedule link and Arizona Daily Sun base-pay report.
- Set BA/MA start to $53,700, BA/MA 5-year to $57,638, and BA/MA 10-year to $61,575; BA and MA remain equal because no separate master's lane was confirmed.
- Dynamic website scores/rankings will recalculate from the updated salary schedule.
- Browser title and cache-busting links updated to Prototype 387.

## Prototype 387 - Flagstaff master’s stipend correction
- Corrected Flagstaff Unified School District Master’s salary values to include the $800 master’s stipend shown on the 2025 salary schedule.
- Updated Flagstaff MA Start, MA 5-Year, MA 10-Year, Master’s Premium, growth/career scoring, overall value score, and source note.
- No scoring formula or scoring weight changes.
- Browser tab title and cache-busting links updated to Prototype 387.
