import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  User,
  Shirt,
  Sparkles,
  Footprints,
  Gem,
  Watch,
  Crown,
  Tag,
  Truck,
  RotateCcw,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

const tickerItems = [
  "FREE SHIPPING ABOVE ₹2999",
  "SUMMER DROP LIVE NOW",
  "FLAT 40% OFF ON SELECTED BRANDS",
  "EASY 7 DAY RETURNS",
];

const categories = [
  { icon: <Shirt size={20} strokeWidth={1.8} />, label: "Topwear", path: "/category/topwear" },
  { icon: <Footprints size={20} strokeWidth={1.8} />, label: "Sneakers", path: "/category/sneakers" },
  { icon: <Sparkles size={20} strokeWidth={1.8} />, label: "Beauty", path: "/category/beauty" },
  { icon: <Gem size={20} strokeWidth={1.8} />, label: "Jewellery", path: "/category/jewellery" },
  { icon: <Watch size={20} strokeWidth={1.8} />, label: "Watches", path: "/category/watches" },
  { icon: <Crown size={20} strokeWidth={1.8} />, label: "Luxury", path: "/category/luxury" },
  { icon: <Tag size={20} strokeWidth={1.8} />, label: "Offers", path: "/category/offers" },
];

const navLinks = [
  { label: "Women", path: "/women" },
  { label: "Men", path: "/men" },
  { label: "Kids", path: "/kids" },
  { label: "New In", path: "/new-in" },
  { label: "Brands", path: "/brands" },
  { label: "Sale", path: "/sale" },
];

const menuLinks = [
  { label: "FAQs", path: "/faqs" },
  { label: "Terms And Conditions", path: "/terms-and-conditions" },
  { label: "Sitemap", path: "/sitemap" },
  { label: "Careers", path: "/careers" },
];

const PATH_TO_LINK = Object.fromEntries(navLinks.map((l) => [l.path, l.label]));
const PATH_TO_CAT = Object.fromEntries(categories.map((c) => [c.path, c.label]));

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const activeLink = PATH_TO_LINK[location.pathname] || "";
  const activeCat = PATH_TO_CAT[location.pathname] || "Topwear";
  const compact = location.pathname !== "/";

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
    }
  };

  const goTo = (path) => {
    setMenuOpen(false);
    setMoreOpen(false);
    navigate(path);
  };

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          background:#F5F5F7;
          font-family:'Inter',sans-serif;
        }

        .spretro-navbar{
          width:100%;
          background:white;
          position:sticky;
          top:0;
          z-index:999;
          box-shadow:0 1px 0 rgba(0,0,0,0.05);
        }

        /* TICKER */

        .spretro-ticker{
          height:34px;
          background:#6A2CFF;
          overflow:hidden;
          display:flex;
          align-items:center;
        }

        .spretro-ticker-track{
          display:flex;
          white-space:nowrap;
          animation:ticker 25s linear infinite;
        }

        @keyframes ticker{
          0%{
            transform:translateX(0);
          }
          100%{
            transform:translateX(-50%);
          }
        }

        .spretro-ticker-item{
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 40px;
          color:white;
          font-size:11px;
          font-weight:600;
          letter-spacing:1px;
          white-space:nowrap;
        }

        .spretro-dot{
          width:4px;
          height:4px;
          border-radius:50%;
          background:white;
          flex-shrink:0;
        }

        /* MAIN NAVBAR */

        .spretro-mainbar{
          height:78px;
          padding:0 32px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          border-bottom:1px solid #EEEEEE;
          background:white;
        }

        .spretro-left{
          display:flex;
          align-items:center;
          gap:48px;
        }

        .spretro-logo{
          display:flex;
          flex-direction:column;
          cursor:pointer;
        }

        .spretro-logo-main{
          font-size:32px;
          font-weight:900;
          letter-spacing:-1.5px;
          color:#111;
          line-height:1;
        }

        .spretro-logo-dot{
          color:#6A2CFF;
        }

        .spretro-logo-sub{
          font-size:10px;
          font-weight:600;
          letter-spacing:3px;
          color:#888;
          margin-top:2px;
          text-transform:uppercase;
        }

        .spretro-links{
          display:flex;
          align-items:center;
          gap:22px;
        }

        .spretro-more{
          position:relative;
        }

        .spretro-link,
        .spretro-more-btn{
          font-size:14px;
          font-weight:600;
          color:#555;
          text-decoration:none;
          position:relative;
          padding-bottom:5px;
          transition:0.2s ease;
        }

        .spretro-more-btn{
          border:none;
          background:transparent;
          display:flex;
          align-items:center;
          gap:4px;
          cursor:pointer;
          font-family:'Inter',sans-serif;
        }

        .spretro-link:hover,
        .spretro-more-btn:hover{
          color:#111;
        }

        .spretro-link::after,
        .spretro-more-btn::after{
          content:'';
          position:absolute;
          left:0;
          bottom:0;
          width:0;
          height:2px;
          background:#6A2CFF;
          transition:0.25s ease;
        }

        .spretro-link:hover::after,
        .spretro-more-btn:hover::after{
          width:100%;
        }

        .spretro-link.active,
        .spretro-more-btn.active{
          color:#111;
        }

        .spretro-link.active::after,
        .spretro-more-btn.active::after{
          width:100%;
        }

        .spretro-more-menu{
          position:absolute;
          top:28px;
          left:0;
          width:230px;
          border:1px solid #EEEEEE;
          border-radius:14px;
          background:white;
          box-shadow:0 18px 50px rgba(17,17,17,0.12);
          padding:8px;
          display:grid;
          gap:2px;
          z-index:1002;
        }

        .spretro-more-menu a{
          min-height:40px;
          display:flex;
          align-items:center;
          border-radius:10px;
          padding:0 12px;
          color:#444;
          font-size:13px;
          font-weight:700;
          text-decoration:none;
          transition:0.2s ease;
        }

        .spretro-more-menu a:hover{
          background:#F3EEFF;
          color:#6A2CFF;
        }

        .spretro-right{
          display:flex;
          align-items:center;
          gap:10px;
          position:relative;
        }

        /* SEARCH */

        .spretro-search{
          width:340px;
          height:46px;
          background:#F5F5F7;
          border-radius:14px;
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 16px;
          color:#777;
          border:1px solid transparent;
          transition:0.2s ease;
          cursor:text;
        }

        .spretro-search:hover{
          background:white;
          border-color:#6A2CFF;
        }

        .spretro-search-input{
          background:transparent;
          border:none;
          outline:none;
          flex:1;
          min-width:0;
          font-family:'Inter',sans-serif;
          font-size:13px;
          font-weight:500;
          color:#333;
        }

        .spretro-search-input::placeholder{
          color:#888;
        }

        .spretro-search-icon{
          cursor:pointer;
          transition:0.2s ease;
          color:#777;
        }

        .spretro-search-icon:hover{
          color:#6A2CFF;
        }

        .spretro-search-text{
          font-size:13px;
          font-weight:500;
        }

        /* ICON BUTTONS */

        .spretro-icon-btn{
          width:44px;
          height:44px;
          border:none;
          border-radius:14px;
          background:transparent;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          color:#444;
          transition:0.2s ease;
          position:relative;
        }

        .spretro-icon-btn:hover{
          background:#F5F5F7;
          color:#111;
        }

        .spretro-cart-dot{
          position:absolute;
          top:9px;
          right:9px;
          width:8px;
          height:8px;
          border-radius:50%;
          background:#6A2CFF;
        }

        /* MENU BUTTON */

        .spretro-menu-btn{
          height:46px;
          padding:0 18px;
          border:none;
          border-radius:14px;
          background:#111;
          color:white;
          display:flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:600;
          cursor:pointer;
          transition:0.2s ease;
        }

        .spretro-menu-btn:hover{
          background:#6A2CFF;
        }

        .spretro-menu-dropdown{
          position:absolute;
          top:54px;
          right:0;
          width:240px;
          border:1px solid #EEEEEE;
          border-radius:14px;
          background:white;
          box-shadow:0 18px 50px rgba(17,17,17,0.12);
          padding:8px;
          display:grid;
          gap:2px;
        }

        .spretro-menu-dropdown a{
          min-height:42px;
          display:flex;
          align-items:center;
          border-radius:10px;
          padding:0 12px;
          color:#444;
          font-size:13px;
          font-weight:700;
          text-decoration:none;
          transition:0.2s ease;
        }

        .spretro-menu-dropdown a:hover{
          background:#F3EEFF;
          color:#6A2CFF;
        }

        /* CATEGORY STRIP */

        .spretro-category-strip{
          height:96px;
          display:flex;
          align-items:center;
          gap:8px;
          overflow-x:auto;
          padding:0 24px;
          background:white;
          border-bottom:1px solid #EEEEEE;
        }

        .spretro-category-strip::-webkit-scrollbar{
          display:none;
        }

        .spretro-category{
          min-width:110px;
          height:72px;
          border-radius:18px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:8px;
          cursor:pointer;
          transition:0.2s ease;
          color:#666;
          background:transparent;
          border:1px solid transparent;
          flex-shrink:0;
        }

        .spretro-category:hover{
          background:#F8F8FA;
          color:#111;
        }

        .spretro-category.active{
          background:#F3EEFF;
          color:#6A2CFF;
          border-color:#E3D8FF;
        }

        .spretro-category-label{
          font-size:12px;
          font-weight:600;
        }

        /* SERVICE STRIP */

        .spretro-services{
          height:58px;
          display:flex;
          align-items:center;
          justify-content:space-around;
          padding:0 24px;
          background:white;
        }

        .spretro-service-item{
          display:flex;
          align-items:center;
          gap:8px;
          color:#555;
          font-size:13px;
          font-weight:600;
          white-space:nowrap;
        }

        .spretro-service-item:hover{
          color:#111;
        }

        .spretro-navbar.compact .spretro-mainbar{
          height:64px;
        }

        .spretro-navbar.compact .spretro-logo-main{
          font-size:25px;
        }

        .spretro-navbar.compact .spretro-logo-sub{
          display:none;
        }

        .spretro-navbar.compact .spretro-search{
          height:40px;
          width:260px;
          border-radius:10px;
        }

        .spretro-navbar.compact .spretro-icon-btn{
          width:40px;
          height:40px;
          border-radius:10px;
        }

        .spretro-navbar.compact .spretro-menu-btn{
          height:40px;
          border-radius:10px;
        }

        .spretro-navbar.compact .spretro-menu-dropdown{
          top:48px;
        }

        /* ── TABLET (max 1023px) ── */
        @media (max-width:1023px){
          .spretro-mainbar{
            padding:0 16px;
          }
          .spretro-left{
            gap:20px;
          }
          .spretro-links{
            gap:12px;
          }
          .spretro-search{
            width:200px;
          }
          .spretro-logo-main{
            font-size:26px;
          }
        }

        /* ── MOBILE (max 767px) ── */
        @media (max-width:767px){
          .spretro-mainbar{
            height:60px;
            padding:0 14px;
          }
          .spretro-logo-main{
            font-size:22px;
            letter-spacing:-1px;
          }
          .spretro-logo-sub{
            display:none;
          }
          .spretro-links{
            display:none;
          }
          .spretro-search{
            display:none;
          }
          .spretro-icon-btn{
            width:36px;
            height:36px;
            border-radius:10px;
          }
          .spretro-menu-btn{
            height:38px;
            padding:0 12px;
            font-size:12px;
            border-radius:10px;
            gap:5px;
          }
          .spretro-right{
            gap:4px;
          }
          .spretro-category-strip{
            height:76px;
            padding:0 10px;
            gap:4px;
          }
          .spretro-category{
            min-width:72px;
            height:60px;
            border-radius:14px;
            gap:5px;
          }
          .spretro-category-label{
            font-size:10px;
          }
          .spretro-services{
            height:40px;
            padding:0 14px;
            justify-content:flex-start;
            gap:20px;
            overflow-x:auto;
          }
          .spretro-services::-webkit-scrollbar{
            display:none;
          }
          .spretro-service-item{
            font-size:11px;
            flex-shrink:0;
          }
          .spretro-ticker-item{
            padding:0 20px;
            font-size:10px;
          }
        }

        /* ── SMALL MOBILE (max 479px) ── */
        @media (max-width:479px){
          .spretro-logo-main{
            font-size:20px;
          }
          .spretro-menu-btn span:last-child{
            display:none;
          }
        }

      `}</style>

      <nav className={`spretro-navbar ${compact ? "compact" : ""}`}>

        {/* TICKER */}

        {!compact && <div className="spretro-ticker">
          <div className="spretro-ticker-track">

            {doubled.map((item, i) => (
              <div key={i} className="spretro-ticker-item">
                <span>{item}</span>
                <span className="spretro-dot" />
              </div>
            ))}

          </div>
        </div>}

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

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  className={`spretro-link ${
                    activeLink === link.label ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.path);
                  }}
                >
                  {link.label}
                </a>
              ))}

              <div className="spretro-more">
                <button
                  className={`spretro-more-btn ${
                    menuLinks.some((link) => link.path === location.pathname) ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                >
                  More
                  <ChevronDown size={14} strokeWidth={2.2} />
                </button>

                {moreOpen && (
                  <div className="spretro-more-menu">
                    {menuLinks.map((link) => (
                      <a
                        key={link.path}
                        href={link.path}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(link.path);
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

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

            <button className="spretro-icon-btn">
              <Heart size={19} strokeWidth={1.9} />
            </button>

            {/* PROFILE */}

            <button className="spretro-icon-btn">
              <User size={19} strokeWidth={1.9} />
            </button>

            {/* CART */}

            <button className="spretro-icon-btn">

              <ShoppingBag size={19} strokeWidth={1.9} />

              <span className="spretro-cart-dot" />

            </button>

            {/* MENU */}

            <button
              className="spretro-menu-btn"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >

              <Menu size={17} strokeWidth={2.2} />

              Menu

              <ChevronDown size={15} strokeWidth={2.2} />

            </button>

            {menuOpen && (
              <div className="spretro-menu-dropdown">
                {menuLinks.map((link) => (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.path);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* CATEGORY STRIP */}

        {!compact && <div className="spretro-category-strip">

          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`spretro-category ${
                activeCat === cat.label ? "active" : ""
              }`}
              onClick={() => navigate(cat.path)}
            >

              {cat.icon}

              <span className="spretro-category-label">
                {cat.label}
              </span>

            </div>
          ))}

        </div>}

        {/* SERVICE STRIP */}

        {!compact && <div className="spretro-services">

          <div className="spretro-service-item">
            <Truck size={16} strokeWidth={2} />
            <span>60 min delivery</span>
          </div>

          <div className="spretro-service-item">
            <RotateCcw size={16} strokeWidth={2} />
            <span>Easy returns</span>
          </div>

          <div className="spretro-service-item">
            <ShieldCheck size={16} strokeWidth={2} />
            <span>Secure payments</span>
          </div>

          <div className="spretro-service-item">
            <BadgeCheck size={16} strokeWidth={2} />
            <span>Authentic brands</span>
          </div>

        </div>}

      </nav>
    </>
  );
}
