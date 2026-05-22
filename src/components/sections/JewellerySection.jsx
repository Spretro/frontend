import { ChevronRight } from "lucide-react";
import { jewelleryItems } from "../../data";

function JewelleryCard({ label, color }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
      <div
        className="w-28 h-36 rounded-2xl overflow-hidden relative transition-transform group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-24 rounded-t-full opacity-50"
            style={{ background: `linear-gradient(to top, rgba(255,255,255,0.4), transparent)` }}
          />
        </div>
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-white text-[9px] font-bold">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function JewellerySection() {
  return (
    <section className="py-6 bg-[#f5f0e8]">
      <div className="flex items-center justify-between px-4 mb-1">
        <div>
          <h2 className="text-base font-black text-gray-900 tracking-widest uppercase">JEWELLERY</h2>
          <p className="text-[10px] text-gray-500 tracking-wider">WE LOVE FASHION & BEAUTY</p>
        </div>
        <button className="flex items-center gap-0.5 text-xs text-rose-500 font-semibold">
          View All <ChevronRight size={13} />
        </button>
      </div>
      <div className="flex gap-3 px-4 mt-3 overflow-x-auto scrollbar-hide pb-2">
        {jewelleryItems.map((item, i) => (
          <JewelleryCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
