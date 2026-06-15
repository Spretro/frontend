// Auth endpoints — mirrors the SPRETRO Backend API (phone + OTP flow).
//
//   POST /auth/signup       { phone, full_name }      -> sends OTP
//   POST /auth/login        { phone }                 -> sends OTP
//   POST /auth/verify-otp   ?phone=&otp_code=         -> { access_token, refresh_token }
//   POST /auth/resend-otp   ?phone=
//   POST /auth/refresh      { refresh_token }
//   POST /auth/logout
//   GET  /auth/profile
//   PATCH /auth/profile     { full_name, email }
import { apiFetch } from "./client";

export const authApi = {
  // Register a new customer and trigger an OTP. Always hits the backend.
  signup({ phone, full_name }) {
    return apiFetch("/auth/signup", { method: "POST", body: { phone, full_name } });
  },

  // Request an OTP for an existing customer.
  login({ phone }) {
    return apiFetch("/auth/login", { method: "POST", body: { phone } });
  },

  // Exchange the OTP for access + refresh tokens.
  verifyOtp({ phone, otp_code }) {
    return apiFetch("/auth/verify-otp", {
      method: "POST",
      query: { phone, otp_code },
    });
  },

  resendOtp({ phone }) {
    return apiFetch("/auth/resend-otp", { method: "POST", query: { phone } });
  },

  refresh({ refresh_token }) {
    return apiFetch("/auth/refresh", { method: "POST", body: { refresh_token } });
  },

  logout() {
    return apiFetch("/auth/logout", { method: "POST", auth: true });
  },

  getProfile() {
    return apiFetch("/auth/profile", { auth: true });
  },

  updateProfile({ full_name, email }) {
    return apiFetch("/auth/profile", {
      method: "PATCH",
      auth: true,
      body: { full_name, email },
    });
  },
};
