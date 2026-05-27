import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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
  Package,
  Settings,
  HelpCircle,
  Star,
  Zap,
  Gift,
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

const PATH_TO_LINK = Object.fromEntries(navLinks.map((l) => [l.path, l.label]));
const PATH_TO_CAT = Object.fromEntries(categories.map((c) => [c.path, c.label]));

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQty } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const panelTimer = useRef(null);

  const activeLink = PATH_TO_LINK[location.pathname] || "";
  const activeCat = PATH_TO_CAT[location.pathname] || "Topwear";

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
          box-shadow:0 4px 24px rgba(106,44,255,0.08), 0 1px 0 rgba(0,0,0,0.04);
        }

        /* TICKER */

        .spretro-ticker{
          height:34px;
          background:linear-gradient(90deg, #5A14EF 0%, #7C3AED 40%, #9B6DFF 70%, #7C3AED 100%);
          background-size:200% 100%;
          overflow:hidden;
          display:flex;
          align-items:center;
          animation:tickerBg 8s linear infinite;
        }

        @keyframes tickerBg{
          0%{ background-position:0% 50%; }
          100%{ background-position:200% 50%; }
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
          border-bottom:1px solid #F0EAFF;
          background:white;
          position:relative;
        }

        .spretro-mainbar::after{
          content:'';
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          height:1px;
          background:linear-gradient(90deg, transparent, #6A2CFF44, #9B6DFF66, #6A2CFF44, transparent);
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
          background:linear-gradient(135deg, #3D0ECC 0%, #6A2CFF 45%, #9B6DFF 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          line-height:1;
        }

        .spretro-logo-dot{
          background:linear-gradient(135deg, #EC4899, #F97316);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .spretro-logo-sub{
          font-size:10px;
          font-weight:700;
          letter-spacing:3.5px;
          color:#9B6DFF;
          margin-top:3px;
          text-transform:uppercase;
          opacity:0.75;
        }

        .spretro-links{
          display:flex;
          align-items:center;
          gap:28px;
        }

        .spretro-link{
          font-size:14px;
          font-weight:700;
          color:#555;
          text-decoration:none;
          position:relative;
          padding-bottom:5px;
          transition:0.2s ease;
          letter-spacing:0.01em;
        }

        .spretro-link:hover{
          color:#3D0ECC;
        }

        .spretro-link::after{
          content:'';
          position:absolute;
          left:0;
          bottom:0;
          width:0;
          height:2px;
          background:linear-gradient(90deg, #6A2CFF, #EC4899);
          border-radius:2px;
          transition:0.25s ease;
        }

        .spretro-link:hover::after{
          width:100%;
        }

        .spretro-link.active{
          color:#6A2CFF;
        }

        .spretro-link.active::after{
          width:100%;
        }

        .spretro-right{
          display:flex;
          align-items:center;
          gap:10px;
        }

        /* SEARCH */

        .spretro-search{
          width:340px;
          height:46px;
          background:#F5F0FF;
          border-radius:100px;
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 18px;
          color:#777;
          border:1.5px solid #E8DFFF;
          transition:0.2s ease;
          cursor:text;
        }

        .spretro-search:hover{
          background:white;
          border-color:#6A2CFF;
          box-shadow:0 0 0 4px rgba(106,44,255,0.08);
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
          color:#6A2CFF;
          transition:0.2s ease;
          position:relative;
        }

        .spretro-icon-btn:hover{
          background:#F0EAFF;
          color:#3D0ECC;
          transform:translateY(-1px);
        }

        .spretro-cart-dot{
          position:absolute;
          top:9px;
          right:9px;
          width:8px;
          height:8px;
          border-radius:50%;
          background:linear-gradient(135deg, #EC4899, #F97316);
          animation:pulse 2s infinite;
        }

        @keyframes pulse{
          0%,100%{ box-shadow:0 0 0 0 rgba(236,72,153,0.5); }
          50%{ box-shadow:0 0 0 4px rgba(236,72,153,0); }
        }

        /* MENU BUTTON */

        .spretro-menu-btn{
          height:46px;
          padding:0 20px;
          border:none;
          border-radius:100px;
          background:linear-gradient(135deg, #3D0ECC 0%, #6A2CFF 60%, #9B6DFF 100%);
          color:white;
          display:flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:700;
          cursor:pointer;
          transition:0.25s ease;
          box-shadow:0 4px 16px rgba(106,44,255,0.35);
          letter-spacing:0.01em;
        }

        .spretro-menu-btn:hover{
          background:linear-gradient(135deg, #5A14EF 0%, #7C3AED 60%, #A78BFA 100%);
          box-shadow:0 6px 24px rgba(106,44,255,0.5);
          transform:translateY(-1px);
        }

        /* CATEGORY STRIP */

        .spretro-category-strip{
          height:100px;
          display:flex;
          align-items:center;
          gap:6px;
          overflow-x:auto;
          padding:0 24px;
          background:linear-gradient(180deg, #FAFAFF 0%, #FFFFFF 100%);
          border-bottom:1px solid #EDE8FF;
          position:relative;
        }

        .spretro-category-strip::-webkit-scrollbar{
          display:none;
        }

        .spretro-category{
          min-width:112px;
          height:74px;
          border-radius:18px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:7px;
          cursor:pointer;
          transition:0.2s ease;
          color:#777;
          background:transparent;
          border:1.5px solid transparent;
          flex-shrink:0;
        }

        .spretro-category:hover{
          background:#F3EEFF;
          color:#6A2CFF;
          border-color:#E0D4FF;
          transform:translateY(-2px);
          box-shadow:0 4px 16px rgba(106,44,255,0.1);
        }

        .spretro-category.active{
          background:linear-gradient(135deg, #EDE4FF, #E5D8FF);
          color:#6A2CFF;
          border-color:#C4B0FF;
          box-shadow:0 4px 20px rgba(106,44,255,0.18);
        }

        .spretro-category-label{
          font-size:12px;
          font-weight:700;
          letter-spacing:0.01em;
        }

        /* SERVICE STRIP */

        .spretro-services{
          height:52px;
          display:flex;
          align-items:center;
          justify-content:space-around;
          padding:0 24px;
          background:linear-gradient(90deg, #F9F6FF 0%, #FAFAFE 20%, #FAFAFE 80%, #F9F6FF 100%);
          border-bottom:1px solid #EDE8FF;
        }

        .spretro-service-item{
          display:flex;
          align-items:center;
          gap:8px;
          color:#6A2CFF;
          font-size:12.5px;
          font-weight:700;
          white-space:nowrap;
          letter-spacing:0.01em;
          transition:0.15s ease;
        }

        .spretro-service-item:hover{
          color:#3D0ECC;
          transform:translateY(-1px);
        }

        /* DROPDOWN PANELS */

        .spretro-panel-wrap{
          position:relative;
        }

        .spretro-mini-panel{
          position:absolute;
          top:calc(100% + 12px);
          right:0;
          background:white;
          border-radius:20px;
          box-shadow:0 16px 56px rgba(0,0,0,0.14), 0 4px 16px rgba(106,44,255,0.1);
          border:1px solid #F0EAFF;
          overflow:hidden;
          z-index:1000;
          animation:panelIn 0.18s ease;
        }

        @keyframes panelIn{
          from{ opacity:0; transform:translateY(-8px) scale(0.97); }
          to{ opacity:1; transform:translateY(0) scale(1); }
        }

        .spretro-panel-header{
          padding:14px 18px 12px;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .spretro-panel-header-icon{
          width:34px;
          height:34px;
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        .spretro-panel-header-title{
          font-size:14px;
          font-weight:800;
          color:#111;
          line-height:1.1;
        }

        .spretro-panel-header-sub{
          font-size:11px;
          color:#888;
          font-weight:500;
          margin-top:1px;
        }

        .spretro-panel-divider{
          height:1px;
          background:#F3F3F6;
          margin:0 18px;
        }

        .spretro-panel-body{
          padding:12px 8px;
        }

        .spretro-panel-link{
          display:flex;
          align-items:center;
          gap:10px;
          padding:9px 12px;
          border-radius:12px;
          cursor:pointer;
          transition:0.15s ease;
          text-decoration:none;
          color:#333;
          font-size:13px;
          font-weight:600;
          border:none;
          background:transparent;
          width:100%;
          text-align:left;
        }

        .spretro-panel-link:hover{
          background:#F5F0FF;
          color:#6A2CFF;
        }

        .spretro-panel-link-icon{
          width:30px;
          height:30px;
          border-radius:9px;
          background:#F5F5F7;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:0.15s ease;
          color:#555;
        }

        .spretro-panel-link:hover .spretro-panel-link-icon{
          background:#EDE4FF;
          color:#6A2CFF;
        }

        .spretro-panel-empty{
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:20px 18px 16px;
          gap:8px;
        }

        .spretro-panel-empty-icon{
          width:48px;
          height:48px;
          border-radius:16px;
          background:#F5F0FF;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#6A2CFF;
        }

        .spretro-panel-empty-text{
          font-size:13px;
          font-weight:700;
          color:#111;
        }

        .spretro-panel-empty-sub{
          font-size:11px;
          color:#aaa;
          font-weight:500;
          text-align:center;
          line-height:1.4;
        }

        .spretro-panel-cta{
          display:block;
          width:calc(100% - 36px);
          margin:0 18px 14px;
          padding:10px;
          border-radius:12px;
          background:#6A2CFF;
          color:white;
          font-size:12px;
          font-weight:700;
          text-align:center;
          border:none;
          cursor:pointer;
          transition:0.2s ease;
        }

        .spretro-panel-cta:hover{
          background:#5A1EEF;
        }

        .spretro-panel-cta-outline{
          background:transparent;
          border:1.5px solid #6A2CFF;
          color:#6A2CFF;
        }

        .spretro-panel-cta-outline:hover{
          background:#F3EEFF;
        }

        /* MEGA MENU */

        .spretro-mega-wrap{
          position:relative;
        }

        .spretro-mega-panel{
          position:absolute;
          top:calc(100% + 12px);
          right:0;
          width:540px;
          background:white;
          border-radius:22px;
          box-shadow:0 20px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(106,44,255,0.1);
          border:1px solid #F0EAFF;
          overflow:hidden;
          z-index:1000;
          animation:panelIn 0.18s ease;
        }

        .spretro-mega-top{
          padding:18px 20px 14px;
          background:linear-gradient(135deg,#6A2CFF 0%,#9B6DFF 100%);
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .spretro-mega-title{
          font-size:16px;
          font-weight:900;
          color:white;
          letter-spacing:-0.3px;
        }

        .spretro-mega-sub{
          font-size:11px;
          color:rgba(255,255,255,0.65);
          font-weight:500;
          margin-top:2px;
        }

        .spretro-mega-close{
          width:28px;
          height:28px;
          border-radius:8px;
          background:rgba(255,255,255,0.2);
          border:none;
          color:white;
          font-size:16px;
          font-weight:700;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:0.15s ease;
          line-height:1;
        }

        .spretro-mega-close:hover{
          background:rgba(255,255,255,0.35);
        }

        .spretro-mega-body{
          padding:16px 20px 20px;
        }

        .spretro-mega-section-title{
          font-size:10px;
          font-weight:800;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:#bbb;
          margin-bottom:10px;
        }

        .spretro-mega-pills{
          display:flex;
          flex-wrap:wrap;
          gap:6px;
          margin-bottom:18px;
        }

        .spretro-mega-pill{
          padding:6px 14px;
          border-radius:100px;
          background:#F5F5F7;
          color:#444;
          font-size:12px;
          font-weight:700;
          border:none;
          cursor:pointer;
          transition:0.15s ease;
        }

        .spretro-mega-pill:hover{
          background:#6A2CFF;
          color:white;
        }

        .spretro-mega-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:6px;
          margin-bottom:18px;
        }

        .spretro-mega-cat{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
          padding:10px 6px;
          border-radius:14px;
          cursor:pointer;
          transition:0.15s ease;
          border:1px solid transparent;
          background:transparent;
        }

        .spretro-mega-cat:hover{
          background:#F3EEFF;
          border-color:#E3D8FF;
        }

        .spretro-mega-cat-icon{
          width:36px;
          height:36px;
          border-radius:10px;
          background:#F5F5F7;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#555;
          transition:0.15s ease;
        }

        .spretro-mega-cat:hover .spretro-mega-cat-icon{
          background:#EDE4FF;
          color:#6A2CFF;
        }

        .spretro-mega-cat-label{
          font-size:11px;
          font-weight:700;
          color:#333;
          text-align:center;
          line-height:1.2;
        }

        .spretro-mega-divider{
          height:1px;
          background:#F3F3F6;
          margin-bottom:16px;
        }

        .spretro-mega-acc-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:6px;
        }

        .spretro-mega-acc-item{
          display:flex;
          align-items:center;
          gap:9px;
          padding:10px 12px;
          border-radius:12px;
          cursor:pointer;
          transition:0.15s ease;
          border:none;
          background:transparent;
          text-align:left;
        }

        .spretro-mega-acc-item:hover{
          background:#F5F0FF;
        }

        .spretro-mega-acc-icon{
          width:32px;
          height:32px;
          border-radius:9px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        .spretro-mega-acc-label{
          font-size:12px;
          font-weight:700;
          color:#222;
        }

        .spretro-mega-acc-sub{
          font-size:10px;
          color:#aaa;
          font-weight:500;
          margin-top:1px;
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
            gap:16px;
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
          .spretro-mini-panel,
          .spretro-mega-panel{
            display:none;
          }
        }

        /* ── MOBILE — hide Sign In icon + Menu text ── */
        @media (max-width:767px){
          .spretro-sign-in-btn svg{ display:none; }
          .spretro-menu-text{ display:none; }
        }

        /* ── SMALL MOBILE (max 479px) ── */
        @media (max-width:479px){
          .spretro-logo-main{
            font-size:20px;
          }
        }

      `}</style>

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
              <button className="spretro-icon-btn">
                <Heart size={19} strokeWidth={1.9} />
              </button>

              {activePanel === "wishlist" && (
                <div
                  className="spretro-mini-panel"
                  style={{ width: 240 }}
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="spretro-panel-header">
                    <div
                      className="spretro-panel-header-icon"
                      style={{ background: "linear-gradient(135deg,#FF6B9D,#FF4D7E)" }}
                    >
                      <Heart size={16} strokeWidth={2} color="white" />
                    </div>
                    <div>
                      <div className="spretro-panel-header-title">Wishlist</div>
                      <div className="spretro-panel-header-sub">0 saved items</div>
                    </div>
                  </div>
                  <div className="spretro-panel-divider" />
                  <div className="spretro-panel-empty">
                    <div className="spretro-panel-empty-icon">
                      <Heart size={22} strokeWidth={1.8} />
                    </div>
                    <div className="spretro-panel-empty-text">Nothing saved yet</div>
                    <div className="spretro-panel-empty-sub">
                      Tap the heart on any product<br />to save it here
                    </div>
                  </div>
                  <button
                    className="spretro-panel-cta"
                    onClick={() => { navigate("/women"); setActivePanel(null); }}
                  >
                    Browse & Save
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE */}

            {!isLoggedIn ? (
              <button
                className="spretro-menu-btn spretro-sign-in-btn"
                style={{ background: "linear-gradient(135deg,#3D0ECC,#6A2CFF)", boxShadow: "0 4px 16px rgba(106,44,255,0.35)" }}
                onClick={() => navigate("/login")}
              >
                <User size={15} strokeWidth={2} />
                Sign In
              </button>
            ) : (
              <div
                className="spretro-panel-wrap"
                onMouseEnter={() => openPanel("user")}
                onMouseLeave={closePanel}
              >
                <button className="spretro-icon-btn">
                  <User size={19} strokeWidth={1.9} />
                </button>

                {activePanel === "user" && (
                  <div
                    className="spretro-mini-panel"
                    style={{ width: 260 }}
                    onMouseEnter={keepPanel}
                    onMouseLeave={closePanel}
                  >
                    <div
                      className="spretro-panel-header"
                      style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", paddingBottom: 14 }}
                    >
                      <div
                        className="spretro-panel-header-icon"
                        style={{ background: "rgba(106,44,255,0.4)" }}
                      >
                        <User size={16} strokeWidth={2} color="white" />
                      </div>
                      <div>
                        <div className="spretro-panel-header-title" style={{ color: "white" }}>
                          My Account
                        </div>
                        <div className="spretro-panel-header-sub" style={{ color: "rgba(255,255,255,0.5)" }}>
                          Welcome back
                        </div>
                      </div>
                    </div>
                    <div className="spretro-panel-body">
                      {[
                        { icon: <Package size={15} strokeWidth={2} />, label: "My Orders", sub: "Track & manage" },
                        { icon: <Heart size={15} strokeWidth={2} />, label: "Wishlist", sub: "Saved items" },
                        { icon: <Star size={15} strokeWidth={2} />, label: "Rewards", sub: "Points & offers" },
                        { icon: <Settings size={15} strokeWidth={2} />, label: "Settings", sub: "Account preferences" },
                        { icon: <HelpCircle size={15} strokeWidth={2} />, label: "Help & Support", sub: "FAQs & contact" },
                      ].map((item) => (
                        <button key={item.label} className="spretro-panel-link">
                          <span className="spretro-panel-link-icon">{item.icon}</span>
                          <span>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#222" }}>{item.label}</div>
                            <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500, marginTop: 1 }}>{item.sub}</div>
                          </span>
                        </button>
                      ))}
                      <button
                        className="spretro-panel-link"
                        onClick={() => { setIsLoggedIn(false); setActivePanel(null); }}
                        style={{ color: "#E83E6C" }}
                      >
                        <span className="spretro-panel-link-icon" style={{ color: "#E83E6C" }}>
                          <User size={15} strokeWidth={2} />
                        </span>
                        <span>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#E83E6C" }}>Sign Out</div>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CART */}

            <div
              className="spretro-panel-wrap"
              onMouseEnter={() => openPanel("cart")}
              onMouseLeave={closePanel}
            >
              <button className="spretro-icon-btn" onClick={() => navigate("/cart")}>
                <ShoppingBag size={19} strokeWidth={1.9} />
                {totalQty > 0
                  ? <span className="spretro-cart-dot" style={{ width: 16, height: 16, fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{totalQty > 99 ? "99+" : totalQty}</span>
                  : <span className="spretro-cart-dot" />
                }
              </button>

              {activePanel === "cart" && (
                <div
                  className="spretro-mini-panel"
                  style={{ width: 260 }}
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                >
                  <div className="spretro-panel-header">
                    <div
                      className="spretro-panel-header-icon"
                      style={{ background: "linear-gradient(135deg,#6A2CFF,#9B6DFF)" }}
                    >
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

            {/* MENU — MEGA PANEL */}

            <div className="spretro-mega-wrap">
              <button
                className="spretro-menu-btn"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <Menu size={17} strokeWidth={2.2} />
                <span className="spretro-menu-text">Menu</span>
                <ChevronDown
                  size={15}
                  strokeWidth={2.2}
                  style={{ transition: "0.2s", transform: menuOpen ? "rotate(180deg)" : "none" }}
                />
              </button>

              {menuOpen && (
                <div
                  className="spretro-mega-panel"
                  onMouseLeave={() => setMenuOpen(false)}
                >

                  {/* Header */}
                  <div className="spretro-mega-top">
                    <div>
                      <div className="spretro-mega-title">Explore SPRETRO.</div>
                      <div className="spretro-mega-sub">Everything fashion, in one place</div>
                    </div>
                    <button
                      className="spretro-mega-close"
                      onClick={() => setMenuOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="spretro-mega-body">

                    {/* Quick shop */}
                    <div className="spretro-mega-section-title">Quick Shop</div>
                    <div className="spretro-mega-pills">
                      {navLinks.map((l) => (
                        <button
                          key={l.label}
                          className="spretro-mega-pill"
                          onClick={() => { navigate(l.path); setMenuOpen(false); }}
                        >
                          {l.label}
                        </button>
                      ))}
                      <button
                        className="spretro-mega-pill"
                        onClick={() => { navigate("/new-in"); setMenuOpen(false); }}
                        style={{ background: "#FFF0F3", color: "#E83E6C" }}
                      >
                        🔥 Hot Deals
                      </button>
                    </div>

                    {/* Categories */}
                    <div className="spretro-mega-section-title">Categories</div>
                    <div className="spretro-mega-grid">
                      {categories.map((cat) => (
                        <button
                          key={cat.label}
                          className="spretro-mega-cat"
                          onClick={() => { navigate(cat.path); setMenuOpen(false); }}
                        >
                          <div className="spretro-mega-cat-icon">{cat.icon}</div>
                          <div className="spretro-mega-cat-label">{cat.label}</div>
                        </button>
                      ))}
                      <button
                        className="spretro-mega-cat"
                        onClick={() => { navigate("/new-in"); setMenuOpen(false); }}
                      >
                        <div className="spretro-mega-cat-icon">
                          <Zap size={18} strokeWidth={2} />
                        </div>
                        <div className="spretro-mega-cat-label">New In</div>
                      </button>
                    </div>

                    <div className="spretro-mega-divider" />

                    {/* My Account */}
                    <div className="spretro-mega-section-title">My Account</div>
                    <div className="spretro-mega-acc-grid">
                      {[
                        { icon: <Package size={16} strokeWidth={2} />, label: "My Orders", sub: "Track deliveries", bg: "#EEF2FF", color: "#4F67E4", path: null },
                        { icon: <Heart size={16} strokeWidth={2} />, label: "Wishlist", sub: "Saved items", bg: "#FFF0F5", color: "#E83E6C", path: null },
                        { icon: <Gift size={16} strokeWidth={2} />, label: "Offers & Gifts", sub: "Exclusive deals", bg: "#FFF7ED", color: "#F97316", path: "/sale" },
                        { icon: <Star size={16} strokeWidth={2} />, label: "Rewards", sub: "Points balance", bg: "#FFFBEB", color: "#D97706", path: null },
                        { icon: <Settings size={16} strokeWidth={2} />, label: "Settings", sub: "Profile & prefs", bg: "#F1F5F9", color: "#475569", path: null },
                        { icon: <HelpCircle size={16} strokeWidth={2} />, label: "Help", sub: "FAQs & support", bg: "#F0FDF4", color: "#16A34A", path: "/faqs" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          className="spretro-mega-acc-item"
                          onClick={() => { if (item.path) { navigate(item.path); setMenuOpen(false); } }}
                        >
                          <div
                            className="spretro-mega-acc-icon"
                            style={{ background: item.bg, color: item.color }}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="spretro-mega-acc-label">{item.label}</div>
                            <div className="spretro-mega-acc-sub">{item.sub}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="spretro-mega-divider" style={{ marginTop: 16 }} />

                    {/* Help & Legal */}
                    <div className="spretro-mega-section-title">Help & Legal</div>
                    <div className="spretro-mega-pills">
                      {[
                        { label: "About Us", path: "/about-us" },
                        { label: "FAQs", path: "/faqs" },
                        { label: "Contact Us", path: "/contact-us" },
                        { label: "Careers", path: "/careers" },
                        { label: "Terms & Conditions", path: "/terms-and-conditions" },
                        { label: "Sitemap", path: "/sitemap" },
                      ].map((l) => (
                        <button
                          key={l.label}
                          className="spretro-mega-pill"
                          style={{ background: "#F0FDF4", color: "#16A34A" }}
                          onClick={() => { navigate(l.path); setMenuOpen(false); }}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* CATEGORY STRIP */}

        <div className="spretro-category-strip">

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

        </div>

        {/* SERVICE STRIP */}

        <div className="spretro-services">

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

        </div>

      </nav>
    </>
  );
}
