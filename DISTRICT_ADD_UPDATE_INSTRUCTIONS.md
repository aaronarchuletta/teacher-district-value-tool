# Teacher District Value Prototype 336 Update Instructions

This package adds ten western-state candidate districts:

- Las Cruces Public Schools, NM
- Rio Rancho Public Schools, NM
- Gilbert Public Schools, AZ
- Queen Creek Unified School District, AZ
- Vail School District, AZ
- West Ada School District, ID
- Twin Falls School District, ID
- Washoe County School District, NV
- Kern High School District, CA
- Clovis Unified School District, CA

## How to update GitHub

1. Download and unzip the Prototype 336 complete package.
2. Upload the package contents into the same GitHub repository folder where your site files already live.
3. Choose Replace for matching files.
4. Commit the changes.
5. Test using `?v=336`.

## Notes

- `index.html` now loads `districts-data-v336.js?v=336` to avoid stale cached data.
- The browser tab title has been updated to Teacher District Value Prototype 336.
- The added district data is first-pass and should be verified against official step schedules, current sub pay, housing sources, and district-boundary assumptions before final public ranking claims.


## Prototype 337 note
This package forces the 75-district dataset to load from `districts-data-v337.js?v=337`. After uploading, test with `?v=337`.


## Prototype 338 - Integrated 75-district data fix
- Rebuilt the data file as a fully integrated `districts-data-v338.js` containing all 75 districts directly in the main DISTRICTS array.
- Removed reliance on post-load addendum upsert behavior for the 10-state expansion districts.
- Updated browser tab title and cache-busting links to Prototype 338.
