import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CreditCard,
  Landmark,
  Loader2,
  LockKeyhole,
  Smartphone,
  Truck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../hooks/useCheckout";
import PriceDetails from "../../components/checkout/PriceDetails";
import ErrorBoundary from "../../components/ErrorBoundary";
import { formatCurrency } from "../../lib/productUtils";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", sub: "All major banks", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when it arrives", icon: Banknote },
];

function PaymentPageContent() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { cartItems, selectedAddress, totals, loading } = useCheckout();

  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const amount = totals.finalAmount;
  const canPay = !processing && cartItems.length > 0;

  const handlePay = async () => {
    if (!canPay) return;
    setProcessing(true);
    // MOCK PAYMENT — replace with real gateway (Razorpay) callback later.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setProcessing(false);
    setPaid(true);
    clearCart();
  };

  if (loading) return <PaymentLoading />;

  if (paid) return <PaymentSuccess amount={amount} onHome={() => navigate("/")} />;

  if (!cartItems.length) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#F3EEFF] text-[#6A2CFF]">
          <CreditCard size={28} />
        </span>
        <h1 className="text-2xl font-black text-gray-950">Nothing to pay for</h1>
        <p className="text-sm font-medium text-gray-500">Your cart is empty.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#6A2CFF] px-6 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-gray-950 active:scale-95"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white pb-28 lg:pb-8">
      {/* Top bar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-3 sm:px-4">
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="inline-flex items-center gap-2 text-sm font-black text-gray-950 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
            aria-label="Back to checkout"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Checkout</span>
          </button>

          <nav className="hidden items-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] sm:flex">
            <span className="text-gray-500">Bag</span>
            <span className="h-px w-10 border-t border-dashed border-gray-300" />
            <span className="text-gray-500">Address</span>
            <span className="h-px w-10 border-t border-dashed border-gray-300" />
            <span className="text-[#6A2CFF] underline decoration-2 underline-offset-8">Payment</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-gray-600">
            <BadgeCheck size={22} className="fill-emerald-500 text-white" />
            100% Secure
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 md:py-8">
        <header className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#6A2CFF]">Secure payment</p>
          <h1 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">Choose how you'd like to pay</h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px] xl:grid-cols-[minmax(0,1fr)_460px]">
          {/* Left — methods */}
          <div className="space-y-4">
            {/* Deliver to */}
            {selectedAddress && (
              <section className="rounded-2xl border border-[#E8E4F4] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">Delivering to</p>
                <p className="mt-2 text-sm font-black text-gray-950">
                  {selectedAddress.fullName}
                  <span className="ml-2 rounded bg-[#F3EEFF] px-2 py-0.5 text-[10px] font-black uppercase text-[#6A2CFF]">
                    {selectedAddress.type}
                  </span>
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Truck size={13} className="text-emerald-600" />
                  {selectedAddress.locality}, {selectedAddress.city} — {selectedAddress.pincode}
                </p>
              </section>
            )}

            <section className="rounded-2xl border border-[#E8E4F4] bg-white p-2">
              <p className="px-3 pb-2 pt-3 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                Payment Method
              </p>
              <div className="space-y-1.5">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon;
                  const active = method === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setMethod(pm.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 ${
                        active
                          ? "border-[#6A2CFF] bg-[#F9F8FF] ring-1 ring-[#6A2CFF]"
                          : "border-gray-200 bg-white hover:border-[#C4B5FD]"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                          active ? "bg-[#6A2CFF] text-white" : "bg-[#F3EEFF] text-[#6A2CFF]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-gray-950">{pm.label}</span>
                        <span className="block text-xs font-medium text-gray-400">{pm.sub}</span>
                      </span>
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border-2 ${
                          active ? "border-[#6A2CFF]" : "border-gray-300"
                        }`}
                      >
                        {active && <span className="size-2.5 rounded-full bg-[#6A2CFF]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Method-specific (mock) input */}
              <div className="p-3">
                <PaymentFields method={method} />
              </div>
            </section>
          </div>

          {/* Right — summary + pay */}
          <aside className="space-y-4 border-gray-100 lg:sticky lg:top-6 lg:self-start lg:border-l lg:pl-6">
            <PriceDetails totals={totals} />
            <section className="hidden rounded-2xl border border-[#E8E4F4] bg-white p-4 lg:block">
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F9F8FF] p-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#6A2CFF]">
                  <LockKeyhole size={18} />
                </span>
                <div>
                  <p className="text-sm font-black text-gray-950">Payments are secure</p>
                  <p className="text-xs font-medium text-gray-400">Encrypted & PCI-DSS compliant.</p>
                </div>
              </div>
              <PayButton amount={amount} processing={processing} disabled={!canPay} onClick={handlePay} />
            </section>
          </aside>
        </div>
      </div>

      {/* Mobile pay bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#EEE8FF] bg-white/95 px-3 py-3 shadow-[0_-10px_30px_rgba(17,24,39,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payable</p>
            <p className="text-lg font-black text-gray-950">{formatCurrency(amount)}</p>
          </div>
          <PayButton amount={amount} processing={processing} disabled={!canPay} onClick={handlePay} compact />
        </div>
      </div>
    </main>
  );
}

function PaymentFields({ method }) {
  if (method === "upi") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-black text-gray-700">Enter UPI ID</span>
        <input
          type="text"
          placeholder="yourname@upi"
          className="min-h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-900 outline-none focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/30"
        />
      </label>
    );
  }
  if (method === "card") {
    return (
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-black text-gray-700">Card Number</span>
          <input
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            className="min-h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-900 outline-none focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/30"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-gray-700">Expiry</span>
            <input
              placeholder="MM/YY"
              className="min-h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-900 outline-none focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-gray-700">CVV</span>
            <input
              inputMode="numeric"
              placeholder="•••"
              className="min-h-11 w-full rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-900 outline-none focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/30"
            />
          </label>
        </div>
      </div>
    );
  }
  if (method === "netbanking") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-black text-gray-700">Select Bank</span>
        <select className="min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 outline-none focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/30">
          <option>HDFC Bank</option>
          <option>State Bank of India</option>
          <option>ICICI Bank</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
        </select>
      </label>
    );
  }
  return (
    <p className="rounded-xl bg-[#F9F8FF] p-3 text-xs font-medium text-gray-500">
      Pay in cash when your order is delivered. An extra handling fee may apply.
    </p>
  );
}

function PayButton({ amount, processing, disabled, onClick, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6A2CFF] text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-gray-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 ${
        compact ? "shrink-0 px-4" : "w-full px-4"
      }`}
    >
      {processing ? <Loader2 size={16} className="animate-spin" /> : <LockKeyhole size={16} />}
      {processing ? "Processing..." : `Pay ${formatCurrency(amount)}`}
    </button>
  );
}

function PaymentSuccess({ amount, onHome }) {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={44} />
      </span>
      <h1 className="text-3xl font-black text-gray-950">Payment Successful</h1>
      <p className="max-w-md text-sm font-medium text-gray-500">
        We've received {formatCurrency(amount)}. Your order is confirmed and a receipt has been sent to your email.
      </p>
      <button
        type="button"
        onClick={onHome}
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#6A2CFF] px-8 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-gray-950 active:scale-95"
      >
        Continue Shopping
      </button>
    </main>
  );
}

function PaymentLoading() {
  return (
    <main className="min-h-screen w-full bg-[#F9F8FF] px-3 py-4 sm:px-4 md:px-8 md:py-8">
      <div className="mx-auto grid max-w-6xl animate-pulse gap-5 lg:grid-cols-[minmax(0,1fr)_430px]">
        <div className="space-y-5">
          <div className="h-28 rounded-3xl bg-white" />
          <div className="h-80 rounded-3xl bg-white" />
        </div>
        <div className="h-96 rounded-3xl bg-white" />
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <ErrorBoundary>
      <PaymentPageContent />
    </ErrorBoundary>
  );
}
