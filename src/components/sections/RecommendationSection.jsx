import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateDiscount,
  formatCurrency,
  IMAGE_PLACEHOLDER,
} from "../../lib/productUtils";
import { mockRecommendations } from "../../data/mockProduct";

function ProductCard({ product, onNavigate, onImageError, onAddToCart }) {
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EEE8FF] bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(106,44,255,0.07)" }}
    >
      <button
        type="button"
        onClick={() => onNavigate(`/product/${product.id}`)}
        className="flex flex-1 flex-col text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A2CFF]"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={product.image || IMAGE_PLACEHOLDER}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={onImageError}
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
              {discount}% OFF
            </span>
          )}
          <span
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-gray-500 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100"
            aria-hidden="true"
          >
            <Heart size={14} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <p className="mb-1 truncate text-[10px] font-black uppercase tracking-widest text-[#6A2CFF]">
            {product.brand || "SPRETRO"}
          </p>
          <h3 className="line-clamp-2 text-sm font-black leading-snug text-gray-900">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-gray-400">
              {product.rating?.toFixed?.(1) || product.rating || "New"}
              {product.reviewCount ? ` (${product.reviewCount})` : ""}
            </span>
          </div>
          <div className="mt-auto pt-3">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-base font-black text-gray-950">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-medium text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
      <div className="border-t border-gray-100 p-3 pt-0 sm:p-4 sm:pt-0">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-3 text-xs font-black tracking-wide text-white transition-all duration-200 hover:bg-[#6A2CFF] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function RecommendationSection({ productBrand = "" }) {
  const navigate = useNavigate();
  const [columnCount, setColumnCount] = useState(5);

  const handleImageError = (event) => {
    event.currentTarget.src = IMAGE_PLACEHOLDER;
  };

  const handleRecommendationAddToCart = (product) => {
    // MOCK DATA START
    //   // TODO(BACKEND): Replace with POST /cart/items for recommendation cards.
    console.info("Mock recommendation add to cart", product.id);
    // MOCK DATA END
  };

  useEffect(() => {
    const getColumnCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) return 5;
      if (width >= 1024) return 4;
      if (width >= 768) return 3;
      if (width >= 420) return 2;
      return 1;
    };

    const updateColumns = () => {
      setColumnCount(getColumnCount());
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const getVisibleCount = (index) => {
    if (columnCount >= 5) return index === 0 ? 10 : 5;
    if (columnCount === 4) return index === 0 ? 8 : 4;
    if (columnCount === 3) return index === 0 ? 9 : 6;
    if (columnCount === 2) return index === 0 ? 8 : 6;
    return index === 0 ? 6 : 4;
  };

  const recommendationSections = [
    {
      title: "More From The Same Label",
      eyebrow: productBrand || "Brand picks",
      products: mockRecommendations.sameBrandProducts || [],
    },
    {
      title: "Your Digital Wardrobe Blueprint",
      eyebrow: "AI Stylist's Choice",
      products: mockRecommendations.similarProducts || [],
    },
    {
      title: "Great Minds Dress Alike",
      eyebrow: "Popular picks",
      products: mockRecommendations.customersAlsoLike || [],
    },
    {
      title: "Exclusive picks, chosen just for you",
      eyebrow: "The Spretro Seal of Style",
      products: mockRecommendations.recommendedBySpretro || [],
    },
  ];

  return (
    <div className="space-y-14">
      {recommendationSections.map((section, index) => {
        const sectionId = section.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-");
        const visibleCount = getVisibleCount(index);
        const visibleProducts = section.products.slice(0, visibleCount);

        return (
          <section
            key={section.title}
            aria-labelledby={sectionId}
            className="space-y-5 pb-4 md:space-y-6 md:pb-6"
          >
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6A2CFF]">
                  {section.eyebrow}
                </p>
                <h2
                  id={sectionId}
                  className="text-2xl font-black text-gray-950 md:text-3xl"
                >
                  {section.title}
                </h2>
              </div>
              {section.products.length > 4 && (
                <button
                  type="button"
                  className="hidden text-xs font-black uppercase tracking-[0.2em] text-[#6A2CFF] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 sm:inline-flex"
                >
                  View All
                </button>
              )}
            </div>

            {visibleProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm font-bold text-gray-500">
                No similar products available.
              </div>
            ) : (
              <div className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={navigate}
                    onImageError={handleImageError}
                    onAddToCart={handleRecommendationAddToCart}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
