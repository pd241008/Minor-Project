.PHONY: dev dev-backend install build start lint

# Start both frontend and backend
dev:
	@echo "Cleaning up existing processes..."
	-@fuser -k 3000/tcp 2>/dev/null || true
	-@fuser -k 8000/tcp 2>/dev/null || true
	-@lsof -ti :3000 | xargs kill -9 2>/dev/null || true
	-@lsof -ti :8000 | xargs kill -9 2>/dev/null || true
	@echo "Starting backend and frontend..."
	@make -j 2 dev-backend dev-frontend

dev-frontend:
	cd nextjs-frontend && npm run dev

dev-backend:
	cd backend && if [ -f ../.venv/bin/activate ]; then . ../.venv/bin/activate && uvicorn main:app --reload; else uvicorn main:app --reload; fi

# Install dependencies for Next.js app
install:
	cd nextjs-frontend && npm install

build:
	cd nextjs-frontend && npm run build

start:
	cd nextjs-frontend && npm run start

lint:
	cd nextjs-frontend && npm run lint
