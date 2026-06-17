# Version Log

## 322 locked baseline
- Multi-file website baseline created from uploaded prototype files.
- Cleaned deployment filenames for GitHub Pages use.
- Added project rules file for stable future development.
- Preserved uploaded workbook and district map image assets.


## 323 Tahoe-Truckee Unified School District addition
- Added Tahoe-Truckee Unified School District, CA.
- Added 2025-26 salary schedule values from the uploaded TTUSD certificated salary schedule.
- Added substitute pay, demographics, school counts, housing values, stability note, and map coordinate.
- Updated workbook and districts-data.js only for the new district data; no scoring weights changed.


## 324 Filter results button behavior fix
- Fixed the filter overlay “See results” button so it switches the rankings table to the full filtered district list.
- The button now shows all districts matching the selected filters, ranked by Overall Value Score by default, instead of showing only districts currently visible in the map viewport.
- Kept the map Top Matches behavior separate so map browsing can still reflect visible map districts.
- No workbook, scoring formula, or district data changes.


Prototype 325 - Mobile growth tile and desktop ranking growth column
- Replaced the mobile district profile Sub Pay score tile with the 10-Year Growth score tile.
- Replaced the desktop sortable rankings Salary score column with Salary Growth %.
- Kept existing scoring formulas and district data unchanged.

## 326 Ranking display refinement
- Added color-scaled blocks to the desktop Salary Growth % column.
- Changed the desktop Class Size column display from point score to the actual student-teacher ratio, such as 11:1.
- Kept the underlying sorting/scoring data unchanged.


## 328 Rounded class size ratio display
- Updated the Class Size column/profile display to show rounded student-to-teacher ratios such as `11:1`.
- No workbook, scoring formula, or district data changes.


## 329 Class size ratio display fix
- Updated the desktop sortable rankings Class Size column to show the rounded student-to-teacher ratio, such as 11:1.
- Removed the point-score display from the Class Size column so the table shows the actual ratio instead of the score.

## 330 Class size color block fix
- Restored color-scaled score blocks around the Class Size column while keeping the displayed value as the rounded student-to-teacher ratio.
- No workbook, scoring formula, or district data changes.


## 331 Cache-bust class size display fix
- Kept the rounded class-size ratio inside the color-scaled score block.
- Added version query strings to local CSS/JS file references so GitHub Pages/browser cache loads the current files.


## Prototype 333 Ohio district additions
- Added Dublin City Schools, OH.
- Added Mariemont City Schools, OH.
- Updated browser tab title and cache-busting references to v333.


## 334 Cache-proof district data file
- Added a uniquely named district data file, districts-data-v334.js, loaded by index.html.
- This bypasses stale GitHub Pages/browser caching of districts-data.js.
- Confirms Dublin City Schools and Mariemont City Schools remain in the district data.


## 335 Ohio district map visibility fix
- Added map coordinates for Dublin City Schools, OH and Mariemont City Schools, OH.
- This fixes the issue where the districts were in the data file but did not appear in desktop visible-map rankings or map-based browsing.
- Updated browser tab title to Prototype 335 and refreshed cache-busting query strings.
