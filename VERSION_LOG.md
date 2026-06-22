
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

## Prototype 368
- Replaced take-home-pay housing tile logic with selected salary share logic.
- Median Rent now displays the actual rent burden as a percent of selected salary, for example “33% of Salary.”
- Median Home Price now displays the estimated monthly mortgage payment as a percent of selected salary, for example “42% of Salary.”
- Removed the 75% take-home assumption from the website tile logic.
- Included revised Phase 1 workbook with clearer Housing Salary Share columns and formulas.
- Overall scoring formulas, district data, and rankings are unchanged.
- Bumped cache-busting references in index.html to v=368.

## Prototype 370 - Phase 2B scoring integration
- Integrated the latest Phase 2B workbook scoring values into districts-data.js.
- Selected Salary Level Score uses the softened $50k-$85k scale.
- Housing Salary Power Score is included and used as the table affordability/housing-power score.
- Salary-share display scoring now matches the Phase 2B scale: ≤20%=95, 20-25%=85, 25-30%=72, 30-35%=58, 35-40%=42, >40%=25.
- Rent Salary % Label and Mortgage Salary % Label are stored as numeric percentages for correct ascending/descending sorting.
- Ocean Springs sub pay is flagged as an unverified licensed/certified rate while preserving the workbook value.
- Browser tab title and cache-busting references updated to Prototype 370.
## Prototype 371 - Profile tile score scale update
- Changed the district profile salary tile rating/bar to use the softened raw Selected Salary scale: $50,000 = 0 and $85,000+ = 100.
- Median Rent and Median Home Price profile tile rating bars now reach full/Excellent when the estimated housing payment is 25% of selected monthly salary or lower.
- This is a website profile-tile display scoring update only; district data and workbook rankings were not recalculated.
- Browser tab title and cache-busting references updated to Prototype 371.



## Prototype 372 - Dynamic selected salary tile bands
- Updated the district profile selected salary tile to use career-stage salary bands instead of the simple $50k-$85k linear scale.
- Base scale for 0 years + Bachelor's: under $53k Very Low; $53k-$57k Low; $58k-$62k Fair; $63k-$69k Good; $70k-$74,999 Very Good; $75k+ Excellent.
- The salary tile benchmark shifts upward by $1,500 per selected experience year and by $4,000 when Master's is selected.
- Median Rent and Median Home Price tiles continue to reach full/Excellent at 25% of selected monthly salary or lower.
- Display-tile logic only; district data and workbook rankings were not recalculated.
- Browser tab title and cache-busting references updated to Prototype 372.

## Prototype 373 - District region naming cleanup
- Updated selected California district Region labels to reference the nearest big city / more familiar local market label.
- Kern High School District: Bakersfield.
- Clovis Unified School District: Fresno.
- Antelope Valley Union High School District: Antelope Valley.
- Tahoe-Truckee Unified School District: Lake Tahoe.
- Saint Helena Unified School District: East Santa Rosa.
- Grossmont Union High School District: San Diego.
- Chaffey Joint Union High School District: Ontario.
- No scoring formulas, district scores, tile logic, or workbook rankings changed.
- Browser tab title and cache-busting references updated to Prototype 373.

## Prototype 374 - Complete district region naming cleanup
- Reviewed all districts and updated Region labels to reference the nearest big city or nearest recognizable local market instead of broad region labels where needed.
- Examples include Los Angeles, Phoenix, Minneapolis, Chicago, Madison, Salt Lake City, Houston, Dallas, Washington DC, Jacksonville, Biloxi, Durham, and other nearest-city labels.
- Preserved the user-specified labels from Prototype 373, including Bakersfield, Fresno, Antelope Valley, Lake Tahoe, East Santa Rosa, San Diego, and Ontario.
- No scoring formulas, district scores, tile logic, workbook formulas, or rankings were changed.
- Browser tab title and cache-busting references updated to Prototype 374.

## Prototype 375 - Port Arthur region label correction
- Changed Port Arthur ISD region label from Beaumont-Port Arthur to Port Arthur.
- No scoring, formulas, tile logic, rankings, or workbook values changed.
- Browser tab title and cache-busting links updated to Prototype 375.

## Prototype 376 - 10-Year Growth tile rating scale
- Updated the district profile 10-Year Growth tile display scale only.
- Growth tile bar now reaches full at 48% 10-year salary growth.
- Tile labels now use these bands: under 20% Very Low; 20%-27% Low; 28%-35% Fair; 36%-41% Good; 42%-47% Very Good; 48%+ Excellent.
- No district data, workbook formulas, rankings, or overall scoring weights were changed.
- Browser tab title and cache-busting links updated to Prototype 376.

## Prototype 377 - Tile-to-overall alignment pass
- Updated district profile score tiles so tile bars/ratings use stored workbook score fields that feed the Overall Value Score where available.
- Salary tile now uses Selected Salary Level Score.
- 10-Year Growth tile now uses Growth Score.
- Master’s Premium tile now uses Master’s Premium Score.
- Median Rent and Median Home Price tiles now use Rent Salary Share Score and Mortgage Salary Share Score.
- Added Housing Salary Power, Post-Rent Income, and Demographic Balance profile tiles so more Overall Value Score components are visible.
- No district data, workbook formulas, scoring weights, or rankings were recalculated.
- Browser tab title and cache-busting links updated to Prototype 377.


## Prototype 378 tile-to-overall scoring alignment
- Updated workbook/data scoring so Overall Value follows the current profile tile scales.
- Selected Salary Level Score now uses the dynamic career-stage salary bands.
- Growth Score now uses a 48% growth ceiling.
- Rent and mortgage salary-share scores now reach 100 at 25% of selected salary or lower.
- Recalculated Career Earnings, Housing Salary Power, Base Value, Overall Value, and ranks from the updated score fields.
- Browser title/cache-busting updated to Prototype 378.


## Prototype 380 dynamic filter-aligned scoring
- Website scoring now recalculates dynamically when education or experience filters change.
- Selected Salary Level Score, Career Earnings, Rent Salary Share, Mortgage Salary Share, Post-Rent Income, Housing Salary Power, Base Value, and Overall Value are recomputed in-browser from the selected salary for the active education/experience filter combination.
- Profile tile bars now follow those dynamic score fields.
- Removed the visible Housing Salary Power and Post-Rent Income profile tiles while keeping their underlying scoring contributions.
- Browser title and cache-busting links updated to Prototype 380.


## Prototype 380 - Post-rent income scoring ceiling
- Updated Post-Rent Income Score so $4,000+ monthly after median rent reaches 100 / Excellent.
- Score still floors at $2,500 monthly after median rent.
- Because Post-Rent Income remains a 10% component of Housing Salary Power, this affects Housing Salary Power, Base Value, Overall Value, and rankings in the workbook/dynamic website scoring.
- Visible Housing Salary Power and Post-Rent Income profile tiles remain removed from the profile display.
- Browser title/cache-busting updated to Prototype 380.

## Prototype 381 - Selected Salary Level Score formula fix
- Replaced the Selected Salary Level Score workbook formula with a legacy Excel-compatible formula that does not use LET().
- Preserves the same dynamic salary band logic: base 0-year Bachelor's bands, +$1,500 per selected year, +$4,000 for Master's.
- No scoring weights, tile logic, district data, or housing formulas were changed.

## Prototype 383 desktop school-count tile split
- Replaced the desktop profile Schools Counted tile with Middle Schools and High Schools tiles.
- Uses existing Number of Middle Schools and Number of High Schools fields from districts-data.js.
- No scoring formulas, weights, rankings, workbook formulas, or district values changed.


## Prototype 384 desktop schools and affordability label cleanup
- Restored the desktop profile Total Schools tile while keeping the Middle Schools and High Schools tiles.
- Removed the duplicate gray `% of Salary` subvalue below Median Rent and Median Home Price dollar amounts.
- Kept the green affordability rating label/bar for rent and home price.
- No scoring formulas, rankings, district data, or workbook formulas changed.

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

## Prototype 392 - Unified rating colors and lower-band bar scaling
- Rebuilt from the current working prototype files provided by the user, preserving the standard active file structure and district map image files.
- Updated sortable district ranking score-box colors to use the fixed rating swatches instead of the relative Excel-style gradient.
- Updated Fair rating color to gold (#D39F10).
- Kept the values displayed in ranking boxes and district profile tiles unchanged.
- Kept profile tile bars visually simple: no dot marker, no visible segmented scale, and no tile legend.
- Updated profile tile bar visual scaling only: Very Low maxes at 20% of the bar, Low maxes at 40%, Fair at 70%, Good at 80%, Very Good at 90%, and Excellent at 100%.
- No workbook, district data, scoring formulas, scoring weights, or rankings were changed.
- Browser title and cache-busting references updated to Prototype 392.

## Prototype 395
- Kept Prototype 392/394 fixed rating swatch colors for sortable district ranking boxes.
- Changed Low and Very Low ranking score-box text to white for contrast.
- Overall score badge subheading is black on non-red backgrounds and white only on Low/Very Low red backgrounds.
- Default/no-selection district profile score badge now uses the platform Good green (#8ABB40).
- Kept sortable ranking scrollbar restoration from Prototype 394.
- No workbook, district data, formulas, scoring weights, or rankings changed.


## Prototype 396
- Added an always-visible in-app draggable scrollbar rail to the desktop sortable district rankings table, so users can click and drag even when the operating system hides native scrollbars.
- Kept Prototype 395 color and overall score subheading behavior.
- Updated browser title and cache-busting references to Prototype 396.
- No workbook, formulas, scoring weights, district data, or rankings changed.

## Prototype 397
- Removed the State Funding column from the sortable district rankings table.
- Changed the district profile tile header to "State Funding Per Student".
- Changed the State Funding Per Student tile value to display the dollar amount only, without the "/student" suffix.
- Kept scoring formulas, weights, district data, rankings, color behavior, and profile bar scaling unchanged.
- Updated browser title and cache-busting references to Prototype 397.
- Test with `?v=397`.

## Prototype 409
- Restored Prototype 397 sortable ranking column spacing after the Prototype 398 spacing experiment.
- Shifted only columns to the right of Final Value slightly right while keeping District, State, and Final Value anchored.
- Kept Demographic Balance readable and away from the custom rankings scrollbar.
- Extended the rankings header shading across the full table/scrollbar area.
- No workbook, formulas, scoring weights, district data, or rankings changed.


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


## Prototype 409
- Fixed doubled/stacked scrollbar in the sortable district rankings by using only the native table scrollbar and hiding the custom overlay rail.
- Kept Prototype 407 housing preference behavior and UI settings.
- No workbook, formulas, scoring weights, district data, or rankings changed.


Prototype 411 SoCal verification: rebuild uses the stable Prototype 409 layout files plus v410 vendor-audit data. It explicitly includes the 10 Southern California additions in districts-data.js and uses cache-busting ?v=411-socal-105.


Prototype 413 filter-match fix: generated salarySchedule objects for newly added CA/OK/FL districts and added an app.js fallback from Avg Start / Avg 10-Year salary fields, so these districts render as active matches on the map under default filters instead of gray no-match markers.
