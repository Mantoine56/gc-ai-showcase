# GCAI Hub — Product and Technical Plan

This document proposes a comprehensive scope and architecture for the GCAI Hub: a central registry of AI systems within the Government of Canada (GC) and a discovery hub for re-use of AI solutions across departments.

## 1) Vision & Objectives

- Provide a single source of truth for GC AI systems (internal and public views).
- Offer an intuitive submission flow to register and update AI systems (mapped to the quarterly Excel-based process).
- Enable rich discovery: search, filter, compare, and request access to source code and artifacts.
- Support GC mandates: open source, accessibility, bilingual content (EN/FR), privacy, and security.
- Deliver operational readiness: authentication, roles, moderation, auditability, metrics, and governance.

### MVP constraints and approach (you requested)
- No authentication for now. All write operations remain open in dev; moderation/auth will be added later in Azure.
- Local database for development: use SQLite for simplicity (file-based), queryable by the built-in AI assistant.
- AI assistant should read/query the registry directly (no external LLM integration required for MVP).
- Infrastructure: single Docker image (monolithic front+API), deployed as an Azure App Service for Containers.
- Keep it simple: prioritize registry submission, browse/search, detail pages, and basic Excel import/export.

## 2) Primary Users & Roles

- Public Visitor (anonymous): Browse/search public records of AI systems and resources.
- GC Staff (authenticated): Submit/edit AI system entries, bookmark, request access, export data.
- Project Maintainer (authenticated): Manage submissions for owned projects, respond to code/data requests.
- Registry Administrator (authenticated): Approve/reject submissions, bulk import/export (Excel), manage vocabularies, review audit logs.

MVP note: Treat all users as anonymous. Allow submission without auth, and mark entries as “unreviewed” (no moderation gate for MVP). We will introduce auth and moderation later when moving to Azure.

## 3) Core Features

1. AI Registry
   - Multi-step submission wizard aligned to the Excel template (see Section 5).
   - Drafts, autosave, validation against policy constraints (length limits, enumerations).
   - Moderation workflow: Draft → Submitted → Approved → Published → Archived.
   - Bulk import/export to Excel (.xlsx) with exact header mapping.


2. Discovery & Re-use
   - Powerful search (full-text + filters) by organization, status, capabilities, ADS, AIA ID, personal info, tags/tech stack, year.
   - Project detail pages with compliance, outcomes, links, and contacts.
   - “Request code” flow (email/issue creation) respecting open-source policy and department processes.

3. Catalog Enhancements
   - Collections: curated lists by themes (e.g., chatbots, CV, accessibility).
   - Compare: select 2–3 systems to compare fields side-by-side.
   - Bookmarks: personal save list for GC staff.

4. Governance & Operations
   - Role-based access control (RBAC) via GC SSO (OIDC). Public read; authenticated write.
   - Audit log of key actions (create, update, approve, import/export, delete, settings changes).
   - Admin UI for vocabularies (e.g., status enums), organizations, capabilities.
   - i18n (English/French): fields and UI; support bilingual content where appropriate.
   - Accessibility: WCAG 2.1 AA, keyboard navigation, screen reader labels.

   MVP scope:
   - Skip RBAC and audit logging. Keep a simple admin route (no auth) for dev-only import/export.
   - Maintain accessibility baseline; i18n scaffolding optional (can land post-MVP).

5. AI Assistant (optional phased)
   - Natural language search over registry (RAG). “Find AI systems with ADS and AIA in production in 2024.”
   - Q&A over policy resources (Directive on ADM, GC DS, etc.).

## 4) Recommended Tech Stack & Architecture

Frontend
- React + TypeScript (keep current Vite/Shadcn/Tailwind setup).
- React Router; TanStack Query for data fetching/caching.
- React Hook Form + Zod for forms and validation.
- i18next optional; can be added post-MVP.

Backend (MVP)
- Node.js + TypeScript with Express or Fastify (simple HTTP server, monolith with the SPA).
- SQLite via Prisma ORM for local development (single file DB).
- REST API; validate with Zod; simple controllers for projects/search/import/export.
- Excel processing (xlsx) for import/export.

Infrastructure & Ops (MVP)
- Single Docker image serving both API and built assets.
- Deploy to Azure App Service for Containers (no Kubernetes).
- Basic env-based config, basic JSON logging.

High-Level Diagram (MVP)
```
[Browser]
  -> React App (Vite) — RHF+Zod, Query
      -> REST API (Express) — Validation
           -> SQLite (Prisma)
           -> Excel Import/Export
```

## 5) Data Model (mapped from Excel)

Source: data.xlsx (Sheet: “GC”). Below is a mapping of each column to a proposed internal schema, type, and UI guidance.

| Excel Column | Field (API) | Type | Validation / Notes | UI Component |
| --- | --- | --- | --- | --- |
| AI Register ID (TBS use only) | aiRegisterId | string|null | Read-only, assigned by TBS or internal registry; nullable; unique when present | Read-only text |
| Name of AI system | name | string | Required; ≤ 50 chars | Text input |
| Service Inventory ID | serviceInventoryId | string|null | Optional; alphanumeric | Text input |
| Government organization | organizationId | uuid | Required; foreign key to `Organization` | Select (searchable) |
| Purpose of AI system | description | string | Required; ≤ 1000 chars | Textarea with counter |
| AI system primary users | primaryUsers | enum | One of {Employees, MembersOfPublic, Both, Neither} | Radio/Select |
| Developed by | developedBy | enum | One of {Government, Vendor, Other}; if Vendor, require vendorName | Radio with conditional field |
| Vendor name | vendorName | string|null | Required if developedBy=Vendor; else null | Text input |
| AI system status | status | enum | One of {InDevelopment, InProduction, Retired} | Select |
| Status date | statusYear | number | Optional; 4-digit year (e.g., 2019..current year) | Year input |
| AI system capabilities | capabilities | string | Optional; ≤ 300 chars | Textarea |
| Automated decision system | isAutomatedDecisionSystem | boolean | Yes/No | Switch |
| Algorithmic Impact Assessment | openGovAiaId | string|null | AIA ID or “Not applicable”; accept URL/ID; normalize to string | Text input |
| Data sources | dataSources | string | Optional, free text | Textarea |
| Involves personal information | involvesPersonalInfo | boolean | Yes/No | Switch |
| Personal Information Banks | personalInformationBanks | string[] | Optional; parse comma/semicolon-separated PIB codes | Tag input |
| Notification of AI | hasUserNotification | boolean | Yes/No | Switch |
| Access to Information request | atipRequestRefs | string | Optional; free text (IDs) | Text input |
| AI system results | outcomes | string | Optional; ≤ 500 chars | Textarea |
| Source 1 (TBS use only) | source1 | string|null | Read-only/internal | Hidden |
| Source 2 (TBS use only) | source2 | string|null | Read-only/internal | Hidden |

Related Entities
- Organization: id, nameEN, nameFR, acronym, url.
- Capability (optional normalized vocabulary): id, labelEN/FR.
- User: id, email, displayName, roles.
- CodeRequest: id, projectId, requesterId/email, message, status, timestamps.
- AuditLog: id, actorId, action, entity, entityId, diff, timestamp.

Indices & Constraints
- Unique: (name, organizationId) to prevent duplicates unless explicitly duplicated.
- Text search index on name, description, capabilities, organization.
- Enumerations and character limits enforced at API and DB layers.

## 6) Submission Flow (Wizard)

Steps
1. Identity & Ownership: name, organization, developedBy, vendorName
2. Purpose & Capabilities: description, capabilities
3. Compliance: ADS (boolean), AIA ID, PI involvement, PIBs, notification
4. Operations & Status: status, statusYear, data sources, ATIP refs
5. Review & Submit: summary diff, attestations, language completeness (EN/FR)

Behaviours
- Autosave drafts; client-side validation with Zod; server-side validation for consistency.
- Character counters and policy hints under fields.
- Role-based gating: only owners/maintainers can update their entries; admin approves publishing.

## 7) Discovery UX

- Faceted filters: organization, status, ADS, PI involvement, year, capabilities.
- Sort: relevance, newest, status (production first), alphabetical.
- Saved filters (for signed-in users); deep-linkable queries.
- Compare view for selected entries.

## 8) API Design (examples)

MVP endpoints
- GET /api/projects?query=&filters=… — search/browse
- GET /api/projects/:id — detail
- POST /api/projects — create (publishes immediately, flagged “unreviewed”)
- PUT /api/projects/:id — update
- GET /api/registry/export.xlsx — export all entries
- POST /api/registry/import — import Excel (dev-only)

AI Assistant (MVP)
- GET /api/assistant/query?q=… — simple rules-based/keyword retrieval over the registry (counts, lists, filters). No external LLM required.

## 9) Internationalization (EN/FR)

- Optional for MVP. Keep content English-first, add i18n scaffolding later (language switcher, translation files).

## 10) Accessibility & Compliance

- WCAG 2.1 AA: labels, landmarks, keyboard flow, focus outlines, color contrast, live region for validation messages.
- Privacy-by-design: minimize personal info; protect audit/requests.
- Security: input sanitization, rate limiting, CSRF for cookie-based flows (if used), JWT validation otherwise.

## 11) Observability & Operations

- Basic health endpoint (/health) and JSON logs. No centralized tracing/metrics for MVP.

## 12) Testing Strategy

- Unit tests for validation and mappers (Excel → DB; DB → Excel).
- Component tests for form steps and filters.
- E2E happy path: submit → admin approve → publish → search → request code.
- Contract tests for API (OpenAPI).

## 13) Delivery Plan (Phases)

Phase 1 — MVP (simple monolith)
- SQLite-backed registry with create/update/list/detail.
- Search + filters, Excel import (dev-only) and export.
- AI assistant endpoint that answers simple registry queries.
- Docker image; run locally and deploy to Azure App Service for Containers.

Phase 2 — UX and discovery
- Improve submission form (optional wizard), compare view, and lightweight “request code” via mailto.
- Optional i18n scaffolding; refine accessibility.

Phase 3 — Hardening (post-Azure move)
- Add authentication (Azure AD), roles, moderation workflow.
- Migrate to PostgreSQL if needed; analytics/metrics; optional RAG assistant.

## 14) Open Questions

- Identity provider specifics (Azure AD vs. other) and required claims/roles.
- Exact publication rules for internal-only entries vs. public entries.
- Whether bilingual content is mandatory per-field or per-entry.
- Approved vocabularies for capabilities and organizations (source of truth).

---

Appendix A — Excel Field Notes (from sample rows)
- Character limits suggested by template are enforced in form (50/300/500/1000).
- Many Yes/No fields map naturally to booleans (ADS, involves PI, notification).
- AIA may be an ID or URL; we normalize to a string and validate basic formats.
- PIBs can be comma- or semicolon-separated and stored as a string array.

Appendix B — Minimal ER (textual)
```
Project(id, aiRegisterId?, name, serviceInventoryId?, organizationId, description,
        primaryUsers, developedBy, vendorName?, status, statusYear?, capabilities?,
        isAutomatedDecisionSystem, openGovAiaId?, dataSources?, involvesPersonalInfo,
        personalInformationBanks[], hasUserNotification, atipRequestRefs?, outcomes?,
        createdBy, updatedBy, createdAt, updatedAt, moderationState)

Organization(id, nameEN, nameFR, acronym?, url?)
User(id, email, displayName, roles[])
CodeRequest(id, projectId, requesterId?, requesterEmail, message, status, createdAt)
AuditLog(id, actorId, action, entity, entityId, diff, createdAt)
```


