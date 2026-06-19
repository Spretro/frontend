import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartProductList from "../../components/checkout/CartProductList";
import CouponOffers from "../../components/checkout/CouponOffers";
import PriceDetails from "../../components/checkout/PriceDetails";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useCheckout } from "../../hooks/useCheckout";
import { formatCurrency } from "../../lib/productUtils";

function CheckoutPageContent() {
  const navigate = useNavigate();
  const {
    cartItems,
    availableOffers,
    couponCode,
    couponMessage,
    totals,
    loading,
    actionLoading,
    error,
    setCouponCode,
    applyCoupon,
  } = useCheckout();

  const handleContinueToAddress = () => {
    if (!cartItems.length) return;
    navigate("/checkout/address");
  };

  if (loading) {
    return <CheckoutLoading />;
  }

  return (
    <main className="min-h-screen w-full bg-white pb-28 lg:pb-8">
      <CheckoutTopBar step="bag" onContinueShopping={() => navigate("/product")} />

      <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 md:py-8">
        <header className="mb-5 lg:hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#6A2CFF]">
            Secure checkout
          </p>
          <h1 className="mt-1 text-2xl font-black text-gray-950">Your Bag</h1>
        </header>

        {error && (
          <div
            className="mb-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700"
            role="alert"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px] xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="space-y-4">
            <CartProductList items={cartItems} />
            <WishlistPrompt />
          </div>

          <aside className="space-y-4 border-gray-100 lg:sticky lg:top-6 lg:self-start lg:border-l lg:pl-6">
            <CouponOffers
              couponCode={couponCode}
              couponMessage={couponMessage}
              offers={availableOffers}
              onCouponChange={setCouponCode}
              onApplyCoupon={applyCoupon}
            />
            <PriceDetails totals={totals} />
            <ContinuePanel
              disabled={actionLoading || !cartItems.length}
              loading={actionLoading}
              onContinue={handleContinueToAddress}
            />
          </aside>
        </div>
      </div>

      <MobileContinueBar
        amount={totals.finalAmount}
        disabled={actionLoading || !cartItems.length}
        loading={actionLoading}
        onContinue={handleContinueToAddress}
      />
    </main>
  );
}

// ─── Shared top bar exported so AddressPage can reuse it ─────────────────────
export function CheckoutTopBar({ step = "bag", onBack }) {
  const navigate = useNavigate();
  const steps = [
    { key: "bag", label: "Bag" },
    { key: "address", label: "Address" },
    { key: "payment", label: "Payment" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);

  const handleBack = onBack ?? (() => navigate("/product"));

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-3 sm:px-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-black text-gray-950 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">SPRETRO</span>
        </button>

        <nav
          className="hidden items-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] sm:flex"
          aria-label="Checkout steps"
        >
          {steps.map((s, i) => (
            <span key={s.key} className="flex items-center gap-3">
              <span
                className={
                  i < currentIndex
                    ? "text-emerald-600"
                    : i === currentIndex
                    ? "text-[#6A2CFF] underline decoration-2 underline-offset-8"
                    : "text-gray-400"
                }
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span className="h-px w-10 border-t border-dashed border-gray-300" />
              )}
            </span>
          ))}
        </nav>

        <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-gray-600">
          <BadgeCheck size={22} className="fill-emerald-500 text-white" />
          100% Secure
        </div>
      </div>
    </header>
  );
}

function ContinuePanel({ disabled, loading, onContinue }) {
  return (
    <section className="hidden rounded-2xl border border-[#E8E4F4] bg-white p-4 lg:block">
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F9F8FF] p-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#6A2CFF]">
          <LockKeyhole size={18} />
        </span>
        <div>
          <p className="text-sm font-black text-gray-950">Next: Select address</p>
          <p className="text-xs font-medium text-gray-400">
            Choose where to deliver your order.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6A2CFF] px-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-gray-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        {loading ? "Please wait..." : "Continue to Address"}
      </button>
    </section>
  );
}

function WishlistPrompt() {
  return (
    <button
      type="button"
      className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 text-left text-sm font-black text-gray-950 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
    >
      Add More From Wishlist
      <span aria-hidden="true">›</span>
    </button>
  );
}

function MobileContinueBar({ amount, disabled, loading, onContinue }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#EEE8FF] bg-white/95 px-5 py-4 shadow-[0_-10px_30px_rgba(17,24,39,0.08)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[90rem] items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Payable
          </p>
          <p className="text-lg font-black text-gray-950">{formatCurrency(amount)}</p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          disabled={disabled}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6A2CFF] px-10 text-sm font-black text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          Continue to Address
        </button>
      </div>
    </div>
  );
}


function CheckoutLoading() {
  return (
    <main className="min-h-screen w-full bg-[#F9F8FF] px-3 py-4 sm:px-4 md:px-8 md:py-8">
      <div className="mx-auto grid max-w-[90rem] animate-pulse gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <div className="h-52 rounded-3xl bg-white" />
          <div className="h-64 rounded-3xl bg-white" />
          <div className="h-72 rounded-3xl bg-white" />
        </div>
        <div className="h-96 rounded-3xl bg-white" />
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <ErrorBoundary>
      <CheckoutPageContent />
    </ErrorBoundary>
  );
}
