import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import { Search, Heart, ShoppingBag, User, Menu, Package, Star, Settings, HelpCircle, ChevronDown } from "lucide-react";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

const tickerItems = [
  "FREE SHIPPING ABOVE ₹2999",
  "SUMMER DROP LIVE NOW",
  "FLAT 40% OFF ON SELECTED BRANDS",
  "EASY 7 DAY RETURNS",
];

const navLinks = [
  { label: "Women", path: "/women" },
  { label: "Men", path: "/men" },
  { label: "Kids", path: "/kids" },
  { label: "New In", path: "/new-in" },
  { label: "Brands", path: "/brands" },
  { label: "Sale", path: "/sale" },
];

const menuItems = [
  { label: "Topwear", path: "/category/topwear" },
  { label: "Sneakers", path: "/category/sneakers" },
  { label: "Beauty", path: "/category/beauty" },
  { label: "Jewellery", path: "/category/jewellery" },
  { label: "Watches", path: "/category/watches" },
  { label: "Luxury", path: "/category/luxury" },
  { label: "Offers", path: "/category/offers" },
];

const PATH_TO_LINK = Object.fromEntries(navLinks.map((l) => [l.path, l.label]));

// Top-level department pages now open the Search UI in category mode.
const groupPath = (key) => `/search?group=${key}`;
const subCatPath = (key, cats) =>
  cats?.length ? `/search?group=${key}&cats=${encodeURIComponent(cats.join(","))}` : groupPath(key);

// Build AJIO-style dropdown sub-categories for nav links that have them.
const NAV_SUBCATS = navLinks.reduce((acc, link) => {
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

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQty } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const panelTimer = useRef(null);
  const menuTimer = useRef(null);
  const navTimer = useRef(null);

  const groupParam = new URLSearchParams(location.search).get("group");
  const activeLink =
    PATH_TO_LINK[location.pathname] ||
    (groupParam ? PATH_TO_LINK[`/${groupParam}`] : "") ||
    "";

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
    }
  };

  const openPanel = (name) => {
    clearTimeout(panelTimer.current);
    setActivePanel(name);
  };

  const closePanel = () => {
    panelTimer.current = setTimeout(() => setActivePanel(null), 120);
  };

  const keepPanel = () => {
    clearTimeout(panelTimer.current);
  };

  const openMenu = () => {
    clearTimeout(menuTimer.current);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => setMenuOpen(false), 120);
  };

  const keepMenu = () => {
    clearTimeout(menuTimer.current);
  };

  const openNav = (label) => {
    clearTimeout(navTimer.current);
    setActiveNav(label);
  };

  const closeNav = () => {
    navTimer.current = setTimeout(() => setActiveNav(null), 300);
  };

  const keepNav = () => {
    clearTimeout(navTimer.current);
  };

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <>
      <nav className="w-full bg-white sticky top-0 z-[999] shadow-[0_4px_24px_rgba(106,44,255,0.08),0_1px_0_rgba(0,0,0,0.04)]">

        {/* TICKER */}

        <div
          className="h-[30px] overflow-hidden flex items-center bg-[length:200%_100%] animate-[tickerBg_8s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #5A14EF 0%, #7C3AED 40%, #9B6DFF 70%, #7C3AED 100%)",
          }}
        >
          <div className="flex whitespace-nowrap animate-[ticker_25s_linear_infinite]">
            {doubled.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-10 text-white text-[11px] font-semibold tracking-[1px] whitespace-nowrap">
                <span>{item}</span>
                <span className="w-1 h-1 rounded-full bg-white shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* MAIN NAVBAR */}

        <div className="relative h-16 min-h-16 px-8 flex items-center justify-between border-b border-[#F2E8FF] bg-white max-[1023px]:h-auto max-[1023px]:px-4 max-[1023px]:flex-wrap max-[1023px]:items-start max-[1023px]:gap-2.5 max-[767px]:min-h-[50px] max-[767px]:py-2 max-[767px]:px-3.5 max-[767px]:items-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[linear-gradient(90deg,transparent,#6A2CFF33,#9B6DFF55,#6A2CFF33,transparent)]">

          {/* LEFT */}

          <div className="flex items-center gap-6 min-w-0 flex-1 max-[1023px]:flex-wrap max-[1023px]:items-start max-[1023px]:justify-start max-[1023px]:gap-4 max-[1023px]:w-full">

            {/* LOGO */}

            <div
              className="flex flex-col cursor-pointer min-w-0 max-w-[220px] max-[1023px]:max-w-[160px] max-[767px]:max-w-[140px]"
              onClick={() => navigate("/")}
            >
              <div className="text-[30px] font-extrabold tracking-[-1.2px] text-[#111] leading-none whitespace-nowrap overflow-hidden text-ellipsis max-[1023px]:text-[26px] max-[767px]:text-[22px] max-[767px]:tracking-[-1px] max-[479px]:text-[20px]">
                SPRETRO
                <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#3D0ECC_0%,#6A2CFF_45%,#9B6DFF_100%)]">.</span>
              </div>
              <div className="text-[10px] font-bold tracking-[3px] text-[#9B6DFF] mt-0.5 uppercase opacity-70 max-[767px]:hidden">
                Fashion Commerce
              </div>
            </div>

            {/* LINKS */}

            <div className="flex items-center gap-[22px] min-w-0 max-[1023px]:w-full max-[1023px]:gap-3.5 max-[1023px]:overflow-x-auto max-[1023px]:pb-0.5 max-[1023px]:mt-1 max-[1023px]:[scrollbar-width:none] max-[1023px]:[&::-webkit-scrollbar]:hidden max-[767px]:hidden">
              {navLinks.map((link) => {
                const subs = NAV_SUBCATS[link.path];
                const topTo = subs ? groupPath(link.path.replace(/^\//, "")) : link.path;
                const isOpen = activeNav === link.label;
                return (
                  <div
                    key={link.label}
                    className="relative flex items-center gap-[3px] max-[1023px]:shrink-0"
                    onMouseEnter={() => subs && openNav(link.label)}
                    onMouseLeave={() => subs && closeNav()}
                  >
                    <a
                      href={topTo}
                      className={`relative text-sm font-semibold tracking-[0.01em] py-1.5 transition-colors duration-200 whitespace-nowrap no-underline
                        after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-sm after:bg-[linear-gradient(90deg,#6A2CFF,#9B6DFF)] after:transition-[width] after:duration-200
                        hover:text-[#3D0ECC] hover:after:w-full
                        ${activeLink === link.label ? "text-[#3D0ECC] after:w-full" : "text-[#4F4F5C] after:w-0"}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(topTo);
                        setActiveNav(null);
                      }}
                    >
                      {link.label}
                    </a>

                    {subs && (
                      <ChevronDown
                        size={13}
                        strokeWidth={2.5}
                        className={`shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#6A2CFF]" : "text-[#9B8FB5]"
                        }`}
                      />
                    )}

                    {subs && isOpen && (
                      <div
                        className="absolute top-[calc(100%+12px)] left-0 min-w-[208px] bg-white rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.13),0_4px_16px_rgba(106,44,255,0.08)] border border-[#ECE7FF] p-2 z-[1000] [animation:dropIn_0.18s_ease] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                        onMouseEnter={keepNav}
                        onMouseLeave={closeNav}
                      >
                        {subs.map((sc) => (
                          <button
                            key={sc.label}
                            className="block w-full text-left border-none bg-transparent rounded-[10px] px-3 py-[9px] text-[13px] font-semibold text-[#3A356B] cursor-pointer transition-colors duration-150 hover:bg-[#F5F0FF] hover:text-[#6A2CFF]"
                            onClick={() => {
                              navigate(sc.to);
                              setActiveNav(null);
                            }}
                          >
                            {sc.label === "All" ? `All ${link.label}` : sc.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* SEARCH */}

          <div className="w-[420px] max-w-full h-11 ml-auto mr-5 bg-[#F5F5F7] rounded-full flex items-center gap-3 px-4 text-[#777] border-[1.5px] border-transparent transition-all duration-200 cursor-text hover:bg-white hover:border-[#6A2CFF] hover:shadow-[0_0_0_4px_rgba(106,44,255,0.08)] focus-within:bg-white focus-within:border-[#6A2CFF] focus-within:shadow-[0_0_0_4px_rgba(106,44,255,0.08)] max-[1023px]:w-full max-[1023px]:flex-[1_1_100%] max-[1023px]:min-w-0 max-[1023px]:m-0 max-[767px]:order-3 max-[767px]:h-10">
            <Search
              size={17}
              strokeWidth={2}
              className="cursor-pointer transition-colors duration-200 text-[#111]"
              onClick={handleSearch}
            />
            <input
              className="bg-transparent border-none outline-none flex-1 min-w-0 font-sans text-sm font-medium text-[#2A2A2A] placeholder:text-[#888]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search sneakers, kurtas, watches..."
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3 min-w-0 max-[1023px]:w-full max-[1023px]:justify-end max-[1023px]:flex-[1_1_100%] max-[767px]:w-auto max-[767px]:flex-[0_0_auto] max-[767px]:gap-1">

            {/* WISHLIST */}

            <div
              className="relative"
              onMouseEnter={() => openPanel("wishlist")}
              onMouseLeave={closePanel}
            >
              <button
                className="relative w-[42px] h-[42px] border-none rounded-xl bg-[#FAF5FF] flex items-center justify-center cursor-pointer text-[#111] transition-all duration-200 hover:bg-[#F3EEFF] hover:-translate-y-px max-[767px]:w-9 max-[767px]:h-9 max-[767px]:rounded-[10px]"
                onClick={() => setActivePanel((p) => (p === "wishlist" ? null : "wishlist"))}
              >
                <Heart size={19} strokeWidth={1.9} className={wishlistItems.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center bg-[linear-gradient(135deg,#FF6B9D,#FF4D7E)]">
                    {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
                  </span>
                )}
              </button>

              {activePanel === "wishlist" && (
                <div
                  className="absolute top-[calc(100%+12px)] right-0 w-[260px] bg-white rounded-[20px] shadow-[0_16px_56px_rgba(0,0,0,0.14),0_4px_16px_rgba(106,44,255,0.1)] border border-[#F0EAFF] overflow-hidden z-[1000] [animation:panelIn_0.18s_ease] max-[767px]:!block max-[767px]:fixed max-[767px]:top-[100px] max-[767px]:right-2.5 max-[767px]:left-auto max-[767px]:!w-[min(280px,calc(100vw-20px))]"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="px-[18px] pt-3.5 pb-3 flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 bg-[linear-gradient(135deg,#FF6B9D,#FF4D7E)]">
                      <Heart size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#111] leading-[1.1]">Wishlist</div>
                      <div className="text-[11px] text-[#888] font-medium mt-px">
                        {wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-[#F3F3F6] mx-[18px]" />
                  {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center px-[18px] pt-5 pb-4 gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#F5F0FF] flex items-center justify-center text-[#6A2CFF]">
                        <Heart size={22} strokeWidth={1.8} />
                      </div>
                      <div className="text-[13px] font-bold text-[#111]">Nothing saved yet</div>
                      <div className="text-[11px] text-[#aaa] font-medium text-center leading-[1.4]">
                        Tap the heart on any product<br />to save it here
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-[220px] overflow-y-auto flex flex-col gap-2 py-1">
                      {wishlistItems.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2.5 px-1 py-1.5 cursor-pointer rounded-[10px] hover:bg-gray-50"
                          onClick={() => { navigate(`/product/${item.id}`); setActivePanel(null); }}
                        >
                          <div className="w-[42px] h-[42px] rounded-lg overflow-hidden bg-[#F5F3FF] shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-contain p-[3px]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-extrabold text-[#6A2CFF] uppercase tracking-[0.05em]">{item.brand}</div>
                            <div className="text-xs font-bold text-[#0F0A1E] whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</div>
                            <div className="text-[11px] font-extrabold text-[#333] mt-px">₹{Number(item.price).toLocaleString("en-IN")}</div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                            className="w-6 h-6 rounded-full border-none bg-[#FFF0F5] text-[#E83E6C] flex items-center justify-center cursor-pointer shrink-0 text-sm font-bold"
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {wishlistItems.length > 5 && (
                        <div className="text-center text-[11px] font-bold text-[#999] pt-1">
                          +{wishlistItems.length - 5} more items
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    className={`block w-[calc(100%-36px)] mx-[18px] mb-3.5 mt-0 py-2.5 rounded-xl text-xs font-bold text-center border-none cursor-pointer text-white transition-colors duration-200 ${
                      wishlistItems.length > 0
                        ? "bg-[linear-gradient(135deg,#FF6B9D,#FF4D7E)]"
                        : "bg-[#6A2CFF] hover:bg-[#5A1EEF]"
                    }`}
                    onClick={() => { navigate("/women"); setActivePanel(null); }}
                  >
                    {wishlistItems.length > 0 ? "Continue Shopping" : "Browse & Save"}
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE */}

            <div
              className="relative"
              onMouseEnter={() => isAuthenticated && openPanel("user")}
              onMouseLeave={closePanel}
            >
              {isAuthenticated ? (
                <button
                  className="relative w-[42px] h-[42px] border-none rounded-xl bg-[#FAF5FF] flex items-center justify-center cursor-pointer text-[#111] transition-all duration-200 hover:bg-[#F3EEFF] hover:-translate-y-px max-[767px]:w-9 max-[767px]:h-9 max-[767px]:rounded-[10px]"
                  onClick={() => navigate("/account")}
                  title="My Account"
                >
                  <User size={19} strokeWidth={1.9} />
                </button>
              ) : (
                <button
                  className="flex items-center gap-1.5 h-[42px] px-4 border-none rounded-xl bg-[#6A2CFF] text-white text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#5A1EEF] hover:-translate-y-px max-[767px]:h-9 max-[767px]:px-3 max-[767px]:rounded-[10px]"
                  onClick={() => navigate("/login")}
                >
                  <User size={17} strokeWidth={2} />
                  <span className="max-[767px]:hidden">Sign In</span>
                </button>
              )}

              {isAuthenticated && activePanel === "user" && (
                <div
                  className="absolute top-[calc(100%+12px)] right-0 w-[260px] bg-white rounded-[20px] shadow-[0_16px_56px_rgba(0,0,0,0.14),0_4px_16px_rgba(106,44,255,0.1)] border border-[#F0EAFF] overflow-hidden z-[1000] [animation:panelIn_0.18s_ease]"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div
                    className="px-[18px] pt-3.5 pb-3.5 flex items-center gap-2.5 cursor-pointer bg-[linear-gradient(135deg,#1a1a2e,#16213e)]"
                    onClick={() => { navigate("/account"); setActivePanel(null); }}
                  >
                    <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(106,44,255,0.4)]">
                      <User size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white leading-[1.1]">
                        My Account
                      </div>
                      <div className="text-[11px] text-white/50 font-medium mt-px">
                        {user?.full_name ? `Hi, ${user.full_name}` : "Welcome back"}
                      </div>
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    {[
                      { icon: <Package size={15} strokeWidth={2} />, label: "My Orders", sub: "Track & manage", path: "/account" },
                      { icon: <Heart size={15} strokeWidth={2} />, label: "Wishlist", sub: "Saved items", path: null },
                      { icon: <Star size={15} strokeWidth={2} />, label: "Rewards", sub: "Points & offers", path: "/account" },
                      { icon: <Settings size={15} strokeWidth={2} />, label: "Settings", sub: "Account preferences", path: "/account" },
                      { icon: <HelpCircle size={15} strokeWidth={2} />, label: "Help & Support", sub: "FAQs & contact", path: "/account" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="group flex items-center gap-2.5 px-3 py-[9px] rounded-xl cursor-pointer transition-colors duration-150 text-[#333] text-[13px] font-semibold border-none bg-transparent w-full text-left hover:bg-[#F5F0FF] hover:text-[#6A2CFF]"
                        onClick={() => { if (item.path) { navigate(item.path); setActivePanel(null); } }}
                      >
                        <span className="w-[30px] h-[30px] rounded-[9px] bg-[#F5F5F7] flex items-center justify-center shrink-0 transition-colors duration-150 text-[#555] group-hover:bg-[#EDE4FF] group-hover:text-[#6A2CFF]">{item.icon}</span>
                        <span>
                          <div className="text-[13px] font-bold text-[#222]">{item.label}</div>
                          <div className="text-[11px] text-[#aaa] font-medium mt-px">{item.sub}</div>
                        </span>
                      </button>
                    ))}
                    <button
                      className="group flex items-center gap-2.5 px-3 py-[9px] rounded-xl cursor-pointer transition-colors duration-150 text-[13px] font-semibold border-none bg-transparent w-full text-left text-[#E83E6C] hover:bg-[#F5F0FF]"
                      onClick={() => { logout(); setActivePanel(null); navigate("/"); }}
                    >
                      <span className="w-[30px] h-[30px] rounded-[9px] bg-[#FFF0F5] flex items-center justify-center shrink-0 text-[#E83E6C]">
                        <User size={15} strokeWidth={2} />
                      </span>
                      <span>
                        <div className="text-[13px] font-bold text-[#E83E6C]">Sign Out</div>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MENU */}

            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <button
                className="w-[42px] h-[42px] border-none rounded-xl bg-[#FAF5FF] flex items-center justify-center cursor-pointer text-[#111] transition-all duration-200 hover:bg-[#F3EEFF] hover:-translate-y-px max-[767px]:h-[38px] max-[767px]:px-3 max-[767px]:text-xs max-[767px]:rounded-[10px] max-[767px]:gap-[5px] max-[767px]:w-auto"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="Open menu"
              >
                <Menu size={18} strokeWidth={2} />
              </button>

              {menuOpen && (
                <div
                  className="absolute top-[calc(100%+10px)] right-0 w-80 bg-white rounded-[18px] shadow-[0_24px_64px_rgba(15,23,42,0.12)] border border-[#ECE7FF] overflow-hidden z-[1000] [animation:dropIn_0.18s_ease]"
                  onMouseEnter={keepMenu}
                  onMouseLeave={closeMenu}
                >
                  <div className="p-4">
                    <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#8F89A3] mb-3">
                      Shop by category
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {menuItems.map((item) => (
                        <button
                          key={item.label}
                          className="w-full text-left border-none bg-[#F8F4FF] rounded-xl px-3.5 py-3 text-sm font-semibold text-[#3A356B] cursor-pointer transition-colors duration-200 hover:bg-[#ECE4FF] hover:text-[#3D0ECC]"
                          onClick={() => {
                            navigate(item.path);
                            setMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CART */}

            <div
              className="relative"
              onMouseEnter={() => openPanel("cart")}
              onMouseLeave={closePanel}
            >
              <button
                className="relative w-[42px] h-[42px] border-none rounded-xl bg-[#FAF5FF] flex items-center justify-center cursor-pointer text-[#111] transition-all duration-200 hover:bg-[#F3EEFF] hover:-translate-y-px max-[767px]:w-9 max-[767px]:h-9 max-[767px]:rounded-[10px]"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag size={19} strokeWidth={1.9} />
                {totalQty > 0 ? (
                  <span className="absolute top-[9px] right-[9px] w-4 h-4 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center bg-[linear-gradient(135deg,#EC4899,#F97316)]">
                    {totalQty > 99 ? "99+" : totalQty}
                  </span>
                ) : (
                  <span className="absolute top-[9px] right-[9px] w-2 h-2 rounded-full bg-[linear-gradient(135deg,#EC4899,#F97316)] animate-[pulse_2s_infinite]" />
                )}
              </button>

              {activePanel === "cart" && (
                <div
                  className="absolute top-[calc(100%+12px)] right-0 w-[260px] bg-white rounded-[20px] shadow-[0_16px_56px_rgba(0,0,0,0.14),0_4px_16px_rgba(106,44,255,0.1)] border border-[#F0EAFF] overflow-hidden z-[1000] [animation:panelIn_0.18s_ease] max-[767px]:hidden"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="px-[18px] pt-3.5 pb-3 flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 bg-[linear-gradient(135deg,#6A2CFF,#9B6DFF)]">
                      <ShoppingBag size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#111] leading-[1.1]">My Cart</div>
                      <div className="text-[11px] text-[#888] font-medium mt-px">0 items · ₹0</div>
                    </div>
                  </div>
                  <div className="h-px bg-[#F3F3F6] mx-[18px]" />
                  <div className="flex flex-col items-center px-[18px] pt-5 pb-4 gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F0FF] flex items-center justify-center text-[#6A2CFF]">
                      <ShoppingBag size={22} strokeWidth={1.8} />
                    </div>
                    <div className="text-[13px] font-bold text-[#111]">Your cart is empty</div>
                    <div className="text-[11px] text-[#aaa] font-medium text-center leading-[1.4]">
                      Add products to your cart<br />and they'll show up here
                    </div>
                  </div>
                  <button
                    className="block w-[calc(100%-36px)] mx-[18px] mb-3.5 mt-0 py-2.5 rounded-xl bg-[#6A2CFF] text-white text-xs font-bold text-center border-none cursor-pointer transition-colors duration-200 hover:bg-[#5A1EEF]"
                    onClick={() => { navigate("/cart"); setActivePanel(null); }}
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* MOBILE NAV TILES — phone only */}
        <div className="hidden max-[767px]:grid grid-cols-4 gap-2 px-3 py-2.5 bg-[linear-gradient(180deg,#FAFAFF_0%,#FFFFFF_100%)] border-b border-[#EDE8FF]">
          {[
            { label: "Women", path: "/women", tileClass: "bg-[#FFF0F5] text-[#EC4899]",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M9 20h6M12 16v4M8 12c-2.5 1-4 3-4 5h16c0-2-1.5-4-4-5"/></svg> },
            { label: "Men", path: "/men", tileClass: "bg-[#EFF6FF] text-[#3B82F6]",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M12 14c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4z"/></svg> },
            { label: "Kids", path: "/kids", tileClass: "bg-[#FFFBEB] text-[#F59E0B]",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M9 22V12l-2-3h10l-2 3v10"/><path d="M9 17h6"/></svg> },
            { label: "New In", path: "/new-in", tileClass: "bg-[#F3EEFF] text-[#6A2CFF]",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center gap-[5px] py-2.5 px-1 rounded-2xl cursor-pointer transition-all duration-200 text-[11px] font-extrabold tracking-[0.01em] border-[1.5px] border-transparent hover:bg-[linear-gradient(135deg,#EDE4FF,#E5D8FF)] hover:text-[#6A2CFF] hover:border-[#C4B0FF] ${
                activeLink === item.label
                  ? "bg-[linear-gradient(135deg,#EDE4FF,#E5D8FF)] text-[#6A2CFF] border-[#C4B0FF] shadow-[0_4px_14px_rgba(106,44,255,0.15)]"
                  : "text-[#555]"
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.tileClass}`}>
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </div>

      </nav>
    </>
  );
}