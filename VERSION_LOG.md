
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

## Prototype 355
- Removed the Affordability tile from the mobile district detail/profile card to reduce confusion with Salary vs Rent.
- Desktop profile tiles and district data were unchanged.
- Bumped cache-busting references in index.html to v=355.

## Prototype 356
- Changed the State Funding tile icon color to Dark Gold (#8C7535).
- Increased the size of the desktop profile tile icon circles slightly for improved visibility.
- Bumped cache-busting references in index.html to v=356.

## Prototype 357
- Added more desktop breathing room on the left and right edges of the app.
- Tightened visible map rankings table column spacing so the Demographic Balance header has room to display fully.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=357.

## Prototype 359
- Rebuilt from the last stable package to correct the prior package issue.
- Corrected desktop edge spacing with stronger selectors that apply to the actual layout.
- Corrected desktop ranking table column sizing using the actual #districtTable selectors.
- Gave Demographic Balance more room and allowed the full two-line label to display.
- Removed the internal mouse-wheel scrolling behavior from the desktop ranking table by letting the page scroll instead of the ranking panel.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=359.

## Prototype 360
- Shifted and centered the desktop map/ranking/profile content away from the fixed left rail.
- Tightened the center desktop cards so users scan less from far left to far right.
- Increased ranking score pill width so Salary Growth % values can remain on one line.
- Changed the sortable district ranking to show about 10 rows at a time, with internal scrolling for more rows.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=360.

## Prototype 361
- Matched the bottom district profile/map section width to the desktop cards above it.
- Evened out the sortable district ranking score columns so the spacing before Demographic Balance matches the rest.
- Kept the 10-row ranking scroll behavior from Prototype 360.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=361.

## Prototype 362
- Corrected the bottom district profile/map section so the two bottom cards sit inside the same centered width as the cards above.
- Reset the bottom profile and district map cards to share the parent grid instead of each trying to use full card width.
- Changed the desktop sortable district ranking to render only the first 10 rows after sorting/filtering.
- Removed internal table scrolling so users use the page scrollbar/sidebar area to move down the page.
- Evened all sortable ranking score columns, including the Sub Pay to Demographic Balance spacing.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=362.

## Prototype 363
- Stretched the bottom district profile/map section farther right to line up more closely with the sortable ranking card above.
- Restored the internal scrollbar on the sortable district ranking.
- Changed ranking scroll behavior so wheel/trackpad gestures over the ranking table move the page instead of scrolling the ranking; the ranking itself scrolls by dragging its scrollbar.
- Restored the full sortable ranking rows inside the scrollable table.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=363.

## Prototype 364
- Removed the Region column from the desktop sortable district ranking table to reduce total table width.
- Rebalanced the sortable ranking table as a 10-column layout with more room for score columns.
- Kept the ranking scrollbar behavior from Prototype 363: users drag the scrollbar to scroll the table; wheel/trackpad gestures move the page.
- Kept scoring, workbook data, rankings, and formulas unchanged.
- Bumped cache-busting references in index.html to v=364.

## Prototype 365
- Pulled the right edge of the desktop sortable district rankings card left so it aligns with the other cards below.
- Matched the overall desktop width of the rankings section to the lower card layout.
- Kept the drag-only scrollbar behavior for the rankings table (wheel/trackpad gestures move the page; the table scrolls by dragging the scrollbar).
- No workbook, scoring, formulas, or district data changes.
- Bumped cache-busting references in index.html to v=365.

## Prototype 366
- Renamed the profile score guide title from "Score Guide" to "Overall Score Guide" on desktop and mobile.
- Changed Median Rent and Median Home Price tile rating labels to housing-cost language:
  - Very Low Cost, Low Cost, Good Cost, Moderate Cost, High Cost, Very High Cost.
- Kept the same affordability score/color direction: greener means lower housing cost, redder means higher housing cost.
- No workbook, scoring, formulas, or district data changes.
- Bumped cache-busting references in index.html to v=366.

## Prototype 367
- Changed Median Rent and Median Home Price tile labels from generic housing-cost labels to take-home-share labels:
  - Very Low Take-Home Share
  - Low Take-Home Share
  - Moderate Take-Home Share
  - High Take-Home Share
  - Very High Take-Home Share.
- Median Rent now rates median monthly rent as a share of estimated monthly take-home pay.
- Median Home Price now estimates a monthly principal-and-interest mortgage payment using 20% down, 30-year fixed, 7% interest, then rates that payment as a share of estimated monthly take-home pay.
- Estimated take-home pay uses 75% of the selected annual salary.
- This is a profile tile display-label change only; workbook data, scoring formulas, and rankings were unchanged.
- Bumped cache-busting references in index.html to v=367.
