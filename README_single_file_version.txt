Teacher district value prototype v212 — single-file GitHub version.

Upload only this file to GitHub Pages:
- index.html

Changes from v211:
- Embedded all district map images directly inside index.html.
- Removed the need for the maps/ folder.
- Removed the need for a separate data.js file.
- Uses Plotly from the official Plotly CDN, so plotly.min.js does not need to be uploaded.
- No district data, scoring formulas, scoring weights, rankings, or workbook values were changed.

GitHub workflow:
- Replace only index.html for normal updates.
- After uploading, open the live site with a cache-busting version tag such as ?v=212.
