import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from './hooks/useProduct';
import mockData from './mockData.json';
import ProductGallery from './sections/ProductGallery';
import ProductInfo from './sections/ProductInfo';
import ProductTabs from './sections/ProductTabs';
import ProductReviews from './sections/ProductReviews';
import SimilarItems from './sections/SimilarItems';
import { FullPageSkeleton } from '../../components/LoadingSkeletons';
import ErrorBoundary from '../../components/ErrorBoundary';
import { AlertCircle } from 'lucide-react';

/**
 * ProductPage - Main product display component
 * Displays product details, gallery, reviews, and similar items
 */
function ProductPageContent() {
  // Get product ID from URL params
  const { productId } = useParams();
  const navigate = useNavigate();

  // Use productId from route params, fallback to demo ID
  const currentProductId = productId || '1307441';

  const {
    product,
    loading,
    error,
    selectedSize,
    selectedColor,
    quantity,
    cartLoading,
    updateSize,
    updateColor,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    clearError,
  } = useProduct(currentProductId);

  // Show loading state
  if (loading) {
    return <FullPageSkeleton />;
  }

  // Show error state
  if (error || !product) {
    return (
      <main className="w-full bg-light-grey min-h-screen flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-lg max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold mb-2 text-lg">Error loading product</p>
          <p className="text-gray-600 mb-6">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded transition"
          >
            Go Back Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-light-grey">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 bg-white">
        {/* Main product section */}
        <section className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_1fr] auto-rows-max">
          <ProductGallery images={product.images || []} />
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
            error={error}
            cartLoading={cartLoading}
            onSizeChange={updateSize}
            onColorChange={updateColor}
            onQuantityChange={updateQuantity}
            onIncrementQuantity={incrementQuantity}
            onDecrementQuantity={decrementQuantity}
            onAddToCart={addToCart}
            onClearError={clearError}
          />
        </section>

        {/* Additional sections */}
        <div className="mt-12 sm:mt-14 md:mt-16 space-y-12 sm:space-y-14 md:space-y-16">
          <ProductTabs 
            specifications={product.specifications || []} 
            description={product.description || 'No description available'}
          />
          <ProductReviews 
            rating={product.rating || 0} 
            reviews={mockData.reviews || []} 
          />
          <SimilarItems 
            products={mockData.similarProducts || []} 
          />
        </div>
      </div>
    </main>
  );
}

/**
 * ProductPage with Error Boundary
 */
export default function ProductPage() {
  return (
    <ErrorBoundary>
      <ProductPageContent />
    </ErrorBoundary>
  );
}