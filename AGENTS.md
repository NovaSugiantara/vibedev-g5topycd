# AGENTS.md

## Objective

Your responsibility is to build the application by following every project document in this repository.

Never start coding immediately.

Always read the documents in this exact order before making any implementation decision.

1. docs/PRD.md
2. docs/SRS.md
3. docs/DESIGN.md

The documents are cumulative.
Requirements in later documents refine previous ones rather than replace them.

---

# Development Rules

Always work incrementally.

Implement only a small, self contained feature before committing.

Each commit must satisfy all of the following:

• Working application
• No broken functionality
• No unfinished UI
• No placeholder implementation
• No console errors
• No obvious regression

---

# Commit Policy

Maximum patch size:

25 KB per commit

Never create large commits.

Preferred workflow:

Feature
→ Verify
→ Commit
→ Push
→ Continue

Every commit MUST be pushed immediately after it is created.

Do not accumulate multiple features before pushing.

Example workflow

- Create feature
- Test manually
- Commit
- Push
- Continue

---

# Code Quality

Prioritize

- readability
- maintainability
- simplicity
- consistency

Avoid

- duplicated logic
- dead code
- unnecessary abstraction
- premature optimization

Prefer small reusable functions.

---

# UI Rules

The application should feel intentional instead of AI generated.

Follow the Hallmark Design skill described in:

docs/DESIGN.md

Every screen should demonstrate

- strong hierarchy
- spacing rhythm
- alignment
- accessibility
- consistent typography
- thoughtful interaction
- subtle motion

Never generate generic "AI looking" layouts.

---

# Final Review

Before the final commit, review the project against these three judging categories.

## Problem Solving & Design

- Does the solution actually solve the user's problem?
- Is the UI intuitive?
- Does the interaction feel polished?
- Does the layout work well on mobile?

## Completeness

- Every requested feature exists
- Every feature works
- Edge cases handled
- Empty states handled

## Technical Craft

- Clean architecture
- Readable code
- Maintainable code
- No duplicated logic
- Responsive
- No console errors
- Semantic HTML
- Accessible where practical

Do not create the final commit until all three categories have been reviewed.
