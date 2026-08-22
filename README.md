# Rajan Lamichhane — Portfolio

Personal portfolio and resume site for Rajan Lamichhane, robotics & mechatronics engineer
based in Pokhara, Nepal. Live at **[www.rajan-lamichhane.com.np](https://www.rajan-lamichhane.com.np)**.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Animation | Framer Motion |
| Type | Space Grotesk (display) · Inter (body) · JetBrains Mono (spec labels) |
| Hosting | GitHub Pages (static export, custom domain via `public/CNAME`) |

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run typecheck
```

## Project layout

```
app/
  layout.tsx          root layout, fonts, metadata, no-flash theme script
  page.tsx            section composition
  globals.css         design tokens (light + dark) and utilities
  components/         Nav, Hero, About, Projects, Experience,
                      Achievements, Contact, Footer + primitives
lib/content.ts        every string on the site, typed — edit copy here
public/               static assets, resume PDF, CNAME
legacy/               the previous hand-written HTML/CSS build, kept for reference
```

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) — projects, timeline, achievements,
skills, contact details, stats. No copy is hardcoded in components, so text changes never
require touching layout code.

Project illustrations are hand-drawn blueprint SVGs in
[`app/components/ProjectArt.tsx`](app/components/ProjectArt.tsx), keyed by project `id`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static export and
publishes `./out` to GitHub Pages. Set **Settings → Pages → Source** to *GitHub Actions*.
