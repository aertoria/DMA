# Code Description & Conventions

This document captures the agreed-upon engineering practices so that both **human developers** and the **AI assistant** produce consistent, maintainable code.

> "Optimised for *readability* first; cleverness last" – Team Principle

---

## 1 · Project Stack
| Layer | Tech | Notes |
|-------|------|-------|
| Front-End | React 18 + TypeScript / Vite | Located in `client/` with Tailwind & Shadcn-UI component library. |
| Back-End | Node 18 + Fastify | Code lives in `server/`. Uses Drizzle for SQL generation over Postgres. |
| Shared | Zod schemas | Reside in `shared/` and imported by both ends via path alias. |
| Tooling | ESLint, Prettier, Vitest | Pre-commit via Husky; CI runs linter + tests. |

---

## 2 · Zoning Markers & Risk Markers
We employ **inline markers** to tell the AI how much autonomy it has inside a given file or function.

```ts
#@ai safe
```
* The AI may refactor, optimise, or extend this block **autonomously**. Large edits and automatic commits allowed.

```ts
#@ai human req
```
* The file/function is **high-risk** (security, complex business logic, or heavy side-effects). The AI must create a **proposal** (PR or code diff) and request explicit human approval before changes.

> Marker Placement: Always place the marker **immediately above** the top-level element (file header or function) it governs.

### 2.1 Risk Categories
| Category | Examples | Marker |
|----------|----------|--------|
| Data-Loss | Migrations, destructive queries | `human req` |
| Security  | Auth, encryption, secrets | `human req` |
| Low Risk  | Pure UI, utility functions | `safe` |

---

## 3 · Cursor Rules Recap
1. **Readability Is King** – Optimise for clarity; favour descriptively named variables over brevity.
2. **No One-Off Hacks** – Implement features generically when plausible.
3. **Verify Before Finalise** – Every commit must pass lint, build, and unit tests.

These rules apply to *all* contributors, human or AI.

---

## 4 · Commit & PR Etiquette
* **Atomic Commits** – One logical change per commit.
* **Conventional Commits** – e.g. `feat: add escrow release endpoint`.
* **PR Checklist** – Tests added/updated, docs updated, linter passes, risk marker respected.

---

## 5 · Directory Guidelines
| Dir | Responsibility |
|-----|----------------|
| `client/` | Presentational & stateful components, hooks, pages. |
| `server/` | HTTP routes, business logic, data access. |
| `shared/` | Types & validation shared across layers. |
| `docs/` | Living documentation (incl. **this** file). |

---

## 6 · Testing Strategy
* **Unit Tests (Vitest)** – Functions & hooks.
* **Integration Tests (Playwright)** – Critical user flows.
* **CI** – Runs on every PR; blocks merge if any stage fails.

---

## 7 · Example Markup
```tsx
// src/hooks/use-taxes.ts
#@ai safe
export const useTaxes = () => { /* ... */ }
```

```ts
// server/routes/payment.ts
#@ai human req
// Critical escrow logic; changes require review.
```

---

**Keep this document up-to-date as conventions evolve.** 