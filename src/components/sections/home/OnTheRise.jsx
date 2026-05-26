const homeCategories = [
  { label: "Bedsheets", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", accent: "#F472B6" },
  { label: "Wall Art", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80", accent: "#A78BFA" },
  { label: "Lights & Lamps", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", accent: "#FBBF24" },
  { label: "Decor Finds", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80", accent: "#34D399" },
  { label: "Showpieces", image: "https://images.unsplash.com/photo-1531248138602-97bcf77fc5bb?w=500&q=80", accent: "#60A5FA" },
  { label: "Curtains", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", accent: "#F87171" },
  { label: "Candles", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80", accent: "#FB923C" },
  { label: "Floor Mats", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80", accent: "#2DD4BF" },
];

export default function HomeSection() {
  return (
    <section
      className="py-14"
      style={{ background: "linear-gradient(135deg, #FFF5F9 0%, #F5F0FF 50%, #F0F9FF 100%)" }}
    >
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 fade-in">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-1">
              Cute Finds For
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Your <em className="text-pink-500 not-italic">Home</em>
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
          {homeCategories.map((cat, i) => (
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
                  boxShadow: `0 4px 20px ${cat.accent}33`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 16px 48px ${cat.accent}66`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 4px 20px ${cat.accent}33`)
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
