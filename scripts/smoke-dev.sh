#!/usr/bin/env bash
# Simple smoke test helper for local dev
# Starts backend and frontend in background (logs to ./logs/) and checks health endpoints.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

echo "Starting dev smoke test..."

# Start backend
echo "Starting Django backend (ansaf backend/manage.py runserver 127.0.0.1:8000) -> $LOG_DIR/backend.log"
nohup python3 "${ROOT_DIR}/ansaf backend/manage.py" runserver 127.0.0.1:8000 > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Start frontend
echo "Starting Vite frontend (npm run dev) -> $LOG_DIR/frontend.log"
cd "$ROOT_DIR"
nohup npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo "Waiting up to 15s for services to become available..."
SLEEP_SECS=0
MAX_SECS=15
BACKEND_OK=0
FRONTEND_OK=0

while [ $SLEEP_SECS -lt $MAX_SECS ]; do
  if [ $BACKEND_OK -eq 0 ]; then
    if curl -sSf --max-time 2 http://127.0.0.1:8000/ > /dev/null 2>&1; then
      BACKEND_OK=1
      echo "Backend is responding"
    fi
  fi

  if [ $FRONTEND_OK -eq 0 ]; then
    # Vite may choose 3000 or 3001; try both
    if curl -sSf --max-time 2 http://localhost:3000/ > /dev/null 2>&1 || curl -sSf --max-time 2 http://localhost:3001/ > /dev/null 2>&1; then
      FRONTEND_OK=1
      echo "Frontend is responding"
    fi
  fi

  if [ $BACKEND_OK -eq 1 ] && [ $FRONTEND_OK -eq 1 ]; then
    break
  fi

  sleep 1
  SLEEP_SECS=$((SLEEP_SECS + 1))
done

echo "--- Summary ---"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Backend URL: http://127.0.0.1:8000/"

if [ $FRONTEND_OK -eq 1 ]; then
  echo "Frontend likely on http://localhost:3000/ or http://localhost:3001/ (check $LOG_DIR/frontend.log)"
else
  echo "Frontend not responding yet - check $LOG_DIR/frontend.log"
fi

echo "Checking proxied API /api/posts/ via frontend"
FRONT_URL="http://localhost:3000"
if ! curl -sSf --max-time 3 "$FRONT_URL/api/posts/" > /dev/null 2>&1; then
  FRONT_URL="http://localhost:3001"
fi

echo "Probing $FRONT_URL/api/posts/ ..."
if curl -sS -i --max-time 5 "$FRONT_URL/api/posts/" 2>&1 | sed -n '1,120p'; then
  echo "Proxy request returned above."
else
  echo "Proxy request failed - check backend and Vite proxy settings."
fi

echo "Logs:"
echo "  Backend: $LOG_DIR/backend.log"
echo "  Frontend: $LOG_DIR/frontend.log"

echo "Smoke test finished. To stop servers: kill $BACKEND_PID $FRONTEND_PID"
