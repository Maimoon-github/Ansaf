Developer setup and smoke test

This file documents how to start the frontend (Vite) and backend (Django) for local development, verify they are reachable, and limit open ports.

1) Start backend (Django)

  cd "ansaf backend"
  python3 manage.py runserver 127.0.0.1:8000

  Confirm it's running:

  curl -I http://127.0.0.1:8000/

2) Start frontend (Vite)

  In the project root:

  npm install
  npm run dev

  The dev server usually runs on http://localhost:3000/ (if 3000 is used, Vite will pick 3001).

3) Verify proxied API

  The Vite dev config proxies /api -> http://127.0.0.1:8000. Check:

  curl -i http://localhost:3000/api/posts/

4) Firewall / ports (recommended for safety)

  Only expose the ports you need. For local development you generally need only:
  - 127.0.0.1:8000 (Django) and 127.0.0.1:3000 (Vite)

  With ufw (example):

  sudo ufw allow from 127.0.0.1 to any port 8000 proto tcp
  sudo ufw allow from 127.0.0.1 to any port 3000 proto tcp

  Or allow dev subnet only (replace with your subnet):

  sudo ufw allow from 192.168.1.0/24 to any port 3000 proto tcp
  sudo ufw allow from 192.168.1.0/24 to any port 8000 proto tcp

5) Quick smoke test

  Use the included script:

  chmod +x scripts/smoke-dev.sh
  scripts/smoke-dev.sh

6) Troubleshooting

  - If you see "ECONNREFUSED 127.0.0.1:8000" in Vite logs, ensure Django is running on 127.0.0.1:8000.
  - If you get CSRF 403 responses, ensure CSRF cookies are issued and axios/fetch includes credentials.
  - To reduce accidental exposure, change `server.host` in `vite.config.ts` from "::" to "127.0.0.1".
