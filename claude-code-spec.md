# Ben Preston Website — Modification Spec

**Approach:** Modify the existing Frab codebase in place. Do not rebuild from scratch.

**Critical rule:** Before making any change, read the file you are about to modify in full. After each change, run `npm run build` and confirm zero errors before proceeding to the next change. Commit after each successful change with a descriptive message.

**Files you must NOT modify:**
- `src/components/TopographyLines.astro` — the background visuals. Do not touch this file under any circumstances.
- `src/components/Navigation.astro` — working as intended.
- `src/components/Footer.astro` — working as intended.
- `src/layouts/Base.astro` — working as intended.
- `src/content/config.ts` — working as intended.
- `src/content/field-notes/*.md` — all 17 markdown files. Do not modify content.
- `src/styles/global.css` — do not modify unless explicitly noted below.

---

## Change 1: Field Notes page — restore dark intro section

**File:** `src/pages/field-notes.astro`

The current Field Notes page has a minimal dark header showing only the "Field Notes" eyebrow text. It needs to be expanded to include the full intro text within the dark section, matching the visual treatment shown on the Inspiring deploy.

**What to change:**

The `fn-header` section currently contains only the eyebrow. Move the intro content (proposition text, body paragraphs) INTO the dark header section so they render on the dark background with light text. The transition paragraph ("Things I'm thinking about...") should sit below the dark section, on the light background, as a bridge into the card grid.

Replace the current `fn-header` and `fn-intro` sections with this structure:

```astro
<!-- ── DARK HEADER WITH INTRO ─────────────────────────────────────────── -->
<section class="fn-header">
  <TopographyLines id="topo-fn" theme="dark" />
  <div class="container topo-content fn-header__inner">
    <p class="fn-header__eyebrow">Field Notes</p>
    <p class="fn-header__lead reveal">The proposition that forms the foundation of my ideas and my work.</p>
    <div class="fn-header__body reveal-group">
      <p class="reveal">Our best science — across evolutionary biology, complexity science, ecology, embodied cognition, quantum physics — converges on the same finding: we are not separate from the world we inhabit. We are expressions of it. What we do to our context, we do to ourselves. This isn't fringe or poetic — it's mainstream science across multiple disciplines.</p>
      <p class="reveal">That understanding hasn't found its way through. Our behavioural patterns, habits, modes of governance and organising still operate as though the opposite were true. These notes explore various dimensions of why — the inherited mechanistic story, either/or thinking, the echo chamber, narrow definitions of value.</p>
    </div>
  </div>
</section>

<!-- ── ROOT + BRIDGE (light background) ───────────────────────────────── -->
<section class="fn-bridge">
  <div class="container fn-bridge__inner">
    <div class="fn-bridge__body reveal-group">
      <p class="reveal">At root, there's a tension built into what we are. We each have an individual ego-self — and its development is genuine and necessary. But many traditions recognise a second movement: re-situating that healthy ego within the interdependent reality of its context. We've largely forgotten how to do this, and our economy and social fabric actively disincentivise it. So we stay stuck — bouncing between polarisations of individual and collective interest rather than integrating them. That oscillation shows up everywhere: in our politics, our economics, our organisations, our relationships.</p>
      <p class="reveal">The reason we bounce between individualism and collectivism is that we treat them as competing claims — as though you have to pick a side. Multi-level selection theory dissolves that framing. It shows that selection operates at multiple levels simultaneously: what's adaptive for the individual and what's adaptive for the group are both real, both operative, both legitimate. The tension between them isn't a flaw — it's the engine of how complex living systems organise. It's always been there, at every scale.</p>
      <p class="reveal">That reframe is a critical move, because it means the task isn't choosing individual over collective or collective over individual. It's creating the conditions under which they align. My work is focused on creating those conditions, founded in the belief — backed by the Nobel Prize-winning work of Elinor Ostrom — that when we get the conditions right, groups that learn to work with the tension between self-interest and collective interest will consistently outperform those that deny or suppress either side.</p>
    </div>
    <p class="fn-bridge__transition reveal">Things I'm thinking about, working through, or want to share. Some of these are essays, some are conversations, some are just notes from the field.</p>
  </div>
</section>
```

**Styles to add** (in the `<style>` block of the same file — replace the existing `.fn-header` and `.fn-intro` styles):

```css
/* ── HEADER (dark, with premise + gap) ────────────────────────────── */
.fn-header {
  background: var(--color-charcoal);
  color: var(--color-text-stone);
  padding-top: calc(var(--nav-height) + var(--space-10));
  padding-bottom: var(--space-16);
  position: relative;
  overflow: hidden;
}

.fn-header__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-width: 680px;
}

.fn-header__eyebrow {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sage);
  font-weight: 500;
  margin-bottom: var(--space-8);
}

.fn-header__lead {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.015em;
  color: rgba(242, 237, 231, 0.90);
  margin-bottom: var(--space-8);
  line-height: 1.4;
}

.fn-header__body p {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  color: rgba(242, 237, 231, 0.65);
}

.fn-header__body p + p {
  margin-top: var(--space-6);
}

/* ── BRIDGE (light background, root + bridge text) ────────────────── */
.fn-bridge {
  background: var(--color-stone-soft);
  padding: var(--space-16) 0 var(--space-10);
  border-bottom: 1px solid rgba(45, 42, 38, 0.10);
}

.fn-bridge__inner {
  max-width: 680px;
}

.fn-bridge__body p {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  color: rgba(45, 42, 38, 0.75);
}

.fn-bridge__body p + p {
  margin-top: var(--space-6);
}

.fn-bridge__transition {
  margin-top: var(--space-10);
  color: rgba(45, 42, 38, 0.55);
  font-size: var(--text-base);
}
```

**Remove** the existing `.fn-intro`, `.fn-intro__inner`, `.fn-intro__lead`, `.fn-intro__body`, and `.fn-intro__transition` styles.

**Keep** all `.fn-grid-section`, `.fn-cards`, and related grid styles exactly as they are.

**Build and commit:** `npm run build` then `git add -A && git commit -m "Field Notes: restore dark intro section with proposition text"`

---

## Change 1b: Field Notes cards — expand inline instead of linking to individual pages

**File:** `src/pages/field-notes.astro`

Currently the cards are `<a>` tags linking to individual note pages. Change them to expand inline, revealing the full essay text below the excerpt when clicked.

**Step 1: Render all note content at build time.**

In the frontmatter, after `const notes = allNotes.sort(...)`, add:

```astro
// Render all note content at build time
const renderedNotes = await Promise.all(
  notes.map(async (note) => {
    const { Content } = await note.render();
    return { ...note, Content };
  })
);
```

Then use `renderedNotes` instead of `notes` in the template.

**Step 2: Replace the card markup.**

Replace the current `<a>` card with a `<div>` that contains the card header (clickable) and a hidden body section:

```astro
{renderedNotes.map(note => (
  <div class="fn-card" data-note={note.slug}>
    <button class="fn-card__header" aria-expanded="false">
      {note.data.tags && note.data.tags.length > 0 && (
        <div class="fn-card__tags">
          {note.data.tags.map((tag: string) => (
            <span class="fn-card__tag">{tag}</span>
          ))}
        </div>
      )}
      <h2 class="fn-card__title">{note.data.title}</h2>
      <p class="fn-card__excerpt">{note.data.excerpt}</p>
    </button>
    <div class="fn-card__body" hidden>
      <div class="fn-card__content">
        <note.Content />
      </div>
    </div>
  </div>
))}
```

**Step 3: Add a small client-side script** at the bottom of the file, before the closing `</Base>` tag:

```html
<script>
  document.querySelectorAll('.fn-card__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.fn-card');
      const body = card.querySelector('.fn-card__body');
      const isOpen = !body.hidden;
      
      // Close all other open cards
      document.querySelectorAll('.fn-card__body:not([hidden])').forEach(openBody => {
        if (openBody !== body) {
          openBody.hidden = true;
          openBody.closest('.fn-card').querySelector('.fn-card__header').setAttribute('aria-expanded', 'false');
          openBody.closest('.fn-card').classList.remove('is-open');
        }
      });
      
      // Toggle this card
      body.hidden = isOpen;
      btn.setAttribute('aria-expanded', String(!isOpen));
      card.classList.toggle('is-open', !isOpen);
      
      // Scroll card into view if opening
      if (!isOpen) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
</script>
```

**Step 4: Update card styles.** Replace the existing `.fn-card` styles with:

```css
/* ── CARD ────────────────────────────────────────────────────────────── */
.fn-card {
  background: var(--color-stone-soft);
  display: flex;
  flex-direction: column;
  min-height: 220px;
  transition: background var(--dur-base);
}

.fn-card:hover {
  background: var(--color-stone);
}

.fn-card.is-open {
  grid-column: 1 / -1;
  min-height: auto;
  background: var(--color-stone);
}

.fn-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-8);
  text-align: left;
  width: 100%;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  flex: 1;
}

/* Tags, title, excerpt styles — keep existing .fn-card__tags, .fn-card__tag, .fn-card__title, .fn-card__excerpt styles unchanged */

/* ── EXPANDED BODY ───────────────────────────────────────────────────── */
.fn-card__body {
  padding: 0 var(--space-8) var(--space-10);
}

.fn-card__content {
  max-width: 640px;
}

.fn-card__content :global(p) {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  margin-bottom: var(--space-6);
  color: rgba(45, 42, 38, 0.82);
}

.fn-card__content :global(p:first-child) {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  font-weight: 300;
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}
```

**Delete** `src/pages/field-notes/[slug].astro` — the inline expansion is now the only way to read a Field Note.

**Build and commit:** `npm run build` then `git add -A && git commit -m "Field Notes: cards expand inline, remove individual note pages"`

---

## Change 2: About page — replace watershed with editorial sections + sidebar

**File:** `src/pages/about.astro`

This is the largest change. Replace the entire watershed timeline, node triggers, sidebar panel, and associated JavaScript with a simple editorial layout. Each journey phase becomes a section with narrative text on the left and a compact "Relevant Projects" / "Relevant Qualifications" sidebar on the right.

**Keep unchanged:**
- The hero section (`v2-about-hero`) — keep exactly as is
- The Northern Ireland intro section (`v2-about-body`) — keep exactly as is
- The testimonial section (`ab-testimonial`) — keep exactly as is
- The `journeyPhases` and `presentCards` data arrays in the frontmatter — keep the data, change how it renders

**Remove entirely:**
- The `ab-watershed` section (SVG, nodes, triggers)
- The `ab-sidebar` aside element
- The `<script type="application/json">` phase data block
- The entire client-side `<script>` block (sidebar open/close, SVG stream drawing)
- All styles for: `.ab-watershed`, `.ab-ws__svg`, `.ab-ws__nodes`, `.ab-node`, `.ab-node__trigger`, `.ab-node__dot`, `.ab-node__label`, `.ab-node__peek`, `.ab-sidebar` and all sidebar sub-classes

**Replace with this HTML** (between the intro section and "The Present" cards):

```astro
<!-- ── JOURNEY SECTIONS ──────────────────────────────────────────────── -->
<section class="ab-journey">
  <div class="container">
    {journeyPhases.map(phase => (
      <div class="ab-phase reveal">
        <div class="ab-phase__main">
          <p class="ab-phase__label">{phase.label}</p>
          <h2 class="ab-phase__title">{phase.title}</h2>
          <p class="ab-phase__body">{phase.body}</p>
        </div>
        <div class="ab-phase__sidebar">
          {phase.projects.length > 0 && (
            <div class="ab-phase__sidebar-group">
              <p class="ab-phase__sidebar-label">Relevant Projects</p>
              <ul class="ab-phase__sidebar-list">
                {phase.projects.map(p => <li>{p}</li>)}
              </ul>
            </div>
          )}
          {phase.quals.length > 0 && (
            <div class="ab-phase__sidebar-group">
              <p class="ab-phase__sidebar-label">{phase.qualsLabel || 'Relevant Qualifications'}</p>
              {phase.qualsIntro && <p class="ab-phase__quals-intro">{phase.qualsIntro}</p>}
              <ul class="ab-phase__sidebar-list">
                {phase.quals.map(q => <li>{q}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

<!-- ── THE PRESENT ────────────────────────────────────────────────────── -->
<section class="ab-present-section">
  <div class="container">
    <h2 class="ab-present__heading">The Present</h2>
    <div class="ab-present__grid">
      {presentCards.map(card => (
        <div class="ab-present__card">
          <h3 class="ab-present__card-title">{card.heading}</h3>
          <p class="ab-present__card-body">{card.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**New styles** (replace all removed watershed/sidebar styles with these):

```css
/* ── JOURNEY SECTIONS ──────────────────────────────────────────── */
.ab-journey {
  background: var(--color-stone-soft);
  padding: var(--space-8) 0 var(--space-16);
}

.ab-phase {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--col-gap);
  padding: var(--space-12) 0;
  border-bottom: 1px solid rgba(45, 42, 38, 0.08);
}

.ab-phase:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .ab-phase {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

.ab-phase__label {
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--color-sage);
  font-weight: 500;
  margin-bottom: var(--space-3);
}

.ab-phase__title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  color: var(--color-ink);
  margin-bottom: var(--space-6);
}

.ab-phase__body {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  color: rgba(45, 42, 38, 0.82);
  max-width: 580px;
}

/* ── SIDEBAR ───────────────────────────────────────────────────── */
.ab-phase__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding-top: var(--space-10);
}

@media (max-width: 768px) {
  .ab-phase__sidebar {
    padding-top: 0;
    border-top: 1px solid rgba(45, 42, 38, 0.06);
    padding-top: var(--space-6);
  }
}

.ab-phase__sidebar-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.ab-phase__sidebar-label {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-sage);
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.ab-phase__quals-intro {
  font-size: var(--text-xs);
  font-style: italic;
  color: rgba(45, 42, 38, 0.55);
}

.ab-phase__sidebar-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.ab-phase__sidebar-list li {
  font-size: var(--text-xs);
  line-height: var(--leading-relaxed);
  color: rgba(45, 42, 38, 0.62);
  padding-left: var(--space-4);
  position: relative;
}

.ab-phase__sidebar-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-gold);
  opacity: 0.6;
}

/* ── THE PRESENT ───────────────────────────────────────────────── */
.ab-present-section {
  background: var(--color-stone-soft);
  padding: var(--space-16) 0 var(--space-24);
}

.ab-present__heading {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: var(--space-10);
}

.ab-present__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  max-width: 760px;
}

@media (max-width: 640px) {
  .ab-present__grid { grid-template-columns: 1fr; }
}

.ab-present__card {
  padding: var(--space-6);
  background: rgba(255, 252, 248, 0.92);
  border: 1px solid rgba(184, 149, 106, 0.18);
  border-radius: 2px;
}

.ab-present__card-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin-bottom: var(--space-3);
}

.ab-present__card-body {
  font-size: var(--text-sm);
  line-height: var(--leading-loose);
  color: rgba(45, 42, 38, 0.78);
}
```

**Also update `phasesJson`:** The serialized JSON is no longer needed. Remove the `const phasesJson = ...` line from the frontmatter. It was only used by the sidebar JavaScript which is being removed.

**Build and commit:** `npm run build` then `git add -A && git commit -m "About: replace watershed with editorial sections and practical sidebar"`

---

## Change 3: Projects page — tighten layout

**File:** `src/pages/projects.astro`

The current layout has a three-column grid: number | content | date. The date sits alone in a wide right column. Tighten this by bringing the date up next to the tag/title area and removing the third column.

**Replace the project article markup** with:

```astro
{projects.map(p => (
  <article class="v2-project reveal">
    <span class="v2-project__num">{p.num}</span>
    <div class="v2-project__content">
      <div class="v2-project__meta">
        <span class="v2-project__tag">{p.tag}</span>
        <span class="v2-project__years">{p.years}</span>
      </div>
      <h2 class="v2-project__title">{p.title}</h2>
      <p class="v2-project__body">{p.body}</p>
    </div>
  </article>
))}
```

**Update the project styles in `src/styles/global.css`** — find lines 524–559 (the `.v2-project` through the media queries) and replace them with:

```css
.v2-project {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: var(--space-8);
  padding: var(--space-12) 0;
  border-bottom: 1px solid rgba(45, 42, 38, 0.1);
  align-items: start;
}
.v2-project:first-child { border-top: 1px solid rgba(45, 42, 38, 0.1); }
.v2-project__num { font-family: var(--font-heading); font-size: var(--text-5xl); font-weight: 300; color: rgba(45, 42, 38, 0.1); line-height: 1; letter-spacing: -0.04em; }
.v2-project__content { display: flex; flex-direction: column; }
.v2-project__meta { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: var(--space-4); }
.v2-project__tag { font-size: var(--text-xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-sage); font-weight: 500; }
.v2-project__years { font-size: var(--text-sm); color: var(--color-text-muted); }
.v2-project__title { font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 300; letter-spacing: -0.02em; margin-bottom: var(--space-2); }
.v2-project__body { font-size: var(--text-base); color: rgba(45, 42, 38, 0.68); line-height: var(--leading-relaxed); }
@media (max-width: 640px) { .v2-project { grid-template-columns: 1fr; } .v2-project__num { display: none; } }
```

**Do NOT modify** the `.v2-projects-hero`, `.v2-projects-hero__heading`, or `.v2-project-list` styles above this section — they are correct.

**Remove** the `.v2-project__img-placeholder` and `.v2-project__img-placeholder::after` styles entirely (lines 537–556 in the current file). Also remove the image placeholder `<div>` from the markup in `projects.astro`.

**Build and commit:** `npm run build` then `git add -A && git commit -m "Projects: tighten layout, bring date inline with tag"`

---

## Change 4: Global cleanup

**File:** `src/layouts/Base.astro`
- Change the `<title>` tag from `{title} — Ben Preston (V2)` to `{title} — Ben Preston`

**File:** `src/styles/global.css`
- Search for any remaining "V2" debug labels or version indicators. If found, remove them.

**File:** `src/pages/field-notes.astro`
- Confirm the `navTheme="dark"` prop is set on the `<Base>` component (it already should be, since the page opens with a dark header).

**Build and commit:** `npm run build` then `git add -A && git commit -m "Remove V2 debug labels, clean up title"`

---

## Summary of changes by file

| File | Action |
|------|--------|
| `src/components/TopographyLines.astro` | **DO NOT TOUCH** |
| `src/components/Navigation.astro` | **DO NOT TOUCH** |
| `src/components/Footer.astro` | **DO NOT TOUCH** |
| `src/layouts/Base.astro` | Remove "(V2)" from title tag |
| `src/styles/global.css` | Update `.v2-project` styles only |
| `src/pages/field-notes.astro` | Change 1: dark intro section. Change 1b: inline card expansion |
| `src/pages/field-notes/[slug].astro` | **DELETE** (inline expansion replaces individual pages) |
| `src/pages/about.astro` | Replace watershed with editorial sections |
| `src/pages/projects.astro` | Tighten layout, bring date inline |
| `src/pages/index.astro` | **DO NOT TOUCH** |
| `src/pages/working-together.astro` | **DO NOT TOUCH** |
| `src/pages/contact.astro` | **DO NOT TOUCH** |
| `src/content/**` | **DO NOT TOUCH** |

---

## Working instructions

1. Make changes one at a time in the order listed above (Change 1, 1b, 2, 3, 4)
2. After EACH change: `npm run build` — must complete with zero errors
3. After each successful build: `git add -A && git commit -m "descriptive message"`
4. If a build fails, fix the error before proceeding. Do not move to the next change until the current one builds cleanly.
5. After all changes are complete: `npm run preview` and confirm each page renders.
