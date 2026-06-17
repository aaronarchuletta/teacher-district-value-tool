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
