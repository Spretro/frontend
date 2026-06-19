import {
  ArrowRight,
  CheckCircle2,
  Home,
  Loader2,
  MapPin,
  MapPinned,
  Pencil,
  Phone,
  Plus,
  Save,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { CheckoutTopBar } from "../CheckoutPage/CheckoutPage";
import { useCheckout } from "../../hooks/useCheckout";
import {
  addressTypes,
  emptyAddressForm,
  getAddressTypeLabel,
  getFullAddress,
  normalizeAddressPayload,
  validateAddressForm,
} from "../../lib/checkoutUtils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function addressToForm(address) {
  if (!address) return emptyAddressForm;
  return {
    fullName: address.fullName || "",
    phone: address.phone || "",
    pincode: address.pincode || "",
    house: address.house || "",
    address: address.address || "",
    locality: address.locality || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    type: address.type || "Home",
    customType: address.customType || "",
  };
}

// ─── Address Selection Page (Step 2) ─────────────────────────────────────────

function AddressSelectionContent() {
  const navigate = useNavigate();
  const {
    addresses,
    selectedAddressId,
    totals,
    loading,
    actionLoading,
    error,
    setSelectedAddressId,
    continueToPayment,
  } = useCheckout();

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const handleDeliverHere = async () => {
    const summary = await continueToPayment();
    if (summary) navigate("/payment");
  };

  if (loading) return <AddressLoading />;

  return (
    <main className="min-h-screen w-full bg-[#F9F8FF] pb-28 lg:pb-8">
      <CheckoutTopBar step="address" onBack={() => navigate("/checkout")} />

      <div className="mx-auto max-w-4xl px-3 py-5 sm:px-4 md:py-8">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEE8FF] px-3 py-1.5 mb-3">
            <MapPinned size={13} className="text-[#6A2CFF]" />
            <p className="text-[11px] font-black uppercase tracking-wider text-[#6A2CFF]">
              Step 2 of 3
            </p>
          </div>
          <h1 className="text-2xl font-black text-gray-950 sm:text-3xl">
            Select Delivery Address
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Choose where you'd like your order delivered.
          </p>
        </header>

        {error && (
          <div
            className="mb-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ── Left: address list ─────────────────────────────────────────── */}
          <div className="space-y-3">
            {addresses.length === 0 ? (
              <EmptyAddresses onAdd={() => navigate("/checkout/address/new")} />
            ) : (
              addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  isSelected={selectedAddressId === addr.id}
                  onSelect={() => setSelectedAddressId(addr.id)}
                  onEdit={() => navigate(`/checkout/address/${addr.id}/edit`)}
                />
              ))
            )}

            {/* Add new address button */}
            <button
              type="button"
              onClick={() => navigate("/checkout/address/new")}
              className="flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[#DCD4F7] bg-white px-4 text-sm font-bold text-[#6A2CFF] transition-colors hover:bg-[#F9F8FF] hover:border-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#EEE8FF]">
                <Plus size={16} />
              </span>
              Add a New Address
            </button>
          </div>

          {/* ── Right: sticky delivery summary ────────────────────────────── */}
          <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-2xl border border-[#E8E4F4] bg-white p-4 space-y-4">
              <div className="rounded-xl bg-[#F9F8FF] p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Order value
                </p>
                <p className="text-xl font-black text-gray-950">
                  ₹{totals.finalAmount.toLocaleString("en-IN")}
                </p>
                {selectedAddress && (
                  <p className="mt-2 text-xs font-medium text-gray-500 leading-relaxed">
                    Delivering to{" "}
                    <span className="font-bold text-gray-800">
                      {selectedAddress.fullName}
                    </span>
                    , {selectedAddress.city}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleDeliverHere}
                disabled={actionLoading || !selectedAddress}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6A2CFF] px-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-gray-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
              >
                {actionLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowRight size={16} />
                )}
                {actionLoading ? "Preparing..." : "Deliver Here"}
              </button>

              {!selectedAddress && (
                <p className="text-center text-xs font-medium text-gray-400">
                  Select an address above to continue.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#EEE8FF] bg-white/95 px-5 py-4 shadow-[0_-10px_30px_rgba(17,24,39,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[90rem] items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Payable
            </p>
            <p className="text-lg font-black text-gray-950">
              ₹{totals.finalAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeliverHere}
            disabled={actionLoading || !selectedAddress}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6A2CFF] px-10 text-sm font-black text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          >
            {actionLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
            {actionLoading ? "Preparing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </main>
  );
}



function AddressCard({ address, isSelected, onSelect, onEdit }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border-2 bg-white transition-all cursor-pointer ${
        isSelected
          ? "border-[#6A2CFF] shadow-[0_0_0_4px_rgba(106,44,255,0.08)]"
          : "border-gray-200 hover:border-[#6A2CFF]/40"
      }`}
      onClick={onSelect}
    >
      {/* Header bar */}
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2.5 ${
          isSelected ? "bg-[#F3EEFF]" : "bg-[#FAFAFA]"
        }`}
      >
        <div className="flex items-center gap-2">
          {isSelected ? (
            <CheckCircle2 size={16} className="text-[#6A2CFF]" />
          ) : (
            <div className="size-4 rounded-full border-2 border-gray-300" />
          )}
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isSelected ? "text-[#6A2CFF]" : "text-gray-500"
            }`}
          >
            {isSelected ? "Selected for delivery" : getAddressTypeLabel(address)}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-bold text-gray-600 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none"
          aria-label="Edit address"
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-black text-gray-950">{address.fullName}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EEFF] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#6A2CFF]">
            <Home size={11} />
            {getAddressTypeLabel(address)}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={13} className="shrink-0 text-[#6A2CFF]" />
            {address.phone}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={13} className="shrink-0 text-[#6A2CFF]" />
            {address.pincode}
          </div>
        </div>

        <p className="text-sm font-medium text-gray-600 leading-relaxed">
          {getFullAddress(address)}
        </p>
      </div>
    </article>
  );
}

function EmptyAddresses({ onAdd }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#DCD4F7] bg-white p-8 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#6A2CFF]">
        <MapPin size={26} />
      </span>
      <p className="mt-4 text-base font-black text-gray-950">
        No saved addresses
      </p>
      <p className="mt-2 text-sm font-medium text-gray-500">
        Add a delivery address to continue.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#6A2CFF] px-5 text-sm font-black text-white transition-all hover:bg-gray-950 active:scale-95 focus:outline-none"
      >
        <Plus size={16} />
        Add Address
      </button>
    </div>
  );
}

// ─── Add / Edit Address Form Page ─────────────────────────────────────────────

function AddressFormContent() {
  const navigate = useNavigate();
  const { addressId } = useParams(); // present only on /edit route
  const { addresses, loading, actionLoading, error, saveAddress } = useCheckout();

  const existingAddress = useMemo(
    () => (addressId ? addresses.find((a) => a.id === addressId) : null),
    [addressId, addresses]
  );

  if (loading) return <AddressLoading />;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#F9F8FF] via-white to-[#F0EBFF]">
      <CheckoutTopBar
        step="address"
        onBack={() => navigate("/checkout/address")}
      />
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6 md:py-10">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEE8FF] px-3 py-1.5 mb-3">
              <MapPinned size={13} className="text-[#6A2CFF]" />
              <p className="text-[11px] font-black uppercase tracking-wider text-[#6A2CFF]">
                Delivery Address
              </p>
            </div>
            <h1 className="text-2xl font-black text-gray-950 sm:text-3xl leading-tight">
              {addressId ? "Edit Address" : "Add New Address"}
            </h1>
          </div>
        </header>

        <AddressForm
          key={existingAddress?.id || "new-address"}
          actionLoading={actionLoading}
          error={error}
          existingAddress={existingAddress}
          initialFormData={addressToForm(existingAddress)}
          onCancel={() => navigate("/checkout/address")}
          onSave={async (formData) => {
            const saved = await saveAddress(normalizeAddressPayload(formData, existingAddress));
            if (saved) navigate("/checkout/address");
          }}
        />
      </div>
    </main>
  );
}

// ─── AddressForm (shared sub-component) ──────────────────────────────────────

function AddressForm({ actionLoading, error, existingAddress, initialFormData, onCancel, onSave }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/\D/g, "");
    const nextValue =
      name === "phone"
        ? numericValue.slice(0, 10)
        : name === "pincode"
        ? numericValue.slice(0, 6)
        : value;
    setFormData((cur) => ({ ...cur, [name]: nextValue }));
    setFormErrors((cur) => ({ ...cur, [name]: "" }));
  };

  const selectAddressType = (type) => {
    setFormData((cur) => ({
      ...cur,
      type,
      customType: type === "Other" ? cur.customType : "",
    }));
    setFormErrors((cur) => ({ ...cur, type: "", customType: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateAddressForm(formData);
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSave(formData, existingAddress);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-white/40 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-xl"
    >
      {error && (
        <div
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4"
          role="alert"
        >
          <p className="text-sm font-semibold text-red-800">{error}</p>
        </div>
      )}

      <FormSection
        icon={<MapPinned size={20} />}
        title="Contact Information"
        description="We'll use this to contact you about your delivery"
      >
        <Field id="fullName" label="Full Name" name="fullName" value={formData.fullName} error={formErrors.fullName} onChange={handleFieldChange} autoComplete="name" placeholder="John Doe" />
        <Field id="phone" label="Phone Number" name="phone" value={formData.phone} error={formErrors.phone} onChange={handleFieldChange} inputMode="numeric" autoComplete="tel" placeholder="10-digit number" />
      </FormSection>

      <FormSection title="Address Location" description="Enter your complete address details">
        <Field id="pincode" label="Pincode" name="pincode" value={formData.pincode} error={formErrors.pincode} onChange={handleFieldChange} inputMode="numeric" autoComplete="postal-code" placeholder="e.g., 560001" />
        <Field id="house" label="House / Flat / Building" name="house" value={formData.house} error={formErrors.house} onChange={handleFieldChange} autoComplete="address-line1" placeholder="Flat number, building name" />
        <Field id="address" label="Address" name="address" value={formData.address} error={formErrors.address} onChange={handleFieldChange} className="md:col-span-2" autoComplete="address-line2" placeholder="Road, street, area" />
        <Field id="locality" label="Locality / Street" name="locality" value={formData.locality} error={formErrors.locality} onChange={handleFieldChange} placeholder="Locality name" />
        <Field id="landmark" label="Landmark (Optional)" name="landmark" value={formData.landmark} error={formErrors.landmark} onChange={handleFieldChange} placeholder="Near hospital, church, etc." />
        <Field id="city" label="City / District" name="city" value={formData.city} error={formErrors.city} onChange={handleFieldChange} autoComplete="address-level2" placeholder="City or district" />
        <Field id="state" label="State" name="state" value={formData.state} error={formErrors.state} onChange={handleFieldChange} autoComplete="address-level1" placeholder="State or region" />
      </FormSection>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-black text-gray-950 mb-1">Address Type</h2>
          <p className="text-xs text-gray-500 mb-4">Select the type of location</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4" role="radiogroup" aria-label="Address type">
          {addressTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => selectAddressType(type)}
              role="radio"
              aria-checked={formData.type === type}
              className={`min-h-11 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 ${
                formData.type === type
                  ? "border-[#6A2CFF] bg-gradient-to-br from-[#6A2CFF] to-[#5A1EEE] text-white shadow-lg shadow-[#6A2CFF]/30"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#6A2CFF]/40 hover:bg-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {formData.type === "Other" && (
          <div className="mt-4 max-w-md">
            <Field id="customType" label="Custom Label" name="customType" value={formData.customType} error={formErrors.customType} onChange={handleFieldChange} placeholder="e.g., Hostel, PG, Warehouse" />
          </div>
        )}
      </section>

      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={actionLoading}
          className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6A2CFF] to-[#5A1EEE] px-4 text-sm font-black text-white transition-all hover:shadow-lg hover:shadow-[#6A2CFF]/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          {actionLoading ? <><Loader2 size={18} className="animate-spin" /><span>Saving...</span></> : <><Save size={18} /><span>Save Address</span></>}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={actionLoading}
          className="flex-1 min-h-12 rounded-xl border-2 border-gray-200 px-4 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormSection({ icon, title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3">
        {icon && (
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEE8FF] to-[#E8DEFF] text-[#6A2CFF]">
            {icon}
          </span>
        )}
        <div className="flex-1">
          <h2 className="text-sm font-black text-gray-950">{title}</h2>
          {description && <p className="mt-1 text-xs font-medium text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ id, label, name, value, error, onChange, placeholder, className = "", inputMode, autoComplete }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-900">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={`w-full rounded-lg border-2 px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-offset-1 ${
            error
              ? "border-red-300 bg-red-50/40 text-gray-900 focus:border-red-500 focus:ring-red-200"
              : "border-gray-200 bg-gray-50/50 text-gray-900 focus:border-[#6A2CFF] focus:ring-[#6A2CFF]/20"
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {value && !error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-bold text-red-600 flex items-center gap-1">
          <span className="inline-block h-1 w-1 rounded-full bg-red-600" />
          {error}
        </p>
      )}
    </div>
  );
}

function AddressLoading() {
  return (
    <main className="min-h-screen bg-[#F9F8FF] px-3 py-8 sm:px-4">
      <div className="mx-auto max-w-4xl animate-pulse space-y-4">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="h-10 w-72 rounded-lg bg-gray-200" />
        <div className="h-40 rounded-2xl bg-white" />
        <div className="h-40 rounded-2xl bg-white" />
      </div>
    </main>
  );
}

// ─── Exported route components ────────────────────────────────────────────────

/** /checkout/address — address selection */
export default function AddressPage() {
  return (
    <ErrorBoundary>
      <AddressSelectionContent />
    </ErrorBoundary>
  );
}

/** /checkout/address/new — add form */
export function NewAddressPage() {
  return (
    <ErrorBoundary>
      <AddressFormContent />
    </ErrorBoundary>
  );
}

/** /checkout/address/:addressId/edit — edit form */
export function EditAddressPage() {
  return (
    <ErrorBoundary>
      <AddressFormContent />
    </ErrorBoundary>
  );
}
