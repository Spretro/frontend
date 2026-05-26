import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  SlidersHorizontal, ChevronDown, X, Search as SearchIcon,
  Check, Star, ShoppingBag, ArrowUpDown,
} from "lucide-react";
import ProductCard from "../../components/shared/ProductCard";

/* ── constants ─────────────────────────────────────────────── */
const MAX_INR = 50000;
const toINR = (usd) => Math.round(usd * 83);

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Highest Discount", value: "discount" },
];

const DISCOUNT_OPTIONS = [
  { label: "10% and above", min: 10 },
  { label: "20% and above", min: 20 },
  { label: "30% and above", min: 30 },
  { label: "50% and above", min: 50 },
];

/* ── reusable filter sub-components (defined at module level) ─ */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4 px-5">
      <button
        className="flex items-center justify-between w-full text-left group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs font-black uppercase tracking-widest text-gray-800 group-hover:text-[#6A2CFF] transition-colors">
          {title}
        </span>
        <ChevronDown size={15} strokeWidth={2.5} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function CheckItem({ label, count, checked, onToggle }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div
        className={`size-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
          checked ? "bg-[#6A2CFF] border-[#6A2CFF]" : "border-gray-300 group-hover:border-[#6A2CFF]"
        }`}
        onClick={onToggle}
      >
        {checked && <Check size={9} strokeWidth={3.5} className="text-white" />}
      </div>
      <span className="text-sm text-gray-700 flex-1 leading-tight capitalize group-hover:text-gray-900 transition-colors" onClick={onToggle}>
        {label.replace(/-/g, " ")}
      </span>
      {count != null && <span className="text-[11px] text-gray-400 font-medium shrink-0">({count})</span>}
    </label>
  );
}

function DualRangeSlider({ min, max, setMin, setMax }) {
  const minPct = (min / MAX_INR) * 100;
  const maxPct = (max / MAX_INR) * 100;
  return (
    <div>
      <div className="relative h-5 flex items-center mb-3">
        <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
        <div className="absolute h-1 bg-[#6A2CFF] rounded-full" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />
        <input type="range" min={0} max={MAX_INR} step={500} value={min}
          onChange={(e) => setMin(Math.min(+e.target.value, max - 500))}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: min > MAX_INR - 1000 ? 5 : 3 }}
        />
        <input type="range" min={0} max={MAX_INR} step={500} value={max}
          onChange={(e) => setMax(Math.max(+e.target.value, min + 500))}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Min</p>
          <p className="text-sm font-black text-gray-900">₹{min.toLocaleString("en-IN")}</p>
        </div>
        <div className="w-4 h-px bg-gray-300" />
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Max</p>
          <p className="text-sm font-black text-gray-900">₹{max.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white animate-pulse">
      <div className="bg-gray-100" style={{ aspectRatio: "3/4" }} />
      <div className="p-3.5 space-y-2">
        <div className="h-2 bg-gray-100 rounded-full w-1/3" />
        <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-9 bg-gray-100 rounded-xl mt-2" />
      </div>
    </div>
  );
}

/* ── route-level wrapper (key = query → fresh remount per search) */
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  return <SearchInner key={query} query={query} />;
}

/* ── actual page with all state ─────────────────────────────── */
function SearchInner({ query }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("relevance");
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(MAX_INR);
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const [inlineSearch, setInlineSearch] = useState(query);

  /* fetch — component remounts on query change so no sync setState needed */
  useEffect(() => {
    const url = query
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=100&select=id,title,price,discountPercentage,thumbnail,brand,rating,category`
      : `https://dummyjson.com/products?limit=100&select=id,title,price,discountPercentage,thumbnail,brand,rating,category`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setProducts(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  /* derived option lists (from full unfiltered set) */
  const allCats = useMemo(() => {
    const m = {};
    products.forEach((p) => { const c = p.category || "other"; m[c] = (m[c] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const allBrands = useMemo(() => {
    const m = {};
    products.forEach((p) => { const b = p.brand || "Unknown"; m[b] = (m[b] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [products]);

  const filteredBrandList = useMemo(() =>
    brandSearch ? allBrands.filter(([b]) => b.toLowerCase().includes(brandSearch.toLowerCase())) : allBrands,
    [allBrands, brandSearch]
  );

  /* filtered + sorted results */
  const filtered = useMemo(() => {
    let items = [...products];
    if (selectedCats.length) items = items.filter((p) => selectedCats.includes(p.category));
    if (selectedBrands.length) items = items.filter((p) => selectedBrands.includes(p.brand));
    items = items.filter((p) => { const inr = toINR(p.price); return inr >= priceMin && inr <= priceMax; });
    if (minDiscount > 0) items = items.filter((p) => p.discountPercentage >= minDiscount);
    if (minRating > 0) items = items.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price_asc": items.sort((a, b) => a.price - b.price); break;
      case "price_desc": items.sort((a, b) => b.price - a.price); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
      case "discount": items.sort((a, b) => b.discountPercentage - a.discountPercentage); break;
    }
    return items;
  }, [products, selectedCats, selectedBrands, priceMin, priceMax, minDiscount, minRating, sort]);

  const visible = filtered.slice(0, visibleCount);

  /* helpers */
  const toggleCat = useCallback((c) => setSelectedCats((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]), []);
  const toggleBrand = useCallback((b) => setSelectedBrands((p) => p.includes(b) ? p.filter((x) => x !== b) : [...p, b]), []);
  const clearAll = () => { setSelectedCats([]); setSelectedBrands([]); setPriceMin(0); setPriceMax(MAX_INR); setMinDiscount(0); setMinRating(0); };

  const activeCount = selectedCats.length + selectedBrands.length
    + (priceMin > 0 || priceMax < MAX_INR ? 1 : 0)
    + (minDiscount > 0 ? 1 : 0) + (minRating > 0 ? 1 : 0);

  const chips = [
    ...selectedCats.map((c) => ({ label: c.replace(/-/g, " "), remove: () => toggleCat(c) })),
    ...selectedBrands.map((b) => ({ label: b, remove: () => toggleBrand(b) })),
    ...(priceMin > 0 || priceMax < MAX_INR ? [{ label: `₹${priceMin.toLocaleString("en-IN")} – ₹${priceMax.toLocaleString("en-IN")}`, remove: () => { setPriceMin(0); setPriceMax(MAX_INR); } }] : []),
    ...(minDiscount > 0 ? [{ label: `${minDiscount}%+ Off`, remove: () => setMinDiscount(0) }] : []),
    ...(minRating > 0 ? [{ label: `${minRating}★ & above`, remove: () => setMinRating(0) }] : []),
  ];

  const handleInlineSearch = () => {
    const q = inlineSearch.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  /* sidebar JSX stored as variable (avoids "component during render" error) */
  const sidebarJSX = (
    <>
      <style>{`
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#6A2CFF;cursor:pointer;border:2px solid white;box-shadow:0 2px 8px rgba(106,44,255,0.4);}
        input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#6A2CFF;cursor:pointer;border:2px solid white;}
      `}</style>

      {/* Sidebar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} strokeWidth={2} className="text-[#6A2CFF]" />
          <span className="text-sm font-black uppercase tracking-widest text-gray-900">Filters</span>
          {activeCount > 0 && (
            <span className="size-5 rounded-full bg-[#6A2CFF] text-white text-[10px] font-black flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-black text-rose-500 hover:text-rose-600 uppercase tracking-wider">
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="space-y-0.5">
          {(showAllCats ? allCats : allCats.slice(0, 8)).map(([cat, count]) => (
            <CheckItem key={cat} label={cat} count={count} checked={selectedCats.includes(cat)} onToggle={() => toggleCat(cat)} />
          ))}
        </div>
        {allCats.length > 8 && (
          <button onClick={() => setShowAllCats((s) => !s)} className="mt-2 text-xs font-bold text-[#6A2CFF] hover:opacity-70">
            {showAllCats ? "Show less ▲" : `+ ${allCats.length - 8} more`}
          </button>
        )}
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 mb-3">
          <SearchIcon size={13} strokeWidth={2} className="text-gray-400 shrink-0" />
          <input value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="Search brands..." className="text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full" />
          {brandSearch && <button onClick={() => setBrandSearch("")}><X size={12} className="text-gray-400" /></button>}
        </div>
        <div className="space-y-0.5 max-h-48 overflow-y-auto scrollbar-hide">
          {(showAllBrands ? filteredBrandList : filteredBrandList.slice(0, 8)).map(([brand, count]) => (
            <CheckItem key={brand} label={brand} count={count} checked={selectedBrands.includes(brand)} onToggle={() => toggleBrand(brand)} />
          ))}
        </div>
        {filteredBrandList.length > 8 && !showAllBrands && (
          <button onClick={() => setShowAllBrands(true)} className="mt-2 text-xs font-bold text-[#6A2CFF] hover:opacity-70">
            + {filteredBrandList.length - 8} more
          </button>
        )}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <DualRangeSlider min={priceMin} max={priceMax} setMin={setPriceMin} setMax={setPriceMax} />
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount" defaultOpen={false}>
        <div className="space-y-1">
          <CheckItem label="Any discount" checked={minDiscount === 0} onToggle={() => setMinDiscount(0)} />
          {DISCOUNT_OPTIONS.map((d) => (
            <CheckItem key={d.min} label={d.label} checked={minDiscount === d.min} onToggle={() => setMinDiscount(d.min)} />
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating" defaultOpen={false}>
        <div className="space-y-1">
          {[0, 4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => setMinRating(r)}>
              <div className={`size-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${minRating === r ? "bg-[#6A2CFF] border-[#6A2CFF]" : "border-gray-300 group-hover:border-[#6A2CFF]"}`}>
                {minRating === r && <Check size={9} strokeWidth={3.5} className="text-white" />}
              </div>
              {r === 0 ? (
                <span className="text-sm text-gray-700">All Ratings</span>
              ) : (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={11} className={n <= r ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                  ))}
                  <span className="text-sm text-gray-700 ml-0.5">& above</span>
                </div>
              )}
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <main style={{ background: "#F9F8FF", minHeight: "100vh" }}>

      {/* Search header */}
      <div className="bg-white border-b border-gray-100" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-360 mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="flex-1 min-w-0">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
              <a href="/" className="hover:text-[#6A2CFF] transition-colors">Home</a>
              <span>/</span>
              <span className="text-gray-600">Search</span>
              {query && <><span>/</span><span className="text-[#6A2CFF] font-bold truncate max-w-32">"{query}"</span></>}
            </nav>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-xl md:text-2xl font-black text-gray-900">
                {query ? <>Results for <em className="not-italic text-[#6A2CFF]">"{query}"</em></> : "All Products"}
              </h1>
              {!loading && (
                <span className="text-sm text-gray-400 font-semibold">{filtered.length.toLocaleString()} items</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 hover:border-[#6A2CFF] hover:bg-white transition-all md:w-80">
            <SearchIcon size={17} strokeWidth={2} className="text-gray-400 shrink-0 cursor-pointer hover:text-[#6A2CFF] transition-colors" onClick={handleInlineSearch} />
            <input
              value={inlineSearch}
              onChange={(e) => setInlineSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInlineSearch()}
              placeholder="Search products, brands..."
              className="flex-1 min-w-0 text-sm font-medium bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
            {inlineSearch && <button onClick={() => setInlineSearch("")}><X size={14} strokeWidth={2.5} className="text-gray-400 hover:text-gray-600" /></button>}
          </div>
        </div>
      </div>

      <div className="max-w-360 mx-auto px-4 md:px-8 py-6 flex gap-5 items-start">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-[200px] bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          {sidebarJSX}
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
            <aside className="relative w-72 max-h-screen bg-white overflow-y-auto z-10">
              <button onClick={() => setDrawerOpen(false)} className="absolute top-4 right-4 size-8 rounded-full bg-gray-100 flex items-center justify-center z-10">
                <X size={15} strokeWidth={2.5} className="text-gray-600" />
              </button>
              {sidebarJSX}
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="bg-white rounded-2xl px-4 md:px-5 py-3.5 mb-4 flex flex-col gap-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#6A2CFF] hover:text-[#6A2CFF] transition-colors"
              >
                <SlidersHorizontal size={13} strokeWidth={2} />
                Filters
                {activeCount > 0 && <span className="size-4 rounded-full bg-[#6A2CFF] text-white text-[9px] font-black flex items-center justify-center">{activeCount}</span>}
              </button>
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                <ArrowUpDown size={14} strokeWidth={2} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort:</span>
              </div>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    sort === opt.value ? "bg-[#6A2CFF] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {chips.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Applied:</span>
                {chips.map((chip, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-[#F3EEFF] text-[#6A2CFF] text-xs font-bold px-2.5 py-1 rounded-full capitalize">
                    {chip.label}
                    <button onClick={chip.remove} className="hover:opacity-60 transition-opacity"><X size={10} strokeWidth={3} /></button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-xs font-bold text-rose-500 hover:opacity-70 ml-1">Clear all</button>
              </div>
            )}
          </div>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            {loading ? "Fetching results..." : `${filtered.length} products found`}
          </p>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 gap-4 bg-white rounded-3xl">
              <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center">
                <SearchIcon size={28} strokeWidth={1.5} className="text-gray-300" />
              </div>
              <p className="text-lg font-black text-gray-900">No results found</p>
              <p className="text-sm text-gray-400 text-center max-w-xs">
                {query ? `We couldn't find anything for "${query}". Try different keywords.` : "Try adjusting your filters."}
              </p>
              <button onClick={clearAll} className="px-6 py-2.5 rounded-full bg-[#6A2CFF] text-white text-sm font-bold hover:opacity-90 transition-opacity">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {visible.map((p, idx) => (
                  <div key={p.id} className="fade-in-up" style={{ animationDelay: `${(idx % 8) * 0.04}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="flex flex-col items-center mt-10 gap-3">
                  <p className="text-xs text-gray-400 font-medium">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                  </p>
                  <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6A2CFF] rounded-full transition-all duration-500" style={{ width: `${(Math.min(visibleCount, filtered.length) / filtered.length) * 100}%` }} />
                  </div>
                  <button
                    onClick={() => setVisibleCount((c) => c + 24)}
                    className="mt-2 px-8 py-3 rounded-full bg-gray-950 text-white text-sm font-bold hover:bg-[#6A2CFF] transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingBag size={15} strokeWidth={2} />
                    Load More
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
