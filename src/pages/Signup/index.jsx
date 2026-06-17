import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, verifyOtp, resendOtp } = useAuth();

  // "details" -> collect name + phone; "otp" -> verify the code.
  const [step, setStep] = useState("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const inputStyle = {
    width: "100%", height: 48, borderRadius: 12, border: "1.5px solid #E8DFFF",
    background: "#F9F7FF", padding: "0 16px", fontSize: 14, fontWeight: 500,
    color: "#222", outline: "none", boxSizing: "border-box", transition: "all 0.2s",
  };

  const onFocus = (e) => { e.target.style.borderColor = "#6A2CFF"; e.target.style.boxShadow = "0 0 0 4px rgba(106,44,255,0.08)"; };
  const onBlur = (e) => { e.target.style.borderColor = "#E8DFFF"; e.target.style.boxShadow = "none"; };

  // Step 1 — sign up always hits the backend and triggers an OTP.
  const handleDetails = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    setLoading(true);
    try {
      await signUp({ phone: phone.trim(), full_name: name.trim() });
      setStep("otp");
      setInfo(`We sent a verification code to ${phone.trim()}.`);
    } catch (err) {
      setError(err?.message || "Could not sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — verify the OTP, store tokens, then go home.
  const handleVerify = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    setLoading(true);
    try {
      await verifyOtp({ phone: phone.trim(), otp_code: otp.trim() });
      navigate("/");
    } catch (err) {
      setError(err?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(""); setInfo("");
    try {
      await resendOtp({ phone: phone.trim() });
      setInfo("A new code is on its way.");
    } catch (err) {
      setError(err?.message || "Could not resend the code.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif", background: "#F9F8FF" }}>
    <style>{`
      @media(max-width:768px){
        .auth-visual{ display:none!important; }
        .auth-form-panel{ flex:unset!important; width:100%!important; padding:36px 24px!important; }
      }
      @media(max-width:400px){
        .auth-form-panel{ padding:28px 16px!important; }
      }
    `}</style>

      {/* ── Left — Visual ── */}
      <div className="auth-visual" style={{ flex: 1, position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #0F0620 0%, #1E0D40 40%, #2D1060 70%, #0F0A1E 100%)" }}>

        <div style={{ position: "absolute", top: "15%", right: "15%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "10%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(106,44,255,0.35) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "30%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />

        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots2" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots2)" />
        </svg>

        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
          />
        </div>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px" }}>

          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(236,72,153,0.2)", border: "1px solid rgba(236,72,153,0.35)", borderRadius: 100, padding: "6px 14px", fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em", textTransform: "uppercase", width: "fit-content", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F472B6" }} />
            Join 10M+ Fashion Lovers
          </span>

          <h2 style={{ fontSize: 52, fontWeight: 900, color: "white", letterSpacing: "-2px", lineHeight: 1.05, margin: "0 0 20px" }}>
            Your style,<br />
            <span style={{ background: "linear-gradient(135deg, #F472B6 0%, #FB923C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              your story.
            </span>
          </h2>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 340, margin: "0 0 40px", fontWeight: 500 }}>
            Create your free account and unlock exclusive offers, wishlist, order tracking and more.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Free shipping on first order", "Exclusive member-only deals", "Easy returns & refunds", "Track all your orders"].map((perk) => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#6A2CFF,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{perk}</span>
              </div>
            ))}
          </div>

        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, rgba(15,6,32,0.8), transparent)", pointerEvents: "none" }} />
      </div>

      {/* ── Right — Form ── */}
      <div className="auth-form-panel" style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", padding: "48px 60px", background: "white", position: "relative", overflowY: "auto" }}>

        <div style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(106,44,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* TOP — Logo */}
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px", background: "linear-gradient(135deg, #3D0ECC 0%, #6A2CFF 50%, #9B6DFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            SPRETRO<span style={{ background: "linear-gradient(135deg,#EC4899,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>.</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3.5px", color: "#9B6DFF", marginTop: 5, textTransform: "uppercase", opacity: 0.75 }}>
            Fashion Commerce
          </div>
        </div>

        {/* MIDDLE — Heading + Form */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: 40 }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#EC4899", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, margin: "0 0 10px" }}>
              {step === "details" ? "Get started" : "Verify phone"}
            </p>
            <h1 style={{ fontSize: 38, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-1.2px", lineHeight: 1.1, margin: 0 }}>
              {step === "details" ? <>Create your<br />free account</> : <>Enter the<br />6-digit code</>}
            </h1>
          </div>

          {error && (
            <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", fontSize: 13, fontWeight: 600, color: "#DC2626" }}>
              {error}
            </div>
          )}
          {info && !error && (
            <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "#F0FDF4", border: "1px solid #BBF7D0", fontSize: 13, fontWeight: 600, color: "#16A34A" }}>
              {info}
            </div>
          )}

        {step === "details" ? (
          <form onSubmit={handleDetails} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#444", marginBottom: 8, letterSpacing: "0.03em" }}>Full name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#444", marginBottom: 8, letterSpacing: "0.03em" }}>Phone number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg, #C2185B 0%, #EC4899 50%, #F97316 100%)", color: "white", border: "none", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "0 6px 24px rgba(236,72,153,0.4)", transition: "all 0.2s" }}
            >
              {loading ? <Loader2 size={17} className="spin" /> : <>Send code <ArrowRight size={16} strokeWidth={2.5} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#444", marginBottom: 8, letterSpacing: "0.03em" }}>Verification code</label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="• • • • • •"
                required
                style={{ ...inputStyle, letterSpacing: "0.5em", textAlign: "center", fontSize: 18, fontWeight: 700 }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg, #C2185B 0%, #EC4899 50%, #F97316 100%)", color: "white", border: "none", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.08em", textTransform: "uppercase", boxShadow: "0 6px 24px rgba(236,72,153,0.4)", transition: "all 0.2s" }}
            >
              {loading ? <Loader2 size={17} className="spin" /> : <>Verify & continue <ArrowRight size={16} strokeWidth={2.5} /></>}
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
              <button type="button" onClick={() => { setStep("details"); setError(""); setInfo(""); }} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 0 }}>← Edit details</button>
              <button type="button" onClick={handleResend} style={{ background: "none", border: "none", color: "#6A2CFF", fontWeight: 800, cursor: "pointer", padding: 0 }}>Resend code</button>
            </div>
          </form>
        )}

        <style>{`.spin{ animation: authspin 0.8s linear infinite; } @keyframes authspin { to { transform: rotate(360deg); } }`}</style>

        </div>{/* end MIDDLE */}

        {/* BOTTOM — Sign in link + Terms */}
        <div style={{ marginTop: 16 }}>
          <p style={{ textAlign: "center", fontSize: 14, color: "#888", fontWeight: 500, margin: "0 0 10px" }}>
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#6A2CFF", fontWeight: 800, cursor: "pointer", fontSize: 14, padding: 0 }}>
              Sign in →
            </button>
          </p>
          <p style={{ textAlign: "center", fontSize: 11, color: "#ccc", lineHeight: 1.5, margin: 0 }}>
            By creating an account you agree to our{" "}
            <button type="button" onClick={() => navigate("/terms-and-conditions")} style={{ background: "none", border: "none", color: "#9B6DFF", fontSize: 11, cursor: "pointer", padding: 0, fontWeight: 600 }}>Terms</button>
            {" "}and{" "}
            <button type="button" style={{ background: "none", border: "none", color: "#9B6DFF", fontSize: 11, cursor: "pointer", padding: 0, fontWeight: 600 }}>Privacy Policy</button>
          </p>
        </div>

      </div>

    </div>
  );
}
