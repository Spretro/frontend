import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import { Search, Heart, ShoppingBag, User, Menu, Package, Star, Settings, HelpCircle } from "lucide-react";

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

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQty } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const panelTimer = useRef(null);
  const menuTimer = useRef(null);

  const activeLink = PATH_TO_LINK[location.pathname] || "";

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
          height:30px;
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
          height:64px;
          padding:0 32px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          border-bottom:1px solid #F2E8FF;
          background:white;
          position:relative;
          min-height:64px;
        }

        .spretro-mainbar::after{
          content:'';
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          height:1px;
          background:linear-gradient(90deg, transparent, #6A2CFF33, #9B6DFF55, #6A2CFF33, transparent);
        }

        .spretro-left{
          display:flex;
          align-items:center;
          gap:24px;
          min-width:0;
        }

        .spretro-logo{
          display:flex;
          flex-direction:column;
          cursor:pointer;
          min-width:0;
          max-width:220px;
        }

        .spretro-logo-main{
          font-size:30px;
          font-weight:800;
          letter-spacing:-1.2px;
          color:#111;
          line-height:1;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .spretro-logo-dot{
          display:inline-block;
          color:transparent;
          background:linear-gradient(135deg, #3D0ECC 0%, #6A2CFF 45%, #9B6DFF 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .spretro-logo-sub{
          font-size:10px;
          font-weight:700;
          letter-spacing:3px;
          color:#9B6DFF;
          margin-top:2px;
          text-transform:uppercase;
          opacity:0.7;
        }

        .spretro-links{
          display:flex;
          align-items:center;
          gap:22px;
          min-width:0;
        }

        .spretro-link{
          font-size:14px;
          font-weight:600;
          color:#4F4F5C;
          text-decoration:none;
          position:relative;
          transition:0.2s ease;
          letter-spacing:0.01em;
          padding:6px 0;
        }

        .spretro-link:hover{
          color:#3D0ECC;
        }

        .spretro-link::after{
          content:'';
          position:absolute;
          left:0;
          bottom:-2px;
          width:0;
          height:2px;
          background:linear-gradient(90deg, #6A2CFF, #9B6DFF);
          border-radius:2px;
          transition:0.2s ease;
        }

        .spretro-link:hover::after,
        .spretro-link.active::after{
          width:100%;
        }

        .spretro-link.active{
          color:#3D0ECC;
        }

        .spretro-right{
          display:flex;
          align-items:center;
          gap:12px;
          min-width:0;
        }

        /* SEARCH */

        .spretro-search{
          width:420px;
          max-width:100%;
          height:42px;
          background:#F8F4FF;
          border-radius:12px;
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
          border-color:#D8C8FF;
          box-shadow:0 0 0 3px rgba(106,44,255,0.08);
        }

        .spretro-search-input{
          background:transparent;
          border:none;
          outline:none;
          flex:1;
          min-width:0;
          font-family:'Inter',sans-serif;
          font-size:14px;
          font-weight:500;
          color:#2A2A2A;
        }

        .spretro-search-input::placeholder{
          color:#888;
        }

        .spretro-search-icon{
          cursor:pointer;
          transition:0.2s ease;
          color:#111;
        }

        .spretro-search-icon:hover{
          color:#111;
        }

        .spretro-search-text{
          font-size:13px;
          font-weight:500;
        }

        /* ICON BUTTONS */

        .spretro-icon-btn{
          width:42px;
          height:42px;
          border:none;
          border-radius:12px;
          background:#FAF5FF;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          color:#111;
          transition:0.2s ease, transform 0.2s ease;
          position:relative;
        }

        .spretro-icon-btn:hover{
          background:#F3EEFF;
          color:#111;
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
          width:42px;
          height:42px;
          border:none;
          border-radius:12px;
          background:#FAF5FF;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          color:#111;
          transition:0.2s ease, transform 0.2s ease;
        }

        .spretro-menu-btn:hover{
          background:#F3EEFF;
          color:#111;
          transform:translateY(-1px);
        }

        .spretro-menu-dropdown{
          position:absolute;
          top:calc(100% + 10px);
          right:0;
          width:320px;
          background:white;
          border-radius:18px;
          box-shadow:0 24px 64px rgba(15,23,42,0.12);
          border:1px solid #ECE7FF;
          overflow:hidden;
          z-index:1000;
          animation:dropIn 0.18s ease;
        }

        @keyframes dropIn{
          from{ opacity:0; transform:translateY(-8px); }
          to{ opacity:1; transform:translateY(0); }
        }

        .spretro-menu-dropdown-section{
          padding:16px;
        }

        .spretro-menu-dropdown-title{
          font-size:12px;
          font-weight:800;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#8F89A3;
          margin-bottom:12px;
        }

        .spretro-menu-dropdown-grid{
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:10px;
        }

        .spretro-menu-dropdown-link{
          width:100%;
          text-align:left;
          border:none;
          background:#F8F4FF;
          border-radius:12px;
          padding:12px 14px;
          font-size:14px;
          font-weight:600;
          color:#3A356B;
          cursor:pointer;
          transition:0.2s ease;
        }

        .spretro-menu-dropdown-link:hover{
          background:#ECE4FF;
          color:#3D0ECC;
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
          animation:megaSlideIn 0.45s cubic-bezier(0.22,1,0.36,1);
        }

        @keyframes megaSlideIn{
          from{ opacity:0; transform:translateX(40px); }
          to{ opacity:1; transform:translateX(0); }
        }

        .spretro-mega-panel.closing{
          animation:megaSlideOut 0.4s cubic-bezier(0.55,0,0.55,0.2) forwards;
        }

        @keyframes megaSlideOut{
          from{ opacity:1; transform:translateX(0); }
          to{ opacity:0; transform:translateX(40px); }
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
            height:auto;
            padding:0 16px;
            display:flex;
            flex-wrap:wrap;
            align-items:flex-start;
            justify-content:space-between;
            gap:10px;
          }
          .spretro-left{
            display:flex;
            flex-wrap:wrap;
            align-items:flex-start;
            justify-content:flex-start;
            gap:16px;
            min-width:0;
            width:100%;
          }
          .spretro-logo{
            max-width:160px;
            min-width:0;
          }
          .spretro-links{
            width:100%;
            display:flex;
            align-items:center;
            gap:14px;
            min-width:0;
            overflow-x:auto;
            padding-bottom:2px;
            margin-top:4px;
          }
          .spretro-links::-webkit-scrollbar{
            display:none;
          }
          .spretro-link{
            white-space:nowrap;
            flex-shrink:0;
          }
          .spretro-search{
            width:100%;
            max-width:100%;
            flex:1 1 100%;
            min-width:0;
          }
          .spretro-right{
            width:100%;
            display:flex;
            justify-content:flex-end;
            gap:10px;
            min-width:0;
            flex:1 1 100%;
          }
          .spretro-logo-main{
            font-size:26px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }

        /* ── MOBILE NAV TILES (phone only) ── */
        .spretro-mobile-nav{
          display:none;
        }

        /* ── MOBILE (max 767px) ── */
        @media (max-width:767px){
          .spretro-mainbar{
            height:50px;
            padding:0 14px;
          }
          .spretro-logo-main{
            font-size:22px;
            letter-spacing:-1px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
          .spretro-logo-sub{
            display:none;
          }
          .spretro-logo{
            max-width:140px;
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
            display:none;
          }
          .spretro-mobile-nav{
            display:grid;
            grid-template-columns:repeat(4,1fr);
            gap:8px;
            padding:10px 12px;
            background:linear-gradient(180deg,#FAFAFF 0%,#FFFFFF 100%);
            border-bottom:1px solid #EDE8FF;
          }
          .spretro-mobile-nav-item{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:5px;
            padding:10px 4px;
            border-radius:14px;
            cursor:pointer;
            transition:0.2s ease;
            font-size:11px;
            font-weight:800;
            color:#555;
            border:1.5px solid transparent;
            letter-spacing:0.01em;
          }
          .spretro-mobile-nav-item:hover{
            background:linear-gradient(135deg,#EDE4FF,#E5D8FF);
            color:#6A2CFF;
            border-color:#C4B0FF;
          }
          .spretro-mobile-nav-item.active{
            background:linear-gradient(135deg,#EDE4FF,#E5D8FF);
            color:#6A2CFF;
            border-color:#C4B0FF;
            box-shadow:0 4px 14px rgba(106,44,255,0.15);
          }
          .spretro-mobile-nav-icon{
            width:40px;
            height:40px;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
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
          .spretro-mini-panel{
            display:none;
          }
          .spretro-wishlist-panel{
            display:block !important;
            position:fixed;
            top:64px;
            right:10px;
            left:auto;
            width:min(280px, calc(100vw - 20px)) !important;
          }
          .spretro-mega-panel{
            position:fixed;
            top:56px;
            right:10px;
            left:auto;
            width:min(310px, calc(100vw - 20px));
            max-height:calc(100vh - 72px);
            overflow-y:auto;
            border-radius:18px;
            scrollbar-width:none;
          }
          .spretro-mega-panel::-webkit-scrollbar{
            display:none;
          }
          .spretro-mega-top{
            padding:13px 15px 11px;
          }
          .spretro-mega-title{
            font-size:15px;
          }
          .spretro-mega-sub{
            font-size:10px;
          }
          .spretro-mega-close{
            width:26px;
            height:26px;
          }
          .spretro-mega-body{
            padding:12px 12px 16px;
          }
          .spretro-mega-section-title{
            font-size:9px;
            margin-bottom:7px;
          }

          /* Quick shop + Help pills — compact */
          .spretro-mega-pills{
            gap:5px;
            margin-bottom:14px;
          }
          .spretro-mega-pill{
            padding:5px 11px;
            font-size:11px;
          }

          /* Categories — stacked list, left aligned */
          .spretro-mega-grid{
            grid-template-columns:1fr;
            gap:1px;
            margin-bottom:14px;
          }
          .spretro-mega-cat{
            flex-direction:row;
            justify-content:flex-start;
            gap:12px;
            padding:8px 9px;
            border-radius:11px;
          }
          .spretro-mega-cat-icon{
            width:32px;
            height:32px;
            border-radius:9px;
          }
          .spretro-mega-cat-label{
            font-size:13px;
            text-align:left;
          }

          /* My Account — single column list */
          .spretro-mega-acc-grid{
            grid-template-columns:1fr;
            gap:1px;
          }
          .spretro-mega-acc-item{
            padding:8px 9px;
          }
          .spretro-mega-acc-icon{
            width:30px;
            height:30px;
          }
          .spretro-mega-divider{
            margin-bottom:13px;
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
              <button
                className="spretro-icon-btn"
                onClick={() => setActivePanel((p) => (p === "wishlist" ? null : "wishlist"))}
                style={{ position: "relative" }}
              >
                <Heart size={19} strokeWidth={1.9} className={wishlistItems.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                {wishlistItems.length > 0 && (
                  <span style={{
                    position: "absolute", top: -4, right: -4,
                    width: 16, height: 16, borderRadius: "50%",
                    background: "linear-gradient(135deg,#FF6B9D,#FF4D7E)",
                    fontSize: 9, fontWeight: 800, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
                  </span>
                )}
              </button>

              {activePanel === "wishlist" && (
                <div
                  className="spretro-mini-panel spretro-wishlist-panel"
                  style={{ width: 260 }}
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
                    <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, padding: "4px 0" }}>
                      {wishlistItems.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px", cursor: "pointer", borderRadius: 10 }}
                          onClick={() => { navigate(`/product/${item.id}`); setActivePanel(null); }}
                        >
                          <div style={{ width: 42, height: 42, borderRadius: 8, overflow: "hidden", background: "#F5F3FF", flexShrink: 0 }}>
                            <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: "#6A2CFF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.brand}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F0A1E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#333", marginTop: 1 }}>₹{Number(item.price).toLocaleString("en-IN")}</div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                            style={{ width: 24, height: 24, borderRadius: "50%", border: "none", background: "#FFF0F5", color: "#E83E6C", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, fontSize: 14, fontWeight: 700 }}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {wishlistItems.length > 5 && (
                        <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#999", paddingTop: 4 }}>
                          +{wishlistItems.length - 5} more items
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    className="spretro-panel-cta"
                    onClick={() => { navigate("/women"); setActivePanel(null); }}
                    style={wishlistItems.length > 0 ? { background: "linear-gradient(135deg,#FF6B9D,#FF4D7E)" } : {}}
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
                          {user?.full_name ? `Hi, ${user.full_name}` : "Welcome back"}
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
                        onClick={() => { logout(); setActivePanel(null); navigate("/"); }}
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

          </div>

        </div>

        {/* MOBILE NAV TILES — phone only */}
        <div className="spretro-mobile-nav">
          {[
            { label: "Women", path: "/women", bg: "#FFF0F5", color: "#EC4899",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M9 20h6M12 16v4M8 12c-2.5 1-4 3-4 5h16c0-2-1.5-4-4-5"/></svg> },
            { label: "Men",   path: "/men",   bg: "#EFF6FF", color: "#3B82F6",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M12 14c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4z"/></svg> },
            { label: "Kids",  path: "/kids",  bg: "#FFFBEB", color: "#F59E0B",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M9 22V12l-2-3h10l-2 3v10"/><path d="M9 17h6"/></svg> },
            { label: "New In", path: "/new-in", bg: "#F3EEFF", color: "#6A2CFF",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
          ].map((item) => (
            <div
              key={item.label}
              className={`spretro-mobile-nav-item ${activeLink === item.label ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <div className="spretro-mobile-nav-icon" style={{ background: item.bg, color: item.color }}>
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
