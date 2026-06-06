import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function CategoryProductSection({
  title,
  titleAccent,
  subtitle,
  accentColor = "#6A2CFF",
  bg = "#F9F8FF",
  apiUrl,
  headerImages,
  darkMode = false,
  bgImage,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [apiUrl]);

  const visible = expanded ? products : products.slice(0, 4);
  const textColor = darkMode ? "white" : "#111";

  return (
    <section
      className={`py-12${bgImage ? " relative overflow-hidden" : ""}`}
      style={{ background: bg }}
    >
      <style>{`
        @keyframes cpsSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cps-extra { animation: cpsSlideUp 0.35s ease both; }
      `}</style>

      {bgImage && (
        <div className="absolute inset-0 opacity-[0.06]">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`${bgImage ? "relative " : ""}max-w-360 mx-auto px-4 md:px-8`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: accentColor }}
            >
              {subtitle}
            </p>
            <h2
              className="text-3xl md:text-5xl font-black tracking-tight leading-none"
              style={{ color: textColor }}
            >
              {title}{" "}
              <em className="not-italic" style={{ color: accentColor }}>
                {titleAccent}
              </em>
            </h2>
          </div>

          {headerImages?.length > 0 && (
            <div className="hidden md:flex gap-3">
              {headerImages.map((src, i) => (
                <div
                  key={i}
                  className="w-20 h-28 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl animate-pulse"
                style={{
                  aspectRatio: "3/4",
                  background: darkMode ? "rgba(255,255,255,0.08)" : "#E5E7EB",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {visible.map((product, i) => (
              <div
                key={product.id}
                className={i >= 4 ? "cps-extra" : ""}
                style={i >= 4 ? { animationDelay: `${(i - 4) * 0.06}s` } : {}}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* View All / Show Less */}
        {!loading && products.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: expanded ? "transparent" : accentColor,
                color: expanded ? accentColor : "white",
                border: `2px solid ${accentColor}`,
                boxShadow: expanded ? "none" : `0 6px 24px ${accentColor}40`,
              }}
            >
              {expanded ? "Show Less" : "View All →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
