const beautyCategories = [
  { label: "Lipsticks", image: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp", accent: "#BE185D" },
  { label: "Skincare", image: "https://cdn.dummyjson.com/product-images/skin-care/hyaluronic-acid-serum/thumbnail.webp", accent: "#7C3AED" },
  { label: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp", accent: "#4338CA" },
  { label: "Mascara", image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp", accent: "#9D174D" },
  { label: "Eyeshadow", image: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp", accent: "#6B21A8" },
  { label: "Nail Polish", image: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp", accent: "#B91C1C" },
];

export default function BeautySection() {
  return (
    <section className="py-14" style={{ background: "#130820" }}>
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="text-center mb-10 fade-in">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">
            100% Genuine · Your Favourites
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Glam Up In Minutes
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
          {beautyCategories.map((cat, i) => (
            <div
              key={i}
              className="shrink-0 cursor-pointer group fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="relative rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300"
                style={{
                  width: "clamp(170px, 17vw, 220px)",
                  aspectRatio: "2/3",
                  background: `linear-gradient(160deg, ${cat.accent}99, ${cat.accent}44)`,
                  boxShadow: `0 4px 24px ${cat.accent}44`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 16px 48px ${cat.accent}88`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 4px 24px ${cat.accent}44`)
                }
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4">
                  <span className="text-white font-black text-sm uppercase tracking-widest drop-shadow-lg">
                    {cat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
