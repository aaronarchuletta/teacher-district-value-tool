
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
