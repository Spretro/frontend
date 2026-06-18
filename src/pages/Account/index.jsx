import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  User, Package, MapPin, Wallet, Star, HelpCircle, LogOut,
  ChevronRight, ChevronLeft, Edit3, ShoppingBag, Gift, Shield,
  Phone, Mail, Calendar, Users,
} from "lucide-react";

const SECTIONS = [
  {
    group: "ORDERS & CREDITS",
    items: [
      { id: "orders",    icon: Package,    label: "My Orders",        sub: "Track your purchases",       color:"#4F67E4", bg:"#EEF2FF" },
      { id: "wallet",    icon: Wallet,     label: "My Wallet",        sub: "Balance & credits",          color:"#7C3AED", bg:"#EDE9FE" },
      { id: "rewards",   icon: Star,       label: "Rewards",          sub: "Points & exclusive offers",  color:"#D97706", bg:"#FFFBEB" },
    ],
  },
  {
    group: "PROFILE",
    items: [
      { id: "profile",   icon: User,       label: "My Profile",       sub: "Manage your details",        color:"#6A2CFF", bg:"#EDE4FF" },
      { id: "addresses", icon: MapPin,     label: "Manage Addresses", sub: "Saved delivery addresses",   color:"#0891B2", bg:"#E0F2FE" },
    ],
  },
  {
    group: "SUPPORT",
    items: [
      { id: "help",      icon: HelpCircle, label: "Help & Support",   sub: "FAQs & contact",             color:"#16A34A", bg:"#F0FDF4" },
    ],
  },
];

const ALL_ITEMS = SECTIONS.flatMap((s) => s.items);

/* ── Profile ─────────────────────────────────────────────────── */
function ProfileSection({ user }) {
  const fields = [
    { icon: User,     label: "Full Name",     value: user?.full_name || "— not added —" },
    { icon: Phone,    label: "Mobile Number", value: user?.phone     || "— not added —" },
    { icon: Mail,     label: "Email ID",      value: user?.email     || "— not added —" },
    { icon: Users,    label: "Gender",        value: user?.gender    || "— not added —" },
    { icon: Calendar, label: "Date of Birth", value: user?.dob       || "— not added —" },
  ];
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, gap:12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
          <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E", letterSpacing:"-0.5px" }}>{user?.full_name || "My Account"}</h1>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>Manage your personal information</p>
        </div>
        <button style={{
          display:"flex", alignItems:"center", gap:8,
          padding:"10px 20px", borderRadius:12,
          background:"linear-gradient(135deg,#3D0ECC,#6A2CFF)",
          color:"white", border:"none", cursor:"pointer",
          fontSize:13, fontWeight:700, flexShrink:0,
          boxShadow:"0 4px 14px rgba(106,44,255,0.28)",
        }}>
          <Edit3 size={14} strokeWidth={2.2} /> Edit Profile
        </button>
      </div>
      <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid #EDE8FF" }}>
        {fields.map(({ icon: Icon, label, value }, i) => (
          <div key={label} style={{
            display:"flex", alignItems:"center", gap:14, padding:"16px 20px",
            background: i % 2 === 0 ? "#FAFAFF" : "white",
            borderBottom: i < fields.length - 1 ? "1px solid #F0EAFF" : "none",
          }}>
            <div style={{
              width:38, height:38, borderRadius:11,
              background:"linear-gradient(135deg,#EDE4FF,#DDD0FF)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, color:"#6A2CFF",
            }}>
              <Icon size={16} strokeWidth={1.9} />
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{label}</div>
              <div style={{ fontSize:14, fontWeight:600, color: value.startsWith("—") ? "#ccc" : "#111" }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Orders ──────────────────────────────────────────────────── */
function OrdersSection() {
  const [period, setPeriod] = useState("Last 6 months");
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
          <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E" }}>My Orders</h1>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>Track, return or buy things again</p>
        </div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} style={{
          padding:"9px 34px 9px 14px", borderRadius:10, border:"1.5px solid #E0D4FF",
          background:"white", fontSize:13, fontWeight:600, color:"#333",
          cursor:"pointer", outline:"none", appearance:"none", flexShrink:0,
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236A2CFF' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center",
        }}>
          {["Last 30 days","Last 6 months","Last year","All orders"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"60px 24px", borderRadius:16,
        background:"linear-gradient(135deg,#FAFAFF,#F3EEFF)",
        border:"1.5px dashed #DDD0FF", gap:14, marginTop:8,
      }}>
        <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#EDE4FF,#DDD0FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"#6A2CFF" }}>
          <ShoppingBag size={28} strokeWidth={1.6} />
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:16, fontWeight:800, color:"#0F0A1E", marginBottom:5 }}>No orders placed yet</div>
          <div style={{ fontSize:13, color:"#999", fontWeight:500, lineHeight:1.6 }}>Your orders will appear here.<br />Start shopping to see them!</div>
        </div>
        <button onClick={() => (window.location.href = "/")} style={{
          marginTop:4, padding:"10px 26px", borderRadius:100,
          background:"linear-gradient(135deg,#3D0ECC,#6A2CFF)",
          color:"white", border:"none", cursor:"pointer", fontSize:13, fontWeight:700,
          boxShadow:"0 4px 16px rgba(106,44,255,0.35)",
        }}>Start Shopping</button>
      </div>
    </div>
  );
}

/* ── Addresses ───────────────────────────────────────────────── */
function AddressesSection() {
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
          <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E" }}>Manage Addresses</h1>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>Your saved delivery addresses</p>
        </div>
        <button style={{
          padding:"10px 18px", borderRadius:12, flexShrink:0,
          background:"linear-gradient(135deg,#3D0ECC,#6A2CFF)",
          color:"white", border:"none", cursor:"pointer", fontSize:13, fontWeight:700,
          boxShadow:"0 4px 14px rgba(106,44,255,0.28)",
        }}>+ Add Address</button>
      </div>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 24px",
        borderRadius:16, background:"linear-gradient(135deg,#FAFAFF,#F3EEFF)",
        border:"1.5px dashed #DDD0FF", gap:14,
      }}>
        <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#EDE4FF,#DDD0FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"#6A2CFF" }}>
          <MapPin size={28} strokeWidth={1.6} />
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:16, fontWeight:800, color:"#0F0A1E", marginBottom:5 }}>No saved addresses</div>
          <div style={{ fontSize:13, color:"#999", fontWeight:500 }}>Add a delivery address to check out faster</div>
        </div>
      </div>
    </div>
  );
}

/* ── Wallet ──────────────────────────────────────────────────── */
function WalletSection() {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E" }}>My Wallet</h1>
        <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>Your balance and store credits</p>
      </div>
      <div style={{
        borderRadius:18, padding:"24px",
        background:"linear-gradient(135deg,#3D0ECC 0%,#6A2CFF 60%,#9B6DFF 100%)",
        color:"white", marginBottom:14,
        boxShadow:"0 8px 28px rgba(106,44,255,0.35)",
      }}>
        <div style={{ fontSize:11, fontWeight:700, opacity:0.7, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Available Balance</div>
        <div style={{ fontSize:36, fontWeight:900, letterSpacing:"-1px" }}>₹0.00</div>
        <div style={{ marginTop:16, display:"flex", gap:10 }}>
          {["Add Money","Redeem"].map((l) => (
            <button key={l} style={{ padding:"7px 18px", borderRadius:100, background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)", color:"white", fontSize:12, fontWeight:700, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { icon: Gift, label:"Coupons", sub:"0 active", bg:"#FFF7ED", color:"#F97316" },
          { icon: Star, label:"Reward Points", sub:"0 pts", bg:"#FFFBEB", color:"#D97706" },
        ].map(({ icon: Icon, label, sub, bg, color }) => (
          <div key={label} style={{ padding:16, borderRadius:14, background:bg, border:"1px solid rgba(0,0,0,0.06)", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:"white", display:"flex", alignItems:"center", justifyContent:"center", color, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <Icon size={18} strokeWidth={1.9} />
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:"#111" }}>{label}</div>
              <div style={{ fontSize:11, color:"#999", fontWeight:600, marginTop:1 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Rewards ─────────────────────────────────────────────────── */
function RewardsSection() {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E" }}>Rewards</h1>
        <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>Your points & exclusive offers</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px", borderRadius:16, background:"linear-gradient(135deg,#FFFBEB,#FFF7ED)", border:"1.5px dashed #FDE68A", gap:14 }}>
        <div style={{ width:64, height:64, borderRadius:18, background:"#FEF9C3", display:"flex", alignItems:"center", justifyContent:"center", color:"#D97706" }}>
          <Star size={28} strokeWidth={1.6} />
        </div>
        <div style={{ fontSize:16, fontWeight:800, color:"#0F0A1E" }}>0 Reward Points</div>
        <div style={{ fontSize:13, color:"#999", fontWeight:500, lineHeight:1.6, textAlign:"center" }}>Shop to earn points and unlock exclusive deals</div>
      </div>
    </div>
  );
}

/* ── Help ────────────────────────────────────────────────────── */
function HelpSection({ navigate }) {
  const topics = [
    { icon: Package,  label:"Track My Order",     sub:"Get real-time delivery updates" },
    { icon: Shield,   label:"Returns & Refunds",  sub:"Easy 7-day return policy" },
    { icon: Wallet,   label:"Payment Issues",     sub:"Billing and payment help" },
    { icon: User,     label:"Account & Security", sub:"Password, login, privacy" },
  ];
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#9B6DFF", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>ACCOUNT</div>
        <h1 style={{ margin:0, fontSize:26, fontWeight:900, color:"#0F0A1E" }}>Help & Support</h1>
        <p style={{ margin:"6px 0 0", fontSize:13, color:"#888", fontWeight:500 }}>We're here to help you</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {topics.map(({ icon: Icon, label, sub }) => (
          <button key={label} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12, background:"white", border:"1.5px solid #EDE8FF", cursor:"pointer", textAlign:"left", width:"100%" }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#EDE4FF,#DDD0FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"#6A2CFF", flexShrink:0 }}>
              <Icon size={16} strokeWidth={1.9} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#111" }}>{label}</div>
              <div style={{ fontSize:12, color:"#999", fontWeight:500, marginTop:1 }}>{sub}</div>
            </div>
            <ChevronRight size={14} strokeWidth={2} color="#ccc" />
          </button>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={() => navigate("/faqs")} style={{ flex:1, padding:"11px", borderRadius:12, background:"linear-gradient(135deg,#3D0ECC,#6A2CFF)", color:"white", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, boxShadow:"0 4px 14px rgba(106,44,255,0.3)" }}>Browse FAQs</button>
        <button onClick={() => navigate("/contact-us")} style={{ flex:1, padding:"11px", borderRadius:12, background:"white", border:"1.5px solid #6A2CFF", color:"#6A2CFF", cursor:"pointer", fontSize:13, fontWeight:700 }}>Contact Us</button>
      </div>
    </div>
  );
}

/* ── Shared renderer ─────────────────────────────────────────── */
function renderSection(id, user, navigate) {
  switch (id) {
    case "profile":   return <ProfileSection user={user} />;
    case "orders":    return <OrdersSection />;
    case "addresses": return <AddressesSection />;
    case "wallet":    return <WalletSection />;
    case "rewards":   return <RewardsSection />;
    case "help":      return <HelpSection navigate={navigate} />;
    default:          return <ProfileSection user={user} />;
  }
}

/* ── Main ────────────────────────────────────────────────────── */
export default function AccountPage() {
  const navigate  = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [active, setActive]       = useState("profile");
  const [isMobile, setIsMobile]   = useState(() => window.innerWidth < 768);
  const [mobileView, setMobileView] = useState("menu"); // "menu" | section id

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLogout = async () => { await logout(); navigate("/"); };

  /* ── Unauthenticated ── */
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, fontFamily:"Inter,sans-serif", background:"#F5F3FF", padding:24 }}>
        <div style={{ width:72, height:72, borderRadius:22, background:"linear-gradient(135deg,#EDE4FF,#DDD0FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"#6A2CFF" }}>
          <User size={32} strokeWidth={1.6} />
        </div>
        <div style={{ fontSize:20, fontWeight:800, color:"#0F0A1E", textAlign:"center" }}>Sign in to view your account</div>
        <div style={{ fontSize:13, color:"#999", fontWeight:500 }}>Access your orders, profile and more</div>
        <button onClick={() => navigate("/login")} style={{ marginTop:8, padding:"12px 32px", borderRadius:100, background:"linear-gradient(135deg,#3D0ECC,#6A2CFF)", color:"white", border:"none", cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:"0 4px 20px rgba(106,44,255,0.35)" }}>Sign In</button>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     MOBILE LAYOUT
  ══════════════════════════════════════════ */
  if (isMobile) {
    /* Section detail view */
    if (mobileView !== "menu") {
      return (
        <div style={{ background:"#F5F3FF", minHeight:"100vh", fontFamily:"Inter,sans-serif" }}>
          {/* Back bar */}
          <div style={{ background:"white", borderBottom:"1px solid #EDE8FF", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
            <button
              onClick={() => setMobileView("menu")}
              style={{ display:"flex", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:"#6A2CFF", fontWeight:700, fontSize:14, padding:0 }}
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              Back
            </button>
          </div>
          {/* Content */}
          <div style={{ padding:"20px 16px 40px" }}>
            {renderSection(mobileView, user, navigate)}
          </div>
        </div>
      );
    }

    /* Menu list view */
    return (
      <div style={{ background:"#F5F3FF", minHeight:"100vh", fontFamily:"Inter,sans-serif" }}>
        {/* User header */}
        <div style={{ background:"linear-gradient(135deg,#3D0ECC 0%,#6A2CFF 60%,#9B6DFF 100%)", padding:"24px 20px 22px", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:52, height:52, borderRadius:16, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", border:"2px solid rgba(255,255,255,0.3)", flexShrink:0 }}>
            <User size={24} strokeWidth={1.8} />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:18, fontWeight:800, color:"white", lineHeight:1.2 }}>{user?.full_name || "User"}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontWeight:500, marginTop:3 }}>{user?.email || user?.phone || ""}</div>
          </div>
        </div>

        {/* Nav groups */}
        <div style={{ padding:"12px 14px 8px" }}>
          {SECTIONS.map((section) => (
            <div key={section.group} style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#bbb", letterSpacing:"0.12em", textTransform:"uppercase", padding:"10px 6px 6px" }}>
                {section.group}
              </div>
              <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EDE8FF" }}>
                {section.items.map(({ id, icon: Icon, label, sub, color, bg }, i, arr) => (
                  <button
                    key={id}
                    onClick={() => setMobileView(id)}
                    style={{
                      width:"100%", display:"flex", alignItems:"center", gap:14,
                      padding:"14px 16px", border:"none", background:"white",
                      borderBottom: i < arr.length - 1 ? "1px solid #F0EAFF" : "none",
                      cursor:"pointer", textAlign:"left",
                    }}
                  >
                    <div style={{ width:42, height:42, borderRadius:13, background:bg, display:"flex", alignItems:"center", justifyContent:"center", color, flexShrink:0 }}>
                      <Icon size={18} strokeWidth={1.9} />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:"#111" }}>{label}</div>
                      <div style={{ fontSize:12, color:"#999", fontWeight:500, marginTop:1 }}>{sub}</div>
                    </div>
                    <ChevronRight size={16} strokeWidth={2} color="#ccc" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Sign out */}
          <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EDE8FF", marginTop:8 }}>
            <button
              onClick={handleLogout}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"14px 16px", border:"none", background:"white", cursor:"pointer", textAlign:"left" }}
            >
              <div style={{ width:42, height:42, borderRadius:13, background:"#FFF0F5", display:"flex", alignItems:"center", justifyContent:"center", color:"#E83E6C", flexShrink:0 }}>
                <LogOut size={18} strokeWidth={1.9} />
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:"#E83E6C" }}>Sign Out</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     DESKTOP LAYOUT
  ══════════════════════════════════════════ */
  return (
    <div style={{ background:"#F5F3FF", padding:"28px 32px 52px", fontFamily:"Inter,sans-serif" }}>
      <div style={{
        maxWidth:1160, margin:"0 auto", display:"flex", alignItems:"flex-start",
        background:"white", borderRadius:20, overflow:"hidden",
        boxShadow:"0 4px 28px rgba(106,44,255,0.09)", border:"1px solid #EDE8FF",
        minHeight:560,
      }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width:300, minWidth:300, borderRight:"1px solid #EDE8FF", display:"flex", flexDirection:"column", alignSelf:"stretch" }}>
          {/* Purple header */}
          <div style={{ padding:"20px 22px", background:"linear-gradient(135deg,#3D0ECC 0%,#6A2CFF 60%,#9B6DFF 100%)", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:14, flexShrink:0, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", border:"2px solid rgba(255,255,255,0.28)" }}>
              <User size={22} strokeWidth={1.8} />
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"white", lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.full_name || "User"}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", fontWeight:500, marginTop:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.email || user?.phone || ""}</div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ padding:"10px 10px 0" }}>
            {SECTIONS.map((section) => (
              <div key={section.group}>
                <div style={{ fontSize:10, fontWeight:800, color:"#bbb", letterSpacing:"0.12em", textTransform:"uppercase", padding:"12px 12px 5px" }}>
                  {section.group}
                </div>
                {section.items.map(({ id, icon: Icon, label, sub }) => {
                  const isActive = active === id;
                  return (
                    <button key={id} onClick={() => setActive(id)} style={{
                      width:"100%", display:"flex", alignItems:"center", gap:12,
                      padding:"11px 12px", borderRadius:13, border:"none",
                      background: isActive ? "linear-gradient(135deg,#EDE4FF,#E0D4FF)" : "transparent",
                      cursor:"pointer", textAlign:"left", marginBottom:2,
                    }}>
                      <div style={{ width:36, height:36, borderRadius:11, background: isActive ? "linear-gradient(135deg,#6A2CFF,#9B6DFF)" : "#F5F5F7", display:"flex", alignItems:"center", justifyContent:"center", color: isActive ? "white" : "#777", flexShrink:0 }}>
                        <Icon size={15} strokeWidth={2} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color: isActive ? "#3D0ECC" : "#222" }}>{label}</div>
                        <div style={{ fontSize:11, color:"#aaa", fontWeight:500, marginTop:1 }}>{sub}</div>
                      </div>
                      {isActive && <ChevronRight size={14} strokeWidth={2.5} color="#6A2CFF" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sign out */}
          <div style={{ borderTop:"1px solid #F0EAFF", margin:"0 10px", padding:"10px 0 14px", marginTop:"auto" }}>
            <button onClick={handleLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:13, border:"none", background:"transparent", cursor:"pointer" }}>
              <div style={{ width:36, height:36, borderRadius:11, background:"#FFF0F5", display:"flex", alignItems:"center", justifyContent:"center", color:"#E83E6C" }}>
                <LogOut size={15} strokeWidth={2} />
              </div>
              <span style={{ fontSize:13, fontWeight:700, color:"#E83E6C" }}>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── CONTENT ── */}
        <main style={{ flex:1, padding:"32px 36px 44px", minWidth:0 }}>
          {renderSection(active, user, navigate)}
        </main>

      </div>
    </div>
  );
}
