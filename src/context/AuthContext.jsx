import { createContext, useContext, useState, useCallback } from "react";
import { authApi } from "../api/auth";
import { tokenStore } from "../api/tokens";
import { DUMMY_USER, DUMMY_CREDENTIALS } from "../api/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Restore any persisted session on first render.
  const [user, setUser] = useState(() => tokenStore.getUser());

  const persist = useCallback((nextUser) => {
    setUser(nextUser);
    tokenStore.setUser(nextUser);
  }, []);

  // ── Sign IN — dummy account only, never touches the backend. ──
  // Returns { ok, error }. Matches against the bundled demo credentials.
  const signInWithDummy = useCallback(
    ({ email, password }) => {
      const emailOk =
        email.trim().toLowerCase() === DUMMY_CREDENTIALS.email.toLowerCase();
      const passOk = password === DUMMY_CREDENTIALS.password;
      if (!emailOk || !passOk) {
        return {
          ok: false,
          error: "Use the demo account — demo@spretro.com / demo1234",
        };
      }
      tokenStore.clear();
      persist(DUMMY_USER);
      return { ok: true };
    },
    [persist]
  );

  // ── Sign UP — always hits the live backend. ──
  // Step 1: register + trigger OTP.
  const signUp = useCallback(({ phone, full_name }) => {
    return authApi.signup({ phone, full_name });
  }, []);

  const resendOtp = useCallback(({ phone }) => {
    return authApi.resendOtp({ phone });
  }, []);

  // Step 2: verify OTP -> store tokens -> load the real profile.
  const verifyOtp = useCallback(
    async ({ phone, otp_code }) => {
      const tokens = await authApi.verifyOtp({ phone, otp_code });
      tokenStore.setTokens(tokens || {});
      let profile;
      try {
        profile = await authApi.getProfile();
      } catch {
        profile = { phone, full_name: "", role: "customer" };
      }
      persist(profile);
      return profile;
    },
    [persist]
  );

  const logout = useCallback(async () => {
    if (!user?.isDummy) {
      try {
        await authApi.logout();
      } catch {
        // best-effort; clear local session regardless
      }
    }
    tokenStore.clear();
    persist(null);
  }, [persist, user]);

  const value = {
    user,
    isAuthenticated: !!user,
    isDummy: !!user?.isDummy,
    signInWithDummy,
    signUp,
    resendOtp,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
