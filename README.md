# Products App

A minimal full-stack application for creating and listing products.

## Stack

- Frontend: React
- Backend: Spring Boot
- Database: PostgreSQL
- Container runtime: Docker Compose

## Simplified Launch

The app is designed to run through Docker Compose.

Container topology:

- `frontend` is exposed to the host at `http://localhost:3000`
- `backend` is internal-only
- `db` is internal-only

Browser traffic flows like this:

`browser -> frontend -> backend -> db`

The frontend proxies `/api/*` requests to the backend, so you do not need to expose the backend or database directly to the host.

## Prerequisites

- Docker Desktop
- Git

## Quick Start

From the repository root, run:

```bash
./scripts/launch_changed.sh
```

This script:

- detects local changes in `products-backend/` and `products-ui/`
- rebuilds only the images for the subsystems that changed
- starts the full stack with `docker compose up`

Then open:

```text
http://localhost:3000
```

## First Launch

On the first run, Docker will build the backend and frontend images, so startup will take longer.

Subsequent launches are faster because unchanged services reuse existing images.

## Verification

Open the UI:

```text
http://localhost:3000
```

Or test the proxied API through the frontend:

```bash
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/product \
  -H "Content-Type: application/json" \
  -d '{"name":"P1"}'
curl http://localhost:3000/api/products
```

## Useful Commands

Launch everything and rebuild changed app images only:

```bash
./scripts/launch_changed.sh
```

Force a full rebuild of all services:

```bash
docker compose up --build -d
```

Stop the stack:

```bash
docker compose down
```

See running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

## Notes

- The database initialization script is bind-mounted from [database/init.sql](/Users/yashrahmed/Documents/extern-github-repos/Products-App/database/init.sql).
- Backend and frontend application code are built into Docker images; source changes are not bind-mounted into the containers.
- If port `3000` is already in use, the frontend container will fail to bind until that process is stopped or the Compose port mapping is changed.
