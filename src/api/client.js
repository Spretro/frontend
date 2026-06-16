// Thin fetch wrapper around the SPRETRO backend.
//
// Responsibilities:
//   - Prefix every request with API_BASE_URL.
//   - Serialise query params + JSON bodies.
//   - Attach the Bearer access token when `auth: true`.
//   - On a 401, try the refresh token once, then retry the original request.
//   - Surface a consistent ApiError shape to callers.
import { API_BASE_URL } from "./config";
import { tokenStore } from "./tokens";

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildUrl(path, query) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }
  return url.toString();
}

async function parseBody(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Pull a human-readable message out of FastAPI's error shapes.
function errorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail) && data.detail[0]?.msg) return data.detail[0].msg;
  return fallback;
}

let refreshPromise = null;

async function refreshAccessToken() {
  const refresh_token = tokenStore.getRefresh();
  if (!refresh_token) return false;

  // Collapse concurrent refreshes into a single request.
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(buildUrl("/auth/refresh"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token }),
        });
        if (!res.ok) return false;
        const data = await parseBody(res);
        if (data?.access_token) {
          tokenStore.setTokens(data);
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

export async function apiFetch(
  path,
  { method = "GET", body, query, auth = false, _retry = false } = {}
) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = tokenStore.getAccess();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth && !_retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(path, { method, body, query, auth, _retry: true });
    }
    tokenStore.clear();
  }

  const data = await parseBody(res);
  if (!res.ok) {
    throw new ApiError(errorMessage(data, `Request failed (${res.status})`), {
      status: res.status,
      data,
    });
  }
  return data;
}
