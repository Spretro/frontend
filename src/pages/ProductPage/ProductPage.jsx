import { AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { FullPageSkeleton } from "../../components/LoadingSkeletons";
import { mockReviews } from "../../data/mockProduct";
import { useProduct } from "../../hooks/useProduct";
import ProductGallery from "../../components/sections/ProductGallery";
import ProductInfo from "../../components/sections/ProductInfo";
import ProductReviews from "../../components/sections/ProductReviews";
import ProductTabs from "../../components/sections/ProductTabs";
import RecommendationSection from "../../components/sections/RecommendationSection";
import "./ProductPage.css";

function ProductPageContent() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const currentProductId = productId || "1307441";

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

  if (loading) {
    return <FullPageSkeleton />;
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#F9F8FF] px-4">
        <div
          className="max-w-md rounded-3xl border border-[#EEE8FF] bg-white p-8 text-center"
          style={{ boxShadow: "0 12px 40px rgba(106,44,255,0.12)" }}
        >
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-rose-500" />
          <h1 className="mb-2 text-lg font-black text-gray-950">
            Error loading product
          </h1>
          <p className="mb-6 text-sm font-medium text-gray-500">
            {error || "Product not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-[#6A2CFF] px-6 py-2.5 text-sm font-black text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-95"
          >
            Go Back Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden bg-[#F9F8FF]">
      <div className="mx-auto max-w-[90rem] overflow-x-hidden px-3 py-4 sm:px-4 md:px-8 md:py-8">
        <section
          aria-labelledby="product-title"
          className="grid min-w-0 gap-5 rounded-3xl border border-[#EEE8FF] bg-white p-3 sm:p-4 md:gap-8 md:p-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]"
          style={{ boxShadow: "0 2px 16px rgba(106,44,255,0.07)" }}
        >
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

        <div className="mt-8 space-y-8 md:mt-10 md:space-y-10">
          <ProductTabs
            specifications={product.specifications || []}
            description={product.description || "No description available"}
          />
          <ProductReviews
            rating={product.rating || 0}
            reviewCount={product.reviewCount || 0}
            reviews={mockReviews}
          />
          <RecommendationSection productBrand={product.brand} />
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <ErrorBoundary>
      <ProductPageContent />
    </ErrorBoundary>
  );
}
