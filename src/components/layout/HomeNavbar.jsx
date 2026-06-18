import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import { Search, Heart, ShoppingBag, User, Menu, Package, Star, Settings, HelpCircle, ChevronDown } from "lucide-react";
import { LISTING_CONFIGS } from "../../data/listingConfigs";
import "./HomeNavbar.css";

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
      <nav className="spretro-navbar">

        {/* TICKER */}

        <div className="spretro-ticker">
          <div className="spretro-ticker-track">

            {doubled.map((item, i) => (
              <div key={i} className="spretro-ticker-item">
                <span>{item}</span>
                <span className="spretro-dot" />
              </div>
            ))}

          </div>
        </div>

        {/* MAIN NAVBAR */}

        <div className="spretro-mainbar">

          {/* LEFT */}

          <div className="spretro-left">

            {/* LOGO */}

            <div className="spretro-logo" onClick={() => navigate("/")}>

              <div className="spretro-logo-main">
                SPRETRO<span className="spretro-logo-dot">.</span>
              </div>

              <div className="spretro-logo-sub">
                Fashion Commerce
              </div>

            </div>

            {/* LINKS */}

            <div className="spretro-links">

              {navLinks.map((link) => {
                const subs = NAV_SUBCATS[link.path];
                const topTo = subs ? groupPath(link.path.replace(/^\//, "")) : link.path;
                return (
                  <div
                    key={link.label}
                    className={`spretro-nav-item ${activeNav === link.label ? "open" : ""}`}
                    onMouseEnter={() => subs && openNav(link.label)}
                    onMouseLeave={() => subs && closeNav()}
                  >
                    <a
                      href={topTo}
                      className={`spretro-link ${
                        activeLink === link.label ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(topTo);
                        setActiveNav(null);
                      }}
                    >
                      {link.label}
                    </a>

                    {subs && (
                      <ChevronDown size={13} strokeWidth={2.5} className="spretro-nav-caret" />
                    )}

                    {subs && activeNav === link.label && (
                      <div
                        className="spretro-nav-dropdown"
                        onMouseEnter={keepNav}
                        onMouseLeave={closeNav}
                      >
                        {subs.map((sc) => (
                          <button
                            key={sc.label}
                            className="spretro-nav-dropdown-item"
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

          {/* RIGHT */}

          <div className="spretro-right">

            {/* SEARCH */}

            <div className="spretro-search">

              <Search
                size={17}
                strokeWidth={2}
                className="spretro-search-icon"
                onClick={handleSearch}
              />

              <input
                className="spretro-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search sneakers, kurtas, watches..."
              />

            </div>

            {/* WISHLIST */}

            <div
              className="spretro-panel-wrap"
              onMouseEnter={() => openPanel("wishlist")}
              onMouseLeave={closePanel}
            >
              <button
                className="spretro-icon-btn"
                onClick={() => setActivePanel((p) => (p === "wishlist" ? null : "wishlist"))}
              >
                <Heart size={19} strokeWidth={1.9} className={wishlistItems.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                {wishlistItems.length > 0 && (
                  <span className="spretro-icon-count wishlist">
                    {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
                  </span>
                )}
              </button>

              {activePanel === "wishlist" && (
                <div
                  className="spretro-mini-panel spretro-wishlist-panel"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="spretro-panel-header">
                    <div className="spretro-panel-header-icon wishlist">
                      <Heart size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="spretro-panel-header-title">Wishlist</div>
                      <div className="spretro-panel-header-sub">
                        {wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                  </div>
                  <div className="spretro-panel-divider" />
                  {wishlistItems.length === 0 ? (
                    <div className="spretro-panel-empty">
                      <div className="spretro-panel-empty-icon">
                        <Heart size={22} strokeWidth={1.8} />
                      </div>
                      <div className="spretro-panel-empty-text">Nothing saved yet</div>
                      <div className="spretro-panel-empty-sub">
                        Tap the heart on any product<br />to save it here
                      </div>
                    </div>
                  ) : (
                    <div className="spretro-wishlist-list">
                      {wishlistItems.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="spretro-wishlist-row"
                          onClick={() => { navigate(`/product/${item.id}`); setActivePanel(null); }}
                        >
                          <div className="spretro-wishlist-thumb">
                            <img src={item.image} alt="" />
                          </div>
                          <div className="spretro-wishlist-info">
                            <div className="spretro-wishlist-brand">{item.brand}</div>
                            <div className="spretro-wishlist-name">{item.name}</div>
                            <div className="spretro-wishlist-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                            className="spretro-wishlist-remove"
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {wishlistItems.length > 5 && (
                        <div className="spretro-wishlist-more">
                          +{wishlistItems.length - 5} more items
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    className={`spretro-panel-cta${wishlistItems.length > 0 ? " wishlist-filled" : ""}`}
                    onClick={() => { navigate("/women"); setActivePanel(null); }}
                  >
                    {wishlistItems.length > 0 ? "Continue Shopping" : "Browse & Save"}
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE */}

            <div
              className="spretro-panel-wrap"
              onMouseEnter={() => isAuthenticated && openPanel("user")}
              onMouseLeave={closePanel}
            >
                <button
                className="spretro-icon-btn"
                onClick={() => navigate(isAuthenticated ? "/account" : "/login")}
                title={isAuthenticated ? "My Account" : "Sign In"}
              >
                <User size={19} strokeWidth={1.9} />
              </button>

              {isAuthenticated && activePanel === "user" && (
                <div
                  className="spretro-mini-panel"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                    <div
                      className="spretro-panel-header user"
                      onClick={() => { navigate("/account"); setActivePanel(null); }}
                    >
                      <div className="spretro-panel-header-icon user">
                        <User size={16} strokeWidth={2} color="white" />
                      </div>
                      <div>
                        <div className="spretro-panel-header-title">
                          My Account
                        </div>
                        <div className="spretro-panel-header-sub">
                          {user?.full_name ? `Hi, ${user.full_name}` : "Welcome back"}
                        </div>
                      </div>
                    </div>
                    <div className="spretro-panel-body">
                      {[
                        { icon: <Package size={15} strokeWidth={2} />, label: "My Orders",     sub: "Track & manage",      path: "/account" },
                        { icon: <Heart size={15} strokeWidth={2} />,   label: "Wishlist",      sub: "Saved items",         path: null },
                        { icon: <Star size={15} strokeWidth={2} />,    label: "Rewards",       sub: "Points & offers",     path: "/account" },
                        { icon: <Settings size={15} strokeWidth={2} />,label: "Settings",      sub: "Account preferences", path: "/account" },
                        { icon: <HelpCircle size={15} strokeWidth={2} />,label: "Help & Support", sub: "FAQs & contact",  path: "/account" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          className="spretro-panel-link"
                          onClick={() => { if (item.path) { navigate(item.path); setActivePanel(null); } }}
                        >
                          <span className="spretro-panel-link-icon">{item.icon}</span>
                          <span>
                            <div className="spretro-panel-link-label">{item.label}</div>
                            <div className="spretro-panel-link-sub">{item.sub}</div>
                          </span>
                        </button>
                      ))}
                      <button
                        className="spretro-panel-link danger"
                        onClick={() => { logout(); setActivePanel(null); navigate("/"); }}
                      >
                        <span className="spretro-panel-link-icon">
                          <User size={15} strokeWidth={2} />
                        </span>
                        <span>
                          <div className="spretro-panel-link-label">Sign Out</div>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            

            {/* MENU */}

            <div
              className="spretro-panel-wrap"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <button
                className="spretro-menu-btn"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label="Open menu"
              >
                <Menu size={18} strokeWidth={2} />
              </button>

              {menuOpen && (
                <div
                  className="spretro-menu-dropdown"
                  onMouseEnter={keepMenu}
                  onMouseLeave={closeMenu}
                >
                  <div className="spretro-menu-dropdown-section">
                    <div className="spretro-menu-dropdown-title">Shop by category</div>
                    <div className="spretro-menu-dropdown-grid">
                      {menuItems.map((item) => (
                        <button
                          key={item.label}
                          className="spretro-menu-dropdown-link"
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
              className="spretro-panel-wrap"
              onMouseEnter={() => openPanel("cart")}
              onMouseLeave={closePanel}
            >
              <button className="spretro-icon-btn" onClick={() => navigate("/cart")}>
                <ShoppingBag size={19} strokeWidth={1.9} />
                {totalQty > 0
                  ? <span className="spretro-cart-count">{totalQty > 99 ? "99+" : totalQty}</span>
                  : <span className="spretro-cart-dot" />
                }
              </button>

              {activePanel === "cart" && (
                <div
                  className="spretro-mini-panel"
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="spretro-panel-header">
                    <div className="spretro-panel-header-icon cart">
                      <ShoppingBag size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="spretro-panel-header-title">My Cart</div>
                      <div className="spretro-panel-header-sub">0 items · ₹0</div>
                    </div>
                  </div>
                  <div className="spretro-panel-divider" />
                  <div className="spretro-panel-empty">
                    <div className="spretro-panel-empty-icon">
                      <ShoppingBag size={22} strokeWidth={1.8} />
                    </div>
                    <div className="spretro-panel-empty-text">Your cart is empty</div>
                    <div className="spretro-panel-empty-sub">
                      Add products to your cart<br />and they'll show up here
                    </div>
                  </div>
                  <button
                    className="spretro-panel-cta"
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
        <div className="spretro-mobile-nav">
          {[
            { label: "Women", path: "/women", tile: "tile-women",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M9 20h6M12 16v4M8 12c-2.5 1-4 3-4 5h16c0-2-1.5-4-4-5"/></svg> },
            { label: "Men",   path: "/men",   tile: "tile-men",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M12 14c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4z"/></svg> },
            { label: "Kids",  path: "/kids",  tile: "tile-kids",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M9 22V12l-2-3h10l-2 3v10"/><path d="M9 17h6"/></svg> },
            { label: "New In", path: "/new-in", tile: "tile-newin",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
          ].map((item) => (
            <div
              key={item.label}
              className={`spretro-mobile-nav-item ${activeLink === item.label ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <div className={`spretro-mobile-nav-icon ${item.tile}`}>
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
