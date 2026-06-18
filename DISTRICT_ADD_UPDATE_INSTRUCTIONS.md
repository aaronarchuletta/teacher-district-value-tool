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

## Prototype 371 upload
Upload the contents of this ZIP to the GitHub repo root, replacing matching files. Test with `?v=371` or `?v=371b`.

Changes: salary profile tile uses softened $50k-$85k scale; Median Rent and Median Home Price profile bars are full/Excellent at 25% of selected salary or lower.
