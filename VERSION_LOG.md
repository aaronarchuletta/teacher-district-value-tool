
## 340 clean active-file reset
- Rebuilt the package using standard active filenames only: index.html, districts-data.js, app.js, and styles.css.
- districts-data.js now contains all 75 districts directly in the main DISTRICTS array.
- index.html loads districts-data.js?v=340 and app.js?v=340.
- This package is intended to remove confusion caused by older versioned data/app filenames remaining in GitHub.


## Prototype 341 clean map-coordinate fix
- Keeps standard active filenames: index.html, styles.css, districts-data.js, app.js.
- Fixes district map/count behavior by letting app.js use each district's lat/lng fields when a district is not in the older hard-coded DISTRICT_GEO lookup.
- This makes the 10 v336 districts appear in the map/count/search views and keeps all 75 districts active.
