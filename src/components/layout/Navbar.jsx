import { navCategories } from "../../data";
import { useState } from "react";

const Icon = ({ name, size = 20 }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    bag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };
  return icons[name];
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-10 py-3 md:py-5 bg-white border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-2xl md:text-4xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent tracking-tighter">
            SPETRO
          </div>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-rose-600 rounded-full animate-pulse" />
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 lg:mx-16">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full pl-12 lg:pl-14 pr-24 lg:pr-28 py-3 lg:py-4 bg-gray-50 rounded-2xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all shadow-sm"
            />
            <div className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="search" size={20} />
            </div>
            <button className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 lg:px-5 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={24} />
          </button>

          {/* Desktop icons */}
          <button className="hidden md:flex flex-col items-center gap-1 lg:gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <div className="relative">
              <Icon name="heart" size={20} />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] lg:text-xs font-bold">Wishlist</span>
          </button>
          <button className="relative flex flex-col items-center gap-1 lg:gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <div className="relative">
              <Icon name="bag" size={20} />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[9px] lg:text-[10px] font-black w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </div>
            <span className="hidden md:block text-[10px] lg:text-xs font-bold">Cart</span>
          </button>
          <button className="hidden md:flex flex-col items-center gap-1 lg:gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <Icon name="user" size={20} />
            <span className="text-[10px] lg:text-xs font-bold">Profile</span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-200 transition-all shadow-sm"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" size={18} />
          </div>
        </div>
      </div>

      {/* Category nav - Desktop */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-3 px-4 md:px-10 py-3 lg:py-4 overflow-x-auto scrollbar-hide bg-gradient-to-r from-gray-50 via-white to-gray-50">
        {navCategories.map((cat, i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-1.5 lg:gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl transition-all hover:bg-white hover:shadow-lg whitespace-nowrap ${
              i === 0 ? "bg-gradient-to-br from-rose-50 to-pink-50 shadow-md border border-rose-100" : ""
            }`}
          >
            <span className="text-2xl lg:text-3xl">{cat.icon}</span>
            <span className="text-[10px] lg:text-xs font-black text-gray-800">{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="grid grid-cols-3 gap-3 p-4">
            {navCategories.map((cat, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold text-gray-800">{cat.label}</span>
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4 space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <Icon name="heart" size={20} />
              <span className="text-sm font-bold">Wishlist</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
              <Icon name="user" size={20} />
              <span className="text-sm font-bold">Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
