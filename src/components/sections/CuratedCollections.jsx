import { curatedCollections } from "../../data";

function CollectionCard({ label, tag, color }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
      style={{ width: 140, height: 180, backgroundColor: color }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Fashion figure */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-28 rounded-t-full opacity-40 transition-transform group-hover:scale-105"
          style={{ background: `linear-gradient(to top, rgba(255,255,255,0.3), transparent)` }}
        />
      </div>

      {tag && (
        <span className="absolute top-2 left-2 bg-rose-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
          {tag}
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-white text-[10px] font-bold leading-tight">{label}</p>
      </div>
    </div>
  );
}

export default function CuratedCollections() {
  return (
    <section className="py-6 bg-[#f5f0e8]">
      <h2 className="text-sm font-bold text-gray-900 tracking-widest uppercase text-center mb-4">
        Curated Collections
      </h2>
      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
        {curatedCollections.map((col, i) => (
          <CollectionCard key={i} {...col} />
        ))}
      </div>
    </section>
  );
}
