import CategoryProductSection from "../../shared/CategoryProductSection";

const womenCategories = [
  { label: "Tops",      image: "https://images.unsplash.com/photo-1485462537746-965f33f98bec?w=500&q=80" },
  { label: "Dresses",   image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80" },
  { label: "Bottoms",   image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80" },
  { label: "Kurtas",    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80" },
  { label: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80" },
  { label: "Handbags",  image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80" },
  { label: "Beauty",    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80" },
  { label: "Footwear",  image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },
];

const headerImages = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&q=80",
];

export default function StyleForHer() {
  return (
    <>
      {/* Desktop: original horizontal scroll */}
      <section
        className="py-12 hidden md:block"
        style={{ background: "linear-gradient(135deg, #FFF5F8 0%, #FBF0FF 100%)" }}
      >
        <div className="max-w-360 mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8 fade-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1">The Curated</p>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                Style For <em className="text-rose-500 not-italic">Her</em>
              </h2>
            </div>
            <div className="flex gap-3">
              {headerImages.map((src, i) => (
                <div key={i} className="w-20 h-28 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white">
                  <img src={src} alt="style" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
            {womenCategories.map((cat, i) => (
              <div key={i} className="shrink-0 cursor-pointer group fade-in-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div
                  className="relative rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300"
                  style={{ width: "clamp(170px, 17vw, 220px)", aspectRatio: "3/4", boxShadow: "0 4px 20px rgba(106,44,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(236,72,153,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(106,44,255,0.08)")}
                >
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-0 right-0 text-center text-white font-black text-sm uppercase tracking-wide drop-shadow-lg">{cat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: 2×2 product grid */}
      <div className="md:hidden">
        <CategoryProductSection
          title="Style For" titleAccent="Her" subtitle="The Curated"
          accentColor="#EC4899"
          bg="linear-gradient(135deg, #FFF5F8 0%, #FBF0FF 100%)"
          apiUrl="https://dummyjson.com/products/category/womens-dresses?limit=20&select=id,title,price,thumbnail,rating,discountPercentage,brand"
        />
      </div>
    </>
  );
}
