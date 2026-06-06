import { ShieldCheck } from "lucide-react";
import { formatCurrency } from "../../lib/productUtils";
import CheckoutSection from "./CheckoutSection";

export default function PriceDetails({ totals }) {
  const rows = [
    ["Total MRP", totals.totalMrp],
    ["Discount on MRP", -totals.discountOnMrp, "saving"],
    ["Coupon Discount", -totals.couponDiscount, "saving"],
    ["Special Offer Discount", -totals.specialOfferDiscount, "saving"],
    ["Delivery Charges", totals.deliveryCharges],
    ["Platform Fee", totals.platformFee],
    ["Taxes", totals.taxes],
  ];

  return (
    <CheckoutSection eyebrow={`${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"}`} title="Price Details">
      <dl className="space-y-3">
        {rows.map(([label, value, tone]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd
              className={`text-sm font-black ${
                tone === "saving" ? "text-emerald-600" : "text-gray-950"
              }`}
            >
              {value < 0 ? `- ${formatCurrency(Math.abs(value))}` : formatCurrency(value)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="my-4 border-t border-gray-200" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-base font-black text-gray-950">Total Amount</p>
        <p className="text-xl font-black text-gray-950">
          {formatCurrency(totals.finalAmount)}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
          <ShieldCheck size={17} />
        </span>
        <p className="text-sm font-black text-emerald-700">
          You are saving {formatCurrency(totals.totalSavings)} on this order
        </p>
      </div>
    </CheckoutSection>
  );
}
