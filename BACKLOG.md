# Redesign backlog — autonomous queue

Working file for the /loop session. Delete before merging.
Rule: one item at a time, build + screenshot-verify, then commit and push.

## Ground rules
- Verify in a real browser every time. Measure computed styles; never trust a
  screenshot alone for geometry, and never trust a screenshot alone for colour.
- Restart `npx vite preview --port 4173 --strictPort` if it is not answering.
- Every ambiguous call: make it, then log it in DECISIONS.md with a revert note.
- Never touch `legacy/`. Never push to `origin` (no write access) — push to `fork`.
- prefers-reduced-motion must stay honoured for anything added.
- Do not invent facts about the team, sponsors, or outreach numbers.

## Queue

### 1. Team → editorial bento (cosmos.so)
Break the two-column block into an asymmetric bento: one large mission cell,
three pillar cells of unequal weight, stat cells. Hover-reveal, not static.

### 2. Services → large interactive cards
Sharp and Telemark as full-width interactive surfaces with image/metadata
reveal on hover. Currently the weakest section on the page.

### 3. Contact → full-bleed with motion
Full-bleed closing section. Keep the copy-email interaction; make it feel like
an ending rather than another band.

### 4. Outreach → labelled season timeline
Keep the no-numbers rule (RELATIVE_ONLY). Convert from a bare shape to a
timeline carrying real, non-numeric information: phases and milestones already
in the data. It must stop being decoration.

### 5. Page-load choreography
A short entrance sequence — nav, hero line, plate, readout — under 900ms total.
Must not delay LCP or fight the scroll reveals.

### 6. Cosmos-style hover-reveal on the roster
Photo desaturated at rest, colour + detail on hover. Keep the 3/4 crop and the
uniform 327px card height.

### 7. Fadhil quote placement
Keep Varun's quote on his roster card. Ensure no member quote renders adjacent
to the partners section or the "Support the team" CTA.

### 8. Sweep after each of the above
- 390 / 768 / 1024 / 1440 — no horizontal overflow, nothing overlapping
- contrast >= 4.5:1 on body text, 3:1 on large
- zero console errors
- `npm run build` clean

## Known open questions (do NOT guess; leave as-is and note)
- Roster headcount: data says 14; the old site claimed 24 and 48 elsewhere.
- Real outreach figures: none supplied. Chart stays shape-only.
- Sponsor tiers: none exist. Do not reintroduce ranking of any kind.
