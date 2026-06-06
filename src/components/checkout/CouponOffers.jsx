import { BadgePercent, Gift, Ticket } from "lucide-react";
import CheckoutSection from "./CheckoutSection";

export default function CouponOffers({
  couponCode,
  couponMessage,
  offers = [],
  onCouponChange,
  onApplyCoupon,
}) {
  return (
    <CheckoutSection eyebrow="Coupons" title="Apply Coupons">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor="coupon-code">
          Coupon code
        </label>
        <input
          id="coupon-code"
          type="text"
          value={couponCode}
          onChange={(event) => onCouponChange(event.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          className="min-h-11 rounded-xl border border-gray-200 px-4 text-sm font-black uppercase tracking-wide text-gray-900 outline-none transition-colors placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-400 focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/20"
        />
        <button
          type="button"
          onClick={onApplyCoupon}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#6A2CFF] bg-white px-5 text-xs font-black uppercase tracking-wide text-[#6A2CFF] transition-colors hover:bg-[#F3EEFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          <Ticket size={16} />
          Apply
        </button>
      </div>

      {couponMessage && (
        <p
          className={`mt-2 text-xs font-bold ${
            couponMessage.includes("successfully")
              ? "text-emerald-600"
              : "text-rose-600"
          }`}
          role="status"
        >
          {couponMessage}
        </p>
      )}

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
          Available Offers
        </p>
        <div className="grid gap-3">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className="rounded-xl border border-[#EEE8FF] bg-[#F9F8FF] p-3"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#6A2CFF]">
                <BadgePercent size={17} />
              </span>
              <div>
                <h3 className="text-sm font-black text-gray-950">
                  {offer.title}
                </h3>
                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
                  {offer.description}
                </p>
                {offer.couponCode && (
                  <button
                    type="button"
                    onClick={() => onCouponChange(offer.couponCode)}
                    className="mt-2 text-xs font-black text-[#6A2CFF] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                  >
                    Use {offer.couponCode}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-rose-500">
          <Gift size={17} />
        </span>
        <div>
          <p className="text-sm font-black text-gray-950">Buying for someone?</p>
          <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
            Add a gift note or personalised package later during order review.
          </p>
        </div>
      </div>
    </CheckoutSection>
  );
}
