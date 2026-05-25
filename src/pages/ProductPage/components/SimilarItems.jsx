import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CONSTANTS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

/**
 * SimilarItems Component
 * Displays similar/related products
 */
export default function SimilarItems({ products = [] }) {
  const navigate = useNavigate();

  /**
   * Handle product click - navigate to product page
   */
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  /**
   * Handle add to cart with event bubbling prevention
   */
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log('✓ Added to cart:', product.name);
    // TODO: Implement actual cart functionality
  };

  const displayProducts = products && products.length > 0 ? products : [];

  if (displayProducts.length === 0) {
    return (
      <section aria-label="Similar items" className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black">Similar Items</h2>
        <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-6 sm:p-8 text-center">
          <p className="text-gray-500">No similar products available</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Similar items" className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-black">Similar Items</h2>
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {displayProducts.slice(0, PRODUCT_CONSTANTS.SIMILAR_ITEMS_COUNT).map((product) => (
          <div
            key={`similar-${product.id}`}
            onClick={() => handleProductClick(product)}
            className="group bg-white overflow-hidden hover:shadow-lg hover:border-purple-500/50 transition cursor-pointer"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleProductClick(product);
            }}
            aria-label={`View ${product.name} product`}
          >
            {/* Product image */}
            <div className="aspect-[4/5] w-full bg-light-grey overflow-hidden relative">
              <img
                src={product.image || 'https://via.placeholder.com/300x400?text=Product'}
                alt={product.name}
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 lazy-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=Product';
                }}
              />

              {/* Quick add to cart button */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
                aria-label={`Quick add ${product.name} to cart`}
              >
                <ShoppingCart size={16} />
              </button>
            </div>

            {/* Product details */}
            <div className="p-2 sm:p-3 space-y-1.5">
              <p className="text-xs sm:text-sm font-semibold text-black line-clamp-2 group-hover:text-purple-500 transition">
                {product.name}
              </p>

              {/* Price */}
              <p className="text-xs sm:text-sm font-bold text-black">
                {formatCurrency(product.price)}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < (product.rating || 0)
                          ? 'fill-brand-orange text-brand-orange'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews || 0})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all similar products button */}
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
    </section>
  );
}
