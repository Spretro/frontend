import { useState, useEffect, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";

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

const toINR = (usd) => Math.round(usd * 83);

function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white animate-pulse" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="bg-gray-200" style={{ aspectRatio: "3/4" }} />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-200 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3.5 bg-gray-200 rounded-full w-1/2" />
        <div className="h-10 bg-gray-200 rounded-2xl mt-1" />
      </div>
    </div>
  );
}

export default function ListingPage({ config }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubCat, setActiveSubCat] = useState("All");
  const [sort, setSort] = useState(config.sortDefault || "relevance");
  const [priceIdx, setPriceIdx] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          config.categories.map((cat) =>
            fetch(
              `https://dummyjson.com/products/category/${cat}?limit=100&select=id,title,price,discountPercentage,thumbnail,brand,rating,category`
            )
              .then((r) => r.json())
              .then((d) => d.products || [])
          )
        );
        let all = results.flat();
        if (config.filterFn) all = all.filter(config.filterFn);
        const seen = new Set();
        all = all.filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
        setProducts(all);
      } catch {
        setProducts([]);
      }
      setLoading(false);
    }
    fetchAll();
  }, [config]);

  const filtered = useMemo(() => {
    let items = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q)
      );
    }

    if (activeSubCat !== "All" && config.subCategories) {
      const sc = config.subCategories.find((s) => s.label === activeSubCat);
      if (sc?.cats) items = items.filter((p) => sc.cats.includes(p.category));
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
  }, [products, activeSubCat, sort, priceIdx, minRating, search, config]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main style={{ background: "#F9F8FF" }} onClick={() => showSort && setShowSort(false)}>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: config.heroGradient, minHeight: "220px" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-360 mx-auto px-4 md:px-8 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-white/50 text-xs font-medium mb-4">
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-white/90">{config.title}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-2">
            {config.title}
          </h1>
          <p className="text-white/60 text-sm md:text-base font-semibold tracking-wide mb-4">
            {config.subtitle}
          </p>
          {!loading && (
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              {products.length} Products
            </span>
          )}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="bg-white border-b border-gray-100" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-360 mx-auto px-4 md:px-8">

          {/* Sub-category tabs */}
          {config.subCategories && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pt-4 pb-3 border-b border-gray-100">
              {config.subCategories.map((sc) => (
                <button
                  key={sc.label}
                  onClick={() => setActiveSubCat(sc.label)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeSubCat === sc.label
                      ? "bg-[#6A2CFF] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          )}

          {/* Filter row */}
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1.5 text-gray-500 shrink-0">
              <SlidersHorizontal size={15} strokeWidth={2} />
              <span className="text-xs font-bold">Filters:</span>
            </div>

            {/* Sort */}
            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#6A2CFF] hover:text-[#6A2CFF] transition-colors bg-white"
                onClick={() => setShowSort((s) => !s)}
              >
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>
              {showSort && (
                <div className="absolute top-full left-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 min-w-44">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                        sort === o.value ? "text-[#6A2CFF] bg-[#F3EEFF]" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => { setSort(o.value); setShowSort(false); }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-1.5 shrink-0">
              {PRICE_FILTERS.map((pf, i) => (
                <button
                  key={i}
                  onClick={() => setPriceIdx(i)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    priceIdx === i
                      ? "bg-[#6A2CFF] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {pf.label}
                </button>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 shrink-0">
              {[0, 3, 4].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    minRating === r
                      ? "bg-amber-400 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {r === 0 ? "All Ratings" : `${r}★ & above`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 shrink-0 ml-auto bg-gray-100 rounded-full px-3.5 py-1.5 min-w-40">
              <Search size={13} strokeWidth={2} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="text-xs font-medium bg-transparent text-gray-700 placeholder-gray-400 outline-none w-full"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={12} strokeWidth={2.5} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="max-w-360 mx-auto px-4 md:px-8 py-10">
        <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
          {loading ? "Loading..." : `${filtered.length} products found`}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center">
              <Search size={28} strokeWidth={1.5} className="text-gray-300" />
            </div>
            <p className="text-lg font-black text-gray-900">No products found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
            <button
              onClick={() => { setActiveSubCat("All"); setPriceIdx(0); setMinRating(0); setSearch(""); }}
              className="px-6 py-2.5 rounded-full bg-[#6A2CFF] text-white text-sm font-bold hover:opacity-90 transition-opacity mt-1"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {visible.map((p) => (
                <div key={p.id} className="fade-in-up" style={{ animationDelay: `${(visible.indexOf(p) % 10) * 0.04}s` }}>
                  <ProductCard product={p} badge={config.badge} />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex flex-col items-center mt-12 gap-3">
                <p className="text-xs text-gray-400 font-medium">
                  Showing {visibleCount} of {filtered.length}
                </p>
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6A2CFF] rounded-full transition-all duration-500"
                    style={{ width: `${(visibleCount / filtered.length) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setVisibleCount((c) => c + 20)}
                  className="mt-2 px-8 py-3 rounded-full bg-gray-950 text-white text-sm font-bold hover:bg-[#6A2CFF] transition-all duration-300 flex items-center gap-2"
                >
                  Load More
                  <ChevronDown size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
