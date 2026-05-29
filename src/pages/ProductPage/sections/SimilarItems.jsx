import { useCallback, useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CONSTANTS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

/**
 * SimilarItems Component
 * Displays similar/related products
 */
export default function SimilarItems({ products = [] }) {
  const navigate = useNavigate();
  const [thumbStart, setThumbStart] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handle product click - navigate to product page
   */
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  /**
   * Handle image loading error
   */
  const handleImageError = useCallback((event) => {
    event.target.src = PRODUCT_CONSTANTS.IMAGE_PLACEHOLDER;
  }, []);

  const displayProducts = useMemo(() => {
    return products && products.length > 0 ? products : [];
  }, [products]);

  // Show 4 cards on mobile, 5 on desktop
  const visibleThumbnails = isMobile ? 4 : PRODUCT_CONSTANTS.THUMBNAIL_COUNT;
  const maxStartIndex = Math.max(displayProducts.length - visibleThumbnails, 0);

  const thumbnails = useMemo(() => {
    return displayProducts.slice(thumbStart, thumbStart + visibleThumbnails);
  }, [displayProducts, thumbStart, visibleThumbnails]);

  const shiftThumbs = useCallback(
    (direction) => {
      setThumbStart((prev) => {
        if (direction === 'prev') {
          return Math.max(prev - 1, 0);
        }
        return Math.min(prev + 1, maxStartIndex);
      });
    },
    [maxStartIndex]
  );


  return (
    <section aria-label="Similar items" className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-black">Similar Items</h2>
      {displayProducts.length === 0 ? (
        <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-6 sm:p-8 text-center">
          <p className="text-gray-500\">No similar products available</p>
        </div>
      ) : (
        <>
          <div className="relative flex items-center w-full">
            <div className="flex-1 flex gap-2 sm:gap-3 md:gap-4 overflow-hidden">
              {thumbnails.map((product, index) => {
                const absoluteIndex = thumbStart + index;

                return (
                  <button
                    key={`${product.id ?? product.name}-${absoluteIndex}`}
                    type="button"
                    onClick={() => {
                      handleProductClick(product);
                    }}
                    className="group flex-1 min-w-0 rounded-lg border-2 overflow-hidden transition bg-white hover:shadow-md"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleProductClick(product);
                      }
                    }}
                    aria-label={`View ${product.name}`}
                  >
                    <div className="relative bg-light-grey overflow-hidden">
                      <div className="aspect-[3/4] w-full">
                        <img
                          src={product.image || PRODUCT_CONSTANTS.IMAGE_PLACEHOLDER}
                          alt={`${product.name}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition"
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <Heart size={18} className="sm:w-5 sm:h-5" />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-2 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold line-clamp-1">
                        {product.brand}
                      </div>
                    </div>

                    <div className="p-2 sm:p-2.5 md:p-3 space-y-1 sm:space-y-2 text-center">
                      <p className="text-xs sm:text-sm font-semibold text-black line-clamp-2 group-hover:text-purple-500 transition">
                        {product.name}
                      </p>
                      <div className="space-y-0.5 sm:space-y-1">
                        <p className="text-xs sm:text-sm md:text-base font-bold text-black">
                          {formatCurrency(product.price)}
                        </p>
                        {product.originalPrice && (
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <span className="text-xs line-through text-gray-500">
                              {formatCurrency(product.originalPrice)}
                            </span>
                            <span className="text-xs font-bold text-green-600">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-2.5 md:-translate-x-3 rounded-lg border border-gray-300 p-1 sm:p-1.5 md:p-2 text-black hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-md z-10"
              onClick={() => shiftThumbs('prev')}
              aria-label="Scroll similar items left"
              disabled={thumbStart === 0}
            >
              <ChevronLeft size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>

            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-2.5 md:translate-x-3 rounded-lg border border-gray-300 p-1 sm:p-1.5 md:p-2 text-black hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-md z-10"
              onClick={() => shiftThumbs('next')}
              aria-label="Scroll similar items right"
              disabled={thumbStart === maxStartIndex}
            >
              <ChevronRight size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {displayProducts.length > PRODUCT_CONSTANTS.SIMILAR_ITEMS_COUNT && (
            <div className="flex justify-center pt-4">
              <button
                className="px-6 py-2 border border-purple-500 text-purple-500 font-semibold rounded hover:bg-purple-50 transition"
                aria-label="View all similar products"
              >
                View All Similar Products
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
