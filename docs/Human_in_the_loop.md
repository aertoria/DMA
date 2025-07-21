# Human-in-the-Loop Development Process

This project embraces *continuous collaboration* between the engineering team and the AI assistant.  The workflow below ensures we ship high-quality features while preserving human oversight where it matters most.

---

## 1 · Key Actors
| Actor | Responsibility |
|-------|----------------|
| **Product Owner** | Defines requirements & acceptance criteria; prioritises backlog. |
| **Human Developer** | Reviews AI proposals, handles complex/risky code, mentors AI. |
| **AI Assistant (o3)** | Generates code, docs, and refactors within `safe` zones. |
| **QA / Tester** | Verifies functionality, performance, and accessibility. |

---

## 2 · End-to-End Flow
1. **Ticket Creation** – A Jira/GitHub issue captures the feature or bug with clear acceptance criteria.
2. **AI Analysis** – AI reviews relevant code & docs; proposes a **todo list** and initial plan.
3. **Human Confirmation** – Developer approves/adjusts plan (especially in `human req` zones).
4. **Implementation**
   * AI performs edits in `#@ai safe` scope autonomously.
   * For `human req` scopes, AI submits a **draft PR** with inline comments.
5. **Code Review** – Developer leaves feedback; AI iterates until approved.
6. **CI Pipeline** – Lint, unit tests, integration tests, and type-check must pass.
7. **Merge & Deploy** – Feature merged behind a feature flag; deployed to staging.
8. **QA Sign-off** – Tester validates behaviour; Product Owner signs off.
9. **Production Release** – Feature flag toggled on; post-release monitoring begins.

---

## 3 · Decision Matrix for AI Autonomy
| Impact | Area | Marker | Review Requirement |
|--------|------|--------|--------------------|
| Low | UI copy, small refactor | `safe` | No human review needed; CI is enough. |
| Medium | New component, non-critical route | `safe` | Post-merge code review within 24 h. |
| High | Payments, data migrations | `human req` | Pre-merge mandatory human approval. |

---

## 4 · Feedback Loop
* **Inline Code Comments** – Preferred for granular feedback.
* **Checklist in PR Description** – Track outstanding tasks.
* **Weekly Sync** – 15-min meeting to unblock issues and refine conventions.

---

## 5 · Escalation Path
If the AI produces incorrect or risky changes:
1. Label the PR `needs-human-fix`.
2. Revert changes or push follow-up commit.
3. Update `docs/Code_Desc.md` to prevent recurrence.

---

## 6 · Continuous Improvement
* Retrospective notes feed directly into documentation updates.
* Increase the proportion of `safe` zones as confidence grows.
* Periodic audit of AI commits for quality and rule compliance.

---

> **Remember:** AI accelerates the workflow, but *humans own the final responsibility* for correctness and compliance. 