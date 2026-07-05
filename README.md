# Repo Brain — site

Static site, no build step. Two pages: `index.html` (product explainer +
full setup docs) and `about.html` (builder bio).

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
npx serve .
```

## Deploy to Vercel

**Option A — CLI (fastest):**
```bash
npm install -g vercel
cd repo-brain-site
vercel
```
Accept the defaults — Vercel auto-detects this as a static site (no
framework, no build command needed).

**Option B — Dashboard:**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import that repo.
3. Framework preset: "Other" / static. Leave build command empty,
   output directory as `.` (root).
4. Deploy.

## Before you deploy
- Replace the placeholder `https://github.com` links in `index.html` and
  `about.html` with your actual repo URL.
- Swap the `M` avatar initial in `about.html` for a real photo if you'd
  like — replace the `.avatar-inner` div with an `<img>` tag.
