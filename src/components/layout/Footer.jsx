import { footerLinks } from "../../data";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-8 md:mt-12">
      {/* Trust badges */}
      <div className="bg-white py-6 md:py-8 px-4 md:px-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-6 md:gap-12 text-xs md:text-sm text-gray-700">
            {[
              { icon: "✓", label: "Secure Payments", desc: "100% Protected" },
              { icon: "✓", label: "Assured Product", desc: "Quality Guaranteed" },
              { icon: "✓", label: "Try & Buy", desc: "Before You Pay" },
              { icon: "✓", label: "7 Day Return", desc: "Easy Returns" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 md:gap-3 font-medium">
                <span className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-black shadow-lg flex-shrink-0">
                  {item.icon}
                </span>
                <div>
                  <div className="font-bold text-gray-900 text-xs md:text-sm">{item.label}</div>
                  <div className="text-[10px] md:text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 font-medium border-t md:border-t-0 md:border-l border-gray-300 pt-6 md:pt-0 md:pl-12 mt-6 md:mt-0">
            <span className="font-bold text-gray-900 text-sm md:text-base">Show us some</span>
            <span className="text-rose-500 text-xl md:text-2xl animate-pulse">♥</span>
            <span className="font-bold text-gray-900 text-sm md:text-base">on social media</span>
            <div className="flex gap-3 md:gap-4">
              {[
                { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "hover:text-pink-500" },
                { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "hover:text-blue-500" },
                { path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", color: "hover:text-sky-400" },
                { path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", color: "hover:text-red-500" },
              ].map((social, i) => (
                <svg key={i} className={`w-4 h-4 md:w-5 md:h-5 ${social.color} cursor-pointer transition-all hover:scale-125`} fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-6">SPETRO</div>
          <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 leading-relaxed">Customise Our Spetro App On Your Mobile</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <button className="bg-gray-800 border-2 border-gray-700 rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs text-white hover:border-rose-500 hover:bg-gray-700 transition-all font-bold">
              ▶ Google Play
            </button>
            <button className="bg-gray-800 border-2 border-gray-700 rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-xs text-white hover:border-rose-500 hover:bg-gray-700 transition-all font-bold">
              🍎 App Store
            </button>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 font-bold">Subscribe To Our Newsletter</p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-2 border-gray-700 rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-sm text-white outline-none flex-1 placeholder-gray-500 focus:border-rose-500 transition-all"
            />
            <button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xs md:text-sm px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-black shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {[
          { title: "HELP", links: footerLinks.help },
          { title: "QUICK LINKS", links: footerLinks.quickLinks },
          { title: "TOP CATEGORIES", links: footerLinks.topCategories },
          { title: "POLICIES", links: footerLinks.policies },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-white text-xs md:text-sm font-black mb-4 md:mb-5 tracking-wide">{title}</h4>
            <ul className="space-y-2 md:space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs md:text-sm text-gray-400 hover:text-rose-400 transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 py-4 md:py-6 text-center text-[10px] md:text-xs text-gray-500 px-4">
        <p className="font-semibold">© 2025 SPETRO TECHNOLOGIES PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
