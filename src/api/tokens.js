// Tiny persistence helper for auth tokens + the cached user profile.
import { STORAGE_KEYS } from "./config";

export const tokenStore = {
  getAccess() {
    return localStorage.getItem(STORAGE_KEYS.accessToken);
  },
  getRefresh() {
    return localStorage.getItem(STORAGE_KEYS.refreshToken);
  },
  setTokens({ access_token, refresh_token } = {}) {
    if (access_token) localStorage.setItem(STORAGE_KEYS.accessToken, access_token);
    if (refresh_token) localStorage.setItem(STORAGE_KEYS.refreshToken, refresh_token);
  },
  clear() {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
  },
  getUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.user);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setUser(user) {
    if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.user);
  },
};
