import { useState, useEffect, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";
import SkeletonCard from "../../components/sections/listing/SkeletonCard";
import { toINR } from "../../utils/currency";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Highest Discount", value: "discount" },
];

const PRICE_FILTERS = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹2K", min: 0, max: 2000 },
  { label: "₹2K – ₹5K", min: 2000, max: 5000 },
  { label: "₹5K – ₹15K", min: 5000, max: 15000 },
  { label: "₹15K+", min: 15000, max: Infinity },
];

export default function Brands() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [priceIdx, setPriceIdx] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [search, setSearch] = useState("");
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
    let items = [...products];

    if (activeBrand !== "All") items = items.filter((p) => p.brand === activeBrand);

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q)
      );
    }

    const pf = PRICE_FILTERS[priceIdx];
    items = items.filter((p) => {
      const inr = toINR(p.price);
      return inr >= pf.min && inr < pf.max;
    });

    if (minRating > 0) items = items.filter((p) => p.rating >= minRating);

    switch (sort) {
      case "price_asc": items.sort((a, b) => a.price - b.price); break;
      case "price_desc": items.sort((a, b) => b.price - a.price); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
      case "discount": items.sort((a, b) => b.discountPercentage - a.discountPercentage); break;
    }

    return items;
  }, [products, activeBrand, sort, priceIdx, minRating, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="bg-[#faf9ff]" onClick={() => showSort && setShowSort(false)}>
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

        <div className="sticky top-0 z-30 mt-4 bg-[#faf9ff] border-b border-gray-200 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-[#E6E0FF] bg-white px-4 py-2 text-sm font-semibold text-[#4A1599] shadow-sm">
              <SlidersHorizontal size={16} strokeWidth={2} />
              Filter
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#6A2CFF] hover:text-[#6A2CFF] transition-colors"
                onClick={() => setShowSort((s) => !s)}
              >
                Sort
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>
              {showSort && (
                <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-xl">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${sort === o.value ? "text-[#6A2CFF] bg-[#F5F0FF]" : "text-slate-700 hover:bg-slate-50"}`}
                      onClick={() => { setSort(o.value); setShowSort(false); }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${priceIdx === 0 ? "border-[#6A2CFF] bg-[#EFF3FF] text-[#4A1599]" : "border-gray-200 bg-white text-slate-700 hover:border-[#6A2CFF]"}`}
              onClick={() => setPriceIdx((i) => (i + 1) % PRICE_FILTERS.length)}
            >
              {PRICE_FILTERS[priceIdx].label}
            </button>

            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${minRating === 0 ? "border-gray-200 bg-white text-slate-700" : "border-[#F59E0B] bg-[#FFFAF0] text-[#B45309]"}`}
              onClick={() => setMinRating((r) => (r === 0 ? 3 : r === 3 ? 4 : 0))}
            >
              {minRating === 0 ? "All Ratings" : `${minRating}★+`}
            </button>

            <div className="ml-auto min-w-[220px] flex-1">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <Search size={16} strokeWidth={2} className="text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brands or products"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-gray-400 outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                    <X size={14} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
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
              <p className="mt-2 text-sm text-slate-500">Try adjusting your filters or search query.</p>
              <button
                onClick={() => { setActiveBrand("All"); setPriceIdx(0); setMinRating(0); setSearch(""); }}
                className="mt-6 rounded-full bg-[#6A2CFF] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#5B28E1]"
              >
                Reset filters
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
