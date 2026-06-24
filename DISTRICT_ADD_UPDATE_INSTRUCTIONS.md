# Teacher District Value Prototype 344 Update Instructions

This package adds 10 high-value candidate districts for first-pass scoring.

## Added districts
- Hobbs Municipal Schools, NM
- Farmington Municipal Schools, NM
- Carlsbad Municipal Schools, NM
- Chaffey Joint Union High School District, CA
- Antelope Valley Union High School District, CA
- Grossmont Union High School District, CA
- Clear Creek ISD, TX
- Pearland ISD, TX
- Anoka-Hennepin Schools, MN
- Osseo Area Schools / ISD 279, MN

## Notes
- No scoring weights were changed.
- Several entries are first-pass values and should be audited before final public claims.
- Upload the contents of this ZIP to the GitHub repository root.
- Test the live site with `?v=343`. If caching persists, try `?v=343b`.


Prototype 344 upload note: upload the standard active files and test with ?v=344. This is a display logic update only; district data/scoring weights are unchanged.

## Prototype 345

This package disables mouse wheel/trackpad scroll zoom on the desktop USA map. Use the map's + and - buttons for zooming. No district data or scoring values changed.

Upload the contents of this ZIP to your existing GitHub repository, replace matching files, commit, and test the live site with `?v=345`.


## Prototype 348 GUHSD salary schedule correction
- Corrected Glendale Union High School District using the uploaded 2025-2026 Certified Salary Schedule.
- BA maps to the BA column; Master's maps to BA+30 / MA.
- Updated GUHSD BA/MA start, 5-year, 10-year values, Master's Premium, salary scores, affordability-linked values, overall value score, and rank.
- No scoring weights were changed.
- Browser tab title and cache-busting links updated to Prototype 348.


Prototype 348 note: Master’s Premium tile uses the new dollar-based display rating scale. Upload the standard active website files and test with ?v=348.


## Prototype 349 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=349` or `?v=349b`.


## Prototype 350 State Funding tile color fix
- Updated State Funding Context profile tile colors to use the State Funding label scale directly.
- Fair now displays with the fair/orange treatment instead of inheriting a red color from the underlying numeric score.
- Display-only fix; no data, workbook, scoring weights, or rankings changed.

## Prototype 352 color update
- Replaced all Excellent tile color values with PMS 347 green (#0a843d).
- Updated Salary and 10-Year Growth profile tile icon colors to #0a843d.
- No district data, scoring weights, or rankings changed.
- Browser tab title and cache-busting links updated to Prototype 352.

## Prototype 370 - Phase 2B scoring integration
- Integrated the latest Phase 2B workbook scoring values into districts-data.js.
- Selected Salary Level Score uses the softened $50k-$85k scale.
- Housing Salary Power Score is included and used as the table affordability/housing-power score.
- Salary-share display scoring now matches the Phase 2B scale: ≤20%=95, 20-25%=85, 25-30%=72, 30-35%=58, 35-40%=42, >40%=25.
- Rent Salary % Label and Mortgage Salary % Label are stored as numeric percentages for correct ascending/descending sorting.
- Ocean Springs sub pay is flagged as an unverified licensed/certified rate while preserving the workbook value.
- Browser tab title and cache-busting references updated to Prototype 370.

## Prototype 372 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=372` or `?v=372b`.

Changes: salary profile tile uses softened $50k-$85k scale; Median Rent and Median Home Price profile bars are full/Excellent at 25% of selected salary or lower.


## Prototype 372 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=372` or `?v=372b`.

## Prototype 373 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=373` or `?v=373b`. This version only updates selected district Region labels; scoring and workbook formulas are unchanged.

## Prototype 375 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=375` or `?v=375b`. This version completes the district Region label cleanup across all districts; scoring and workbook formulas are unchanged.

Prototype 375 note: Port Arthur ISD region label corrected to Port Arthur. No scoring or formula changes.

## Prototype 376 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=376` or `?v=376b`. This version updates the district profile 10-Year Growth tile rating scale only; scoring formulas, rankings, and workbook values are unchanged.

## Prototype 377 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=377` or `?v=377b`. This version aligns profile tile bars/ratings to stored workbook score fields that feed the Overall Value Score where available. No scoring formulas, rankings, workbook values, or district data were recalculated.


## Prototype 381 tile-to-overall scoring alignment
- Updated workbook/data scoring so Overall Value follows the current profile tile scales.
- Selected Salary Level Score now uses the dynamic career-stage salary bands.
- Growth Score now uses a 48% growth ceiling.
- Rent and mortgage salary-share scores now reach 100 at 25% of selected salary or lower.
- Recalculated Career Earnings, Housing Salary Power, Base Value, Overall Value, and ranks from the updated score fields.
- Browser title/cache-busting updated to Prototype 381.


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

## Prototype 384
Upload the standard active website files and test with `?v=383`. This update splits the desktop profile school-count display into Middle Schools and High Schools tiles only; scoring and workbook data are unchanged.


## Prototype 384 upload
Upload the standard active website files and test with `?v=384`. This update restores Total Schools in the desktop profile and removes duplicate rent/home `% of Salary` subtext under the dollar amount.

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
- Kept sortable ranking scrollbar restoration from Prototype 394.
- No workbook, district data, formulas, scoring weights, or rankings changed.



## Prototype 396
- Added an always-visible in-app draggable scrollbar rail to the desktop sortable district rankings table.
- Kept Prototype 395 color and overall score subheading behavior.
- Test with `?v=396`.
- No workbook, formulas, scoring weights, district data, or rankings changed.

## Prototype 439 — Combined Waco/map/region fixes with Licensure page
- Rebuilt from Prototype 417 Waco/map/region data and behavior.
- Preserved the 9 Waco-area district additions.
- Preserved map-viewport sortable rankings and New Mexico map dots.
- Preserved nearest-city/local-market Region labels.
- Merged in the Licensure Process by State full-page app view, navigation, state dropdown, checklist behavior, and styles from the uploaded licensure package.
- No scoring formulas, scoring weights, or workbook methodology changed.
- Test with ?v=439-combined-waco-licensure.

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


Prototype 461 — Hiring Access profile tile
- Removed the Class Size / Student-Teacher Ratio tile from desktop and mobile district profiles.
- Added Hiring Access immediately after State Funding Per Student in the profile tile grid.
- Hiring Access uses preliminary state-level defaults only for UT, CA, CO, AZ, TX, NM, and NV; all other states display Not Available.
- Hiring Access is display-only and does not affect Overall Value Score, scoring weights, filters, map behavior, rankings, or workbook methodology.
