import { useState, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import {
  Search, X, Heart, ShoppingBag, User,
  TrendingUp, Clock, ArrowRight, ChevronDown,
  Package, Star, Settings, HelpCircle,
} from "lucide-react";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

const NAV_LINKS = [
  { label: "Women",  path: "/women" },
  { label: "Men",    path: "/men" },
  { label: "Kids",   path: "/kids" },
  { label: "New In", path: "/new-in" },
  { label: "Brands", path: "/brands" },
  { label: "Sale",   path: "/sale", hot: true },
];

// Department pages open the Search UI in category mode.
const groupPath = (key) => `/search?group=${key}`;
const subCatPath = (key, cats) =>
  cats?.length ? `/search?group=${key}&cats=${encodeURIComponent(cats.join(","))}` : groupPath(key);

// AJIO-style dropdown sub-categories for nav links that have them.
const NAV_SUBCATS = NAV_LINKS.reduce((acc, link) => {
  const key = link.path.replace(/^\//, "");
  const cfg = LISTING_CONFIGS[key];
  if (cfg?.subCategories?.length) {
    acc[link.path] = cfg.subCategories.map((sc) => ({
      label: sc.label,
      to: subCatPath(key, sc.cats),
    }));
  }
  return acc;
}, {});

const TRENDING = [
  "ethnic kurtas", "white sneakers", "minimalist watch", "summer dresses",
  "perfume for men", "gold jewellery", "oversized tees", "silk sarees",
];

const RECENT_KEY = "spretro_recent_searches";
function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
}
function saveRecent(q) {
  const prev = getRecent().filter((x) => x !== q).slice(0, 4);
  localStorage.setItem(RECENT_KEY, JSON.stringify([q, ...prev]));
}

export default function SearchNavbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { totalQty } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { user, isAuthenticated: isLoggedIn, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const currentQuery   = searchParams.get("q") || "";
  const navGroupParam  = searchParams.get("group") || "";

  const [query,       setQuery]       = useState(currentQuery);
  const [focused,     setFocused]     = useState(false);
  const [recent,      setRecent]      = useState(getRecent);
  const [activePanel, setActivePanel] = useState(null);
  const [activeNav,   setActiveNav]   = useState(null);
  const inputRef   = useRef(null);
  const panelTimer = useRef(null);
  const navTimer   = useRef(null);

  const openPanel  = (name) => { clearTimeout(panelTimer.current); setActivePanel(name); };
  const closePanel = ()     => { panelTimer.current = setTimeout(() => setActivePanel(null), 120); };
  const keepPanel  = ()     => { clearTimeout(panelTimer.current); };

  const openNav    = (label) => { clearTimeout(navTimer.current); setActiveNav(label); };
  const closeNav   = ()      => { navTimer.current = setTimeout(() => setActiveNav(null), 300); };
  const keepNav    = ()      => { clearTimeout(navTimer.current); };

  const doSearch = (q) => {
    const trimmed = (q || query).trim();
    if (!trimmed) return;
    saveRecent(trimmed);
    setRecent(getRecent());
    setFocused(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const clearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  };

  const showDropdown = focused && (recent.length > 0 || TRENDING.length > 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .snav {
          position: sticky;
          top: 0;
          z-index: 999;
          background: white;
          box-shadow: 0 1px 0 #EEEEEE, 0 2px 12px rgba(0,0,0,0.05);
          font-family: 'Inter', sans-serif;
        }

        /* ── Main bar ── */
        .snav-bar {
          height: 72px;
          display: flex;
          align-items: center;
          gap: 0;
          padding: 0 32px;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* ── Logo ── */
        .snav-logo {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -1.2px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          margin-right: 36px;
          text-decoration: none;
          color: #111;
        }
        .snav-logo-dot {
          display: inline-block;
          color: transparent;
          background: linear-gradient(135deg, #3D0ECC 0%, #6A2CFF 45%, #9B6DFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Nav links ── */
        .snav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .snav-link {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 700;
          color: #444;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          border-radius: 8px;
          transition: 0.15s ease;
          letter-spacing: 0.01em;
          position: relative;
        }
        .snav-link:hover { color: #6A2CFF; background: #F5F0FF; }
        .snav-link.active { color: #6A2CFF; }
        .snav-link.hot { color: #E83E6C; }
        .snav-link.hot:hover { background: #FFF0F5; color: #E83E6C; }

        /* nav dropdown (AJIO-style) */
        .snav-nav-item { position: relative; display: flex; align-items: center; }
        .snav-link-btn {
          display: flex; align-items: center; gap: 3px;
          background: none; border: none; font-family: inherit;
        }
        .snav-caret { color: #aaa; transition: transform 0.2s ease, color 0.2s ease; flex-shrink: 0; }
        .snav-nav-item:hover .snav-caret { color: #6A2CFF; }
        .snav-nav-item.open .snav-caret { transform: rotate(180deg); color: #6A2CFF; }
        .snav-nav-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 200px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(15,23,42,0.13), 0 4px 16px rgba(106,44,255,0.08);
          border: 1px solid #ECE7FF;
          padding: 7px;
          z-index: 1001;
          animation: snavDrop 0.16s ease;
        }
        .snav-nav-dropdown::before {
          content: ''; position: absolute; top: -10px; left: 0; right: 0; height: 10px;
        }
        .snav-nav-dropdown-item {
          display: block; width: 100%; text-align: left; border: none;
          background: transparent; border-radius: 9px; padding: 8px 12px;
          font-size: 13px; font-weight: 600; color: #3A356B; cursor: pointer;
          transition: 0.14s ease;
        }
        .snav-nav-dropdown-item:hover { background: #F5F0FF; color: #6A2CFF; }

        /* ── Spacer ── */
        .snav-spacer { flex: 1; }

        /* ── Search ── */
        .snav-search-wrap {
          width: 340px;
          flex-shrink: 0;
          position: relative;
          margin: 0 20px;
        }
        .snav-search-box {
          width: 100%;
          height: 44px;
          background: #F5F5F7;
          border: 1.5px solid transparent;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          transition: all 0.2s ease;
          cursor: text;
        }
        .snav-search-box.active {
          background: white;
          border-color: #6A2CFF;
          box-shadow: 0 0 0 4px rgba(106,44,255,0.08);
        }
        .snav-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 13px;
          font-weight: 400;
          color: #111;
          font-family: 'Inter', sans-serif;
          min-width: 0;
        }
        .snav-input::placeholder { color: #999; }

        /* search dropdown */
        .snav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: white;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.13);
          border: 1px solid #EEEEEE;
          z-index: 1001;
          overflow: hidden;
          animation: snavDrop 0.15s ease;
        }
        @keyframes snavDrop { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .snav-drop-section { padding: 14px 18px; }
        .snav-drop-section + .snav-drop-section { border-top: 1px solid #F5F5F7; }
        .snav-drop-title {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.12em; color: #999; margin-bottom: 9px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .snav-drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 8px; border-radius: 9px; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #333; transition: 0.14s;
        }
        .snav-drop-item:hover { background: #F3EEFF; color: #6A2CFF; }
        .snav-pills { display: flex; flex-wrap: wrap; gap: 7px; }
        .snav-pill {
          padding: 5px 13px; background: #F5F5F7; border-radius: 20px;
          font-size: 12px; font-weight: 600; color: #555; cursor: pointer; transition: 0.14s;
        }
        .snav-pill:hover { background: #F3EEFF; color: #6A2CFF; }

        /* ── Right icons ── */
        .snav-icons {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }
        .snav-icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          width: 58px;
          height: 52px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 10px;
          transition: 0.15s ease;
          position: relative;
          color: #444;
        }
        .snav-icon-btn:hover { background: #F5F5F7; color: #6A2CFF; }
        .snav-icon-label {
          font-size: 10px;
          font-weight: 700;
          color: inherit;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .snav-badge {
          position: absolute;
          top: 6px;
          right: 10px;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          background: linear-gradient(135deg, #EC4899, #F97316);
          font-size: 9px;
          font-weight: 800;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        /* ── User panel ── */
        .snav-user-wrap { position: relative; }
        .snav-user-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.13), 0 4px 16px rgba(106,44,255,0.1);
          border: 1px solid #F0EAFF;
          overflow: hidden;
          z-index: 1001;
          animation: snavDrop 0.16s ease;
        }
        .snav-panel-hdr {
          padding: 13px 14px 11px;
          background: linear-gradient(135deg,#1a1a2e,#16213e);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .snav-panel-avatar {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(106,44,255,0.4);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .snav-panel-name { font-size: 13px; font-weight: 800; color: white; line-height: 1.2; }
        .snav-panel-sub  { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 500; margin-top: 1px; }
        .snav-panel-body { padding: 6px 5px 8px; }
        .snav-panel-row {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 9px; border-radius: 10px;
          cursor: pointer; font-size: 12px; font-weight: 600;
          color: #333; background: transparent; border: none;
          width: 100%; text-align: left; transition: 0.13s ease;
        }
        .snav-panel-row:hover { background: #F5F0FF; color: #6A2CFF; }
        .snav-panel-ico {
          width: 26px; height: 26px; border-radius: 7px;
          background: #F5F5F7;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #555; transition: 0.13s ease;
        }
        .snav-panel-row:hover .snav-panel-ico { background: #EDE4FF; color: #6A2CFF; }
        .snav-panel-sep { height: 1px; background: #F3F3F6; margin: 3px 8px; }

        /* ── Wishlist / Cart mini panels ── */
        .snav-panel-wrap { position: relative; }
        .snav-mini-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 260px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.13), 0 4px 16px rgba(106,44,255,0.1);
          border: 1px solid #F0EAFF;
          overflow: hidden;
          z-index: 1001;
          animation: snavDrop 0.16s ease;
        }
        .snav-mini-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 14px; border-bottom: 1px solid #F3F3F6;
        }
        .snav-mini-hdr-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .snav-mini-title { font-size: 13px; font-weight: 800; color: #111; line-height: 1.1; }
        .snav-mini-sub { font-size: 11px; color: #888; font-weight: 500; margin-top: 1px; }
        .snav-mini-empty {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 20px 16px 8px; text-align: center;
        }
        .snav-mini-empty-icon {
          width: 46px; height: 46px; border-radius: 14px; background: #F5F0FF;
          display: flex; align-items: center; justify-content: center; color: #6A2CFF;
        }
        .snav-mini-empty-text { font-size: 13px; font-weight: 700; color: #111; }
        .snav-mini-empty-sub { font-size: 11px; color: #aaa; font-weight: 500; line-height: 1.4; }
        .snav-mini-list {
          max-height: 220px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 6px; padding: 6px;
        }
        .snav-mini-row {
          display: flex; align-items: center; gap: 10px;
          padding: 6px; border-radius: 10px; cursor: pointer;
        }
        .snav-mini-row:hover { background: #F5F0FF; }
        .snav-mini-thumb {
          width: 40px; height: 40px; border-radius: 8px; overflow: hidden;
          background: #F5F3FF; flex-shrink: 0;
        }
        .snav-mini-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
        .snav-mini-name {
          font-size: 12px; font-weight: 700; color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .snav-mini-price { font-size: 11px; font-weight: 800; color: #333; margin-top: 1px; }
        .snav-mini-remove {
          width: 22px; height: 22px; border-radius: 50%; border: none;
          background: #FFF0F5; color: #E83E6C; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
        }
        .snav-mini-cta {
          display: block; width: calc(100% - 28px); margin: 12px 14px 14px;
          padding: 10px; border-radius: 12px; background: #6A2CFF; color: white;
          font-size: 12px; font-weight: 700; text-align: center; border: none;
          cursor: pointer; transition: 0.2s ease;
        }
        .snav-mini-cta:hover { background: #5A1EEF; }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .snav-bar { padding: 0 20px; }
          .snav-search-wrap { width: 260px; margin: 0 12px; }
          .snav-link { padding: 5px 10px; font-size: 12px; }
          .snav-logo { font-size: 24px; margin-right: 24px; }
        }
        @media (max-width: 767px) {
          .snav-bar { padding: 0 14px; height: 58px; gap: 8px; }
          .snav-logo { font-size: 22px; margin-right: 0; }
          .snav-links { display: none; }
          .snav-search-wrap { width: auto; flex: 1; margin: 0 8px; }
          .snav-icon-label { display: none; }
          .snav-icon-btn { width: 40px; height: 40px; }
          .snav-spacer { display: none; }
        }
      `}</style>

      <nav className="snav">
        <div className="snav-bar">

          {/* Logo */}
          <a
            href="/"
            className="snav-logo"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
          >
            SPRETRO<span className="snav-logo-dot">.</span>
          </a>

          {/* Nav links */}
          <div className="snav-links">
            {NAV_LINKS.map((l) => {
              const subs = NAV_SUBCATS[l.path];
              const topTo = subs ? groupPath(l.path.replace(/^\//, "")) : l.path;
              const isActive = location.pathname === l.path
                || (subs && navGroupParam === l.path.replace(/^\//, ""));
              return (
                <div
                  key={l.path}
                  className={`snav-nav-item${activeNav === l.label ? " open" : ""}`}
                  onMouseEnter={() => subs && openNav(l.label)}
                  onMouseLeave={() => subs && closeNav()}
                >
                  <a
                    href={topTo}
                    className={`snav-link${l.hot ? " hot" : ""}${isActive ? " active" : ""}`}
                    onClick={(e) => { e.preventDefault(); navigate(topTo); setActiveNav(null); }}
                  >
                    {l.label}
                  </a>
                  {subs && <ChevronDown size={12} strokeWidth={2.5} className="snav-caret" />}

                  {subs && activeNav === l.label && (
                    <div className="snav-nav-dropdown" onMouseEnter={keepNav} onMouseLeave={closeNav}>
                      {subs.map((sc) => (
                        <button
                          key={sc.label}
                          className="snav-nav-dropdown-item"
                          onClick={() => { navigate(sc.to); setActiveNav(null); }}
                        >
                          {sc.label === "All" ? `All ${l.label}` : sc.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="snav-spacer" />

          {/* Search */}
          <div
            className="snav-search-wrap"
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
          >
            <div className={`snav-search-box${focused ? " active" : ""}`}>
              <Search size={16} strokeWidth={2} style={{ color: focused ? "#6A2CFF" : "#aaa", flexShrink: 0 }} />
              <input
                ref={inputRef}
                className="snav-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search for products, brands and more"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", color:"#999", flexShrink:0, padding:0 }}
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {showDropdown && (
              <div className="snav-dropdown">
                {recent.length > 0 && (
                  <div className="snav-drop-section">
                    <div className="snav-drop-title">
                      <span>Recent</span>
                      <button onClick={clearRecent} style={{ background:"none", border:"none", cursor:"pointer", color:"#6A2CFF", fontSize:11, fontWeight:700 }}>Clear</button>
                    </div>
                    {recent.map((r) => (
                      <div key={r} className="snav-drop-item" onClick={() => { setQuery(r); doSearch(r); }}>
                        <Clock size={13} strokeWidth={2} style={{ color:"#bbb", flexShrink:0 }} />
                        <span style={{ flex:1 }}>{r}</span>
                        <ArrowRight size={13} strokeWidth={2} style={{ color:"#ddd" }} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="snav-drop-section">
                  <div className="snav-drop-title">
                    <span><TrendingUp size={10} style={{ display:"inline", marginRight:4 }} />Trending</span>
                  </div>
                  <div className="snav-pills">
                    {TRENDING.map((t) => (
                      <div key={t} className="snav-pill" onClick={() => { setQuery(t); doSearch(t); }}>🔥 {t}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="snav-icons">

            {/* Profile / Account */}
            {!isLoggedIn ? (
              <button className="snav-icon-btn" onClick={() => navigate("/login")}>
                <User size={20} strokeWidth={1.8} />
                <span className="snav-icon-label">Profile</span>
              </button>
            ) : (
              <div
                className="snav-user-wrap"
                onMouseEnter={() => openPanel("user")}
                onMouseLeave={closePanel}
              >
                <button
                  className="snav-icon-btn"
                  onClick={() => { navigate("/account"); setActivePanel(null); }}
                >
                  <User size={20} strokeWidth={1.8} />
                  <span className="snav-icon-label">Profile</span>
                </button>

                {activePanel === "user" && (
                  <div className="snav-user-panel" onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                    <div className="snav-panel-hdr" onClick={() => { navigate("/account"); setActivePanel(null); }}>
                      <div className="snav-panel-avatar">
                        <User size={14} strokeWidth={2} color="white" />
                      </div>
                      <div>
                        <div className="snav-panel-name">{user?.full_name || "My Account"}</div>
                        <div className="snav-panel-sub">{user?.email || user?.phone || "View your account"}</div>
                      </div>
                    </div>
                    <div className="snav-panel-body">
                      {[
                        { icon: <Package    size={13} strokeWidth={2} />, label: "My Orders",      path: "/account" },
                        { icon: <Heart      size={13} strokeWidth={2} />, label: "Wishlist",       path: null },
                        { icon: <Star       size={13} strokeWidth={2} />, label: "Rewards",        path: "/account" },
                        { icon: <Settings   size={13} strokeWidth={2} />, label: "Settings",       path: "/account" },
                        { icon: <HelpCircle size={13} strokeWidth={2} />, label: "Help & Support", path: "/account" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          className="snav-panel-row"
                          onClick={() => { if (item.path) { navigate(item.path); setActivePanel(null); } }}
                        >
                          <span className="snav-panel-ico">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                      <div className="snav-panel-sep" />
                      <button
                        className="snav-panel-row"
                        style={{ color:"#E83E6C" }}
                        onClick={() => { logout(); setActivePanel(null); navigate("/"); }}
                      >
                        <span className="snav-panel-ico" style={{ background:"#FFF0F5", color:"#E83E6C" }}>
                          <User size={13} strokeWidth={2} />
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            <div
              className="snav-panel-wrap"
              onMouseEnter={() => openPanel("wishlist")}
              onMouseLeave={closePanel}
            >
              <button className="snav-icon-btn" onClick={() => navigate("/women")}>
                <Heart size={20} strokeWidth={1.8} className={wishlistItems.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                {wishlistItems.length > 0 && (
                  <span className="snav-badge">{wishlistItems.length > 99 ? "99+" : wishlistItems.length}</span>
                )}
                <span className="snav-icon-label">Wishlist</span>
              </button>

              {activePanel === "wishlist" && (
                <div className="snav-mini-panel" onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                  <div className="snav-mini-hdr">
                    <div className="snav-mini-hdr-icon" style={{ background: "linear-gradient(135deg,#FF6B9D,#FF4D7E)" }}>
                      <Heart size={15} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="snav-mini-title">Wishlist</div>
                      <div className="snav-mini-sub">{wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}</div>
                    </div>
                  </div>
                  {wishlistItems.length === 0 ? (
                    <div className="snav-mini-empty">
                      <div className="snav-mini-empty-icon"><Heart size={20} strokeWidth={1.8} /></div>
                      <div className="snav-mini-empty-text">Nothing saved yet</div>
                      <div className="snav-mini-empty-sub">Tap the heart on any product to save it here</div>
                    </div>
                  ) : (
                    <div className="snav-mini-list">
                      {wishlistItems.slice(0, 5).map((item) => (
                        <div key={item.id} className="snav-mini-row" onClick={() => { navigate(`/product/${item.id}`); setActivePanel(null); }}>
                          <div className="snav-mini-thumb"><img src={item.image} alt="" /></div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="snav-mini-name">{item.name}</div>
                            <div className="snav-mini-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
                          </div>
                          <button
                            className="snav-mini-remove"
                            onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="snav-mini-cta" onClick={() => { navigate("/women"); setActivePanel(null); }}>
                    {wishlistItems.length > 0 ? "Continue Shopping" : "Browse & Save"}
                  </button>
                </div>
              )}
            </div>

            {/* Cart / Bag */}
            <div
              className="snav-panel-wrap"
              onMouseEnter={() => openPanel("cart")}
              onMouseLeave={closePanel}
            >
              <button className="snav-icon-btn" onClick={() => navigate("/cart")}>
                <ShoppingBag size={20} strokeWidth={1.8} />
                {totalQty > 0 && (
                  <span className="snav-badge">{totalQty > 99 ? "99+" : totalQty}</span>
                )}
                <span className="snav-icon-label">Bag</span>
              </button>

              {activePanel === "cart" && (
                <div className="snav-mini-panel" onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                  <div className="snav-mini-hdr">
                    <div className="snav-mini-hdr-icon" style={{ background: "linear-gradient(135deg,#6A2CFF,#9B6DFF)" }}>
                      <ShoppingBag size={15} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="snav-mini-title">My Cart</div>
                      <div className="snav-mini-sub">{totalQty} {totalQty === 1 ? "item" : "items"}</div>
                    </div>
                  </div>
                  {totalQty === 0 ? (
                    <div className="snav-mini-empty">
                      <div className="snav-mini-empty-icon"><ShoppingBag size={20} strokeWidth={1.8} /></div>
                      <div className="snav-mini-empty-text">Your cart is empty</div>
                      <div className="snav-mini-empty-sub">Add products and they'll show up here</div>
                    </div>
                  ) : (
                    <div className="snav-mini-empty">
                      <div className="snav-mini-empty-text">{totalQty} {totalQty === 1 ? "item" : "items"} in your bag</div>
                      <div className="snav-mini-empty-sub">Review and checkout when you're ready</div>
                    </div>
                  )}
                  <button className="snav-mini-cta" onClick={() => { navigate("/cart"); setActivePanel(null); }}>
                    View Cart
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
