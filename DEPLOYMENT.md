# GC AI Hub - Deployment Guide

This guide covers deploying the GC AI Hub application using Docker and Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Development Deployment](#development-deployment)
- [Production Deployment](#production-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Management](#database-management)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose v2.0 or higher
- At least 2GB of available RAM
- Ports 80 and 3001 available on the host machine

## Quick Start with Docker

### Production Deployment

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gcaihub
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001

4. **Initialize the database:**
   ```bash
   docker-compose exec backend npx prisma db push
   docker-compose exec backend npx prisma db seed
   ```

5. **View logs:**
   ```bash
   docker-compose logs -f
   ```

6. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Development Deployment

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. **The development environment includes:**
   - Hot reload for both frontend and backend
   - Volume mounts for live code updates
   - Development-optimized builds

## Production Deployment

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend Configuration
NODE_ENV=production
PORT=3001
DATABASE_URL=file:../database.db
CORS_ORIGIN=http://localhost

# Frontend Configuration
VITE_API_URL=http://localhost:3001/api
```

### Build and Deploy

1. **Build images:**
   ```bash
   docker-compose build
   ```

2. **Start services:**
   ```bash
   docker-compose up -d
   ```

3. **Check service health:**
   ```bash
   docker-compose ps
   ```

4. **View service logs:**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

### Updating the Application

1. **Pull latest changes:**
   ```bash
   git pull
   ```

2. **Rebuild and restart:**
   ```bash
   docker-compose down
   docker-compose build
   docker-compose up -d
   ```

## Environment Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Backend server port | `3001` |
| `DATABASE_URL` | Prisma database connection | `file:../database.db` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001/api` |

## Database Management

### Initialize Database

```bash
# Push schema to database
docker-compose exec backend npx prisma db push

# Seed initial data
docker-compose exec backend npx prisma db seed
```

### Database Migrations

```bash
# Create a new migration
docker-compose exec backend npx prisma migrate dev --name <migration-name>

# Apply migrations in production
docker-compose exec backend npx prisma migrate deploy
```

### Database Backup

```bash
# Backup SQLite database
docker-compose exec backend cp database.db database.backup.db

# Copy backup to host
docker cp gcaihub-backend:/app/database.backup.db ./backup/
```

### Database Restore

```bash
# Copy backup to container
docker cp ./backup/database.backup.db gcaihub-backend:/app/database.db

# Restart backend
docker-compose restart backend
```

## Monitoring and Health Checks

### Health Check Endpoints

- Backend: `http://localhost:3001/health`
- Frontend: `http://localhost/health`

### Check Container Health

```bash
# View container status
docker-compose ps

# Check health status
docker inspect --format='{{.State.Health.Status}}' gcaihub-backend
docker inspect --format='{{.State.Health.Status}}' gcaihub-frontend
```

### Monitor Resource Usage

```bash
# Real-time stats
docker stats gcaihub-backend gcaihub-frontend

# View logs
docker-compose logs -f --tail=100
```

## Advanced Configuration

### Custom Ports

To use different ports, modify `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:3001"  # HOST:CONTAINER

  frontend:
    ports:
      - "8080:80"    # HOST:CONTAINER
```

### Persistent Volumes

Data persists in Docker volumes:

```bash
# List volumes
docker volume ls

# Backup volume
docker run --rm -v gcaihub_database-data:/data -v $(pwd):/backup alpine tar czf /backup/database-backup.tar.gz /data

# Restore volume
docker run --rm -v gcaihub_database-data:/data -v $(pwd):/backup alpine tar xzf /backup/database-backup.tar.gz -C /
```

### Production Optimization

#### Enable HTTPS

1. Update `nginx.conf` with SSL configuration
2. Mount SSL certificates as volumes
3. Update `docker-compose.yml` to expose port 443

#### Scale Services

```bash
# Scale backend instances
docker-compose up -d --scale backend=3
```

## Troubleshooting

### Container Won't Start

1. **Check logs:**
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

2. **Verify ports are available:**
   ```bash
   lsof -i :80
   lsof -i :3001
   ```

3. **Remove and recreate containers:**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### Database Issues

1. **Reset database:**
   ```bash
   docker-compose down
   rm server/database.db
   docker-compose up -d
   docker-compose exec backend npx prisma db push
   ```

2. **Check Prisma client:**
   ```bash
   docker-compose exec backend npx prisma generate
   ```

### Network Issues

1. **Check network connectivity:**
   ```bash
   docker network inspect gcaihub_gcaihub-network
   ```

2. **Recreate network:**
   ```bash
   docker-compose down
   docker network prune
   docker-compose up -d
   ```

### Performance Issues

1. **Check resource usage:**
   ```bash
   docker stats
   ```

2. **Increase resource limits in `docker-compose.yml`:**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             cpus: '2'
             memory: 2G
   ```

## Cleanup

### Remove All Containers and Images

```bash
# Stop and remove containers
docker-compose down

# Remove images
docker rmi gcaihub-backend gcaihub-frontend

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Clean up system
docker system prune -a
```

## Support

For issues and questions:
- Check logs: `docker-compose logs -f`
- Review health status: `docker-compose ps`
- Consult the main README.md for application-specific documentation
