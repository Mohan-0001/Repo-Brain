# Repo Brain — site

This repository is the static site for Repo Brain, a marketing/demo page that
explains how a repo-scoped shared memory layer for Claude Code can work using
Cognee. It is built as plain HTML, CSS, and JavaScript with no build step.

## What this repo contains
- `index.html` — the main landing page.
  - Hero section: "Your repo remembers."
  - Problem section: explains that coding agents currently start every session
    from zero.
  - How it works: outlines the Claude Code hook pipeline and two hook files,
    `recall-context.mjs` and `remember-decision.mjs`.
  - Lifecycle verbs: remember(), recall(), improve(), forget().
  - Architecture section: documents the repo files that implement the memory
    lifecycle.
  - Setup section: platform-specific setup steps for macOS/Linux and Windows.
- `about.html` — builder bio page for Mohan.
- `assets/style.css` — site styling.
- `assets/script.js` — interactive tab switching and copy button behavior.
- `assets/logo.svg` — site logo.

## What the site says
The landing page describes Repo Brain as:
- a shared knowledge graph scoped to the repo,
- built on Cognee and Claude Code hooks,
- that automatically recalls prior decisions from other developers' agent
  sessions,
- and prunes deleted-file memory through a git hook.

The page also describes the repo architecture as including:
- `.claude/settings.json` — Claude Code hook wiring,
- `.claude/hooks/recall-context.mjs` — recall hook,
- `.claude/hooks/remember-decision.mjs` — remember hook,
- `lib/cognee-client.mjs` — Cognee API wrapper,
- `lib/repo-id.mjs` — repo-scoped dataset naming,
- `scripts/forget-deleted-files.mjs` + `scripts/post-commit.sh` — delete-based
  forget hook.

The about page presents the builder as:
- Mohan, a B.Tech CSE student,
- focused on MERN and agentic AI systems,
- with project experience in hackathons and multi-agent systems.

## Run locally
Open `index.html` directly in a browser, or serve the folder with a static
server.

```bash
cd repo-brain-site
npx serve .
```

Then open the local URL shown by the server.

## Deploy
This is a plain static site. Deploy to Vercel or any static host.

### Vercel CLI
```bash
npm install -g vercel
cd repo-brain-site
vercel
```

Accept the defaults: no build command, output directory `.`.

### Vercel Dashboard
1. Push the repo to GitHub.
2. Add a new Vercel project.
3. Import the repo.
4. Select `Other` / static.
5. Leave build command empty and set output directory to `.`.

## Customize the content
- Update the clone examples in `index.html` if the GitHub repo or folder name
  changes.
- Update `about.html` with your real contact or GitHub URL.
- Replace the placeholder GitHub button URL in both pages if needed.
- Edit `assets/style.css` or `assets/script.js` to change visuals or interactions.

## Notes
- This repository is the front-end site only. It does not include the actual
  Cognee hook implementations or backend services.
- The site is meant to explain the concept and setup of Repo Brain, not to
  execute the memory pipeline directly from the browser.
