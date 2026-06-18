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

const PANEL_CARD =
  "absolute right-0 top-[calc(100%+8px)] bg-white border border-[#F0EAFF] overflow-hidden z-[1001] rounded-[18px] shadow-[0_12px_48px_rgba(0,0,0,0.13),0_4px_16px_rgba(106,44,255,0.1)] animate-[snavDrop_0.16s_ease]";
const ICON_BTN =
  "relative flex flex-col items-center justify-center gap-[3px] w-[58px] h-[52px] border-none bg-transparent cursor-pointer rounded-[10px] text-[#444] transition-all duration-150 hover:bg-[#F5F5F7] hover:text-[#6A2CFF] max-[767px]:w-10 max-[767px]:h-10";
const ICON_LABEL = "text-[10px] font-bold text-inherit tracking-[0.02em] whitespace-nowrap max-[767px]:hidden";
const BADGE =
  "absolute top-[6px] right-[10px] min-w-[16px] h-4 px-[3px] rounded-lg bg-[linear-gradient(135deg,#EC4899,#F97316)] text-[9px] font-extrabold text-white flex items-center justify-center";

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
    <nav className="sticky top-0 z-[999] bg-white font-inter shadow-[0_1px_0_#EEEEEE,0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-8 max-[1023px]:px-5 max-[767px]:h-[58px] max-[767px]:gap-2 max-[767px]:px-3.5">

        {/* Logo */}
        <a
          href="/"
          className="mr-9 shrink-0 cursor-pointer whitespace-nowrap text-[30px] font-extrabold tracking-[-1.2px] text-[#111] no-underline max-[1023px]:mr-6 max-[1023px]:text-[24px] max-[767px]:mr-0 max-[767px]:text-[22px]"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          SPRETRO<span className="inline-block bg-[linear-gradient(135deg,#3D0ECC_0%,#6A2CFF_45%,#9B6DFF_100%)] bg-clip-text text-transparent">.</span>
        </a>

        {/* Nav links */}
        <div className="flex shrink-0 items-center gap-1 max-[767px]:hidden">
          {NAV_LINKS.map((l) => {
            const subs = NAV_SUBCATS[l.path];
            const topTo = subs ? groupPath(l.path.replace(/^\//, "")) : l.path;
            const isActive = location.pathname === l.path
              || (subs && navGroupParam === l.path.replace(/^\//, ""));
            const isOpen = activeNav === l.label;
            return (
              <div
                key={l.path}
                className="group relative flex items-center"
                onMouseEnter={() => subs && openNav(l.label)}
                onMouseLeave={() => subs && closeNav()}
              >
                <a
                  href={topTo}
                  className={`relative cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-bold tracking-[0.01em] no-underline transition-all duration-150 ${
                    l.hot
                      ? "text-[#E83E6C] hover:bg-[#FFF0F5]"
                      : `hover:bg-[#F5F0FF] hover:text-[#6A2CFF] ${isActive ? "text-[#6A2CFF]" : "text-[#444]"}`
                  }`}
                  onClick={(e) => { e.preventDefault(); navigate(topTo); setActiveNav(null); }}
                >
                  {l.label}
                </a>
                {subs && (
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`shrink-0 transition-all duration-200 group-hover:text-[#6A2CFF] ${isOpen ? "rotate-180 text-[#6A2CFF]" : "text-[#aaa]"}`}
                  />
                )}

                {subs && isOpen && (
                  <div
                    className="absolute left-0 top-[calc(100%+10px)] z-[1001] min-w-[200px] rounded-2xl border border-[#ECE7FF] bg-white p-[7px] shadow-[0_16px_48px_rgba(15,23,42,0.13),0_4px_16px_rgba(106,44,255,0.08)] animate-[snavDrop_0.16s_ease] before:absolute before:-top-[10px] before:left-0 before:right-0 before:h-[10px] before:content-['']"
                    onMouseEnter={keepNav}
                    onMouseLeave={closeNav}
                  >
                    {subs.map((sc) => (
                      <button
                        key={sc.label}
                        className="block w-full cursor-pointer rounded-[9px] border-none bg-transparent px-3 py-2 text-left text-[13px] font-semibold text-[#3A356B] transition-all duration-150 hover:bg-[#F5F0FF] hover:text-[#6A2CFF]"
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

        <div className="flex-1 max-[767px]:hidden" />

        {/* Search */}
        <div
          className="relative mx-5 w-[340px] shrink-0 max-[1023px]:mx-3 max-[1023px]:w-[260px] max-[767px]:mx-2 max-[767px]:w-auto max-[767px]:flex-1"
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
        >
          <div
            className={`flex h-11 w-full cursor-text items-center gap-2.5 rounded-full border-[1.5px] px-3.5 transition-all duration-200 ${
              focused
                ? "border-[#6A2CFF] bg-white shadow-[0_0_0_4px_rgba(106,44,255,0.08)]"
                : "border-transparent bg-[#F5F5F7]"
            }`}
          >
            <Search size={16} strokeWidth={2} className={`shrink-0 ${focused ? "text-[#6A2CFF]" : "text-[#aaa]"}`} />
            <input
              ref={inputRef}
              className="min-w-0 flex-1 border-none bg-transparent text-[13px] font-normal text-[#111] outline-none placeholder:text-[#999]"
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
                className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0 text-[#999] hover:text-[#666]"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[1001] overflow-hidden rounded-[18px] border border-[#EEEEEE] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] animate-[snavDrop_0.15s_ease]">
              {recent.length > 0 && (
                <div className="px-[18px] py-[14px]">
                  <div className="mb-[9px] flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#999]">
                    <span>Recent</span>
                    <button onClick={clearRecent} className="cursor-pointer border-none bg-transparent text-[11px] font-bold text-[#6A2CFF]">Clear</button>
                  </div>
                  {recent.map((r) => (
                    <div key={r} className="flex cursor-pointer items-center gap-2.5 rounded-[9px] px-2 py-[7px] text-[13px] font-medium text-[#333] transition-all duration-150 hover:bg-[#F3EEFF] hover:text-[#6A2CFF]" onClick={() => { setQuery(r); doSearch(r); }}>
                      <Clock size={13} strokeWidth={2} className="shrink-0 text-[#bbb]" />
                      <span className="flex-1">{r}</span>
                      <ArrowRight size={13} strokeWidth={2} className="text-[#ddd]" />
                    </div>
                  ))}
                </div>
              )}
              <div className={`px-[18px] py-[14px] ${recent.length > 0 ? "border-t border-[#F5F5F7]" : ""}`}>
                <div className="mb-[9px] flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#999]">
                  <span><TrendingUp size={10} className="mr-1 inline" />Trending</span>
                </div>
                <div className="flex flex-wrap gap-[7px]">
                  {TRENDING.map((t) => (
                    <div key={t} className="cursor-pointer rounded-[20px] bg-[#F5F5F7] px-[13px] py-[5px] text-[12px] font-semibold text-[#555] transition-all duration-150 hover:bg-[#F3EEFF] hover:text-[#6A2CFF]" onClick={() => { setQuery(t); doSearch(t); }}>🔥 {t}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right icons */}
        <div className="flex shrink-0 items-center">

          {/* Profile / Account */}
          {!isLoggedIn ? (
            <button className={ICON_BTN} onClick={() => navigate("/login")}>
              <User size={20} strokeWidth={1.8} />
              <span className={ICON_LABEL}>Profile</span>
            </button>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => openPanel("user")}
              onMouseLeave={closePanel}
            >
              <button
                className={ICON_BTN}
                onClick={() => { navigate("/account"); setActivePanel(null); }}
              >
                <User size={20} strokeWidth={1.8} />
                <span className={ICON_LABEL}>Profile</span>
              </button>

              {activePanel === "user" && (
                <div className={`${PANEL_CARD} w-60`} onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                  <div className="flex cursor-pointer items-center gap-2.5 bg-[linear-gradient(135deg,#1a1a2e,#16213e)] px-[14px] pb-[11px] pt-[13px]" onClick={() => { navigate("/account"); setActivePanel(null); }}>
                    <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[rgba(106,44,255,0.4)]">
                      <User size={14} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold leading-[1.2] text-white">{user?.full_name || "My Account"}</div>
                      <div className="mt-px text-[11px] font-medium text-[rgba(255,255,255,0.5)]">{user?.email || user?.phone || "View your account"}</div>
                    </div>
                  </div>
                  <div className="px-[5px] pb-2 pt-1.5">
                    {[
                      { icon: <Package    size={13} strokeWidth={2} />, label: "My Orders",      path: "/account" },
                      { icon: <Heart      size={13} strokeWidth={2} />, label: "Wishlist",       path: null },
                      { icon: <Star       size={13} strokeWidth={2} />, label: "Rewards",        path: "/account" },
                      { icon: <Settings   size={13} strokeWidth={2} />, label: "Settings",       path: "/account" },
                      { icon: <HelpCircle size={13} strokeWidth={2} />, label: "Help & Support", path: "/account" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="group/row flex w-full cursor-pointer items-center gap-[9px] rounded-[10px] border-none bg-transparent px-[9px] py-2 text-left text-[12px] font-semibold text-[#333] transition-all duration-150 hover:bg-[#F5F0FF] hover:text-[#6A2CFF]"
                        onClick={() => { if (item.path) { navigate(item.path); setActivePanel(null); } }}
                      >
                        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#F5F5F7] text-[#555] transition-all duration-150 group-hover/row:bg-[#EDE4FF] group-hover/row:text-[#6A2CFF]">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <div className="mx-2 my-[3px] h-px bg-[#F3F3F6]" />
                    <button
                      className="flex w-full cursor-pointer items-center gap-[9px] rounded-[10px] border-none bg-transparent px-[9px] py-2 text-left text-[12px] font-semibold text-[#E83E6C] transition-all duration-150 hover:bg-[#FFF0F5]"
                      onClick={() => { logout(); setActivePanel(null); navigate("/"); }}
                    >
                      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#FFF0F5] text-[#E83E6C]">
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
            className="relative"
            onMouseEnter={() => openPanel("wishlist")}
            onMouseLeave={closePanel}
          >
            <button className={ICON_BTN} onClick={() => navigate("/women")}>
              <Heart size={20} strokeWidth={1.8} className={wishlistItems.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
              {wishlistItems.length > 0 && (
                <span className={BADGE}>{wishlistItems.length > 99 ? "99+" : wishlistItems.length}</span>
              )}
              <span className={ICON_LABEL}>Wishlist</span>
            </button>

            {activePanel === "wishlist" && (
              <div className={`${PANEL_CARD} w-[260px]`} onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                <div className="flex items-center gap-2.5 border-b border-[#F3F3F6] px-[14px] py-[13px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(135deg,#FF6B9D,#FF4D7E)]">
                    <Heart size={15} strokeWidth={2} color="white" />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold leading-[1.1] text-[#111]">Wishlist</div>
                    <div className="mt-px text-[11px] font-medium text-[#888]">{wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}</div>
                  </div>
                </div>
                {wishlistItems.length === 0 ? (
                  <div className="flex flex-col items-center gap-1.5 px-4 pb-2 pt-5 text-center">
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#F5F0FF] text-[#6A2CFF]"><Heart size={20} strokeWidth={1.8} /></div>
                    <div className="text-[13px] font-bold text-[#111]">Nothing saved yet</div>
                    <div className="text-[11px] font-medium leading-[1.4] text-[#aaa]">Tap the heart on any product to save it here</div>
                  </div>
                ) : (
                  <div className="flex max-h-[220px] flex-col gap-1.5 overflow-y-auto p-1.5">
                    {wishlistItems.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex cursor-pointer items-center gap-2.5 rounded-[10px] p-1.5 hover:bg-[#F5F0FF]" onClick={() => { navigate(`/product/${item.id}`); setActivePanel(null); }}>
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F5F3FF]"><img src={item.image} alt="" className="h-full w-full object-contain p-[3px]" /></div>
                        <div className="min-w-0 flex-1">
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-bold text-[#111]">{item.name}</div>
                          <div className="mt-px text-[11px] font-extrabold text-[#333]">₹{Number(item.price).toLocaleString("en-IN")}</div>
                        </div>
                        <button
                          className="flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#FFF0F5] text-[13px] font-bold text-[#E83E6C]"
                          onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button className="mx-[14px] mb-3.5 mt-3 block w-[calc(100%-28px)] cursor-pointer rounded-xl border-none bg-[#6A2CFF] p-2.5 text-center text-[12px] font-bold text-white transition-all duration-200 hover:bg-[#5A1EEF]" onClick={() => { navigate("/women"); setActivePanel(null); }}>
                  {wishlistItems.length > 0 ? "Continue Shopping" : "Browse & Save"}
                </button>
              </div>
            )}
          </div>

          {/* Cart / Bag */}
          <div
            className="relative"
            onMouseEnter={() => openPanel("cart")}
            onMouseLeave={closePanel}
          >
            <button className={ICON_BTN} onClick={() => navigate("/cart")}>
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalQty > 0 && (
                <span className={BADGE}>{totalQty > 99 ? "99+" : totalQty}</span>
              )}
              <span className={ICON_LABEL}>Bag</span>
            </button>

            {activePanel === "cart" && (
              <div className={`${PANEL_CARD} w-[260px]`} onMouseEnter={keepPanel} onMouseLeave={closePanel}>
                <div className="flex items-center gap-2.5 border-b border-[#F3F3F6] px-[14px] py-[13px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(135deg,#6A2CFF,#9B6DFF)]">
                    <ShoppingBag size={15} strokeWidth={2} color="white" />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold leading-[1.1] text-[#111]">My Cart</div>
                    <div className="mt-px text-[11px] font-medium text-[#888]">{totalQty} {totalQty === 1 ? "item" : "items"}</div>
                  </div>
                </div>
                {totalQty === 0 ? (
                  <div className="flex flex-col items-center gap-1.5 px-4 pb-2 pt-5 text-center">
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#F5F0FF] text-[#6A2CFF]"><ShoppingBag size={20} strokeWidth={1.8} /></div>
                    <div className="text-[13px] font-bold text-[#111]">Your cart is empty</div>
                    <div className="text-[11px] font-medium leading-[1.4] text-[#aaa]">Add products and they'll show up here</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 px-4 pb-2 pt-5 text-center">
                    <div className="text-[13px] font-bold text-[#111]">{totalQty} {totalQty === 1 ? "item" : "items"} in your bag</div>
                    <div className="text-[11px] font-medium leading-[1.4] text-[#aaa]">Review and checkout when you're ready</div>
                  </div>
                )}
                <button className="mx-[14px] mb-3.5 mt-3 block w-[calc(100%-28px)] cursor-pointer rounded-xl border-none bg-[#6A2CFF] p-2.5 text-center text-[12px] font-bold text-white transition-all duration-200 hover:bg-[#5A1EEF]" onClick={() => { navigate("/cart"); setActivePanel(null); }}>
                  View Cart
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
