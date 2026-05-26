import { useState, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";

const BRAND_COLORS = [
  "linear-gradient(135deg, #6A2CFF 0%, #9B6DFF 100%)",
  "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
  "linear-gradient(135deg, #065F46 0%, #059669 100%)",
  "linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)",
  "linear-gradient(135deg, #78350F 0%, #D97706 100%)",
  "linear-gradient(135deg, #831843 0%, #EC4899 100%)",
  "linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)",
  "linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)",
  "linear-gradient(135deg, #14532D 0%, #16A34A 100%)",
  "linear-gradient(135deg, #4A044E 0%, #A21CAF 100%)",
  "linear-gradient(135deg, #1C1917 0%, #57534E 100%)",
  "linear-gradient(135deg, #0F172A 0%, #334155 100%)",
];

function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white animate-pulse">
      <div className="bg-gray-200" style={{ aspectRatio: "3/4" }} />
      <div className="p-4 space-y-2">
        <div className="h-2.5 bg-gray-200 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-10 bg-gray-200 rounded-2xl mt-1" />
      </div>
    </div>
  );
}

export default function Brands() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=500&select=id,title,price,discountPercentage,thumbnail,brand,rating,category"
    )
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const brands = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const b = p.brand || "Unknown";
      if (!map[b]) map[b] = { name: b, count: 0, thumb: p.thumbnail };
      map[b].count++;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [products]);

  const filtered = useMemo(() => {
    let items = [...products];
    if (activeBrand !== "All") items = items.filter((p) => p.brand === activeBrand);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q)
      );
    }
    return items;
  }, [products, activeBrand, search]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <main style={{ background: "#F9F8FF" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #6A2CFF 100%)", minHeight: "220px" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-360 mx-auto px-4 md:px-8 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-white/50 text-xs font-medium mb-4">
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-white/90">Brands</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-2">
            Top Brands
          </h1>
          <p className="text-white/60 text-sm md:text-base font-semibold tracking-wide mb-4">
            Shop from the world's best fashion labels
          </p>
          {!loading && (
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              {brands.length} Brands · {products.length} Products
            </span>
          )}
        </div>
      </div>

      {/* Brand cards */}
      <div className="max-w-360 mx-auto px-4 md:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-gray-900">Browse by Brand</h2>
          <div className="flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 border border-gray-200">
            <Search size={13} strokeWidth={2} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveBrand("All"); }}
              placeholder="Search brands or products..."
              className="text-xs font-medium bg-transparent text-gray-700 placeholder-gray-400 outline-none w-40 md:w-56"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={12} strokeWidth={2.5} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3">
          {/* All brands chip */}
          <button
            onClick={() => setActiveBrand("All")}
            className={`shrink-0 px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 ${
              activeBrand === "All"
                ? "bg-[#6A2CFF] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All Brands
          </button>

          {brands.map((brand, i) => (
            <button
              key={brand.name}
              onClick={() => { setActiveBrand(brand.name); setVisibleCount(20); }}
              className={`shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                activeBrand === brand.name
                  ? "text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
              style={
                activeBrand === brand.name
                  ? { background: BRAND_COLORS[i % BRAND_COLORS.length] }
                  : {}
              }
            >
              <img
                src={brand.thumb}
                alt={brand.name}
                className="size-6 rounded-lg object-cover shrink-0 opacity-80"
              />
              <span className="whitespace-nowrap">{brand.name}</span>
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeBrand === brand.name ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                {brand.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-360 mx-auto px-4 md:px-8 py-6">
        <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
          {loading ? "Loading..." : `${filtered.length} products${activeBrand !== "All" ? ` from ${activeBrand}` : ""}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {visible.map((p, idx) => (
                <div key={p.id} className="fade-in-up" style={{ animationDelay: `${(idx % 10) * 0.04}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((c) => c + 20)}
                  className="px-8 py-3 rounded-full bg-gray-950 text-white text-sm font-bold hover:bg-[#6A2CFF] transition-all duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
