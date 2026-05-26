import { useNavigate } from "react-router-dom";

const TRUST_BADGES = [
  { icon: "🔒", label: "Secure Payments", desc: "100% Protected" },
  { icon: "✅", label: "Assured Quality", desc: "Genuine Products" },
  { icon: "🔄", label: "7 Day Returns", desc: "Hassle-Free" },
  { icon: "⚡", label: "60 Min Delivery", desc: "Express Shipping" },
];

const SOCIAL = [
  {
    name: "Instagram",
    color: "#E1306C",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Facebook",
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "X / Twitter",
    color: "#1DA1F2",
    path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  },
  {
    name: "YouTube",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const NAV_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Women's Fashion", path: "/women" },
      { label: "Men's Fashion", path: "/men" },
      { label: "Kids & Teens", path: "/kids" },
      { label: "New Arrivals", path: "/new-in" },
      { label: "Sale & Offers", path: "/sale" },
      { label: "Top Brands", path: "/brands" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Topwear", path: "/category/topwear" },
      { label: "Sneakers", path: "/category/sneakers" },
      { label: "Beauty", path: "/category/beauty" },
      { label: "Jewellery", path: "/category/jewellery" },
      { label: "Watches", path: "/category/watches" },
      { label: "Luxury", path: "/category/luxury" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "About Us", path: "/about-us" },
      { label: "Careers", path: "/careers" },
      { label: "FAQs", path: "/faqs" },
      { label: "Terms & Conditions", path: "/terms-and-conditions" },
      { label: "Contact Us", path: "/contact-us" },
      { label: "Sitemap", path: "/sitemap" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "linear-gradient(160deg, #080412 0%, #0E0720 50%, #080412 100%)" }} className="text-white mt-8 md:mt-12">

      {/* ── Trust strip ── */}
      <div style={{ background: "#F9F8FF", borderTop: "1px solid #E8E2FF" }} className="py-5 md:py-7">
        <div className="max-w-360 mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div
                  className="size-10 md:size-12 rounded-2xl flex items-center justify-center text-lg md:text-xl shrink-0"
                  style={{ background: "linear-gradient(135deg, #6A2CFF22, #9B6DFF22)", border: "1.5px solid #6A2CFF33" }}
                >
                  {b.icon}
                </div>
                <div>
                  <p className="text-xs md:text-sm font-black text-gray-900 leading-tight">{b.label}</p>
                  <p className="text-[10px] md:text-xs text-gray-500 font-medium">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-360 mx-auto px-4 md:px-8 pt-14 md:pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="xl:col-span-2">
            {/* Logo */}
            <div
              className="text-4xl md:text-5xl font-black tracking-tighter mb-3 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #A78BFA 0%, #6A2CFF 50%, #C084FC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              onClick={() => navigate("/")}
            >
              SPRETRO<span style={{ color: "#6A2CFF", WebkitTextFillColor: "#6A2CFF" }}>.</span>
            </div>
            <p className="text-sm text-purple-300/70 font-medium mb-1 tracking-wide">Fashion Commerce</p>
            <p className="text-sm text-white/40 leading-relaxed mb-7 max-w-xs">
              India's fastest growing fashion destination. Explore thousands of styles, top brands, and unbeatable deals.
            </p>

            {/* App buttons */}
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400/60 mb-3">Get the App</p>
            <div className="flex gap-3 mb-8">
              {["▶  Google Play", "🍎  App Store"].map((label) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white/80 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(106,44,255,0.15)", border: "1px solid rgba(106,44,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(106,44,255,0.35)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(106,44,255,0.15)")}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400/60 mb-3">Newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(106,44,255,0.25)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#6A2CFF")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(106,44,255,0.25)")}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white whitespace-nowrap transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6A2CFF, #9B6DFF)" }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-white/50 hover:text-white font-medium transition-all duration-150 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                    >
                      <span className="size-1 rounded-full bg-purple-600/0 group-hover:bg-purple-500 transition-all duration-150 shrink-0" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider + social + copyright ── */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(106,44,255,0.2)" }}
        >
          {/* Social */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/25 mr-2">Follow us</span>
            {SOCIAL.map((s) => (
              <button
                key={s.name}
                aria-label={s.name}
                className="size-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = s.color + "22"; e.currentTarget.style.borderColor = s.color + "55"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <path d={s.path} />
                </svg>
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-white/25 font-medium tracking-wide text-center">
            © 2025 <span className="text-white/40 font-black">SPRETRO TECHNOLOGIES PRIVATE LIMITED</span> · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
