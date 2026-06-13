Teacher district value prototype v211 — consolidated GitHub structure.

Live GitHub Pages files:
- index.html
- plotly.min.js
- maps/

Changes from v210:
- Removed separate data.js by embedding district data directly inside index.html.
- Moved district map images into a maps/ folder and updated map paths.
- Removed duplicate numbered HTML files and old README clutter from the live package.
- No district data, scoring formulas, scoring weights, rankings, or workbook values were changed.

GitHub update workflow:
- For most layout/text/filter/data updates, replace index.html only.
- For map image changes, replace the relevant file inside maps/.
- Keep plotly.min.js unless intentionally changing the charting library.
