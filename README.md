# SPRETRO Frontend

React + Vite storefront for SPRETRO — a Try & Buy fashion commerce platform.
Wired to the [SPRETRO Backend API](https://github.com/Spretro/Backend-Service)
for authentication and catalog.

## Quick start

```bash
npm install
cp .env.example .env      # set VITE_API_BASE_URL to your backend
npm run dev               # http://localhost:5173
npm run build             # production build -> dist/
npm run lint
```

## Backend integration

The backend base URL is read from `VITE_API_BASE_URL` (see `.env.example`,
default `http://localhost:8000`). The API layer lives in `src/api/`:

| File | Purpose |
| --- | --- |
| `config.js` | Base URL, storage keys, the built-in dummy account |
| `client.js` | `fetch` wrapper — JSON, query params, Bearer auth, 401 → refresh retry |
| `auth.js` | `/auth/*` endpoints (signup, login, verify-otp, refresh, profile, …) |
| `catalog.js` | `/catalog/*` endpoints + `normalizeProduct()` |
| `tokens.js` | Access/refresh token + cached user persistence |

### Auth model

- **Sign up → always hits the backend.** Phone + name go to `POST /auth/signup`,
  which sends an OTP; the code is verified via `POST /auth/verify-otp`, and the
  returned tokens are stored. (`src/pages/Signup`)
- **Sign in → dummy account only, never hits the backend.** Logging in with the
  demo credentials below signs you in locally so the app is usable offline.
  (`src/pages/Login`)

```
Demo account →  demo@spretro.com  /  demo1234
```

Auth state is exposed through `useAuth()` (`src/context/AuthContext.jsx`) and
reflected in the navbar account menu.

> Catalog/product data is still rendered from the bundled mock data
> (DummyJSON) so the storefront works without the backend running. Swap the
> relevant components over to `catalogApi` once the backend serves product
> images.

## Project structure

```
src/
├── api/             # Backend client + endpoint modules
├── components/      # Layout, sections, shared UI
├── context/         # AuthContext, CartContext
├── data/            # Bundled mock catalog data
├── hooks/           # useProduct, useCheckout
├── lib/             # Helpers/constants
├── pages/           # Route pages (Home, Login, Signup, ProductPage, …)
├── utils/           # currency, etc.
├── App.jsx          # Providers + routing
└── main.jsx         # Entry point
```

## Tech

React 19 · Vite 8 · React Router 7 · Tailwind CSS 4 · Lucide icons
