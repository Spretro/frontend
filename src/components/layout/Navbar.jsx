import { navCategories } from "../../data";

const Icon = ({ name, size = 16, className = "" }) => {
  const icons = {
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    compass: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    bag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  };
  return icons[name] || null;
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-6 py-2.5 border-b border-gray-100">
        <div className="text-2xl font-black tracking-widest text-gray-900 mr-2">
          SPETRO
        </div>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
          <Icon name="mapPin" size={13} />
          <span>Add Address</span>
        </button>
        <div className="flex-1 mx-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
            <Icon name="search" size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for products, brands or more"
              className="bg-transparent text-xs text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
            <Icon name="grid" size={15} />
            <span className="hidden sm:inline">Categories</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
            <Icon name="compass" size={15} />
            <span className="hidden sm:inline">Discover</span>
          </button>
          <button className="relative">
            <Icon name="heart" size={18} className="text-gray-600 hover:text-rose-500 transition-colors" />
          </button>
          <button className="relative">
            <Icon name="bag" size={18} className="text-gray-600 hover:text-gray-900 transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
            <Icon name="user" size={15} />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
        {navCategories.map((cat, i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 min-w-fit rounded-lg text-xs font-medium transition-all ${
              i === 0
                ? "text-rose-600 border-b-2 border-rose-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="whitespace-nowrap">{cat.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
