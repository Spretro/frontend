const trendingStyles = [
  { label: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80" },
  { label: "Kurtas", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80" },
  { label: "Dress / Kurti", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" },
  { label: "Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { label: "Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },
  { label: "Sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80" },
  { label: "Sports Shoes", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80" },
  { label: "Loafers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80" },
];

export default function JewellerySection() {
  return (
    <section
      className="py-14"
      style={{ background: "linear-gradient(135deg, #FAFAFA 0%, #F5F0FF 100%)" }}
    >
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 fade-in">
          <div>
            <span className="text-xs font-bold text-[#6A2CFF] uppercase tracking-widest">What's Hot</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mt-1 leading-none">
              Trending <em className="text-[#6A2CFF] not-italic">Styles</em>
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
          {trendingStyles.map((item, i) => (
            <div
              key={i}
              className="shrink-0 cursor-pointer group fade-in-up"
              style={{ animationDelay: `${i * 0.07}s` }}
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
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-0 right-0 text-center text-white font-black text-sm uppercase tracking-wide drop-shadow-lg">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
