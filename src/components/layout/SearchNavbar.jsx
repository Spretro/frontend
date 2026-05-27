import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  Search, X, Heart, ShoppingBag, User,
  TrendingUp, Clock, ArrowRight,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Men", path: "/men" },
  { label: "Women", path: "/women" },
  { label: "New In", path: "/new-in" },
  { label: "Brands", path: "/brands" },
  { label: "Sale 🔥", path: "/sale" },
  { label: "Topwear", path: "/category/topwear" },
  { label: "Sneakers", path: "/category/sneakers" },
  { label: "Beauty", path: "/category/beauty" },
  { label: "Jewellery", path: "/category/jewellery" },
  { label: "Watches", path: "/category/watches" },
  { label: "Luxury", path: "/category/luxury" },
  { label: "Offers", path: "/category/offers" },
];

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
  const navigate = useNavigate();
  const { totalQty } = useCart();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(currentQuery);
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState(getRecent);
  const inputRef = useRef(null);


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
        .snav {
          position: sticky;
          top: 0;
          z-index: 999;
          background: white;
          border-bottom: 1px solid #EEEEEE;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
        }
        .snav-top {
          height: 72px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 24px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .snav-back {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: #555;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition: color 0.2s;
          text-decoration: none;
          shrink-0: true;
        }
        .snav-back:hover { color: #6A2CFF; }
        .snav-logo {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -1.5px;
          color: #111;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          flex-shrink: 0;
        }
        .snav-logo span { color: #6A2CFF; }
        .snav-search-wrap {
          flex: 1;
          position: relative;
        }
        .snav-search-box {
          width: 100%;
          height: 48px;
          background: #F5F5F7;
          border: 2px solid transparent;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          transition: all 0.2s ease;
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
          font-size: 14px;
          font-weight: 500;
          color: #111;
          font-family: 'Inter', sans-serif;
          min-width: 0;
        }
        .snav-input::placeholder { color: #999; font-weight: 400; }
        .snav-search-btn {
          height: 34px;
          padding: 0 18px;
          background: #6A2CFF;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.2s ease;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
        }
        .snav-search-btn:hover { background: #5a22dd; }
        .snav-icons {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .snav-icon-btn {
          width: 42px;
          height: 42px;
          border: none;
          background: transparent;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #444;
          position: relative;
          transition: 0.2s ease;
        }
        .snav-icon-btn:hover { background: #F5F5F7; color: #111; }
        .snav-cart-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6A2CFF;
        }
        /* Quick links strip */
        .snav-links {
          height: 42px;
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          padding: 0 24px;
          border-top: 1px solid #F0F0F0;
          max-width: 1440px;
          margin: 0 auto;
        }
        .snav-links::-webkit-scrollbar { display: none; }
        .snav-link {
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.2s ease;
          text-decoration: none;
          color: #555;
          border: 1px solid transparent;
          flex-shrink: 0;
        }
        .snav-link:hover { background: #F3EEFF; color: #6A2CFF; border-color: #E3D8FF; }
        /* Dropdown */
        .snav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: white;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14);
          border: 1px solid #EEEEEE;
          z-index: 1000;
          overflow: hidden;
          animation: dropIn 0.15s ease;
        }
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        .snav-dropdown-section { padding: 16px 20px; }
        .snav-dropdown-section + .snav-dropdown-section { border-top: 1px solid #F5F5F7; }
        .snav-dropdown-title {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #999;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .snav-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.15s ease;
          font-size: 13px;
          font-weight: 500;
          color: #333;
        }
        .snav-dropdown-item:hover { background: #F3EEFF; color: #6A2CFF; }
        .snav-trending-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .snav-trending-pill {
          padding: 6px 14px;
          background: #F5F5F7;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          transition: 0.15s ease;
        }
        .snav-trending-pill:hover { background: #F3EEFF; color: #6A2CFF; }
        @media (max-width: 767px) {
          .snav-top { padding: 0 12px; gap: 10px; height: 60px; }
          .snav-logo { font-size: 20px; }
          .snav-back span { display: none; }
          .snav-search-btn { display: none; }
          .snav-links { padding: 0 12px; gap: 3px; }
          .snav-link { font-size: 11px; padding: 4px 10px; }
        }
      `}</style>

      <nav className="snav">
        <div className="snav-top">
          {/* Logo + back */}
          <a href="/" className="snav-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            SPRETRO<span>.</span>
          </a>

          {/* Search box */}
          <div
            className="snav-search-wrap"
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
          >
            <div className={`snav-search-box ${focused ? "active" : ""}`}>
              <Search size={18} strokeWidth={2} style={{ color: focused ? "#6A2CFF" : "#999", flexShrink: 0 }} />
              <input
                ref={inputRef}
                className="snav-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search for products, brands and more..."
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#999", flexShrink: 0 }}
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              )}
              <button className="snav-search-btn" onClick={() => doSearch()}>
                Search
              </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="snav-dropdown">
                {recent.length > 0 && (
                  <div className="snav-dropdown-section">
                    <div className="snav-dropdown-title">
                      <span>Recent Searches</span>
                      <button
                        onClick={clearRecent}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#6A2CFF", fontSize: "11px", fontWeight: 700 }}
                      >
                        Clear
                      </button>
                    </div>
                    {recent.map((r) => (
                      <div key={r} className="snav-dropdown-item" onClick={() => { setQuery(r); doSearch(r); }}>
                        <Clock size={14} strokeWidth={2} style={{ color: "#BBB", flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{r}</span>
                        <ArrowRight size={14} strokeWidth={2} style={{ color: "#DDD" }} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="snav-dropdown-section">
                  <div className="snav-dropdown-title">
                    <span><TrendingUp size={11} style={{ display: "inline", marginRight: 4 }} />Trending Now</span>
                  </div>
                  <div className="snav-trending-pills">
                    {TRENDING.map((t) => (
                      <div key={t} className="snav-trending-pill" onClick={() => { setQuery(t); doSearch(t); }}>
                        🔥 {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="snav-icons">
            <button className="snav-icon-btn" title="Wishlist">
              <Heart size={20} strokeWidth={1.9} />
            </button>
            <button className="snav-icon-btn" title="Profile">
              <User size={20} strokeWidth={1.9} />
            </button>
            <button className="snav-icon-btn" title="Cart" onClick={() => navigate("/cart")} style={{ position: "relative" }}>
              <ShoppingBag size={20} strokeWidth={1.9} />
              {totalQty > 0
                ? <span className="snav-cart-dot" style={{ width: 16, height: 16, fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{totalQty > 99 ? "99+" : totalQty}</span>
                : <span className="snav-cart-dot" />
              }
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ borderTop: "1px solid #F0F0F0" }}>
          <div className="snav-links" style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <a href="/" className="snav-link" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              🏠 Home
            </a>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="snav-link"
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
