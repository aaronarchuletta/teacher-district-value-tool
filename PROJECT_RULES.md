# Teacher District Value Project Rules

## Stability and workflow
- Treat `teacher_value_prototype-322_locked_baseline.zip` as the locked baseline for this stage.
- Do not edit the locked baseline directly. Make changes only in a working copy.
- Keep `index.html`, `styles.css`, `districts-data.js`, `app.js`, and all `district-map-*.png` files together in the same GitHub Pages directory.
- Update `CHANGELOG.txt` after every meaningful website change.
- Create a new versioned zip after each confirmed working update.

## Scoring and workbook rules
- Do not change scoring formulas or scoring weights without explicit approval.
- The workbook is the scoring/source-of-truth file for formulas and data inspection.
- Only provide an updated Excel workbook when the workbook itself changes.
- Prototype-only layout or behavior changes should not create a new workbook.
- Sub Pay Score uses licensed daily sub pay × 20 ÷ median rent before normalization.

## Display rules
- Mobile and desktop should display selected salary as a dollar amount, not as a score.
- Salary labels should reflect the selected education level, such as Bachelor's Salary or Master's Salary.
- Sub pay should display as a daily dollar amount, using the pattern `$___/day`.
- Stability should display as text such as Stable, Moderate, Severe, etc., not as a point score.
- Filter headings should use a consistent all-caps gray format.
- Rent and home price slider readouts should show `Any` in black when unadjusted and blue after adjustment.

## Mobile behavior rules
- The mobile map should fill the viewport edge-to-edge.
- Mobile filter and district profile panels must be scrollable.
- Mobile pull-up results should remain usable with search, favorites, and district cards.
