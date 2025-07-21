# Specification – UI/UX & Functional Requirements

## Target Audience
* **Primary Users:** Practising CPAs (1-10 years experience) and small-to-medium businesses seeking affordable bookkeeping.
* **Secondary Users:** Licensed tax attorneys who monetize expertise through content.

The majority of users are professionals who value clarity, stability, and trust.

---

## Visual Design Principles
1. **Professional & Familiar** – Aesthetic inspired by QuickBooks and Intuit products: clean whites, muted accent colours, generous whitespace.
2. **Hierarchical Clarity** – One dominant action per screen, predictable navigation sidebar, and breadcrumb trails for deep pages.
3. **Accessibility** – WCAG 2.2 AA compliance for colour contrast and keyboard navigation.
4. **Consistency** – Use a unified component library (Shadcn + Tailwind preset) across all views.

---

## Colour Palette (WCAG-Safe)
| Usage | Hex | Notes |
|-------|-----|-------|
| Primary | `#2363AA` | Buttons, active states |
| Secondary | `#1B4E7A` | Adjacent secondary actions |
| Accent / Success | `#2E8540` | Success indicators |
| Accent / Warning | `#E3A008` | Warning badges |
| Neutral 900-50 | `#0F172A` – `#F8FAFC` | Text & backgrounds |

---

## Typography
* **Sans-Serif:** `Inter` (system fallback: `Arial`, `Helvetica Neue`)
* **Font Scale:** 14 – 32 px using Tailwind `text-sm` → `text-4xl` utilities.

---

## Layout Specifications
0. **Viewport Breakpoints** – Same as Tailwind default (`sm`, `md`, `lg`, `xl`, `2xl`).
1. **Left Sidebar (250 px)** – Navigation, search, role switcher.
2. **Top Bar (56 px)** – Breadcrumb, CTAs, user menu.
3. **Content Area** – Max-width 1200 px, centred on ≥`lg`.

---

## Interaction Patterns
* **Dialogs** – Sized `md` (480 px) by default, larger (`lg`) for content heavy forms.
* **Tables** – Sticky header, sortable columns, pagination > 25 rows.
* **Toast Notifications** – Non-intrusive bottom-right; auto-dismiss 5 s.
* **Form Validation** – Inline, above the field, red text + icon.

---

## Functional Scope for MVP
1. **Account & Role Management** – Separate flows for Lawyers, CPAs, and Business Accounts, with role-based dashboards.
2. **Knowledge Base** – Versioned articles authored by Lawyers, searchable by keyword and tax category.
3. **Marketplace** – Businesses can post projects; CPAs can bid & negotiate.
4. **Secure Messaging** – End-to-end encrypted chat among all roles.
5. **Payment Escrow** – Stripe-based milestone escrow release.

Features marked with (*) are optional stretch goals and may be toggled off behind a feature flag.

---

## Non-Functional Requirements
* **Performance** – Time-to-Interactive < 2 s on broadband.
* **Reliability** – 99.9 % monthly uptime SLA.
* **Scalability** – Multi-tenant Postgres + Horizontal compute scaling.
* **Security** – SOC 2 Type II roadmap; all PII encrypted at rest using AES-256.

---

## Open Questions
1. Will CPAs require state-specific guidance filtering at launch?
2. Do we support hourly billing models besides fixed-price escrow?
3. How do we gatekeep lawyer onboarding to ensure quality?

Track these items in the product backlog. 