# GC Design System Token Migration Plan

## Overview

This document outlines the comprehensive plan to migrate all components in the GC AI Hub application to use proper GC Design System (GCDS) tokens instead of hard-coded colors, Tailwind's default color palette, or non-semantic styling.

**Goal:** Ensure 100% of components use GCDS tokens for all styling (colors, spacing, typography, borders, etc.)

**Benefits:**
- Automatic updates when GCDS tokens are updated
- Consistent visual language across the entire application
- Better maintainability and scalability
- Compliance with Government of Canada design standards
- Improved accessibility and WCAG 2.1 AA compliance

## Token Priority Hierarchy

When styling components, use tokens in this order of preference:

1. **Global Tokens** (Semantic - PREFERRED)
   - `text-gcds-text-primary`, `text-gcds-text-secondary`, `text-gcds-text-danger`
   - `bg-gcds-background-primary`, `bg-gcds-background-secondary`
   - `border-gcds-border-primary`, `border-gcds-border-secondary`, `border-gcds-border-accent`

2. **Base Tokens** (Use when global tokens don't fit)
   - `bg-gcds-color-blue-100`, `bg-gcds-color-blue-700`
   - `text-gcds-color-grayscale-300`, `text-gcds-color-grayscale-900`

3. **Component Tokens** (Use ONLY for their specific components)
   - `bg-gcds-button-primary-default-background`
   - Use with caution - can change when components update

## Migration Phases

### Phase 1: Core Layout Components (PRIORITY: HIGH)
**Impact:** Affects entire application

#### Files to Update:
1. **`src/components/layout/DashboardLayout.tsx`**
   - Replace all `bg-blue-*`, `text-blue-*` with GCDS tokens
   - Update header, sidebar, and footer styling
   - Fix theme toggle colors

2. **`src/components/layout/AppSidebar.tsx`**
   - Replace navigation item colors
   - Update active/hover states with GCDS state tokens
   - Fix background and border colors

3. **`src/components/layout/Header.tsx`**
   - Update notification badge colors
   - Fix button styling
   - Replace icon colors

4. **`src/components/layout/Footer.tsx`**
   - Update link colors
   - Fix background and text colors
   - Replace border colors

**Expected Changes:**
```tsx
// BEFORE
className="bg-blue-50 text-blue-900 hover:bg-blue-100"

// AFTER
className="bg-gcds-color-blue-100 text-gcds-text-primary hover:bg-gcds-color-blue-200"
```

---

### Phase 2: Project Components (PRIORITY: HIGH)
**Impact:** Main user-facing features

#### Files to Update:
1. **`src/components/projects/ProjectCard.tsx`**
   - Replace status badge colors (green, yellow, gray) with GCDS tokens
   - Update featured star icon color
   - Fix card borders and shadows
   - Replace capability badge colors

2. **`src/components/projects/ProjectsTable.tsx`**
   - Update status badge colors to GCDS tokens
   - Replace compliance badge colors (blue, purple)
   - Fix hover states on table rows
   - Update sort icon colors

3. **`src/components/projects/AdvancedFilters.tsx`**
   - Replace filter badge colors
   - Update selected/unselected states
   - Fix dropdown styling
   - Replace border colors

4. **`src/components/projects/ProjectGrid.tsx`**
   - Ensure consistent use of GCDS tokens for grid layout
   - Update empty state styling

5. **`src/components/projects/ProjectPagination.tsx`**
   - Update active/inactive page button colors
   - Fix hover states

**Color Mapping Guide:**
```tsx
// Status Colors
// Green (Production) → GCDS Green tokens
bg-green-100 → bg-gcds-color-green-100 OR use semantic success token
text-green-800 → text-gcds-color-green-900

// Yellow (Development) → GCDS Yellow tokens
bg-yellow-100 → bg-gcds-color-yellow-100 OR use semantic warning token
text-yellow-800 → text-gcds-color-yellow-900

// Gray (Retired) → GCDS Grayscale tokens
bg-gray-100 → bg-gcds-color-grayscale-100
text-gray-800 → text-gcds-color-grayscale-900

// Blue (Compliance badges)
text-blue-600 → text-gcds-color-blue-700
border-blue-600 → border-gcds-color-blue-700

// Purple (Personal Info)
text-purple-600 → text-gcds-color-purple-700
border-purple-600 → border-gcds-color-purple-700
```

---

### Phase 3: Page Components (PRIORITY: MEDIUM)
**Impact:** Individual pages

#### Files to Update:
1. **`src/pages/Index.tsx`**
   - Update statistics card colors
   - Fix tab styling
   - Replace view toggle colors
   - Ensure all badges use GCDS tokens

2. **`src/pages/ProjectDetail.tsx`**
   - Update all section card styling
   - Replace status badges
   - Fix compliance indicator colors
   - Update metadata section

3. **`src/pages/NotFound.tsx`**
   - Replace blue-* colors with GCDS tokens
   - Update button styling

4. **`src/pages/About.tsx`**
   - Ensure all content uses GCDS text tokens
   - Update any accent colors

5. **`src/pages/Resources.tsx`**
   - Update link colors
   - Fix card styling if present

6. **`src/pages/SubmitProject.tsx`**
   - Ensure form uses GCDS tokens consistently

---

### Phase 4: Form & Submission Components (PRIORITY: MEDIUM)
**Impact:** Project submission workflow

#### Files to Update:
1. **`src/components/submission/SubmissionWizard.tsx`**
   - Update stepper colors
   - Fix progress indicator
   - Replace button colors

2. **`src/components/submission/steps/IdentityStep.tsx`**
   - Update form field colors
   - Fix validation error colors

3. **`src/components/submission/steps/PurposeStep.tsx`**
   - Replace blue-* colors with GCDS tokens
   - Update form styling

4. **`src/components/submission/steps/ComplianceStep.tsx`**
   - Replace blue-* colors
   - Update checkbox/radio colors

5. **`src/components/submission/steps/OperationsStep.tsx`**
   - Replace blue-* colors
   - Update form field styling

6. **`src/components/submission/steps/ReviewStep.tsx`**
   - Update summary card colors
   - Fix section dividers

---

### Phase 5: Chat & Interactive Components (PRIORITY: LOW)
**Impact:** Optional/enhancement features

#### Files to Update:
1. **`src/components/chat/AIChatSidebar.tsx`**
   - Replace blue-* colors with GCDS tokens
   - Update message bubbles
   - Fix scrollbar styling

2. **`src/components/chat/EnhancedAIChatSidebar.tsx`**
   - Replace blue-* colors
   - Update user/AI message distinction
   - Fix button colors

3. **`src/components/chat/ChatToggleButton.tsx`**
   - Replace blue-* colors with GCDS tokens
   - Update icon colors

---

### Phase 6: UI Components (PRIORITY: LOW)
**Impact:** shadcn/ui base components - only if customized

**Note:** Most `src/components/ui/*` files are managed by shadcn and should NOT be edited manually. Only update if we've made custom modifications.

#### Files to Review:
- Check if any ui components have been customized
- If customized, ensure they use GCDS tokens
- Document any customizations in CLAUDE.md

---

## Common Token Replacements

### Text Colors
```tsx
text-gray-500 → text-gcds-text-secondary OR text-muted-foreground
text-gray-600 → text-gcds-text-secondary
text-gray-700 → text-gcds-text-primary
text-gray-800 → text-gcds-text-primary
text-gray-900 → text-gcds-text-primary

text-blue-600 → text-gcds-color-blue-700
text-blue-700 → text-gcds-color-blue-800
text-blue-900 → text-gcds-color-blue-900

text-red-600 → text-gcds-text-danger OR text-destructive
text-green-600 → text-gcds-color-green-700
text-yellow-600 → text-gcds-color-yellow-700
```

### Background Colors
```tsx
bg-white → bg-gcds-background-primary OR bg-card
bg-gray-50 → bg-gcds-color-grayscale-50
bg-gray-100 → bg-gcds-color-grayscale-100
bg-gray-900 → bg-gcds-color-grayscale-900

bg-blue-50 → bg-gcds-color-blue-100
bg-blue-100 → bg-gcds-color-blue-100
bg-blue-600 → bg-gcds-color-blue-700
bg-blue-700 → bg-gcds-color-blue-800
```

### Border Colors
```tsx
border-gray-200 → border-gcds-border-secondary OR border
border-gray-300 → border-gcds-border-secondary
border-blue-600 → border-gcds-color-blue-700
```

### Hover States
```tsx
hover:bg-blue-50 → hover:bg-gcds-color-blue-100
hover:bg-gray-100 → hover:bg-muted OR hover:bg-accent
hover:text-blue-700 → hover:text-gcds-color-blue-800
```

---

## Implementation Checklist

For each component being migrated:

- [ ] Identify all hard-coded colors (blue-*, green-*, red-*, gray-*, etc.)
- [ ] Map each color to appropriate GCDS token (global preferred, base if needed)
- [ ] Replace text colors with GCDS text tokens
- [ ] Replace background colors with GCDS background/color tokens
- [ ] Replace border colors with GCDS border tokens
- [ ] Update hover/focus/active states with GCDS state tokens
- [ ] Test in both light and dark modes
- [ ] Verify accessibility (color contrast, WCAG 2.1 AA)
- [ ] Test all interactive states (hover, focus, active, disabled)
- [ ] Update any inline styles to use CSS variables if needed
- [ ] Document any deviations or custom token usage

---

## Testing Strategy

After each phase:

1. **Visual Regression Testing**
   - Compare before/after screenshots
   - Verify colors match GCDS guidelines
   - Test in both light and dark themes

2. **Accessibility Testing**
   - Run automated accessibility checks
   - Verify color contrast ratios
   - Test keyboard navigation
   - Test with screen readers

3. **Cross-browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Verify token rendering is consistent

4. **Responsive Testing**
   - Mobile, tablet, desktop viewports
   - Ensure token usage works at all sizes

---

## Success Criteria

Migration is complete when:

- [ ] Zero hard-coded hex colors in component files
- [ ] Zero use of Tailwind's default color palette (blue-*, gray-*, etc.)
- [ ] All colors use GCDS tokens (gcds-*)
- [ ] Dark mode works correctly with all token updates
- [ ] All accessibility tests pass
- [ ] No visual regressions from original design
- [ ] Documentation updated in CLAUDE.md
- [ ] All components pass code review for GCDS compliance

---

## Timeline Estimate

- **Phase 1 (Layout):** 2-3 hours
- **Phase 2 (Projects):** 3-4 hours
- **Phase 3 (Pages):** 2-3 hours
- **Phase 4 (Forms):** 2-3 hours
- **Phase 5 (Chat):** 1-2 hours
- **Phase 6 (UI Review):** 1 hour
- **Testing & QA:** 2-3 hours

**Total:** 13-19 hours

---

## Risk Mitigation

**Risks:**
1. Breaking existing styling
2. Color contrast issues
3. Dark mode incompatibility
4. Performance impact from token lookups

**Mitigations:**
1. Migrate one component at a time
2. Test after each component update
3. Keep git commits small and focused
4. Use feature flags if needed
5. Have rollback plan ready
6. Test thoroughly in both themes

---

## Resources

- **GCDS Token Documentation:** `docs/designtokens.md`
- **CLAUDE.md:** Styling & Design Tokens section
- **Tailwind Config:** Check defined GCDS tokens
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **GC Design System:** https://design-system.alpha.canada.ca/

---

## Questions & Decisions Log

**Q: What if a GCDS token doesn't exist for a specific use case?**
**A:** Use base tokens (gcds-color-*) and document the decision. Consider if the use case should be submitted to GCDS team as a new token request.

**Q: How to handle third-party components (shadcn)?**
**A:** Leave them as-is unless customized. shadcn components use Tailwind's semantic tokens (muted, accent, etc.) which should be configured to map to GCDS tokens via Tailwind config.

**Q: What about animations and transitions?**
**A:** Maintain existing animation/transition classes. Focus token migration on colors, spacing, and typography.

---

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (Layout Components)
3. Create feature branch: `feat/gcds-token-migration`
4. Migrate components one at a time
5. Create PRs for each phase
6. Update CLAUDE.md with any learnings
7. Document final token usage patterns
