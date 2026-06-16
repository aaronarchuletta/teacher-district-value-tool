# Teacher District Value v323 Add-District Update Instructions

This package adds five districts without changing your app behavior files:

- Channelview ISD
- Plano ISD
- Galena Park ISD
- Deer Park ISD
- Port Arthur ISD

## Files in this update

- `index.html` — your existing page structure with one added script line.
- `districts-additions-v323.js` — the new district data add-on file.
- `new_district_rows_v323.csv` — flat source/data rows for review.
- `new_districts_v323_data_workbook.xlsx` — workbook addendum for the five districts.
- `DISTRICT_ADD_UPDATE_INSTRUCTIONS.md` — this instruction file.

## Why this structure is easier

Do not replace `app.js`, `styles.css`, or `districts-data.js` for this update.

The new districts live in a separate file:

```html
<script src="districts-data.js"></script>
<script src="districts-additions-v323.js"></script>
<script src="app.js"></script>
```

That means future updates can usually be made by adding another `districts-additions-v###.js` file or editing this add-on file, while keeping the site functionality untouched.

## Local Mac steps

1. Open your main folder:

```text
District Value Website/teacher_value_site_working
```

2. Make a backup of your current local `index.html`:

```text
index_before_v323.html
```

To do that in Finder:
- Click `index.html` once.
- Press `Command + D` to duplicate it.
- Rename the duplicate to `index_before_v323.html`.

3. Copy these two files into `teacher_value_site_working`:

```text
index.html
districts-additions-v323.js
```

4. When Finder asks whether to replace `index.html`, choose replace only after you made the backup in Step 2.

5. Open `index.html` locally and search for one of the new districts, such as:

```text
Galena Park ISD
```

## GitHub update steps

1. Open your GitHub repository.

2. Upload this new file to the same level as `index.html`:

```text
districts-additions-v323.js
```

3. Replace the repo's `index.html` with the provided `index.html`.

Alternative manual edit: instead of replacing `index.html`, edit the existing GitHub `index.html` and add this line between `districts-data.js` and `app.js`:

```html
<script src="districts-data.js"></script>
<script src="districts-additions-v323.js"></script>
<script src="app.js"></script>
```

4. Commit the changes.

Suggested commit message:

```text
Add five Texas districts v323
```

5. Wait 1–3 minutes for GitHub Pages to refresh.

6. Test the live site with a cache-busting URL:

```text
?v=323
```

Example:

```text
https://your-github-pages-url/?v=323
```

## Rename your workbook on your computer

Keep your website folder named:

```text
teacher_value_site_working
```

Do not rename that folder.

For the Excel workbook, rename it to:

```text
district_value_workbook_v323_baseline.xlsx
```

Mac steps:
1. In Finder, click the Excel workbook once.
2. Press `Return`.
3. Type:

```text
district_value_workbook_v323_baseline.xlsx
```

4. Press `Return` again.

Important: keep the `.xlsx` ending.

## Data caution

This update is ready for website testing, but several salary inputs are first-pass:

- Plano ISD and Galena Park ISD have stronger schedule support.
- Channelview ISD, Deer Park ISD, and Port Arthur ISD should be re-verified against exact salary step tables before final public ranking or job-decision use.

