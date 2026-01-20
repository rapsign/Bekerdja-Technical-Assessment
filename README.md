# Candidate Tracker

A simple candidate tracker web app with frontend (React / Vite) and backend (Node.js + Express), using a local `json` file as database.

---

## Prerequisites

- Node.js v18+
- pnpm (or npm/yarn)

---

## Project Structure

```
/apps
  /frontend      # React / Vite frontend
  /backend       # Node.js + Express backend
/data
  data.json      # JSON database file
```

---

## Setup

1. Clone repository:

```bash
git clone <repo-url>
cd bekerdja-technical-assessment
```

2. Install dependencies:

```bash
pnpm install
```

3. Create `.env` for backend (if needed):

```
PORT=5000
```

---

## Development

### Run Frontend only

```bash
pnpm --filter ./apps/frontend run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

### Run Backend only

```bash
pnpm --filter ./apps/backend run dev
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

### Run Frontend + Backend together

**Option 1: Separate terminals**

- Terminal 1: `pnpm --filter ./apps/frontend run dev`
- Terminal 2: `pnpm --filter ./apps/backend run dev`

**Option 2: Single terminal (Windows)**

Add this to root `package.json`:

```json
"scripts": {
  "start:web": "pnpm --filter ./apps/frontend run dev",
  "start:api": "pnpm --filter ./apps/backend run dev",
  "dev": "start cmd /k \"pnpm run start:web\" & start cmd /k \"pnpm run start:api\""
}
```

Then run:

```bash
pnpm run dev
```

## Backend Notes

- `data.json` is used as a simple database.
- operations (read/add/update/delete) persist **only while server is running**.

## JSON Database Example

`data.json`:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "phone": "08123456789",
    "position": "Frontend Developer",
    "status": "New",
    "created_at": "2026-01-20T09:18:01.789Z"
  }
]
```

## Dependencies

- Frontend: React, Vite, ShadCN
- Backend: Node.js, Express, body-parser, cors, dotenv

## Dev

- Rinaldi A Prayuda [@rapsign](https://github.com/rapsign)

## Contact

For questions or support, please contact https://rinaldi-a-prayuda.vercel.app/

## License

[MIT](https://choosealicense.com/licenses/mit/)
