# Avijit Biswas — Portfolio

Full-stack personal portfolio.

- **frontend/** — React 19 + Vite + Tailwind CSS v4
- **backend/** — Node.js + Express 5 + MongoDB (Mongoose)

All site content (education, experience, projects, CP ratings, achievements, skills) lives in
[`backend/src/data/profile.js`](backend/src/data/profile.js) and is served by `GET /api/profile`.
Edit that one file to update the site.

## Run locally

```bash
npm run install:all
cp backend/.env.example backend/.env   # then set ADMIN_TOKEN
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:5001

MongoDB is optional. If `MONGODB_URI` is empty or unreachable, contact messages are saved to
`backend/data/messages.json` instead.

## API

| Method | Path            | Description                                                     |
| ------ | --------------- | --------------------------------------------------------------- |
| GET    | `/api/health`   | Health check + which store is active (`mongo` / `file`)         |
| GET    | `/api/profile`  | Portfolio content                                               |
| POST   | `/api/contact`  | `{ name, email, subject?, message }` — validated, rate-limited  |
| GET    | `/api/messages` | Contact messages. Requires `Authorization: Bearer $ADMIN_TOKEN` |

Read your messages:

```bash
curl localhost:5001/api/messages -H "Authorization: Bearer <ADMIN_TOKEN>"
```

## Deploy to Vercel

The repo is set up as a single Vercel project (see [`vercel.json`](vercel.json)):

- the frontend is built to `frontend/dist` and served as static files
- every `/api/*` request is rewritten to [`api/index.js`](api/index.js), a serverless function
  that runs the same Express app used locally

Steps:

1. Create a free MongoDB Atlas cluster, add a database user, allow network access from
   `0.0.0.0/0` (Vercel has no fixed IPs), and copy the connection string.
2. On Vercel, **Add New → Project** and import this GitHub repo. Leave the build settings as they
   are — `vercel.json` provides them.
3. Add environment variables:
   - `MONGODB_URI` — your Atlas connection string (include a database name, e.g. `/portfolio`)
   - `ADMIN_TOKEN` — a long random string (`openssl rand -hex 24`)
4. Deploy. Check `https://<your-app>.vercel.app/api/health` — it should report `"store":"mongo"`.

Without `MONGODB_URI` the site still works, but the contact form returns a 503 (Vercel's filesystem
is read-only, so the local JSON fallback is disabled there).

## Other hosts

```bash
npm run build   # builds frontend/dist
npm start       # Express serves the API and the built site on one port
```

Set `PORT`, `MONGODB_URI`, `ADMIN_TOKEN` and `CORS_ORIGIN` in the host's environment.
