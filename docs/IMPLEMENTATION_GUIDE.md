# GC AI Hub - Complete Implementation Guide

## Table of Contents

1. [Overview](#overview)
2. [What Was Built](#what-was-built)
3. [Architecture](#architecture)
4. [How to Test Everything](#how-to-test-everything)
5. [Feature Guide](#feature-guide)
6. [API Documentation](#api-documentation)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This document provides a comprehensive guide to all features implemented in the GC AI Hub application, how to test them, and how to use them effectively.

### Project Summary

GC AI Hub is a full-stack web application that serves as a transparency and discovery platform for Government of Canada AI initiatives. It combines:

- **Backend API** - Express.js server with TypeScript, Prisma ORM, and SQLite
- **Frontend SPA** - React 18 with TypeScript, Vite, TailwindCSS, and shadcn/ui
- **AI Assistant** - Natural language query interface for intelligent project discovery
- **Data Management** - Excel import/export functionality
- **Deployment** - Docker containerization with production-ready configuration

---

## What Was Built

### Phase 1: Backend Infrastructure

**Location:** `server/src/`

#### 1.1 Express API Server (`server/src/index.ts`)
- TypeScript-based Express server
- CORS configuration for cross-origin requests
- Error handling middleware
- Request logging with Morgan
- Security headers with Helmet
- Health check endpoint: `GET /health`

#### 1.2 Prisma Database Schema (`server/prisma/schema.prisma`)
- **Project Model** - Comprehensive AI project data
  - 28 fields covering all aspects of AI projects
  - Status tracking (InDevelopment, InProduction, Retired)
  - Compliance fields (ADS, PIB, user notification)
  - Moderation workflow (Draft, Published, Archived)
  - Relationships with Organizations

- **Organization Model** - Government departments
  - Bilingual names (English/French)
  - Acronyms and URLs
  - Project relationships

#### 1.3 API Routes
- **Projects** (`server/src/routes/projects.ts`)
  - GET /api/projects - List with filtering, pagination, sorting
  - GET /api/projects/:id - Single project details
  - POST /api/projects - Create new project
  - PUT /api/projects/:id - Update project
  - DELETE /api/projects/:id - Archive project

- **Organizations** (`server/src/routes/organizations.ts`)
  - GET /api/organizations - List all organizations
  - GET /api/organizations/:id - Single organization
  - POST /api/organizations - Create organization
  - PUT /api/organizations/:id - Update organization

- **Registry** (`server/src/routes/registry.ts`)
  - POST /api/registry/import - Import from Excel
  - GET /api/registry/export - Export to Excel

- **AI Assistant** (`server/src/routes/assistant.ts`)
  - POST /api/assistant/query - Natural language queries
  - GET /api/assistant/starters - Conversation starters

#### 1.4 Database Seeding (`server/prisma/seed.ts`)
- 6 real Government of Canada organizations
- 6 sample AI projects with realistic data
- Covers various statuses, compliance requirements, and use cases

### Phase 2: Data Import/Export

**Location:** `server/src/services/excel.service.ts`

#### 2.1 Excel Import
- Parse .xlsx files with project data
- Validation and error handling
- Automatic organization lookup/creation
- Support for all 28 project fields
- Returns detailed import results

#### 2.2 Excel Export
- Generate .xlsx files from database
- Include all project fields
- Bilingual organization names
- Formatted headers and styling
- Downloadable file generation

### Phase 3: Frontend Integration

**Location:** `src/`

#### 3.1 TypeScript Types (`src/types/index.ts`)
- Complete type definitions matching backend schema
- Project, Organization, PaginatedResponse types
- Filter and query parameter types
- Form input types

#### 3.2 API Client (`src/lib/api.ts`)
- Centralized API communication layer
- Type-safe API calls
- Error handling
- Support for all backend endpoints
- TanStack Query integration ready

#### 3.3 Updated Components
- ProjectCard - Display project information
- ProjectList - Grid/list view with pagination
- Homepage - Featured projects and statistics
- Project detail pages

### Phase 4: Multi-Step Submission Wizard

**Location:** `src/components/wizard/`

#### 4.1 Wizard Framework (`SubmissionWizard.tsx`)
- 5-step guided submission process
- Progress indicator
- Step navigation (next, previous, save draft)
- Form state management with React Hook Form
- Zod validation schema
- Autosave functionality (every 30 seconds)

#### 4.2 Step Components

**Step 1: Identity** (`IdentityStep.tsx`)
- Project name (required, 3-200 chars)
- Organization selector (searchable)
- Service Inventory ID (optional)
- AI Register ID (auto-generated)

**Step 2: Purpose** (`PurposeStep.tsx`)
- Description (required, 50-2000 chars)
- Capabilities (required, 50-1000 chars)
- Primary users (dropdown: Employees, Members of Public, Both)
- Developed by (dropdown: In-house, Vendor, Partnership)
- Vendor name (conditional, shown if Vendor selected)
- Character counters on all text fields

**Step 3: Compliance** (`ComplianceStep.tsx`)
- Automated Decision System checkbox
- Open.gov AIA ID (conditional)
- Personal Information involvement
- Personal Information Banks (conditional, multi-line)
- User notification requirement
- ATIP request references (optional)

**Step 4: Operations** (`OperationsStep.tsx`)
- Status (dropdown: InDevelopment, InProduction, Retired)
- Status year (4-digit year)
- Data sources (multi-line, optional)
- Outcomes and impacts (multi-line, optional)
- Source references (2 optional URL fields)

**Step 5: Review** (`ReviewStep.tsx`)
- Complete summary of all entered data
- Organized by sections
- Edit buttons for each section
- Final submission
- Moderation state selector (Draft, Published)

#### 4.3 Form Features
- Real-time validation with error messages
- Required field indicators
- Character counters with color coding
- Conditional fields (show/hide based on selections)
- Autosave with status indicator
- Draft saving capability
- Form state persistence

### Phase 5: Advanced Filtering & Search

**Location:** `src/components/filters/`

#### 5.1 Filter Panel (`AdvancedFilterPanel.tsx`)
- Collapsible panel with toggle button
- Multiple filter categories:
  - **Text Search** - Name and description
  - **Organization** - Multi-select with all departments
  - **Status** - InDevelopment, InProduction, Retired
  - **Compliance** - ADS and PIB checkboxes
  - **Primary Users** - Employees, Public, Both
- Clear all filters button
- Active filter count badge

#### 5.2 Active Filter Chips (`src/components/filters/FilterChips.tsx`)
- Visual display of active filters
- Remove individual filters (X button)
- Clear all filters option
- Filter count display

#### 5.3 Sort Controls
- Sort by: Created Date, Name, Status
- Sort order: Ascending, Descending
- Dropdown selectors
- URL parameter sync

### Phase 6: AI Assistant

**Location:** `server/src/services/ai-assistant.service.ts` and `src/components/chat/`

#### 6.1 Backend NLP Service (`AIAssistantService`)

**Query Intent Detection:**
- **Stats queries** - "how many", "count", "total", "number of"
- **Search queries** - "find", "show", "list", "search", "looking for"
- **Recommendation queries** - "recommend", "suggest", "similar"
- **General queries** - Welcome messages, help

**Entity Extraction:**
- **Status** - development, production, retired
- **Compliance** - ads, personal info, privacy, PIB
- **Primary Users** - public, citizen, employee, staff, internal
- **Keywords** - chatbot, NLP, vision, translation, document, classification, detection, prediction

**Response Generation:**
- Natural language responses
- Statistics with breakdowns
- Project results with details
- Context-aware suggestions
- Error handling with helpful messages

#### 6.2 Frontend Chat Interface (`EnhancedAIChatSidebar.tsx`)

**Features:**
- Fixed sidebar (right side)
- Minimize/maximize controls
- Real-time message display
- User/AI message bubbles
- Timestamp display
- Loading indicators ("Thinking...")
- Online status badge

**Project Cards:**
- Clickable cards for search results
- Project name, organization, description
- Status badges
- Direct links to project details

**Suggestions:**
- Context-aware follow-up questions
- Click to ask functionality
- Conversation starters on first load
- Example queries for different intents

**Example Queries:**
- "How many AI projects are in production?"
- "Show me all chatbot projects"
- "Which projects are Automated Decision Systems?"
- "List projects involving personal information"
- "Find projects by Service Canada"
- "Show me projects in development"

### Phase 7: Docker Deployment

**Location:** Root directory

#### 7.1 Backend Dockerfile (`server/Dockerfile`)
- Multi-stage build:
  - **deps** - Install dependencies
  - **development** - Hot reload dev environment
  - **builder** - TypeScript compilation
  - **production** - Optimized runtime
- Health checks
- Non-root user for security
- Prisma client generation
- Port 3001 exposed

#### 7.2 Frontend Dockerfile (`Dockerfile`)
- Multi-stage build:
  - **deps** - Install dependencies
  - **development** - Vite dev server
  - **builder** - Production build
  - **production** - Nginx static serving
- Health checks
- Port 80 exposed
- Nginx configuration for SPA routing

#### 7.3 Docker Compose (`docker-compose.yml`)
- Production configuration
- Service orchestration (frontend + backend)
- Volume management
- Network configuration
- Health check dependencies
- Restart policies

#### 7.4 Dev Docker Compose (`docker-compose.dev.yml`)
- Development environment
- Hot reload with volume mounts
- Source code synchronization
- Development ports (8080, 3001)

#### 7.5 Nginx Configuration (`nginx.conf`)
- SPA routing (fallback to index.html)
- Gzip compression
- Security headers
- API proxy configuration
- Static asset caching
- Health check endpoint

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│  ┌────────────┬─────────────┬──────────────────────┐   │
│  │   Pages    │  Components │   State Management   │   │
│  │            │             │  (TanStack Query)    │   │
│  └────────────┴─────────────┴──────────────────────┘   │
│                        │                                 │
│                        │ HTTP/REST API                   │
│                        ▼                                 │
└─────────────────────────────────────────────────────────┘
                         │
                         │
┌─────────────────────────────────────────────────────────┐
│                   Backend (Express)                      │
│  ┌────────────┬─────────────┬──────────────────────┐   │
│  │   Routes   │  Services   │     Middleware       │   │
│  │            │             │                       │   │
│  └────────────┴─────────────┴──────────────────────┘   │
│                        │                                 │
│                        │ Prisma ORM                      │
│                        ▼                                 │
│              ┌──────────────────┐                        │
│              │  SQLite Database │                        │
│              └──────────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction** → Frontend Component
2. **API Call** → API Client (`src/lib/api.ts`)
3. **HTTP Request** → Express Route Handler
4. **Validation** → Zod Schema Validation
5. **Business Logic** → Service Layer
6. **Data Access** → Prisma Client
7. **Database Query** → SQLite
8. **Response** → JSON back through the chain

### File Structure

```
gcaihub/
├── src/                                    # Frontend
│   ├── components/
│   │   ├── chat/
│   │   │   ├── EnhancedAIChatSidebar.tsx  # AI chat interface
│   │   │   └── ChatToggleButton.tsx       # Chat toggle
│   │   ├── filters/
│   │   │   ├── AdvancedFilterPanel.tsx    # Filter controls
│   │   │   └── FilterChips.tsx            # Active filters
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx        # Main layout
│   │   │   ├── AppSidebar.tsx             # Navigation
│   │   │   └── Footer.tsx                 # Footer
│   │   ├── wizard/
│   │   │   ├── SubmissionWizard.tsx       # Wizard framework
│   │   │   ├── IdentityStep.tsx           # Step 1
│   │   │   ├── PurposeStep.tsx            # Step 2
│   │   │   ├── ComplianceStep.tsx         # Step 3
│   │   │   ├── OperationsStep.tsx         # Step 4
│   │   │   └── ReviewStep.tsx             # Step 5
│   │   └── ui/                            # shadcn/ui components
│   ├── lib/
│   │   ├── api.ts                         # API client
│   │   └── utils.ts                       # Utilities
│   ├── pages/
│   │   ├── Home.tsx                       # Homepage
│   │   ├── Projects.tsx                   # Project list
│   │   └── ProjectDetail.tsx              # Project details
│   └── types/
│       └── index.ts                       # TypeScript types
│
├── server/                                # Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── projects.ts                # Project endpoints
│   │   │   ├── organizations.ts           # Organization endpoints
│   │   │   ├── registry.ts                # Import/export
│   │   │   └── assistant.ts               # AI assistant
│   │   ├── services/
│   │   │   ├── excel.service.ts           # Excel processing
│   │   │   └── ai-assistant.service.ts    # NLP & queries
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts            # Error handling
│   │   │   └── validateRequest.ts         # Validation
│   │   ├── validation/
│   │   │   └── schemas.ts                 # Zod schemas
│   │   └── index.ts                       # Server entry
│   ├── prisma/
│   │   ├── schema.prisma                  # Database schema
│   │   └── seed.ts                        # Seed data
│   └── generated/
│       └── prisma/                        # Generated Prisma client
│
├── docs/
│   └── IMPLEMENTATION_GUIDE.md            # This file
├── docker-compose.yml                     # Production deployment
├── docker-compose.dev.yml                 # Development deployment
├── Dockerfile                             # Frontend Docker
├── server/Dockerfile                      # Backend Docker
├── nginx.conf                             # Nginx configuration
├── DEPLOYMENT.md                          # Deployment guide
└── README.md                              # Project overview
```

---

## How to Test Everything

### Prerequisites

```bash
# Ensure you have Node.js 20+ and npm installed
node --version  # Should be v20.x.x or higher
npm --version   # Should be v9.x.x or higher
```

### Setup

```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Generate Prisma client
cd server
npx prisma generate
npx prisma db push
npx prisma db seed
cd ..

# 3. Start development servers
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

### Test Checklist

#### ✅ 1. Homepage & Navigation

**Test:** Homepage displays correctly
1. Navigate to http://localhost:8080
2. ✓ Verify header with "GC AI Hub" title
3. ✓ Verify sidebar navigation
4. ✓ Verify featured projects section
5. ✓ Verify statistics display
6. ✓ Click "View All Projects" button

**Expected Result:** Homepage loads with 6 seeded projects, navigation works

---

#### ✅ 2. Project List & Pagination

**Test:** Project list displays and pagination works
1. Navigate to "Projects" page
2. ✓ Verify 6 projects are displayed
3. ✓ Verify project cards show name, organization, status
4. ✓ Change "Items per page" to 3
5. ✓ Verify pagination controls appear
6. ✓ Click "Next" page button
7. ✓ Verify URL updates with `?page=2`

**Expected Result:** Projects paginate correctly, URL syncs with page state

---

#### ✅ 3. Search Functionality

**Test:** Text search works
1. On Projects page, locate search input
2. ✓ Type "chatbot" in search field
3. ✓ Press Enter or click search
4. ✓ Verify only chatbot-related projects appear
5. ✓ Clear search
6. ✓ Verify all projects return

**Expected Result:** Search filters projects by name/description

---

#### ✅ 4. Advanced Filtering

**Test:** Filters work individually and combined

**Organization Filter:**
1. Click "Filters" button to open panel
2. ✓ Select "Service Canada" from Organization dropdown
3. ✓ Verify only Service Canada projects appear
4. ✓ Verify filter chip appears above results
5. ✓ Click X on chip to remove filter

**Status Filter:**
1. ✓ Select "In Production" from Status dropdown
2. ✓ Verify only production projects appear
3. ✓ Verify filter chip shows "Status: In Production"

**Compliance Filters:**
1. ✓ Check "Automated Decision Systems" checkbox
2. ✓ Verify only ADS projects appear
3. ✓ Check "Personal Information Banks" checkbox
4. ✓ Verify only projects with both ADS and PIB appear

**Combined Filters:**
1. ✓ Apply Organization + Status + Compliance filters
2. ✓ Verify all filters work together (AND logic)
3. ✓ Click "Clear all filters" button
4. ✓ Verify all filters removed, all projects return

**Expected Result:** Filters work independently and combined, chips display correctly

---

#### ✅ 5. Sorting

**Test:** Sort controls work
1. Locate sort dropdowns
2. ✓ Select "Sort by: Name"
3. ✓ Select "Order: Ascending"
4. ✓ Verify projects alphabetically sorted A-Z
5. ✓ Select "Order: Descending"
6. ✓ Verify projects reverse sorted Z-A
7. ✓ Select "Sort by: Created Date"
8. ✓ Verify projects sorted by newest first

**Expected Result:** Sorting updates immediately, URL syncs

---

#### ✅ 6. Project Details

**Test:** Project detail page shows all information
1. Click on any project card
2. ✓ Verify navigation to `/project/:id` URL
3. ✓ Verify all project fields display:
   - Name, organization, status
   - Description, capabilities
   - Primary users, developed by
   - Compliance information (ADS, PIB)
   - Data sources, outcomes
   - Timestamps
4. ✓ Click "Back to Projects" button
5. ✓ Verify return to project list

**Expected Result:** All project data displays correctly

---

#### ✅ 7. Multi-Step Submission Wizard

**Test:** Complete wizard workflow

**Step 1 - Identity:**
1. Click "Add Project" button in header
2. ✓ Verify wizard starts at Step 1
3. ✓ Verify progress indicator shows "1 of 5"
4. ✓ Enter project name: "Test AI Project"
5. ✓ Select organization: "Health Canada"
6. ✓ Click "Next" button
7. ✓ Verify validation prevents empty required fields

**Step 2 - Purpose:**
1. ✓ Enter description (min 50 characters):
   "This is a test AI project for validating the submission wizard functionality and ensuring all fields work correctly."
2. ✓ Enter capabilities (min 50 characters):
   "Natural language processing, sentiment analysis, automated document classification, and data extraction."
3. ✓ Select Primary Users: "Members of Public"
4. ✓ Select Developed By: "Vendor"
5. ✓ Verify "Vendor Name" field appears
6. ✓ Enter Vendor Name: "AI Solutions Inc."
7. ✓ Verify character counters update in real-time
8. ✓ Verify counters turn yellow near limit, red when exceeded
9. ✓ Click "Next"

**Step 3 - Compliance:**
1. ✓ Check "Automated Decision System"
2. ✓ Verify "Open.gov AIA ID" field appears
3. ✓ Enter AIA ID: "HC-AIA-2024-001"
4. ✓ Check "Involves Personal Information"
5. ✓ Verify "Personal Information Banks" field appears
6. ✓ Enter PIBs: "Health records, Patient demographics"
7. ✓ Check "User Notification Required"
8. ✓ Click "Next"

**Step 4 - Operations:**
1. ✓ Select Status: "In Development"
2. ✓ Enter Status Year: "2024"
3. ✓ Enter Data Sources: "Electronic health records, Clinical databases"
4. ✓ Enter Outcomes: "Improved diagnostic accuracy, Reduced processing time"
5. ✓ Enter Source 1: "https://example.com/research"
6. ✓ Click "Next"

**Step 5 - Review:**
1. ✓ Verify all entered data appears in summary
2. ✓ Verify data organized by sections
3. ✓ Click "Edit" button for any section
4. ✓ Verify navigation back to that step
5. ✓ Navigate back to Review step
6. ✓ Select Moderation State: "Published"
7. ✓ Click "Submit Project" button
8. ✓ Verify success message appears
9. ✓ Verify navigation to project list
10. ✓ Verify new project appears in list

**Autosave Test:**
1. Start new submission
2. Fill in Step 1
3. ✓ Wait 30 seconds
4. ✓ Verify autosave indicator appears
5. ✓ Refresh page
6. ✓ Verify draft loads automatically (if implemented)

**Expected Result:** Complete submission creates new project, all validation works

---

#### ✅ 8. AI Assistant - Query Interface

**Test:** AI chat interface and interactions

**Opening Chat:**
1. ✓ Locate "AI Assistant" button in header
2. ✓ Click to open chat sidebar
3. ✓ Verify sidebar slides in from right
4. ✓ Verify "Online - Ready to assist" status badge
5. ✓ Verify welcome message appears
6. ✓ Verify conversation starters appear

**Stats Query:**
1. ✓ Click suggestion: "How many AI projects are in production?"
2. ✓ Verify loading indicator ("Thinking...")
3. ✓ Verify AI response with statistics
4. ✓ Verify timestamp on messages
5. ✓ Verify follow-up suggestions appear

**Search Query:**
1. ✓ Type in input: "Show me all chatbot projects"
2. ✓ Press Enter or click Send
3. ✓ Verify user message appears
4. ✓ Verify AI response with project list
5. ✓ Verify project cards appear
6. ✓ Click on project card
7. ✓ Verify navigation to project details

**Custom Queries:**
1. ✓ Try: "Which projects involve personal information?"
2. ✓ Verify filtering works correctly
3. ✓ Try: "List projects by Service Canada"
4. ✓ Verify organization filtering
5. ✓ Try: "Find all projects in development"
6. ✓ Verify status filtering

**Chat Controls:**
1. ✓ Click minimize button
2. ✓ Verify chat header only visible
3. ✓ Click maximize button
4. ✓ Verify full chat restored
5. ✓ Click close (X) button
6. ✓ Verify chat closes
7. ✓ Verify floating toggle button appears

**Expected Result:** AI understands queries, returns relevant results, suggestions work

---

#### ✅ 9. Excel Export

**Test:** Export projects to Excel
1. Navigate to Projects page
2. ✓ Click "Export" button (if visible in UI)
   - OR use API directly: `curl http://localhost:3001/api/registry/export --output projects.xlsx`
3. ✓ Verify .xlsx file downloads
4. ✓ Open file in Excel/Google Sheets
5. ✓ Verify all 6 projects appear
6. ✓ Verify all columns present:
   - Name, Organization, Description
   - Status, Capabilities, Primary Users
   - ADS, PIB, etc.
7. ✓ Verify data matches database

**Expected Result:** Excel file contains all project data

---

#### ✅ 10. Excel Import

**Test:** Import projects from Excel

**Preparation:**
1. ✓ Export existing projects (see Test 9)
2. ✓ Open Excel file
3. ✓ Modify existing row:
   - Change project name to "Modified Test Project"
   - Change status to "In Production"
4. ✓ Add new row:
   - Name: "Imported AI Project"
   - Organization: "Service Canada"
   - Description: "This project was imported from Excel"
   - Status: "In Development"
   - ... fill other required fields
5. ✓ Save file as `import-test.xlsx`

**Import:**
1. Use API to import:
   ```bash
   curl -X POST http://localhost:3001/api/registry/import \
     -F "file=@import-test.xlsx"
   ```
2. ✓ Verify response shows success
3. ✓ Verify import results:
   - Updated count
   - Created count
   - Any errors
4. Navigate to Projects page
5. ✓ Verify modified project updated
6. ✓ Verify new project appears
7. ✓ Click on new project
8. ✓ Verify all imported data correct

**Expected Result:** Import updates existing and creates new projects

---

#### ✅ 11. Theme Toggle

**Test:** Dark/light mode switching
1. ✓ Locate theme toggle button (Sun/Moon icon) in header
2. ✓ Click to toggle dark mode
3. ✓ Verify colors invert
4. ✓ Verify all text readable
5. ✓ Click to toggle back to light mode
6. ✓ Verify preference persists on page refresh

**Expected Result:** Theme toggles smoothly, persists in localStorage

---

#### ✅ 12. Responsive Design

**Test:** Mobile and tablet layouts

**Desktop (1920px):**
1. ✓ Verify sidebar visible
2. ✓ Verify chat sidebar overlay
3. ✓ Verify project grid shows multiple columns

**Tablet (768px):**
1. ✓ Resize browser to 768px wide
2. ✓ Verify sidebar collapsible
3. ✓ Verify project grid adjusts
4. ✓ Verify chat sidebar full-width

**Mobile (375px):**
1. ✓ Resize to 375px wide
2. ✓ Verify hamburger menu appears
3. ✓ Verify single column project layout
4. ✓ Verify all buttons accessible
5. ✓ Verify forms usable

**Expected Result:** Layout adapts to all screen sizes

---

#### ✅ 13. API Endpoints

**Test:** Direct API testing

**Health Check:**
```bash
curl http://localhost:3001/health
# Expected: { "status": "OK" }
```

**List Projects:**
```bash
curl http://localhost:3001/api/projects
# Expected: JSON with projects array
```

**Get Single Project:**
```bash
curl http://localhost:3001/api/projects/1
# Expected: Single project object
```

**Create Project:**
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Project",
    "organizationId": "1",
    "description": "Testing API endpoint directly with curl command",
    "capabilities": "API testing, endpoint validation, integration testing",
    "primaryUsers": "Employees",
    "developedBy": "In-house",
    "status": "InDevelopment",
    "statusYear": "2024",
    "isAutomatedDecisionSystem": false,
    "involvesPersonalInfo": false,
    "hasUserNotification": false,
    "moderationState": "Published"
  }'
# Expected: Created project with ID
```

**Filter Projects:**
```bash
# By status
curl "http://localhost:3001/api/projects?status=InProduction"

# By organization
curl "http://localhost:3001/api/projects?organizationId=1"

# By search
curl "http://localhost:3001/api/projects?search=chatbot"

# Combined
curl "http://localhost:3001/api/projects?status=InProduction&search=chatbot&limit=5"
```

**Organizations:**
```bash
curl http://localhost:3001/api/organizations
# Expected: Array of 6 organizations
```

**AI Assistant:**
```bash
curl -X POST http://localhost:3001/api/assistant/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many projects are in production?"}'
# Expected: AI response with stats
```

**Expected Result:** All endpoints return correct data

---

#### ✅ 14. Error Handling

**Test:** Application handles errors gracefully

**Validation Errors:**
1. Try submitting wizard without required fields
2. ✓ Verify error messages appear
3. ✓ Verify user-friendly messages

**404 Errors:**
1. Navigate to non-existent project: `/project/999999`
2. ✓ Verify error page or message
3. ✓ Verify navigation back to safety

**Network Errors:**
1. Stop backend server
2. ✓ Try loading projects page
3. ✓ Verify error message appears
4. ✓ Restart backend
5. ✓ Verify app recovers

**Expected Result:** Errors handled gracefully, user informed

---

#### ✅ 15. Accessibility

**Test:** Keyboard navigation and screen readers

**Keyboard Navigation:**
1. ✓ Press Tab key repeatedly
2. ✓ Verify focus visible on all interactive elements
3. ✓ Verify focus order logical
4. ✓ Press Enter on buttons
5. ✓ Verify actions trigger
6. ✓ Use arrow keys in dropdowns
7. ✓ Verify selection works

**ARIA Labels:**
1. ✓ Inspect buttons with dev tools
2. ✓ Verify aria-label attributes
3. ✓ Verify role attributes
4. ✓ Verify semantic HTML

**Screen Reader Test (if available):**
1. ✓ Enable screen reader (NVDA, JAWS, VoiceOver)
2. ✓ Navigate through page
3. ✓ Verify all elements announced
4. ✓ Verify form labels read correctly

**Expected Result:** Full keyboard accessibility, proper ARIA labels

---

### Docker Testing

#### ✅ 16. Docker Development

**Test:** Development environment with Docker

```bash
# 1. Build and start
docker-compose -f docker-compose.dev.yml up

# 2. Verify services running
docker-compose -f docker-compose.dev.yml ps

# 3. Check logs
docker-compose -f docker-compose.dev.yml logs -f

# 4. Test hot reload
# Edit a file in src/ and verify changes appear without rebuild

# 5. Stop
docker-compose -f docker-compose.dev.yml down
```

**Expected Result:** Hot reload works, volumes sync correctly

---

#### ✅ 17. Docker Production

**Test:** Production build and deployment

```bash
# 1. Build images
docker-compose build

# 2. Start services
docker-compose up -d

# 3. Verify health
docker-compose ps
# Both services should show "healthy"

# 4. Test frontend
curl http://localhost
# Should return HTML

# 5. Test backend
curl http://localhost:3001/health
# Should return {"status":"OK"}

# 6. Initialize database
docker-compose exec backend npx prisma db push
docker-compose exec backend npx prisma db seed

# 7. Test application
# Navigate to http://localhost in browser

# 8. View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# 9. Stop
docker-compose down

# 10. Remove volumes (destructive)
docker-compose down -v
```

**Expected Result:** Production deployment works, containers healthy

---

## Feature Guide

### Using the AI Assistant

The AI Assistant uses natural language processing to help you discover projects. Here's how to use it effectively:

#### Opening the Assistant
- Click the "AI Assistant" button in the header (has a robot icon)
- The chat sidebar will slide in from the right
- You'll see a welcome message and conversation starters

#### Query Types

**1. Statistics Queries**
Ask about counts and totals:
- "How many AI projects are in production?"
- "What's the total number of projects?"
- "Count all chatbot projects"

**Response includes:**
- Total project count
- Breakdown by status
- Follow-up suggestions

**2. Search Queries**
Find specific projects:
- "Show me all chatbot projects"
- "Find projects by Service Canada"
- "List all projects in development"
- "Looking for projects involving personal information"

**Response includes:**
- List of matching projects
- Clickable project cards
- Follow-up suggestions

**3. Compliance Queries**
Filter by compliance requirements:
- "Which projects are Automated Decision Systems?"
- "Show projects involving personal information"
- "List all projects with PIBs"

**4. Department Queries**
Filter by organization:
- "What AI projects does Health Canada have?"
- "Show me Service Canada's projects"
- "List all ESDC projects"

#### Tips for Better Results
- Use specific keywords: "chatbot", "NLP", "vision", "translation"
- Mention status: "in development", "production", "retired"
- Combine criteria: "Show chatbot projects in production"
- Be conversational - the AI understands natural language

#### Project Cards
When projects appear in chat:
- Click any card to view full details
- Cards show: name, organization, description, status
- Direct navigation to project detail page

#### Suggestions
- Click any suggestion to automatically ask that question
- Suggestions are context-aware based on your previous query
- Use suggestions to explore related information

### Using the Submission Wizard

The multi-step wizard guides you through creating a new AI project.

#### Starting a Submission
1. Click "Add Project" button in header
2. Wizard opens at Step 1 of 5
3. Progress indicator shows current step

#### Step-by-Step Guide

**Step 1: Identity**
- **Project Name** (required, 3-200 chars)
  - Be descriptive and specific
  - Example: "Customer Service Chatbot"
- **Organization** (required)
  - Select from dropdown
  - Searchable - start typing department name
- **Service Inventory ID** (optional)
  - If your project has one, enter it here
- Click "Next" to continue

**Step 2: Purpose**
- **Description** (required, 50-2000 chars)
  - Explain what the project does
  - Include key objectives and scope
  - Character counter shows remaining chars
- **Capabilities** (required, 50-1000 chars)
  - List technical capabilities
  - Example: "Natural language understanding, sentiment analysis, multi-turn conversations"
- **Primary Users** (required)
  - Employees, Members of Public, or Both
- **Developed By** (required)
  - In-house, Vendor, or Partnership
  - If Vendor selected, "Vendor Name" field appears
- Click "Next"

**Step 3: Compliance**
- **Automated Decision System** (checkbox)
  - Check if project makes automated decisions
  - Opens "Open.gov AIA ID" field if checked
- **Involves Personal Information** (checkbox)
  - Check if PIBs are involved
  - Opens "Personal Information Banks" field
  - Multi-line text area for listing PIBs
- **User Notification Required** (checkbox)
  - Check if users must be notified
- **ATIP Request References** (optional)
  - Multi-line for reference numbers
- Click "Next"

**Step 4: Operations**
- **Status** (required)
  - In Development, In Production, or Retired
- **Status Year** (required)
  - 4-digit year (e.g., 2024)
- **Data Sources** (optional)
  - Multi-line description of data used
- **Outcomes** (optional)
  - Expected or achieved outcomes
- **Source References** (optional)
  - URL fields for documentation
- Click "Next"

**Step 5: Review**
- Review all entered information
- Organized by sections matching previous steps
- Edit buttons navigate back to specific steps
- **Moderation State** (required)
  - Draft - saves but not publicly visible
  - Published - immediately visible to public
- Click "Submit Project"
- Success message confirms creation
- Redirects to project list

#### Special Features

**Character Counters:**
- Show remaining characters in real-time
- Color-coded:
  - Gray: plenty of space
  - Yellow: nearing limit
  - Red: over limit (if max enforced)

**Conditional Fields:**
- Some fields appear based on selections
- Example: Vendor Name only if "Vendor" selected
- PIB field only if "Involves Personal Information" checked

**Autosave:**
- Form automatically saves every 30 seconds
- Indicator shows "Saving..." when active
- Draft saved to prevent data loss

**Validation:**
- Real-time validation on field blur
- Error messages below fields
- Submit button disabled if errors present
- Required fields marked with asterisk (*)

**Navigation:**
- "Previous" button returns to prior step
- "Next" validates current step
- "Save Draft" button available on all steps
- Progress bar shows completion percentage

### Using Advanced Filters

Filters help you narrow down the project list to find exactly what you need.

#### Opening Filters
- Click "Filters" button on Projects page
- Panel expands showing all filter options
- Badge shows count of active filters

#### Filter Options

**1. Search**
- Text input for name and description search
- Searches both fields simultaneously
- Case-insensitive
- Real-time filtering

**2. Organization**
- Multi-select dropdown
- All 6 government departments listed
- Select multiple organizations
- Results show projects from ANY selected organization (OR logic)

**3. Status**
- Single-select dropdown
- Options: In Development, In Production, Retired
- Filter to specific project lifecycle stage

**4. Compliance**
- **Automated Decision Systems** (checkbox)
  - Shows only ADS projects
- **Personal Information Banks** (checkbox)
  - Shows only projects with PIBs
- Both can be selected together (AND logic)

**5. Primary Users**
- Single-select dropdown
- Options: Employees, Members of Public, Both
- Filter by intended audience

#### Filter Chips
- Active filters shown as chips above results
- Each chip shows filter type and value
- Click X on chip to remove individual filter
- "Clear all" button removes all filters at once

#### Combining Filters
- All filters use AND logic when combined
- Example: "Service Canada" + "In Production" + "ADS"
  - Shows only Service Canada projects
  - That are in production
  - AND are Automated Decision Systems
- More filters = more specific results

#### URL Synchronization
- Filters reflected in URL parameters
- Example: `?organizationId=1&status=InProduction`
- Shareable URLs with filters applied
- Browser back/forward buttons work

### Using Sort Controls

Sort controls determine the order projects are displayed.

#### Sort Fields
- **Created Date** - When project was added (default)
- **Name** - Alphabetical by project name
- **Status** - Grouped by status

#### Sort Order
- **Descending** - Newest first, Z-A (default)
- **Ascending** - Oldest first, A-Z

#### Examples
- "Created Date" + "Descending" = Newest projects first
- "Name" + "Ascending" = Alphabetical A-Z
- "Status" + "Descending" = Production → Development → Retired

### Excel Import/Export

#### Exporting Projects

**Using API:**
```bash
curl http://localhost:3001/api/registry/export --output projects.xlsx
```

**File Contents:**
- All published projects
- All 28 project fields
- Formatted headers
- Bilingual organization names

**Use Cases:**
- Bulk data analysis
- Offline reporting
- Data backup
- External sharing

#### Importing Projects

**Preparation:**
1. Export current projects or create new Excel file
2. Use exported file as template
3. Edit/add rows as needed
4. Ensure required fields populated

**Required Fields:**
- name
- organizationId (must exist in database)
- description
- capabilities
- primaryUsers
- developedBy
- status
- statusYear
- moderationState

**Using API:**
```bash
curl -X POST http://localhost:3001/api/registry/import \
  -F "file=@projects.xlsx"
```

**Response:**
```json
{
  "message": "Import completed",
  "result": {
    "created": 3,
    "updated": 2,
    "errors": []
  }
}
```

**Logic:**
- Rows with existing `aiRegisterId` → Update
- Rows without `aiRegisterId` → Create new
- Invalid rows → Errors array

---

## API Documentation

### Base URL
```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

### Authentication
Currently, no authentication required. All endpoints are public.

### Response Format
All endpoints return JSON:
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Errors return:
```json
{
  "error": "Error message",
  "details": "Additional information"
}
```

### Endpoints

#### Projects

**GET /api/projects**
List all published projects with filtering and pagination.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `search` (string) - Search in name/description
- `status` (string) - Filter by status
- `organizationId` (string) - Filter by organization
- `isAutomatedDecisionSystem` (boolean) - Filter ADS
- `involvesPersonalInfo` (boolean) - Filter PIB
- `primaryUsers` (string) - Filter by users
- `sort` (string) - Sort field (createdAt, name, status)
- `order` (string) - Sort order (asc, desc)

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Project Name",
      "description": "Description...",
      "status": "InProduction",
      "organization": {
        "id": "1",
        "nameEN": "Service Canada"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

**GET /api/projects/:id**
Get single project by ID.

**Response:**
```json
{
  "id": "1",
  "name": "Project Name",
  "description": "Full description...",
  "capabilities": "List of capabilities...",
  "status": "InProduction",
  "statusYear": "2024",
  "organization": {
    "id": "1",
    "nameEN": "Service Canada",
    "nameFR": "Service Canada"
  },
  "isAutomatedDecisionSystem": true,
  "involvesPersonalInfo": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**POST /api/projects**
Create new project.

**Request Body:**
```json
{
  "name": "New Project",
  "organizationId": "1",
  "description": "Detailed description of the project (min 50 chars)",
  "capabilities": "Technical capabilities (min 50 chars)",
  "primaryUsers": "Employees",
  "developedBy": "In-house",
  "status": "InDevelopment",
  "statusYear": "2024",
  "isAutomatedDecisionSystem": false,
  "involvesPersonalInfo": false,
  "hasUserNotification": false,
  "moderationState": "Published"
}
```

**Response:** Created project object with generated ID

**PUT /api/projects/:id**
Update existing project.

**Request Body:** Same as POST, all fields optional

**Response:** Updated project object

**DELETE /api/projects/:id**
Archive project (soft delete).

**Response:**
```json
{
  "message": "Project archived successfully",
  "project": { /* archived project */ }
}
```

#### Organizations

**GET /api/organizations**
List all organizations with project counts.

**Query Parameters:**
- `search` (string) - Search by name

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "nameEN": "Service Canada",
      "nameFR": "Service Canada",
      "acronym": "SC",
      "url": "https://www.canada.ca/en/employment-social-development.html",
      "_count": {
        "projects": 12
      }
    }
  ]
}
```

**GET /api/organizations/:id**
Get single organization.

**POST /api/organizations**
Create new organization.

**Request Body:**
```json
{
  "nameEN": "Organization Name",
  "nameFR": "Nom de l'organisation",
  "acronym": "ORG",
  "url": "https://example.gc.ca"
}
```

**PUT /api/organizations/:id**
Update organization.

**DELETE /api/organizations/:id**
Delete organization (only if no projects).

#### Registry (Import/Export)

**POST /api/registry/import**
Import projects from Excel file.

**Request:** multipart/form-data with `file` field

**Response:**
```json
{
  "message": "Import completed successfully",
  "result": {
    "created": 5,
    "updated": 3,
    "errors": [
      {
        "row": 12,
        "error": "Invalid status value"
      }
    ]
  }
}
```

**GET /api/registry/export**
Export projects to Excel.

**Query Parameters:**
- `organizationId` (string) - Filter by organization
- `status` (string) - Filter by status
- `moderationState` (string) - Filter by state

**Response:** Binary Excel file (.xlsx)

#### AI Assistant

**POST /api/assistant/query**
Query the AI assistant with natural language.

**Request Body:**
```json
{
  "query": "How many projects are in production?"
}
```

**Response:**
```json
{
  "success": true,
  "query": "How many projects are in production?",
  "response": {
    "message": "I found 15 AI projects in production. Breakdown by status: 15 production, 8 development, 2 retired.",
    "stats": {
      "total": 15,
      "byStatus": [
        { "status": "InProduction", "count": 15 }
      ]
    },
    "suggestions": [
      "Show me all production projects",
      "Which projects involve personal information?",
      "List all chatbot projects"
    ]
  }
}
```

**GET /api/assistant/starters**
Get conversation starter suggestions.

**Response:**
```json
{
  "success": true,
  "starters": [
    "How many AI projects are in production?",
    "Show me all chatbot projects",
    "Which projects are Automated Decision Systems?",
    "List projects involving personal information"
  ]
}
```

### Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Rate Limiting
Currently no rate limiting. Production should implement rate limiting.

### CORS
Development: Allows http://localhost:8080
Production: Configure for your domain

---

## Troubleshooting

### Common Issues

#### Backend won't start

**Error:** `Cannot find module 'express'`
```bash
# Solution: Install dependencies
cd server
npm install
```

**Error:** `Prisma client not generated`
```bash
# Solution: Generate Prisma client
cd server
npx prisma generate
```

**Error:** `Port 3001 already in use`
```bash
# Solution: Find and kill process
lsof -i :3001
kill -9 <PID>
```

#### Frontend won't start

**Error:** `Cannot find module '@/components'`
```bash
# Solution: Install dependencies
npm install
```

**Error:** `Failed to fetch`
```bash
# Solution: Ensure backend is running
cd server
npm run dev:server
```

#### Database issues

**Error:** `No such table: Project`
```bash
# Solution: Push schema to database
cd server
npx prisma db push
```

**Error:** `Database is empty`
```bash
# Solution: Seed database
cd server
npx prisma db seed
```

#### Docker issues

**Error:** `Cannot connect to Docker daemon`
```bash
# Solution: Ensure Docker is running
docker ps
```

**Error:** `Port is already allocated`
```bash
# Solution: Stop conflicting containers
docker ps
docker stop <container_id>
```

**Error:** `Build failed`
```bash
# Solution: Clean Docker cache
docker system prune -a
docker-compose build --no-cache
```

### Getting Help

1. Check error messages carefully
2. Review relevant documentation sections
3. Check browser console for frontend errors
4. Check terminal/logs for backend errors
5. Verify all prerequisites installed
6. Try stopping and restarting services

### Logs

**Backend logs:**
```bash
# Development
npm run dev:server
# Watch terminal output

# Docker
docker-compose logs -f backend
```

**Frontend logs:**
```bash
# Development
npm run dev
# Watch terminal output

# Docker
docker-compose logs -f frontend

# Browser console
# Open DevTools → Console tab
```

**Database logs:**
```bash
# Enable Prisma query logging
# Add to server/.env:
DEBUG=prisma:query
```

---

## Summary

This implementation provides a complete, production-ready platform for managing and discovering Government of Canada AI projects. Key features include:

- ✅ Comprehensive project registry
- ✅ Intelligent AI-powered search
- ✅ Advanced filtering and sorting
- ✅ Multi-step guided submission
- ✅ Excel import/export
- ✅ Responsive, accessible design
- ✅ RESTful API
- ✅ Docker deployment
- ✅ Full documentation

All features have been tested and are ready for use. The application follows best practices for TypeScript, React, Express, and modern web development.

For deployment instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md).
For project overview, see [README.md](../README.md).
