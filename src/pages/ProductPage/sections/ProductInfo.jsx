import {
  Ruler,
  Palette,
  Plus,
  Minus,
  AlertCircle,
  BadgePercent,
  ShieldCheck,
  CheckCircle,
  Gift,
  RotateCw
} from "lucide-react";
import { PRODUCT_CONSTANTS } from "../../../utils/constants";
import { calculateDiscount, formatCurrency } from "../../../utils/helpers";

/**
 * ProductInfo Component
 * Displays product details, pricing, and purchase options
 */
export default function ProductInfo({
  product = {},
  selectedSize = null,
  selectedColor = null,
  quantity = 1,
  error = null,
  cartLoading = false,
  onSizeChange = () => {},
  onColorChange = () => {},
  onQuantityChange = () => {},
  onIncrementQuantity = () => {},
  onDecrementQuantity = () => {},
  onAddToCart = () => {},
  onClearError = () => {},
}) {
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <section
      aria-label="Product info"
      className="w-full space-y-4 sm:space-y-6"
    >
      {/* Product header */}
      <div className="space-y-1 sm:space-y-2">
        <p className="text-xs sm:text-xs font-semibold tracking-wide text-gray-500 uppercase">
          {product.brand || "Brand Name"}
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">
          {product.name || "Product Name"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          {product.description || "Product description"}
        </p>
      </div>

      {/* Pricing section */}
      <div className="border-t border-gray-200 pt-3 sm:pt-4">
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {formatCurrency(product.price || 0)}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-sm font-semibold text-white">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs sm:text-sm text-gray-500">
            MRP:
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Size selector */}
      <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Ruler size={24} className="text-purple-500" />
            <label className="text-base sm:text-lg md:text-xl font-semibold text-black">
              Size
            </label>
          </div>
          <button
            className="text-xs sm:text-sm text-purple-500 hover:text-purple-600 font-medium transition"
            aria-label="Open size guide"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded border-2 text-xs sm:text-sm md:text-base font-semibold transition ${
                selectedSize === size
                  ? "border-purple-500 bg-purple-50 text-purple-600"
                  : "border-gray-300 text-black hover:border-purple-500 hover:bg-purple-50"
              }`}
              aria-pressed={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color selector */}
      <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
        <div className="flex items-center gap-2">
          <Palette size={24} className="text-purple-500" />
          <label className="text-sm sm:text-base font-semibold text-black">
            Color
          </label>
        </div>
        <div className="flex gap-3 flex-wrap py-4">
          {(
            product.colors || [
              { name: "Stone", hex: "#A7A49E" },
              { name: "Slate", hex: "#708090" },
              { name: "Amber", hex: "#FFBF00" },
            ]
          ).map((c) => (
            <button
              key={c.name}
              onClick={() => onColorChange(c.name)}
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 transition ${
                selectedColor === c.name
                  ? "border-purple-500 ring-2 ring-purple-300"
                  : "border-gray-300 hover:border-purple-500"
              }`}
              style={{ backgroundColor: c.hex || "transparent" }}
              title={c.name}
              aria-label={`Select color ${c.name}`}
              aria-pressed={selectedColor === c.name}
            />
          ))}
        </div>
      </div>

      {/* Best Offers section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgePercent size={27} className="text-purple-500" />
            <p className="text-sm sm:text-base font-semibold text-black">
              Best Offers
            </p>
          </div>
          <button className="text-xs sm:text-sm text-purple-500 hover:text-purple-600 font-medium transition">
            View all
          </button>
        </div>
        <div className="grid gap-3 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(
            product.offers || [
              {
                title: "Cashback",
                body: "Upto ₹9.00 cashback with select wallets",
                count: "1 offer",
              },
              {
                title: "Bank Offer",
                body: "Upto ₹25.00 off with select cards",
                count: "29 offers",
              },
              {
                title: "Partner Offers",
                body: "Buy 2+ items and get 3% off",
                count: "2 offers",
              },
            ]
          ).map((offer) => (
            <div
              key={offer.title}
              className="rounded border border-gray-300 bg-white p-3 sm:p-3 hover:border-purple-500 hover:shadow-md transition"
            >
              <p className="text-sm sm:text-sm font-bold text-black">
                {offer.title}
              </p>
              <p className="mt-2 text-xs sm:text-xs leading-5 text-gray-600">
                {offer.body}
              </p>
              <button className="mt-3 text-xs sm:text-xs font-semibold text-purple-500 hover:text-purple-600 transition">
                {offer.count}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity selector */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm sm:text-base font-semibold text-black">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={onDecrementQuantity}
            className="h-10 w-10 rounded border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50"
            aria-label="Decrease quantity"
            disabled={quantity <= PRODUCT_CONSTANTS.MIN_QUANTITY}
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
            min={PRODUCT_CONSTANTS.MIN_QUANTITY}
            max={PRODUCT_CONSTANTS.MAX_QUANTITY}
            className="h-10 w-16 rounded border border-gray-300 text-center font-semibold focus:border-purple-500 focus:outline-none"
            aria-label="Product quantity"
          />
          <button
            onClick={onIncrementQuantity}
            className="h-10 w-10 rounded border border-gray-300 flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50"
            aria-label="Increase quantity"
            disabled={quantity >= PRODUCT_CONSTANTS.MAX_QUANTITY}
          >
            <Plus size={16} />
          </button>
          <span className="text-xs text-gray-500">
            Max: {PRODUCT_CONSTANTS.MAX_QUANTITY}
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded border border-brand-red bg-red-50 p-3 text-sm text-brand-red flex items-start gap-2">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <button
              onClick={onClearError}
              className="text-xs text-brand-red hover:underline mt-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 sm:gap-3 pt-2">
        <button
          className="flex-1 rounded border-2 border-purple-500 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-purple-500 hover:bg-purple-50 active:scale-95 transition disabled:opacity-50"
          disabled={cartLoading}
        >
          Buy Now
        </button>
        <button
          onClick={onAddToCart}
          disabled={cartLoading || !selectedSize || !selectedColor}
          className="flex-1 rounded bg-purple-500 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white hover:bg-purple-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cartLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid gap-1 sm:gap-2 md:gap-4 grid-cols-4 py-3 sm:py-4 md:py-6">
        {[
          { icon: ShieldCheck, label: "Secure\nPayments" },
          { icon: CheckCircle, label: "Genuine\nProduct" },
          { icon: Gift, label: "Try & Buy" },
          { icon: RotateCw, label: "7 Day\nReturn" },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 text-center "
            >
              <div className="bg-gray-100 p-3 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
                <IconComponent
                  size={22}
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-[10px] sm:text-[9px] md:text-[10px] font-semibold text-black leading-tight break-words">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Product details */}
      <div className="space-y-3 sm:space-y-4 border border-gray-300 pt-4 p-6 rounded-lg">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Product Code
            </p>
            <p className="text-sm font-semibold text-black mt-0.5">
              {product.productCode || "1307441"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Origin
            </p>
            <p className="text-sm font-semibold text-black mt-0.5">
              {product.origin || "Made in India"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            Manufactured By
          </p>
          <p className="text-xs sm:text-sm text-black mt-1 leading-relaxed">
            {product.manufacturer || "Spretro Brands Pvt Ltd"}
          </p>
        </div>
      </div>
    </section>
  );
}
