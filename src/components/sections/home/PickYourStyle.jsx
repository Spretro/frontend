const bagCategories = [
  { label: "Slings", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { label: "Totes", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80" },
  { label: "Party Bags", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80" },
  { label: "Trolley", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&q=80" },
  { label: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
  { label: "Duffel Bag", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80" },
];

export default function BagsSection() {
  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F0EFFF 0%, #EEF2FF 50%, #F5F0FF 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.06]">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-360 mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 fade-in">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">
              Bags For
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Every <em className="text-violet-500 not-italic">Occasion</em>
            </h2>
          </div>
          <button className="text-sm font-bold text-[#6A2CFF] hover:underline flex items-center gap-1 mb-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
          {bagCategories.map((cat, i) => (
            <div
              key={i}
              className="shrink-0 cursor-pointer group fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="relative rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300"
                style={{
                  width: "clamp(170px, 17vw, 220px)",
                  aspectRatio: "3/4",
                  boxShadow: "0 4px 20px rgba(106,44,255,0.08)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 16px 48px rgba(106,44,255,0.22)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 4px 20px rgba(106,44,255,0.08)")
                }
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-0 right-0 text-center text-white font-black text-sm uppercase tracking-wide drop-shadow-lg">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
