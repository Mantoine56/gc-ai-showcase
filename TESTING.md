# GC AI Hub - Testing Guide

This guide will help you test the implemented features of the GC AI Hub application.

## Prerequisites

- Node.js and npm installed
- All dependencies installed (`npm install` has been run)

## Running the Application

### Option 1: Run Both Frontend and Backend Together

```bash
npm run dev
```

This will start:
- Frontend (Vite): http://localhost:8080
- Backend (Express): http://localhost:3001

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev:client
```

## Test Scenarios

### 1. Backend API Tests

#### Health Check
```bash
curl http://localhost:3001/health
```
**Expected:** JSON response with status "ok"

#### Get Projects
```bash
curl "http://localhost:3001/api/projects?limit=5" | python3 -m json.tool
```
**Expected:** Paginated list of 5 projects with organization details

#### Get Single Project
```bash
# Replace PROJECT_ID with an actual ID from the projects list
curl "http://localhost:3001/api/projects/PROJECT_ID" | python3 -m json.tool
```
**Expected:** Detailed project information

#### Get Organizations
```bash
curl "http://localhost:3001/api/organizations" | python3 -m json.tool
```
**Expected:** List of all organizations with project counts

#### Search Projects
```bash
curl "http://localhost:3001/api/projects?query=chatbot" | python3 -m json.tool
```
**Expected:** Projects matching "chatbot" in name, description, or capabilities

#### Filter by Organization
```bash
# Replace ORG_ID with an actual organization ID
curl "http://localhost:3001/api/projects?organizationId=ORG_ID" | python3 -m json.tool
```
**Expected:** Projects from that organization only

#### Filter by Status
```bash
curl "http://localhost:3001/api/projects?status=InProduction" | python3 -m json.tool
```
**Expected:** Only projects with status "InProduction"

#### Export to Excel
```bash
curl "http://localhost:3001/api/registry/export" --output export.xlsx
```
**Expected:** Downloaded Excel file with all published projects

Open the file in Excel/LibreOffice to verify:
- 21 columns matching the GC AI Registry template
- All project data formatted correctly
- Yes/No values for boolean fields
- Proper status labels (In Production, In Development, Retired)

### 2. Frontend Tests

Open http://localhost:8080 in your browser.

#### Dashboard View
- [ ] Dashboard loads without errors
- [ ] Stats cards show correct counts:
  - Total Projects: 6
  - Departments: 6
  - Featured: 3 (or as seeded)
  - In Production: 3 (or as seeded)
- [ ] Project cards display with correct information
- [ ] Featured badge appears on featured projects
- [ ] ADS (Automated Decision System) badge appears when applicable
- [ ] PI (Personal Information) badge appears when applicable

#### Search Functionality
- [ ] Type "chatbot" in search box
- [ ] Results update automatically
- [ ] Matching projects are highlighted
- [ ] No results message shows when no matches

#### Tabs
- [ ] Click "Featured" tab - shows only featured projects
- [ ] Click "Trending" tab - shows projects sorted by status
- [ ] Click "Recent" tab - shows recent projects
- [ ] Click "All" tab - shows all projects
- [ ] Tab counts update correctly

#### Project Cards
- [ ] Project cards show:
  - Project name
  - Organization name
  - Status badge (Development/Production/Retired)
  - Description (truncated to 3 lines)
  - Capabilities as tags
  - Developed by info
  - Primary Users info
- [ ] Hover effect works (card lifts and shadow appears)
- [ ] "View Details" button is present

#### Filter System
- [ ] Department filter shows all organizations
- [ ] Selecting a department filters the list
- [ ] Multiple selections work
- [ ] Clear filters resets the view

### 3. API Integration Tests

#### Create a New Project

```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test AI System",
    "organizationId": "REPLACE_WITH_REAL_ORG_ID",
    "description": "This is a test AI system for demonstration purposes.",
    "primaryUsers": "Employees",
    "developedBy": "Government",
    "status": "InDevelopment",
    "statusYear": 2024,
    "capabilities": "Testing, Validation, Quality Assurance",
    "isAutomatedDecisionSystem": false,
    "involvesPersonalInfo": false,
    "hasUserNotification": true
  }' | python3 -m json.tool
```

**To get a real organization ID:**
```bash
curl http://localhost:3001/api/organizations | python3 -m json.tool | grep '"id"' | head -1
```

**Expected:** New project created with status 201

#### Update a Project

```bash
curl -X PUT http://localhost:3001/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description for testing purposes"
  }' | python3 -m json.tool
```

**Expected:** Updated project returned

#### Delete (Archive) a Project

```bash
curl -X DELETE http://localhost:3001/api/projects/PROJECT_ID | python3 -m json.tool
```

**Expected:** Success message and project marked as Archived

### 4. Excel Import Test

Create a test Excel file or use the existing `data.xlsx` file.

**Using curl:**
```bash
curl -X POST http://localhost:3001/api/registry/import \
  -F "file=@data.xlsx" | python3 -m json.tool
```

**Expected Response:**
```json
{
  "message": "Import completed successfully",
  "result": {
    "success": true,
    "imported": X,
    "errors": [],
    "warnings": []
  }
}
```

**Check imported data:**
```bash
curl "http://localhost:3001/api/projects" | python3 -m json.tool
```

### 5. Error Handling Tests

#### Invalid Project Creation (Missing Required Field)
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test"
  }' | python3 -m json.tool
```

**Expected:** Validation error with details about missing fields

#### Invalid Status Value
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "organizationId": "some-id",
    "description": "Test",
    "primaryUsers": "Employees",
    "developedBy": "Government",
    "status": "InvalidStatus"
  }' | python3 -m json.tool
```

**Expected:** Validation error about invalid status value

#### Non-existent Project
```bash
curl http://localhost:3001/api/projects/non-existent-id | python3 -m json.tool
```

**Expected:** 404 error with "Project not found" message

### 6. Database Tests

#### View Database in Prisma Studio
```bash
npm run db:studio
```

**Expected:** Opens Prisma Studio at http://localhost:5555
- Browse projects, organizations, users tables
- Verify data structure matches schema
- Check relationships (project → organization)

#### Reseed Database
```bash
npm run db:seed
```

**Expected:** Database cleared and reseeded with 6 sample projects

### 7. Performance Tests

#### Large Result Set
```bash
curl "http://localhost:3001/api/projects?limit=100" | python3 -m json.tool
```

**Expected:** Fast response (<500ms) with pagination info

#### Concurrent Requests
```bash
# Run multiple requests simultaneously
for i in {1..10}; do curl "http://localhost:3001/api/projects" & done
```

**Expected:** All requests complete successfully without errors

## Common Issues

### Backend doesn't start
- Check if port 3001 is already in use
- Verify .env file exists with correct DATABASE_URL
- Run `npm run db:generate` to regenerate Prisma client

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check .env.local has correct VITE_API_URL
- Check browser console for CORS errors

### No data showing in frontend
- Verify backend is running and accessible
- Check browser Network tab for API call responses
- Verify database has been seeded: `npm run db:seed`

### Excel export fails
- Check if any projects exist in database
- Verify all required fields are present in projects

## Next Steps

After testing these features, you can:
1. Test the submission wizard (Phase 4 - coming next)
2. Test enhanced filtering (Phase 5 - coming next)
3. Test AI Assistant queries (Phase 6 - coming next)
4. Deploy with Docker (Phase 7 - coming next)

## Reporting Issues

If you find any issues:
1. Check the backend logs (terminal running `npm run dev:server`)
2. Check browser console for frontend errors
3. Verify database state with Prisma Studio
4. Note the exact steps to reproduce the issue
