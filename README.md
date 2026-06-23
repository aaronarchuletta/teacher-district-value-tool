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

## Prototype 395
- Kept Prototype 392/394 fixed rating swatch colors for sortable district ranking boxes.
- Changed Low and Very Low ranking score-box text to white for contrast.
- Overall score badge subheading is black on non-red backgrounds and white only on Low/Very Low red backgrounds.
- Default/no-selection district profile score badge now uses the platform Good green (#8ABB40).
- Kept sortable ranking scrollbar restoration from Prototype 395.
- No workbook, district data, formulas, scoring weights, or rankings changed.



## Prototype 396
- Added an always-visible in-app draggable scrollbar rail to the desktop sortable district rankings table.
- Kept Prototype 395 color and overall score subheading behavior.
- Test with `?v=396`.
- No workbook, formulas, scoring weights, district data, or rankings changed.

## Prototype 397
- Removed the State Funding column from the sortable district rankings table.
- Changed the district profile tile header to "State Funding Per Student".
- Changed the State Funding Per Student tile value to display the dollar amount only, without the "/student" suffix.
- Kept scoring formulas, weights, district data, rankings, color behavior, and profile bar scaling unchanged.
- Updated browser title and cache-busting references to Prototype 397.
- Test with `?v=397`.

## Prototype 409
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=409`.

Changes: restored Prototype 397 sortable-ranking spacing, shifted only the columns right of Final Value slightly right, protected Demographic Balance from the scrollbar area, and extended the header shading to the rankings edge. No scoring, workbook, formula, data, or ranking changes.


## Prototype 409
- Reverted to the working Prototype 399-style column spacing after Prototype 409 caused clipped ranking columns.
- Filled the remaining header shading gaps without moving or resizing score columns.
- Fixed Class Size column color logic so identical displayed rounded ratios, such as 17:1, use the same color.
- The displayed ratio remains rounded.
- No workbook, scoring formulas, weights, district data, or rankings changed.


## Prototype 409
- Corrected Final Value / Overall Score coloring to use the Overall Score Guide thresholds while keeping the approved platform swatch colors.
- Final Value now uses a smooth gradient across the platform swatches: dark red below 40, red at 40, gold at 50, Good green at 60, Very Good green at 70, and Excellent green at 80+.
- Overall Score badges use the same swatch-based Overall Value color logic.
- Component columns continue using the regular component score scale.
- No workbook, formulas, scoring weights, district data, or rankings changed.
- Test with `?v=409`.


## Prototype 409
- Fixed the sortable district rankings scrollbar so only one visible in-app draggable scrollbar rail appears.
- Hid the native browser scrollbar inside the rankings table to prevent the doubled/stacked scrollbar look.
- Kept Prototype 406 housing preference behavior and all existing data/scoring formulas unchanged.
- Test with `?v=409`.


## Prototype 411 SoCal verification rebuild
This package preserves the stable Prototype 409 layout/files and replaces the data file with the v410 substitute-vendor audit dataset including the 10 Southern California additions.

Verified included districts:
- Victor Valley Union High School District
- Perris Union High School District
- Val Verde Unified School District
- Moreno Valley Unified School District
- San Jacinto Unified School District
- Hesperia Unified School District
- Apple Valley Unified School District
- Riverside Unified School District
- Corona-Norco Unified School District
- Santa Ana Unified School District

Test with index.html?v=411-socal-105 after upload.


## Prototype 412 local-testing fix

This package keeps the standard active file structure (`index.html`, `styles.css`, `districts-data.js`, `app.js`, and map images). It also includes `standalone_test.html`, which embeds CSS, district data, and app behavior into one file for local testing when you want to open a single HTML file directly.

For normal GitHub upload, upload all standard files together and test with `index.html?v=412-socal-verified`. For local single-file testing, open `standalone_test.html`.

Verified: `districts-data.js` contains 105 districts, including the 10 Southern California additions from the workbook.


Prototype 413 filter-match fix: generated salarySchedule objects for newly added CA/OK/FL districts and added an app.js fallback from Avg Start / Avg 10-Year salary fields, so these districts render as active matches on the map under default filters instead of gray no-match markers.

## Prototype 439 — Combined Waco/map/region fixes with Licensure page
- Rebuilt from Prototype 417 Waco/map/region data and behavior.
- Preserved the 9 Waco-area district additions.
- Preserved map-viewport sortable rankings and New Mexico map dots.
- Preserved nearest-city/local-market Region labels.
- Merged in the Licensure Process by State full-page app view, navigation, state dropdown, checklist behavior, and styles from the uploaded licensure package.
- No scoring formulas, scoring weights, or workbook methodology changed.
- Test with ?v=439-combined-waco-licensure.


## Prototype 440 — Illinois-style Licensure cards
- Combined the Waco district additions, visible-map ranking behavior, New Mexico map dots, and nearest-city region labels with the Licensure page package.
- Changed the selected-state title to “Become an Educator in [state]”.
- Reworked Licensure steps into Illinois-style numbered cards with a completion checkbox and expandable details/links.
- Replaced the “What describes you?” segmented buttons with card-style pathway choices.
- Fixed the Licensure page double-scrollbar behavior and cleaned up nav active-state highlighting so only the current section remains highlighted.
- No scoring formulas, scoring weights, or workbook methodology changed.

## Prototype 442 — Licensure route-card shadow fix
- Preserved the larger Illinois-style “What describes you?” pathway cards from Prototype 440.
- Removed only the 3D/drop-shadow bottom from those pathway cards.
- Updated the high school / college student icon to look closer to the Illinois reference while using the app blue.
- Kept Waco districts, visible-map rankings, New Mexico dots, restored region labels, and the licensure page work.
- No scoring formulas, weights, or workbook methodology changed.


## Prototype 443 — Licensure route-card icon/content fix
- Restored the larger Illinois-style route cards under “What describes you?” instead of the flattened version.
- Removed only the 3D/drop-shadow treatment from the route cards.
- Fixed the first route card so its label displays correctly and the student icon matches the Illinois-style seated student reference more closely.
- No scoring formulas, weights, district data, or workbook methodology changed.


## Prototype 444 — Licensure route card size/icon cleanup
- Restored the “What describes you?” route buttons to the prior normal-sized card layout.
- Kept the route cards flat by removing the 3D/drop-shadow treatment only.
- Removed the student icon from “I am a high school or college student.”
- Kept the licensed-out-of-state icon unchanged.
- No scoring formulas, weights, district data, or workbook methodology changed.


## Prototype 445 — Licensure route card and nav cleanup
- Kept the student route card layout consistent before and after selection.
- Removed the student icon visually while preserving the left icon space for a future illustration.
- Kept the licensed-out-of-state icon.
- Fixed main navigation active-state behavior so Map, Favorites, and Licensure do not stay highlighted together.
- No scoring formulas, weights, workbook values, or district data changed.


## Prototype 447 — Compact Licensure Step Cards
- Reworked Licensure steps into smaller square Illinois-style cards.
- Step details now render in a separate panel below the step grid, so the grid does not expand when a step is selected.
- Checkbox progress behavior is unchanged.
- No district scoring, formula, or workbook methodology changes.


## Prototype 448 — Illinois-style step spacing and licensure scroll/nav cleanup
- Refined licensure step cards to be smaller, more square, and centered rather than stretched across the full page.
- Adjusted number/text spacing inside each step card to better match the Illinois reference layout.
- Kept the selected step details/links in a separate panel below the step grid.
- Strengthened licensure page scrolling so only the licensure content area scrolls.
- Strengthened Map/Favorites/Licensure active-state handling so only the current page stays highlighted.
- No scoring formulas, district data, or workbook methodology changed.


## Prototype 450 — Licensure detail bullets
- Added Illinois-style bullet details inside the selected licensure step detail panel.
- Document-submission steps now explain transcript, out-of-state license, supplemental document, and follow-up requirements in more detail.
- Kept concise step-card titles and the separate detail/link panel below the step grid.
- No district data, scoring formulas, map behavior, region labels, or workbook methodology changed.


## Prototype 452 — Tennessee licensure detail cleanup
- Updated Tennessee Step 3 detail panel to use the exact transcript submission and professional-level license upload instructions requested.
- Removed duplicate/generic Tennessee document bullets from Step 3.
- Updated Tennessee Step 4 detail panel with TeachALL enrollment/pass instructions and TNCompass certificate upload instruction.
- Linked Tennessee Step 4 bullets to the Tennessee Literacy Success Act page and TeachALL Tennessee Early Literacy Assessment page.
- No district data, scoring formulas, map behavior, or region labels changed.


## Prototype 453 - Tennessee Early Literacy Assessment label cleanup
- Added "In TNCompass," before Tennessee Step 3 professional-level license upload instruction.
- Changed Tennessee Step 4 wording to consistently use "Tennessee Early Literacy Assessment" for the step/action.
- Removed the duplicate TeachALL source link from the "Pass the Tennessee Early Literacy Assessment" bullet while keeping official links on the surrounding source-specific instructions.
- No scoring, district data, map behavior, region labels, or workbook formulas changed.


Update in Prototype 455: Arizona Step 3 now mirrors the reciprocity document list more directly, and transcript wording was standardized across transfer-state document steps where institutions must send transcripts.

Prototype 456: Clarified Florida transcript wording so FASTER/SPEEDE are not presented as the only possible electronic transcript path; the detail now also references approved transcript services such as Parchment.

- Prototype 457: Clarified Florida Step 3 so teaching certificates are described as uploads to the Florida online certification account, while transcript wording still includes approved electronic transcript services such as Parchment.
