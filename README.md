# Portfolio — Content Guide

This is a reference for editing the site's content without touching component code.
Everything you regularly update lives in the `content/` folder as markdown files.
Media (images/videos) goes in `public/`.

---

## Folder overview

```
portfolio/
  content/
    home.md          ← homepage scroll highlights
    projects.md       ← project index cards
    projects/          ← (reserved for future full project pages)
    blog.md            ← blog index posts
    blog/               ← (reserved for future full blog post pages)
    cv.md              ← CV: contact, experience, education, skills, references
  public/
    images/            ← all images referenced in markdown
    videos/            ← all videos referenced in markdown
  app/
    page.tsx            ← homepage (reads home.md + cv.md)
    projects/page.tsx     ← projects page (reads projects.md)
    blog/page.tsx          ← blog page (reads blog.md)
    components/             ← all the React components (don't need to touch these to add content)
  lib/
    parseHome.ts        ← parser for home.md
    parseProjects.ts      ← parser for projects.md
    parseBlog.ts            ← parser for blog.md
    parseCV.ts                ← parser for cv.md
```

You should only ever need to edit files inside `content/` and drop media into `public/`
for day-to-day updates. Editing `.tsx` files is only needed if you want to change layout/styling.

---

## 1. Homepage — `content/home.md`

Controls the full-screen scroll sections at the top of the homepage.

```markdown
---highlight---
media: /videos/formula.mp4
mediaType: video
side: right

Text about this section goes here...

---highlight---
media: /images/hackathon.jpg
mediaType: image
side: left

Text about this section goes here...
```

- `media` — path starting with `/videos/` or `/images/` (matches what's in `public/`)
- `mediaType` — `video` or `image`
- `side` — `left` or `right` (which side the media sits on; alternates the layout)
- The blank line after the fields, then everything below it, is the body text.
- Add a new highlight by copy-pasting a `---highlight---` block. Order in the file = order on the page.

---

## 2. Projects — `content/projects.md`

Controls the cards shown on the `/projects` page.

```markdown
---project---
title: SR-26 Wiring Harness
tag: Formula SAE
media: /images/harness.jpg
mediaType: image
slug: harness

Short description of the project...
```

- `tag` — must match one of the filter categories in `app/components/projectgrid.tsx`
  (currently: `Formula SAE`, `Hackathons`, `Research`)
- `slug` — used for the URL (`/projects/harness`) — lowercase, no spaces
- Clicking a card currently links to `/projects/[slug]` — that individual page isn't built yet,
  so new slugs will 404 until those pages are created.

---

## 3. Blog — `content/blog.md`

Controls the list on the `/blog` page.

```markdown
---post---
title: Why CAN bus architecture matters
date: 2025-01-15
readtime: 3
slug: can-bus-architecture
pinned: true
tags: motorsport, electronics
thumbnail: /images/can-bus.jpg

One-liner description of the post...
```

- `pinned: true` — shows the post as a featured card at the top instead of in the regular list
- `tags` — comma-separated, used for the filter row at the top of the blog page
- `thumbnail` — optional; only regular (non-pinned) posts show a thumbnail
- `readtime` — currently manual (you set the number yourself, it's not auto-calculated)
- Same as projects: `/blog/[slug]` pages aren't built yet, so new posts will 404 until built.

---

## 4. CV — `content/cv.md`

Five section types, each using a different delimiter. Order in the file doesn't matter for
sections (they always render Contact → Experience → Education → Skills → References), but the
order *within* a section (e.g. which experience comes first) is the order shown on the page.

### Contact
```markdown
---contact---
name: Bharatraj Elavarasan
email: elavara1@msu.edu
```

### Experience
Company header, then one or more `role:` blocks nested under it (for promotions/title changes
at the same company).

```markdown
---experience---
company: MSU Formula SAE
link: https://www.msuformularacing.com/

role: Low Voltage Power Lead
start: October 2024
end: Present
location: East Lansing, MI

Description of this specific role...

role: Electronics Team Member
start: January 2024
end: October 2024
location: East Lansing, MI

Description of the earlier role...
```

- The first `role:` block should come after a blank line following `company:`/`link:`.
- Add more roles at the same company by adding another `role:` block inside the same
  `---experience---` section (don't add a new `---experience---` delimiter unless it's a
  different company).
- Start a new `---experience---` block for each different company.

### Education
Same pattern as Experience — institution header, then `degree:` blocks.

```markdown
---education---
institution: Michigan State University
link: https://msu.edu

degree: Bachelor of Science, Electrical Engineering
start: 2023
end: Present
gpa: 4.0

Description of coursework, honors, etc...
```

### Skills
```markdown
---skills---
PCB Design (Altium, KiCad), CAN bus architecture, Embedded C, Python, MATLAB, Git
```
Just one comma-separated list, no sub-fields.

### References
```markdown
---reference---
name: Jane Doe
title: Professor · MSU
relationship: Faculty advisor for Formula SAE
```
Add one `---reference---` block per person. **Do not include their email/phone** — keep it to
name, title, and relationship only, for their privacy.

---

## 5. Adding media

Drop files directly into:
- `public/images/yourfile.jpg`
- `public/videos/yourfile.mp4`

Then reference them in markdown as `/images/yourfile.jpg` or `/videos/yourfile.mp4`
(no `public` in the path — Next.js serves that folder's contents from the root automatically).

---

## 6. After editing content

1. Save the markdown file.
2. If the dev server is running (`npm run dev`), the change appears automatically at `localhost:3000`.
3. To publish: commit and push.

```bash
git add .
git commit -m "update content"
git push
```

Vercel auto-deploys on every push to `main`.

---

## 7. Things that still require code changes (not just markdown)

- Adding a new project filter tag → edit the `tags` array in `app/components/projectgrid.tsx`
- Individual project pages (`/projects/[slug]`) → not yet built
- Individual blog post pages (`/blog/[slug]`) → not yet built
- Site-wide colors/fonts → `app/globals.css`
- Nav bar links/socials → `app/components/navbar.tsx`
