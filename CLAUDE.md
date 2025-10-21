# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GC AI Hub is a comprehensive platform showcasing AI initiatives across Government of Canada departments. It's a React-based single-page application that allows users to discover, explore, and learn about AI projects being developed by federal departments and agencies.

**Current State:** This is a UI-only demo/prototype with mock data in `src/data/projects.json`.

**Planned Evolution:** The project will evolve into a full-stack application serving as the central AI Registry for the Government of Canada. See `GCAI-Hub-Plan.md` for the complete product roadmap, which includes:
- Backend API (Node.js/Express + SQLite/Prisma for MVP, PostgreSQL later)
- Multi-step submission wizard aligned to the official Excel registry template (`data.xlsx`)
- Authentication via Azure AD with role-based access control
- Moderation workflow (Draft → Submitted → Approved → Published)
- Excel import/export matching the current GC AI registry format
- AI assistant for natural language queries over the registry
- Bilingual support (EN/FR) and enhanced accessibility features

**Critical Context:** The real data structure is defined in `data.xlsx` (the current GC AI registry Excel file). When building new features, consult both the Excel schema in `GCAI-Hub-Plan.md` Section 5 and the actual file structure. The current `projects.json` is simplified demo data and does NOT match the production schema.

## Development Commands

**Start development server:**
```bash
npm run dev
# Server runs at http://localhost:8080
```

**Build for production:**
```bash
npm run build
```

**Build for development:**
```bash
npm run build:dev
```

**Run linter:**
```bash
npm lint
```

**Preview production build:**
```bash
npm run preview
```

## Architecture

### Tech Stack
- **Vite** - Build tool and dev server configured with SWC for fast React compilation
- **React 18** with TypeScript (strict mode disabled for easier development)
- **React Router** - Client-side routing defined in `src/App.tsx`
- **shadcn/ui** - Accessible component library built on Radix UI
- **Tailwind CSS** - Utility-first styling with custom GCDS (GC Design System) tokens
- **Fuse.js** - Fuzzy search functionality for project filtering
- **TanStack Query** - Data fetching and state management

### Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components (do not edit manually)
│   ├── layout/       # DashboardLayout, Header, Footer, AppSidebar
│   ├── projects/     # ProjectCard, ProjectGrid, SearchAndFilter
│   ├── home/         # Hero component
│   └── chat/         # AI chat sidebar components
├── pages/            # Route components (Index, ProjectDetail, About, Resources, NotFound)
├── data/             # projects.json - central data source
├── hooks/            # Custom React hooks (use-toast, use-mobile)
├── lib/              # utils.ts for cn() utility
└── assets/           # Static assets (logos, images)
```

### Key Architectural Patterns

**Data Flow:**
- **Current (Demo):** Project data lives in `src/data/projects.json` with simplified fields: id, title, department, description, tags, techStack, demoUrl, repoUrl, image, featured, status
- **Future (Production):** Data will map to the official GC AI Registry schema defined in `data.xlsx` with 18 fields including: aiRegisterId, name, serviceInventoryId, organizationId, description, primaryUsers, developedBy, vendorName, status, statusYear, capabilities, isAutomatedDecisionSystem, openGovAiaId, dataSources, involvesPersonalInfo, personalInformationBanks, hasUserNotification, atipRequestRefs, outcomes. See `GCAI-Hub-Plan.md` Section 5 for complete field mapping.
- The Index page handles all filtering logic using Fuse.js for fuzzy search and useMemo for performance
- Filtering supports: search query, department selection (multi-select), and tag selection (multi-select)
- **When implementing new features:** Use the production schema from `GCAI-Hub-Plan.md`, not the current demo schema

**Layout System:**
- `DashboardLayout` wraps all pages and provides:
  - Left sidebar navigation (AppSidebar)
  - Top header with theme toggle, notifications, AI assistant toggle
  - Right AI chat sidebar (AIChatSidebar) that can be toggled
  - Footer
- Theme switching is handled in DashboardLayout using localStorage and dark class on documentElement

**Routing:**
- All routes defined in `src/App.tsx`
- Main routes: `/` (Index), `/project/:id` (ProjectDetail), `/resources`, `/about`
- Catch-all route `*` renders NotFound page
- **Important:** All custom routes must be added ABOVE the catch-all "*" route

**Component Configuration:**
- shadcn/ui components configured via `components.json`
- Path aliases use `@/` prefix mapping to `./src/`
- Components use `@/` imports extensively

**Styling:**
- Custom GCDS design tokens defined in Tailwind config (gcds-background-*, gcds-text-*, gcds-color-*, etc.)
- Dark mode support with custom design system colors
- Components follow Government of Canada accessibility guidelines (WCAG 2.1 AA)

### TypeScript Configuration

TypeScript is configured with relaxed settings for easier development:
- `noImplicitAny: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`
- `strictNullChecks: false`
- `allowJs: true`

### Adding shadcn/ui Components

To add new shadcn/ui components, do not manually create files. Instead, in the terminal run:
```bash
npx shadcn@latest add [component-name]
```

This ensures proper installation with the project's configuration.

### Important Development Notes

1. **CRITICAL - Consult the Plan:** Before implementing ANY new features, read `GCAI-Hub-Plan.md` to understand the production requirements and data model. The current app is a UI demo only.

2. **Data Schema Mismatch:** The current `src/data/projects.json` uses simplified demo fields. The production schema is defined in `data.xlsx` and documented in `GCAI-Hub-Plan.md` Section 5. Always reference the production schema when building features that will persist.

3. **MVP Constraints:** Per `GCAI-Hub-Plan.md`, the MVP will use:
   - SQLite (Prisma ORM) for local development
   - No authentication initially (added post-MVP in Azure)
   - Monolithic Docker image (Express API + React SPA)
   - Excel import/export matching `data.xlsx` structure exactly

4. **Route Management:** When adding new routes, always add them in `src/App.tsx` BEFORE the catch-all "*" route

5. **Design System:** Use GCDS-prefixed Tailwind classes (gcds-*) to maintain consistency with Government of Canada branding

6. **Component Editing:** Do not manually edit files in `src/components/ui/` - these are managed by shadcn

7. **Accessibility:** All new components must maintain WCAG 2.1 AA compliance (keyboard navigation, ARIA labels, color contrast, screen reader support)

8. **Path Imports:** Always use `@/` prefix for imports (e.g., `@/components/ui/button`)

9. **ESLint:** Unused variables warnings are disabled; `react-refresh/only-export-components` is set to warn

10. **Bilingual Requirement:** Future features must support English/French. Use i18next scaffolding when implementing text-heavy features.

## Key Reference Documents

- **`GCAI-Hub-Plan.md`** - Complete product roadmap, architecture decisions, MVP scope, and data model
- **`data.xlsx`** - Current GC AI Registry Excel file; authoritative source for field structure
- **`src/data/projects.json`** - Demo data only; NOT representative of production schema
