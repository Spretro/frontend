import { useNavigate } from "react-router-dom";

const categories = [
  { label: "For You",     image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&q=80", ring: "#EC4899", path: "/" },
  { label: "Women",       image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80", ring: "#F43F5E", path: "/women" },
  { label: "Men",         image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80", ring: "#3B82F6", path: "/men" },
  { label: "Beauty",      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80", ring: "#EC4899", path: "/category/beauty" },
  { label: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&q=80", ring: "#F59E0B", path: "/category/watches" },
  { label: "Footwear",    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", ring: "#10B981", path: "/category/sneakers" },
  { label: "Home",        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80", ring: "#6366F1", path: "/brands" },
  { label: "Jewellery",   image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80", ring: "#F59E0B", path: "/category/jewellery" },
  { label: "Gifting",     image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=300&q=80", ring: "#EF4444", path: "/sale" },
  { label: "Sport",       image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80", ring: "#6A2CFF", path: "/category/topwear" },
];

export default function ShopByCategory() {
  const navigate = useNavigate();
  
  return (
    <section className="py-10 md:py-12" style={{ background: "#FFFFFF" }}>
      <div className="max-w-360 mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 fade-in">
          <div>
            <p className="section-label mb-1">Browse</p>
            <h2 className="section-heading text-gray-900">
              <span className="text-gray-900">Shop by </span>
              <span className="inline-block" style={{ color: "#6A2CFF" }}>
                Category
              </span>
            </h2>
          </div>
          <button className="hidden md:flex text-sm font-bold text-[#6A2CFF] hover:underline items-center gap-1 mb-1">
            All Categories
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category circles */}
        <div className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2.5 shrink-0 cursor-pointer group fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => navigate(cat.path)}
            >
              {/* Ring + circle container */}
              <div className="relative p-0.5 rounded-full transition-all duration-300"
                style={{ background: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* Default ring (always visible, subtle) */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-0 transition-opacity duration-300"
                  style={{ background: "transparent", padding: "2px" }}
                />
                <div
                  className="relative size-20 md:size-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                  style={{ boxShadow: `0 4px 16px ${cat.ring}22` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 8px 32px ${cat.ring}55`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = `0 4px 16px ${cat.ring}22`)
                  }
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-400"
                  />
                  {/* Subtle tint overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ background: "transparent" }}
                  />
                </div>
              </div>
              <span
                className="text-[11px] md:text-xs font-bold whitespace-nowrap transition-colors duration-300 group-hover:text-[#6A2CFF]"
                style={{ color: "#374151" }}
              >
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
