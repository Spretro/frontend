import {
  AlertCircle,
  BadgePercent,
  Minus,
  Palette,
  Plus,
  RotateCw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  BadgeCheck,
  Truck,
  Zap,
} from "lucide-react";
import {
  calculateDiscount,
  formatCurrency,
  IMAGE_PLACEHOLDER,
  PRODUCT_LIMITS,
} from "../../lib/productUtils";

const trustItems = [
  { icon: Truck, title: "60 min delivery" },
  { icon: RotateCw, title: "Easy returns" },
  { icon: ShieldCheck, title: "Secure payments" },
  { icon: BadgeCheck, title: "Authentic brands" },
];

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
  onBuyNow = () => {},
  onClearError = () => {},
}) {
  const discount = calculateDiscount(product.price, product.originalPrice);
  const colorVariants = product.colorVariants || [];
  const hasColorVariants = colorVariants.length > 0;
  const sizes = product.sizes || [];
  const hasSizes = sizes.length > 0;
  const addToCartDisabled =
    cartLoading || (hasSizes && !selectedSize) || (hasColorVariants && !selectedColor);

  return (
    <section aria-label="Product purchase details" className="min-w-0 space-y-6">
      <header className="space-y-2 border-b border-gray-100 pb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6A2CFF]">
          {product.brand || "SPRETRO"}
        </p>
        <h1
          id="product-title"
          className="text-2xl font-black leading-tight text-gray-950 sm:text-3xl md:text-4xl"
        >
          {product.name || "Product Name"}
        </h1>
        <p className="max-w-2xl text-sm font-medium leading-relaxed text-gray-500">
          {product.shortDescription || "Product description"}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-gray-500">
          <span className="rounded-full bg-amber-400 px-2.5 py-1 text-gray-950">
            {product.rating || "0"} ★
          </span>
          <span>{product.reviewCount || 0} reviews</span>
        </div>
      </header>

      <section aria-label="Price" className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-black text-gray-950 md:text-4xl">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm font-bold text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-600">
              {discount}% off
            </span>
          )}
        </div>
        <p className="text-xs font-medium text-gray-400">Inclusive of all taxes</p>
      </section>

      {hasSizes && (
      <section aria-labelledby="size-heading" className="space-y-3 py-1">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="size-heading"
            className="flex items-center gap-2 text-sm font-black text-gray-950"
          >
            <Ruler size={16} className="text-[#6A2CFF]" />
            Select Size
          </h2>
          <button
            type="button"
            className="rounded-full px-2 py-1 text-xs font-bold text-[#6A2CFF] transition-colors hover:bg-[#F3EEFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2 py-2" role="radiogroup" aria-labelledby="size-heading">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`min-h-11 min-w-12 rounded-2xl border px-3 text-sm font-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 ${
                selectedSize === size
                  ? "border-[#6A2CFF] bg-[#6A2CFF] text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-800 hover:border-[#6A2CFF] hover:text-[#6A2CFF]"
              }`}
              role="radio"
              aria-checked={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>
      </section>
      )}

      {hasColorVariants && (
        <section aria-labelledby="color-heading" className="space-y-3">
          <h2
            id="color-heading"
            className="flex items-center gap-2 text-sm font-black text-gray-950"
          >
            <Palette size={16} className="text-[#6A2CFF]" />
            Select Color
          </h2>
          <div
            className="flex flex-wrap gap-3 py-2"
            role="radiogroup"
            aria-labelledby="color-heading"
          >
            {colorVariants.map((variant) => {
              const isSelected = selectedColor === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onColorChange(variant.id)}
                  className={`group/color relative size-16 overflow-hidden rounded-2xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 sm:size-[4.5rem] ${
                    isSelected
                      ? "border-[#6A2CFF] shadow-[0_0_0_3px_rgba(106,44,255,0.16)]"
                      : "border-gray-200 hover:-translate-y-0.5 hover:border-[#6A2CFF] hover:shadow-md"
                  }`}
                  title={variant.name}
                  role="radio"
                  aria-label={`Select ${variant.name}`}
                  aria-checked={isSelected}
                >
                  <img
                    src={variant.image || IMAGE_PLACEHOLDER}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/color:scale-105"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = IMAGE_PLACEHOLDER;
                    }}
                  />
                  {isSelected && (
                    <span
                      className="absolute inset-x-0 bottom-0 bg-[#6A2CFF] py-1 text-[9px] font-black uppercase tracking-wide text-white"
                      aria-hidden="true"
                    >
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section aria-labelledby="offers-heading" className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="offers-heading"
            className="flex items-center gap-2 text-sm font-black text-gray-950"
          >
            <BadgePercent size={17} className="text-[#6A2CFF]" />
            Best Offers
          </h2>
          <button
            type="button"
            className="text-xs font-bold text-[#6A2CFF] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          >
            View all
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {(product.offers || []).map((offer) => (
            <article
              key={offer.title}
              className="rounded-2xl border border-[#EEE8FF] bg-[#F9F8FF] p-3"
            >
              <h3 className="text-xs font-black text-gray-950">{offer.title}</h3>
              <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
                {offer.body}
              </p>
              <p className="mt-2 text-[11px] font-black text-[#6A2CFF]">
                {offer.count}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="quantity-heading" className="space-y-3">
        <h2 id="quantity-heading" className="text-sm font-black text-gray-950">
          Quantity
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid h-11 grid-cols-[44px_58px_44px] overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <button
              type="button"
              onClick={onDecrementQuantity}
              className="flex items-center justify-center transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A2CFF]"
              aria-label="Decrease quantity"
              disabled={quantity <= PRODUCT_LIMITS.minQuantity}
            >
              <Minus size={15} strokeWidth={3} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              min={PRODUCT_LIMITS.minQuantity}
              max={PRODUCT_LIMITS.maxQuantity}
              className="border-x border-gray-200 text-center text-sm font-black text-gray-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A2CFF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="Product quantity"
            />
            <button
              type="button"
              onClick={onIncrementQuantity}
              className="flex items-center justify-center transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A2CFF]"
              aria-label="Increase quantity"
              disabled={quantity >= PRODUCT_LIMITS.maxQuantity}
            >
              <Plus size={15} strokeWidth={3} />
            </button>
          </div>
          <p className="text-xs font-medium text-gray-400">
            Max {PRODUCT_LIMITS.maxQuantity} units per order
          </p>
        </div>
      </section>

      {error && (
        <div
          className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
          role="alert"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">{error}</p>
            <button
              type="button"
              onClick={onClearError}
              className="mt-1 text-xs font-black underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBuyNow}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#6A2CFF] px-4 text-sm font-black text-[#6A2CFF] transition-all duration-200 hover:scale-[1.02] hover:bg-[#F3EEFF] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          disabled={addToCartDisabled}
        >
          <Zap size={16} />
          Buy Now
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={addToCartDisabled}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 text-sm font-black text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#6A2CFF] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          <ShoppingBag size={16} />
          {cartLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {trustItems.map(({ icon: Icon, title}) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl border border-[#EDE9FE] bg-[#F7F5FF] p-3"
          >
            <span className="flex size-9 items-center justify-center rounded-2xl bg-white text-[#6A2CFF]">
              <Icon size={18} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[11px] font-black text-gray-900">{title}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-[#EEE8FF] p-4" aria-label="Product details">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Product Code
            </dt>
            <dd className="mt-1 text-sm font-bold text-gray-950">
              {product.productCode || product.id}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Origin
            </dt>
            <dd className="mt-1 text-sm font-bold text-gray-950">
              {product.origin || "Made in India"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Manufactured By
            </dt>
            <dd className="mt-1 text-sm font-medium leading-relaxed text-gray-600">
              {product.manufacturer || "Spretro Brands Pvt Ltd"}
            </dd>
          </div>
        </dl>
      </section>
    </section>
  );
}
