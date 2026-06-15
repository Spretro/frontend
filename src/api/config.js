// Central configuration for talking to the SPRETRO backend.
//
// Auth model (per the brief):
//   - Sign UP always hits the live backend  -> POST /auth/signup + OTP verify.
//   - Sign IN uses a local dummy account    -> never touches the backend.
//   - Everything the dummy user sees (catalog, product, etc.) is rendered from
//     the data already bundled in the frontend so the app works with the
//     backend offline.

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

// localStorage keys
export const STORAGE_KEYS = {
  accessToken: "spretro_access_token",
  refreshToken: "spretro_refresh_token",
  user: "spretro_user",
};

// The built-in test account. Signing in with these credentials logs you in
// locally without a network request.
export const DUMMY_USER = {
  id: "dummy-user-0001",
  phone: "+919999999999",
  full_name: "Demo Shopper",
  email: "demo@spretro.com",
  role: "customer",
  is_active: true,
  created_at: "2026-01-01T00:00:00.000Z",
  isDummy: true,
};

export const DUMMY_CREDENTIALS = {
  email: "demo@spretro.com",
  password: "demo1234",
};
