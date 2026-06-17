# Prototype 340 clean upload instructions

This package resets the site back to the standard active filenames:

- index.html
- styles.css
- districts-data.js
- app.js

The 75 districts are inside `districts-data.js` directly.

Upload the contents of this folder to the GitHub repo root and choose **Replace** for matching files.

After committing, test with:

`?v=340`

Important: older files with versioned names can stay in GitHub, but the site should no longer use them because `index.html` points to the standard files above.


## Prototype 341 clean map-coordinate fix
- Keeps standard active filenames: index.html, styles.css, districts-data.js, app.js.
- Fixes district map/count behavior by letting app.js use each district's lat/lng fields when a district is not in the older hard-coded DISTRICT_GEO lookup.
- This makes the 10 v336 districts appear in the map/count/search views and keeps all 75 districts active.
