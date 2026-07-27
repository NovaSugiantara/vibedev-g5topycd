# AGENTS.md — Battle-Tested Development Guide

---

## Objective

Build production-quality applications that score 90+ in competition judging.

Every rule here comes from real judge feedback. Follow all of them. Do not skip.

---

## Document Protocol

Read project documents in exact order before any implementation decision.

1. `docs/PRD.md` — problem, goal, user flow
2. `docs/SRS.md` — functional + non-functional requirements
3. `docs/DESIGN.md` — visual design principles

Documents are cumulative. Later requirements refine earlier ones, they do not replace them.

Never start coding before reading all three.

If any doc is missing, ask. Do not assume requirements.

---

## Development Rules

### 1. Incremental Delivery

- One small, self-contained feature per commit
- Each commit: working app, no broken functionality, no unfinished UI, no placeholder code, no console errors, no regression
- Max patch size: **25 KB** per commit (raw source sum of touched files)
- Commit → Verify → Push → Continue. Never accumulate features.
- If a change touches >25 KB raw source, split into multiple commits (max 2–3 files per commit)

### 2. User Flow First, Layout Second

Judge rule: _"UI urutan harus sesuai urutan kerja user, bukan urutan implementasi."_

- Map the user's step-by-step workflow before writing any HTML
- Arrange UI elements in the order the user interacts with them
- Every screen must answer: _"Apa yang harus saya lakukan pertama kali?"_
- Empty states must guide the user to the first action, not just say "No data"
- Test the flow: can a first-time user complete the task without guessing?

### 3. Every Destructive Action Needs a Safety Net

Judge rule: _"Tidak ada undo setelah delete = potongan poin terbesar."_

- **Delete** → always provide undo (toast with Undo button, 5s auto-dismiss minimum)
- **Batch operations** → confirmation dialog before execution
- **Irreversible changes** → confirmation + explain what will be lost
- Silent data loss is the #1 UX sin. Never let a single click destroy user data.

### 4. Separate Business Logic from Presentation

Judge rule: _"Computed properties campur kalkulasi dan display logic = score rendah."_

File structure for any project >1 page:
```
src/
  lib/          → Pure functions: calculations, formatting, validation
  components/   → UI components (presentation only, no business logic)
  composables/  → State management hooks
  tests/        → Test files
  types/        → Type definitions
```

For single-page projects, at minimum:
```
index.html     → HTML + CDN
style.css      → All styles
calc.js        → Pure calculation functions (no DOM, no framework)
app.js         → Framework glue (calls calc.js)
tests.html     → Test runner
```

**calc.js rules:**
- Every function is pure: same input → same output, no side effects
- No DOM access, no `this`, no framework dependencies
- Every function is independently testable
- All formatting, validation, and business logic lives here

**app.js / component rules:**
- Only calls calc functions and binds to template
- No inline calculations in template expressions
- No logic hidden in computed properties that should be in calc.js

Example:
```js
// ✅ calc.js — pure
export function calcTotal(skeins) {
  return skeins.reduce((s, v) => s + v.yards * v.count, 0)
}
export function getStatus(avail, target, count) { ... }
export function fmtYardage(n) { return n >= 0 ? `+${n}` : `${n}` }

// ✅ app.js — hanya panggil
computed: {
  totalAvailable() { return calcTotal(this.skeins) },
  statusInfo() { return getStatus(this.totalAvailable, this.targetYards, this.skeins.length) }
}
```

### 5. Input Validation Must Be Visible

Judge rule: _"Silent return saat validasi gagal = error tidak sampai ke user."_

Every validation failure must produce visible user feedback:

- **HTML**: `required`, `min`, `max`, `type` attributes as first line of defense
- **JS**: explicit checks before mutation, with user-facing error messages
- **Display**: error text visible near the offending input (not in console, not silent)
- **Edge cases**: `NaN`, negative numbers, empty strings, 0 values — all guarded
- **Defensive checks**: array index bounds, `findIndex` returns `-1`, `Number()` coerce

Never do `if (!val) return` without telling the user why.

### 6. Editing Mode Must Be Visually Distinct

Judge rule: _"Editing mode kurang visual distinction = user tidak sadar."_

- When an item enters edit mode: change background color, add accent border/ring
- Auto-focus the first input field on edit start
- Save/Cancel buttons must be prominent, not subtle
- Non-editing items should visually recede (lower opacity or muted)
- Use CSS transitions to make mode changes smooth (150–200ms)

### 7. Visual Hierarchy Guides the Eye

Judge rule: _"Tidak ada visual hierarchy = membingungkan."_

- Size, spacing, and color must differentiate primary vs secondary actions
- Most important information: largest, highest contrast, top of section
- Each section must have a clear label and purpose
- Don't give everything equal visual weight — the user should know what to look at first
- Use consistent spacing scale (4pt or 8pt), not arbitrary values

### 8. Tests Are Part of the Deliverable

Judge rule: _"Test file ada tapi tidak dianggap = test tidak terintegrasi."_

- Every pure function in calc.js needs at least one test per logical branch
- Test file must be runnable with a single command (or open-in-browser)
- Test output must clearly show "N/N passed" — visible at a glance
- Cover: normal cases, edge cases (0, null, empty, boundary), error cases
- Test file must be committed alongside source code, not added later

### 9. Defensive Programming

- Every user input: validate type, range, and format before use
- Array operations: check index exists before `splice` or assignment
- `findIndex` returns `-1` — handle it
- Async: handle loading, error, and empty states explicitly
- Never trust user input at trust boundaries

### 10. Session Architecture

- No backend, no auth, no persistence unless explicitly required
- All state in one reactive store (Vue data, Alpine x-data, etc.)
- No external API calls unless specified
- Every UI state must have: loading, empty, error, and success representations

---

## Commit Checklist

Before every commit, verify:

```
□ All features from PRD/SRS are present and working
□ Empty state guides first-time user
□ Destructive action has undo/confirm
□ Business logic is in pure functions (not in template/computed)
□ Input validation has visible error messages
□ Editing mode has distinct visual state
□ No console errors
□ No placeholder/incomplete UI
□ No regression from previous behavior
□ Test file updated (if logic changed)
□ Commit size < 25 KB raw source
```

---

## Final Review (Before Last Commit)

### Problem Solving & Design
- Does the UI match the user's mental model and workflow order?
- Can a first-time user complete the task without guessing?
- Every state: empty, editing, error, success — all handled?
- Destructive action has safety net?

### Completeness
- Every requested feature exists and works
- Edge cases handled: zero, empty, boundary, invalid input
- Error messages visible and helpful
- Empty states provide guidance

### Technical Craft
- calc.js (pure functions) separated from app.js (framework glue)
- No duplicated logic
- No magic numbers or hardcoded values without explanation
- Test file covers all calculation branches
- Responsive at 320px, 768px, 1024px
- Semantic HTML with proper landmarks
- Keyboard navigable (Tab through page)
- Color is never the sole indicator of state

Do not create the final commit until all three pass.
