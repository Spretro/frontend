import { navCategories } from "../../data";

const Icon = ({ name, size = 20 }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    bag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };
  return icons[name];
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-4xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent tracking-tighter">
            SPETRO
          </div>
          <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-rose-200 transition-all shadow-sm"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="search" size={22} />
            </div>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-10">
          <button className="flex flex-col items-center gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <div className="relative">
              <Icon name="heart" size={24} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs font-bold">Wishlist</span>
          </button>
          <button className="relative flex flex-col items-center gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <div className="relative">
              <Icon name="bag" size={24} />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </div>
            <span className="text-xs font-bold">Cart</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-gray-700 hover:text-rose-600 transition-colors group">
            <Icon name="user" size={24} />
            <span className="text-xs font-bold">Profile</span>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="flex items-center gap-3 px-10 py-4 overflow-x-auto scrollbar-hide bg-gradient-to-r from-gray-50 via-white to-gray-50">
        {navCategories.map((cat, i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-lg ${
              i === 0 ? "bg-gradient-to-br from-rose-50 to-pink-50 shadow-md border border-rose-100" : ""
            }`}
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-xs font-black whitespace-nowrap text-gray-800">{cat.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
