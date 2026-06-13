import CategoryProductSection from "../../shared/CategoryProductSection";

const mensCategories = [
  { label: "Shirts",         image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80" },
  { label: "T-Shirts",       image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { label: "Kurta",          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  { label: "Bottoms",        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80" },
  { label: "Fragrances",     image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80" },
  { label: "Footwear",       image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { label: "Belts & Wallets",image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80" },
  { label: "Backpacks",      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
];

const headerImages = [
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
];

export default function BrandShowcase() {
  return (
    <>
      {/* Desktop: original horizontal scroll */}
      <section
        className="py-12 hidden md:block"
        style={{ background: "linear-gradient(135deg, #EDF5FF 0%, #F5F0FF 100%)" }}
      >
        <div className="max-w-360 mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8 fade-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">The Curated</p>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                Style For <em className="text-blue-500 not-italic">Him</em>
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
            {mensCategories.map((cat, i) => (
              <div key={i} className="shrink-0 cursor-pointer group fade-in-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div
                  className="relative rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300"
                  style={{ width: "clamp(170px, 17vw, 220px)", aspectRatio: "3/4", boxShadow: "0 4px 20px rgba(106,44,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.25)")}
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
          title="Style For" titleAccent="Him" subtitle="The Curated"
          accentColor="#3B82F6"
          bg="linear-gradient(135deg, #EDF5FF 0%, #F5F0FF 100%)"
          apiUrl="https://dummyjson.com/products/category/mens-shirts?limit=20&select=id,title,price,thumbnail,rating,discountPercentage,brand"
        />
      </div>
    </>
  );
}
