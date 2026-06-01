import { ArrowLeft, Loader2, MapPinned, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useCheckout } from "../../hooks/useCheckout";
import {
  addressTypes,
  emptyAddressForm,
  normalizeAddressPayload,
  validateAddressForm,
} from "../../lib/checkoutUtils";

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

function AddressPageContent() {
  const navigate = useNavigate();
  const { addressId } = useParams();
  const { addresses, loading, actionLoading, error, saveAddress } = useCheckout();
  const existingAddress = useMemo(
    () => addresses.find((address) => address.id === addressId),
    [addressId, addresses]
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#F9F8FF] via-white to-[#F0EBFF] px-3 py-6 sm:px-4 md:px-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 animate-pulse">
            <div className="h-6 w-40 rounded-lg bg-gray-200" />
            <div className="mt-3 h-10 w-64 rounded-lg bg-gray-200" />
          </div>
          <div className="animate-pulse space-y-6 rounded-3xl bg-white p-8 shadow-lg">
            {[...Array(8)].map((_, index) => (
              <div key={index}>
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="mt-3 h-12 rounded-xl bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#F9F8FF] via-white to-[#F0EBFF]">
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6 md:py-12">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEE8FF] px-3 py-1.5 mb-3">
              <MapPinned size={14} className="text-[#6A2CFF]" />
              <p className="text-[11px] font-black uppercase tracking-wider text-[#6A2CFF]">
                Delivery Address
              </p>
            </div>
            <h1 className="text-3xl font-black text-gray-950 md:text-4xl leading-tight">
              {addressId ? "Edit Your Address" : "Add New Address"}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-gray-700 transition-all hover:border-[#6A2CFF] hover:bg-[#F9F8FF] hover:text-[#6A2CFF] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </header>

        <AddressForm
          key={existingAddress?.id || "new-address"}
          actionLoading={actionLoading}
          error={error}
          existingAddress={existingAddress}
          initialFormData={addressToForm(existingAddress)}
          onCancel={() => navigate("/checkout")}
          onSave={async (formData) => {
            const saved = await saveAddress(
              normalizeAddressPayload(formData, existingAddress)
            );
            if (saved) navigate("/checkout");
          }}
        />
      </div>
    </main>
  );
}

function AddressForm({
  actionLoading,
  error,
  existingAddress,
  initialFormData,
  onCancel,
  onSave,
}) {
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

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
  };

  const selectAddressType = (type) => {
    setFormData((current) => ({
      ...current,
      type,
      customType: type === "Other" ? current.customType : "",
    }));
    setFormErrors((current) => ({ ...current, type: "", customType: "" }));
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
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 animate-in slide-in-from-top"
          role="alert"
        >
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-200">
            <span className="text-xs font-bold text-red-700">!</span>
          </div>
          <p className="text-sm font-semibold text-red-800">{error}</p>
        </div>
      )}

      <FormSection
        icon={<MapPinned size={20} />}
        title="Contact Information"
        description="We'll use this to contact you about your delivery"
      >
        <Field
          id="fullName"
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          error={formErrors.fullName}
          onChange={handleFieldChange}
          autoComplete="name"
          placeholder="John Doe"
        />
        <Field
          id="phone"
          label="Phone Number"
          name="phone"
          value={formData.phone}
          error={formErrors.phone}
          onChange={handleFieldChange}
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit number"
        />
      </FormSection>

      <FormSection 
        title="Address Location"
        description="Enter your complete address details"
      >
        <Field
          id="pincode"
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          error={formErrors.pincode}
          onChange={handleFieldChange}
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="e.g., 560001"
        />
        <Field
          id="house"
          label="House / Flat / Building"
          name="house"
          value={formData.house}
          error={formErrors.house}
          onChange={handleFieldChange}
          autoComplete="address-line1"
          placeholder="Flat number, building name"
        />
        <Field
          id="address"
          label="Address"
          name="address"
          value={formData.address}
          error={formErrors.address}
          onChange={handleFieldChange}
          className="md:col-span-2"
          autoComplete="address-line2"
          placeholder="Road, street, area"
        />
        <Field
          id="locality"
          label="Locality / Street"
          name="locality"
          value={formData.locality}
          error={formErrors.locality}
          onChange={handleFieldChange}
          placeholder="Locality name"
        />
        <Field
          id="landmark"
          label="Landmark (Optional)"
          name="landmark"
          value={formData.landmark}
          error={formErrors.landmark}
          onChange={handleFieldChange}
          placeholder="Near hospital, church, etc."
        />
        <Field
          id="city"
          label="City / District"
          name="city"
          value={formData.city}
          error={formErrors.city}
          onChange={handleFieldChange}
          autoComplete="address-level2"
          placeholder="City or district"
        />
        <Field
          id="state"
          label="State"
          name="state"
          value={formData.state}
          error={formErrors.state}
          onChange={handleFieldChange}
          autoComplete="address-level1"
          placeholder="State or region"
        />
      </FormSection>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-black text-gray-950 mb-3">Address Type</h2>
          <p className="text-xs text-gray-500 mb-4">Select the type of location</p>
        </div>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
          role="radiogroup"
          aria-label="Address type"
        >
          {addressTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => selectAddressType(type)}
              role="radio"
              aria-checked={formData.type === type}
              className={`group relative min-h-11 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 ${
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
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 max-w-md">
            <Field
              id="customType"
              label="Custom Label"
              name="customType"
              value={formData.customType}
              error={formErrors.customType}
              onChange={handleFieldChange}
              placeholder="e.g., Hostel, PG, Warehouse"
            />
          </div>
        )}
      </section>

      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={actionLoading}
          className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6A2CFF] to-[#5A1EEE] px-4 text-sm font-black text-white transition-all hover:shadow-lg hover:shadow-[#6A2CFF]/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
        >
          {actionLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save Address</span>
            </>
          )}
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
          {description && (
            <p className="mt-1 text-xs font-medium text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  className = "",
  inputMode,
  autoComplete,
}) {
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

export default function AddressPage() {
  return (
    <ErrorBoundary>
      <AddressPageContent />
    </ErrorBoundary>
  );
}
