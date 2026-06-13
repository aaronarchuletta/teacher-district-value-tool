Teacher district value prototype v213 — flat image GitHub structure.

Live GitHub Pages files:
- index.html
- district-map-alief-isd.png
- district-map-eanes-isd.png
- district-map-jordan-district.png
- district-map-katy-isd.png
- district-map-leander-isd.png
- district-map-los-angeles-unified.png
- district-map-portland-public-schools.png

Changes from v212:
- Removed embedded base64 map images because they can break or be unreliable in some browser/GitHub setups.
- Kept district data embedded directly in index.html, so there is still no separate data.js file.
- Removed the maps/ folder and placed all map PNGs at the same level as index.html.
- Uses Plotly from CDN, so no local plotly.min.js file is required.
- No district data, scoring formulas, scoring weights, rankings, or workbook values were changed.

GitHub workflow:
- Upload these files at the repository root, beside each other.
- For most future updates, replace only index.html.
- Only re-upload map PNG files when a map is added or changed.
- After uploading, use a cache-busting URL such as ?v=213.
