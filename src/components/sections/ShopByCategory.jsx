import { ChevronRight } from "lucide-react";
import { shopCategories } from "../../data";

function CategoryCard({ label, color }) {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div
        className="w-20 h-24 rounded-2xl flex items-end justify-center overflow-hidden relative transition-transform group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        {/* Fashion silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-16 rounded-t-full opacity-30" style={{ background: `${color}88` }} />
        </div>
        <div
          className="w-10 h-16 rounded-t-full opacity-60 mb-0"
          style={{ background: `linear-gradient(to top, rgba(0,0,0,0.2), transparent)` }}
        />
      </div>
      <span className="text-[10px] text-gray-700 font-medium text-center leading-tight max-w-[72px]">
        {label}
      </span>
    </button>
  );
}

export default function ShopByCategory() {
  return (
    <section className="px-4 py-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 tracking-widest uppercase">
          Shop By Category
        </h2>
        <button className="flex items-center gap-0.5 text-xs text-rose-500 font-semibold hover:text-rose-700">
          View All <ChevronRight size={13} />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {shopCategories.map((cat, i) => (
          <CategoryCard key={i} {...cat} />
        ))}
      </div>
    </section>
  );
}
