import { Check, Heart, PackageCheck, Trash2, Truck } from "lucide-react";
import { formatCurrency, IMAGE_PLACEHOLDER } from "../../lib/productUtils";
import CheckoutSection from "./CheckoutSection";

export default function CartProductList({ items = [] }) {
  return (
    <CheckoutSection
      eyebrow="Bag"
      title={`${items.length}/${items.length} Items Selected`}
      action={
        items.length > 0 ? (
          <div className="hidden gap-5 text-[10px] font-black uppercase tracking-wide text-gray-500 sm:flex">
            <button type="button" className="hover:text-[#6A2CFF]">Remove</button>
            <button type="button" className="hover:text-[#6A2CFF]">Move To Wishlist</button>
          </div>
        ) : null
      }
    >
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => {
            const itemTotal = item.price * item.quantity;
            const discount = Math.round(
              (((item.originalPrice || item.price) - item.price) /
                (item.originalPrice || item.price)) *
                100
            );

            return (
              <article
                key={item.id}
                className="relative grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:grid-cols-[112px_minmax(0,1fr)]"
              >
                <span className="absolute left-2 top-2 z-10 flex size-5 items-center justify-center rounded bg-[#6A2CFF] text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                <button
                  type="button"
                  className="absolute right-3 top-3 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF]"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={17} />
                </button>

                <div className="aspect-[4/5] w-24 overflow-hidden rounded-lg bg-[#F9F8FF] sm:w-28">
                  <img
                    src={item.image || IMAGE_PLACEHOLDER}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = IMAGE_PLACEHOLDER;
                    }}
                  />
                </div>
                <div className="min-w-0 pr-5 sm:pr-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase text-gray-950">
                        {item.brand}
                      </p>
                      <h3 className="mt-1 line-clamp-1 text-sm font-medium leading-snug text-gray-700">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-gray-400">
                        Sold by: Flashstar Commerce
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ProductPill label="Size" value={item.size} />
                    <ProductPill label="Qty" value={item.quantity} />
                    <ProductPill label="Color" value={item.color} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                    <p className="text-base font-black text-gray-950">
                      {formatCurrency(itemTotal)}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400 line-through sm:text-xs">
                      {formatCurrency((item.originalPrice || item.price) * item.quantity)}
                    </p>
                    {discount > 0 && (
                      <p className="text-[11px] font-black text-rose-500 sm:text-xs">
                        {discount}% OFF
                      </p>
                    )}
                  </div>
                  <div className="mt-3 grid gap-1 text-[11px] font-medium text-gray-600 sm:text-xs">
                    <p className="inline-flex items-center gap-1.5 sm:gap-2">
                      <Truck size={14} className="text-emerald-600" />
                      Delivery by 5 Jun 2026
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#6A2CFF] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                  >
                    <Heart size={14} />
                    Move to Wishlist
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-[#F9F8FF] p-8 text-center">
          <PackageCheck className="mx-auto mb-3 text-gray-400" size={32} />
          <p className="text-sm font-black text-gray-950">Your cart is empty</p>
          <p className="mt-1 text-xs font-medium text-gray-400">
            Add products before checking out.
          </p>
        </div>
      )}
    </CheckoutSection>
  );
}

function ProductPill({ label, value }) {
  return (
    <span className="rounded-md bg-[#F5F5F7] px-2.5 py-1 text-xs font-black text-gray-800">
      {label}: {value}
    </span>
  );
}
