import { useState, useEffect } from "react";

const tagMap = {
  "womens-dresses": { label: "TRENDING", color: "#6A2CFF" },
  "tops": { label: "NEW", color: "#10B981" },
  "mens-shirts": { label: "HOT", color: "#EF4444" },
  "womens-bags": { label: "BESTSELLER", color: "#F59E0B" },
  "womens-shoes": { label: "SALE", color: "#EC4899" },
  "mens-shoes": { label: "FRESH", color: "#3B82F6" },
  "sunglasses": { label: "TRENDY", color: "#8B5CF6" },
  "beauty": { label: "FAV", color: "#DB2777" },
  "fragrances": { label: "LUXURY", color: "#D97706" },
  "skin-care": { label: "GLOW", color: "#059669" },
  "womens-jewellery": { label: "NEW", color: "#6A2CFF" },
};

function SkeletonCard() {
  return (
    <div className="shrink-0 w-56 md:w-64 rounded-3xl overflow-hidden border border-[#EEE8FF] bg-white">
      <div className="aspect-3/4 bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-2 w-16 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-36 bg-gray-100 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=16&select=id,title,price,discountPercentage,thumbnail,brand,rating,category"
    )
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toINR = (usd) =>
    `₹${Math.round(usd * 83).toLocaleString("en-IN")}`;

  const originalINR = (price, discount) =>
    `₹${Math.round((price / (1 - discount / 100)) * 83).toLocaleString("en-IN")}`;

  return (
    <section className="py-12" style={{ background: "linear-gradient(180deg, #F9F8FF 0%, #FFFFFF 100%)" }}>
      <div className="max-w-360 mx-auto px-4 md:px-8">
        {/* Premium header card */}
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-8 fade-in px-6 md:px-10 py-7 md:py-8 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #0F0620 0%, #1E0D40 50%, #2D1060 100%)" }}
        >
          {/* Blobs */}
          <div className="absolute right-20 top-0 size-40 rounded-full bg-violet-500/20 blur-2xl pointer-events-none" />
          <div className="absolute right-0 bottom-0 size-28 rounded-full bg-fuchsia-500/15 blur-2xl pointer-events-none" />
          {/* Grid lines decoration */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live · Real Products</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              Trending <span style={{ background: "linear-gradient(90deg, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Now</span>
            </h2>
            <p className="text-sm text-white/40 mt-1.5 font-medium">Most loved products this week</p>
          </div>
          <button className="relative hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold px-5 py-3 rounded-full transition-all duration-200 backdrop-blur-sm">
            View All
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p, i) => {
                const tag = tagMap[p.category] || { label: "PICK", color: "#6A2CFF" };
                return (
                  <div
                    key={p.id}
                    className="shrink-0 w-52 md:w-60 bg-white rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 fade-in-up"
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      border: "1px solid #EEE8FF",
                      boxShadow: "0 2px 16px rgba(106,44,255,0.06)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 16px 48px rgba(106,44,255,0.20)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "0 2px 16px rgba(106,44,255,0.06)")
                    }
                  >
                    <div className="relative aspect-3/4 overflow-hidden bg-gray-50">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="size-full object-cover group-hover:scale-107 transition-transform duration-500"
                      />
                      {/* Tag */}
                      <span
                        className="absolute top-3 left-3 text-white text-[9px] font-black px-2.5 py-1.5 rounded-full shadow-lg"
                        style={{ background: tag.color }}
                      >
                        {tag.label}
                      </span>
                      {/* Discount badge */}
                      <span className="absolute top-3 right-3 bg-white/95 text-emerald-600 text-[9px] font-black px-2.5 py-1.5 rounded-full shadow-md">
                        -{Math.round(p.discountPercentage)}%
                      </span>
                      {/* Wishlist */}
                      <button className="absolute bottom-3 right-3 size-9 bg-white/95 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#6A2CFF] hover:text-white text-gray-600">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      {/* Bottom gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/10 to-transparent" />
                    </div>

                    <div className="p-4">
                      {p.brand && (
                        <p className="text-[9px] font-black text-[#6A2CFF] uppercase tracking-[0.15em] mb-1">
                          {p.brand}
                        </p>
                      )}
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-2.5">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-0.5 mb-2.5">
                        {[...Array(5)].map((_, j) => (
                          <svg
                            key={j}
                            className={`size-3 ${j < Math.floor(p.rating) ? "text-amber-400 fill-current" : "text-gray-200 fill-current"}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-[9px] text-gray-400 ml-1 font-medium">({p.rating.toFixed(1)})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3.5">
                        <span className="text-base font-black text-gray-900">{toINR(p.price)}</span>
                        <span className="text-xs text-gray-400 line-through font-medium">
                          {originalINR(p.price, p.discountPercentage)}
                        </span>
                      </div>
                      <button
                        className="w-full py-2.5 rounded-xl text-xs font-black text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
                        style={{ background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, #6A2CFF, #9B6DFF)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, #1F2937 0%, #111827 100%)")}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
