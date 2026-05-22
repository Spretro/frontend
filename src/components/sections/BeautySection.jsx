import { ChevronRight } from "lucide-react";
import { beautyBags } from "../../data";

function BagCard({ label, color }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
      <div
        className="w-28 h-28 rounded-2xl flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        <div className="w-16 h-12 rounded-lg opacity-50 border-2 border-white/30" style={{ background: `${color}` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>
      <span className="text-[10px] text-gray-700 font-semibold tracking-wider">{label}</span>
    </div>
  );
}

export default function BeautySection() {
  return (
    <section className="py-6 bg-white">
      <div className="flex items-center justify-between px-4 mb-1">
        <h2 className="text-base font-black text-gray-900 tracking-widest uppercase">BEAUTY</h2>
        <button className="flex items-center gap-0.5 text-xs text-rose-500 font-semibold">
          View All <ChevronRight size={13} />
        </button>
      </div>

      {/* Bags sub-section */}
      <div className="bg-[#e8ede8] mx-4 rounded-2xl p-4 mt-3">
        <p className="text-[10px] text-gray-500 font-semibold tracking-widest text-center uppercase">BAGS TOO</p>
        <h3 className="text-lg font-black text-gray-900 text-center tracking-wider mb-4">EVERY OCCASION</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {beautyBags.map((bag, i) => (
            <BagCard key={i} {...bag} />
          ))}
        </div>
      </div>
    </section>
  );
}
