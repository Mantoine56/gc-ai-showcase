# GC AI Hub

> A comprehensive registry and transparency platform for Government of Canada AI initiatives

GC AI Hub is a modern web application designed to provide transparency and facilitate discovery of artificial intelligence projects across Government of Canada departments. The platform combines a robust project registry with intelligent search capabilities and an AI-powered assistant.

## Features

### Core Functionality

- **Project Registry** - Comprehensive database of AI projects with detailed metadata
- **Moderation Workflow** - `Draft -> Submitted -> Approved -> Published -> Archived`
- **Role-Gated Operations** - Submitter/Reviewer/Admin authorization model
- **Advanced Filtering** - Multi-faceted search and filtering capabilities
- **AI Assistant** - Deterministic search + optional OpenAI response synthesis (metadata-only context)
- **Multi-Step Submission** - Guided project submission workflow with validation
- **Excel Integration** - Import/export projects in Excel format
- **Responsive Design** - Mobile-first design using Government of Canada Design System (GCDS)
 - **Admin Analytics** - `/admin/stats` page with comprehensive KPIs and charts (toggle: Published vs All)

### Technical Highlights

- **Type-Safe** - Full TypeScript implementation across frontend and backend
- **Modern Stack** - React 18, Vite, Express, Prisma ORM
- **RESTful API** - Bilingual project contract with moderation endpoints
- **Production-Ready** - Docker deployment with health checks and monitoring
- **Accessible** - WCAG 2.1 AA compliant with ARIA support

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- SQLite 3

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gcaihub
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies (frontend)
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up the database:**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   cd ..
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   npm run dev:server

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

## Docker Deployment

### Quick Start

```bash
# Production
docker-compose up -d

# Development
docker-compose -f docker-compose.dev.yml up
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment documentation.

## Project Structure

```
gcaihub/
├── src/                        # Frontend source code
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   ├── chat/             # AI chat interface
│   │   ├── filters/          # Filter components
│   │   └── wizard/           # Submission wizard
│   ├── lib/                  # Utilities and API client
│   ├── pages/                # Page components
│   └── types/                # TypeScript types
├── server/                    # Backend source code
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── validation/      # Request validation
│   │   └── lib/             # Utilities
│   ├── prisma/              # Database schema and migrations
│   └── generated/           # Generated Prisma client
├── docker-compose.yml        # Production deployment
├── docker-compose.dev.yml    # Development deployment
└── DEPLOYMENT.md            # Deployment documentation
```

## API Documentation

### Projects API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all published projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create new draft project (authenticated) |
| PUT | `/api/projects/:id` | Update project |
| POST | `/api/projects/:id/submit` | Submit draft for review |
| POST | `/api/projects/:id/approve` | Approve submitted project |
| POST | `/api/projects/:id/publish` | Publish approved project (requires FR completeness) |
| POST | `/api/projects/:id/archive` | Archive project |
| DELETE | `/api/projects/:id` | Backward-compatible archive endpoint |

### Auth API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Return authenticated user and roles |

### Organizations API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/organizations` | List all organizations |
| GET | `/api/organizations/:id` | Get single organization |
| POST | `/api/organizations` | Create organization |
| PUT | `/api/organizations/:id` | Update organization |

### Registry API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registry/import` | Import projects from Excel |
| GET | `/api/registry/export` | Export projects to Excel |

### AI Assistant API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assistant/query` | Query AI assistant |
| GET | `/api/assistant/starters` | Get conversation starters |

### Query Parameters

**Projects List (`/api/projects`):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `query` - Search term for bilingual name/description/capabilities fields
- `status` - Filter by status (InDevelopment, InProduction, Retired)
- `organizationId` - Filter by organization
- `isAutomatedDecisionSystem` - Filter ADS projects (true/false)
- `involvesPersonalInfo` - Filter PIB projects (true/false)
- `moderationState` - Filter moderation state (reviewer/admin only for non-public states)
- `sortBy` - Sort field (`name`, `organization`, `createdAt`, `updatedAt`, `status`, `statusYear`)
- `sortOrder` - Sort order (`asc`, `desc`)

## Development

### Available Scripts

```bash
# Frontend
npm run dev                 # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint
npm run typecheck          # Run client + server type checks
npm run test:unit          # Run unit tests
npm run test:e2e           # Run API contract tests

# Backend
npm run dev:server         # Start backend dev server
npm run build              # Build TypeScript
npm run db:generate        # Generate Prisma client
npm run db:push            # Push schema to database
npm run db:seed            # Seed database
npm run db:migrate:deploy  # Apply migrations in deployment environments
npm run db:sqlite-to-postgres # Copy data from SQLite source to target DB

# Combined
npm run dev                # Run both frontend and backend
```

### Environment Variables

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:3001/api
VITE_ENTRA_CLIENT_ID=
VITE_ENTRA_TENANT_ID=
VITE_ENTRA_REDIRECT_URI=http://localhost:8080
```

**Backend (`.env`):**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=file:./dev.db
CLIENT_URL=http://localhost:8080
ENTRA_CLIENT_ID=
ENTRA_TENANT_ID=
ENTRA_ADMIN_GROUP_IDS=
ENTRA_REVIEWER_GROUP_IDS=
ENTRA_SUBMITTER_GROUP_IDS=
OPENAI_API_KEY=
OPENAI_ASSISTANT_MODEL=gpt-4o-mini
```

In local development, the client seeds `x-dev-user-id` and `x-dev-roles` headers automatically so protected endpoints are usable without Entra setup.

### Database Schema

The application uses SQLite with Prisma ORM. Key entities:

- **Project** - AI project with full metadata
- **Organization** - Government departments/agencies

See `server/prisma/schema.prisma` for the complete schema.

### Adding a New Feature

1. **Backend:**
   - Define route in `server/src/routes/`
   - Add validation schema in `server/src/validation/schemas.ts`
   - Implement business logic in `server/src/services/`
   - Register route in `server/src/index.ts`

2. **Frontend:**
   - Add API function to `src/lib/api.ts`
   - Create component in `src/components/`
   - Add types to `src/types/index.ts`
   - Update routing if needed

## Testing

### Manual Testing

1. **Project Submission:**
   - Navigate to "Add Project"
   - Complete all wizard steps
   - Verify validation and autosave
   - Submit and verify in project list

2. **Search & Filters:**
   - Test text search
   - Apply multiple filters
   - Test sort options
   - Verify pagination

3. **AI Assistant:**
   - Open chat sidebar
   - Try example queries
   - Test project cards and suggestions
   - Verify error handling

4. **Excel Import/Export:**
   - Export projects to Excel
   - Modify Excel file
   - Import modified file
   - Verify data integrity

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui with Radix UI
- **Styling:** Tailwind CSS + GCDS tokens
- **Data Fetching:** TanStack Query (React Query)
- **Form Management:** React Hook Form
- **Validation:** Zod

### Backend
- **Runtime:** Node.js 20
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** SQLite (Production: PostgreSQL ready)
- **Validation:** Zod
- **File Processing:** XLSX, Multer

### DevOps
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (production)
- **Process Manager:** PM2 ready

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The application follows WCAG 2.1 Level AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

## Security

- Input validation and sanitization
- SQL injection prevention (Prisma)
- CORS configuration
- Security headers (Helmet)
- File upload restrictions
- Rate limiting ready

## Performance

- Code splitting and lazy loading
- Image optimization
- Gzip compression
- Browser caching
- Database query optimization
- API response pagination

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions:
- Create an issue in the repository
- Review existing documentation in `DEPLOYMENT.md`
- Check API documentation at `/api-docs` endpoint

## Roadmap

- [ ] User authentication and authorization
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (English/French)
- [ ] Integration with GC APIs
- [ ] Email notifications
- [ ] Audit logging
- [ ] GraphQL API
- [ ] Mobile app

## Acknowledgments

- Government of Canada Design System (GCDS)
- Open Government Portal
- Treasury Board of Canada Secretariat
- All contributors and users

---

Built with ❤️ for the Government of Canada
