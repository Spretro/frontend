import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";
import SkeletonCard from "../../components/sections/listing/SkeletonCard";

export default function Brands() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);
  const [showAllBrands, setShowAllBrands] = useState(false);

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
    if (activeBrand === "All") return products;
    return products.filter((p) => p.brand === activeBrand);
  }, [products, activeBrand]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="bg-[#faf9ff]">
      <div className="mx-auto max-w-[1440px] px-8">
        <section className="mt-8 overflow-hidden rounded-[32px] border border-[#ECE8F9] bg-white shadow-[0_24px_80px_rgba(106,44,255,0.05)]">
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] items-end min-h-[160px] px-6 py-6 md:px-10 md:py-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] font-semibold text-[#6A2CFF] mb-3">Brands</p>
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                Top Brands
              </h1>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-500">
                Shop from the world's best fashion labels
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3 items-start justify-between text-left lg:items-end lg:text-right">
              <div className="rounded-3xl bg-[#F6F1FF] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7C3AED]">Brands</p>
                <p className="mt-2 text-4xl font-black text-[#4A1599]">{loading ? "—" : brands.length} Brands</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">Browse by Brand</h2>
            {brands.length > 0 && (
              <button
                onClick={() => setShowAllBrands((s) => !s)}
                className="flex items-center gap-1 text-xs font-bold text-[#6A2CFF] transition-colors hover:text-[#4C1D95]"
              >
                {showAllBrands ? "View less" : "View more"}
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform ${showAllBrands ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>

          <div className={showAllBrands ? "flex flex-wrap gap-2.5" : "flex gap-2.5 overflow-x-auto scrollbar-hide pb-2"}>
            <button
              onClick={() => { setActiveBrand("All"); setVisibleCount(20); }}
              className={`shrink-0 rounded-2xl px-5 py-2.5 text-xs font-black transition-all duration-200 ${
                activeBrand === "All"
                  ? "bg-[#6A2CFF] text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => { setActiveBrand(brand.name); setVisibleCount(20); }}
                className={`shrink-0 flex items-center gap-2.5 rounded-2xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  activeBrand === brand.name
                    ? "bg-[#6A2CFF] text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={brand.thumb}
                  alt={brand.name}
                  className="size-6 shrink-0 rounded-lg object-cover opacity-90"
                />
                <span className="whitespace-nowrap">{brand.name}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${activeBrand === brand.name ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                  {brand.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="py-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[32px] border border-gray-200 bg-white px-8 py-24 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#F4F2FF]">
                <Search size={28} strokeWidth={1.5} className="text-[#7C3AED]" />
              </div>
              <p className="text-xl font-black text-slate-900">No products found</p>
              <p className="mt-2 text-sm text-slate-500">Pick a different brand to keep shopping.</p>
              <button
                onClick={() => setActiveBrand("All")}
                className="mt-6 rounded-full bg-[#6A2CFF] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#5B28E1]"
              >
                View all brands
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {visible.map((p, index) => (
                  <div key={p.id} className="fade-in-up h-full" style={{ animationDelay: `${(index % 10) * 0.04}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-sm text-slate-500">
                    Showing {visibleCount} of {filtered.length}
                  </p>
                  <div className="h-1.5 w-full max-w-lg overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-[#6A2CFF] transition-all duration-500"
                      style={{ width: `${(visibleCount / filtered.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setVisibleCount((c) => c + 20)}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#4A1599] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#6A2CFF]"
                  >
                    Load more
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
