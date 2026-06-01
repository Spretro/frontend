import {
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  Pencil,
  Phone,
  Plus,
} from "lucide-react";
import { getAddressTypeLabel, getFullAddress } from "../../lib/checkoutUtils";
import CheckoutSection from "./CheckoutSection";

export default function DeliveryAddressCard({
  address,
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onEditAddress,
}) {
  const hasAddress = Boolean(address);

  return (
    <CheckoutSection
      eyebrow="Delivery address"
      title={hasAddress ? "Where should we deliver?" : "Add a delivery address"}
    >
      {hasAddress ? (
        <div className="space-y-4">
          <article className="overflow-hidden rounded-2xl border border-[#E8E4F4] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EDF8] bg-[#F9F8FF] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={17} />
                </span>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                  Selected for delivery
                </p>
              </div>
              <button
                type="button"
                onClick={onAddAddress}
                className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-[#6A2CFF] bg-white px-3 text-xs font-black text-[#6A2CFF] transition-colors hover:bg-[#F3EEFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
              >
                Change
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black text-gray-950">
                    {address.fullName}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EEFF] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#6A2CFF]">
                    <Home size={12} />
                    {getAddressTypeLabel(address)}
                  </span>
                </div>

                <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <AddressInfo
                    icon={<Phone size={15} />}
                    label="Phone"
                    value={address.phone}
                  />
                  <AddressInfo
                    icon={<MapPin size={15} />}
                    label="Pincode"
                    value={address.pincode}
                  />
                </div>

                <div className="mt-4 rounded-xl bg-[#F9F8FF] p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
                    Full address
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-gray-700">
                    {getFullAddress(address)}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 md:w-40 md:grid-cols-1">
                <button
                  type="button"
                  onClick={() => onEditAddress(address.id)}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black text-gray-700 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onAddAddress}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-xs font-black text-white transition-colors hover:bg-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                >
                  <Plus size={14} />
                  Add New
                </button>
              </div>
            </div>
          </article>

          {addresses.length > 1 && (
            <div className="rounded-2xl border border-gray-100 bg-[#FCFCFD] p-3">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
                Saved addresses
              </p>
              <div className="grid gap-2 md:grid-cols-2">
              {addresses.map((savedAddress) => (
                <label
                  key={savedAddress.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-3 transition-colors hover:border-[#6A2CFF] ${
                    selectedAddressId === savedAddress.id
                      ? "border-[#6A2CFF] ring-2 ring-[#6A2CFF]/10"
                      : "border-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === savedAddress.id}
                    onChange={() => onSelectAddress(savedAddress.id)}
                    className="mt-1 size-4 accent-[#6A2CFF]"
                  />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2 text-sm font-black text-gray-950">
                      {savedAddress.fullName}
                      <span className="rounded-full bg-[#F5F5F7] px-2 py-0.5 text-[10px] uppercase text-gray-500">
                        {getAddressTypeLabel(savedAddress)}
                      </span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs font-medium leading-relaxed text-gray-500">
                      {getFullAddress(savedAddress)}
                    </span>
                  </span>
                </label>
              ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#DCD4F7] bg-[#F9F8FF] p-5 sm:p-8">
          <div className="mx-auto max-w-md text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-[#6A2CFF] shadow-sm">
              <MapPin size={24} />
            </span>
            <p className="mt-4 text-base font-black text-gray-950">
              Add your delivery address
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
              We will use it to confirm serviceability, delivery speed, and order
              handoff details.
            </p>
            <button
              type="button"
              onClick={onAddAddress}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 text-sm font-black text-white transition-all hover:bg-[#6A2CFF] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 sm:w-auto"
            >
              <Plus size={16} />
              Add Delivery Address
            </button>
          </div>
        </div>
      )}
    </CheckoutSection>
  );
}

function AddressInfo({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-100 bg-white p-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F3EEFF] text-[#6A2CFF]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-black text-gray-950">
          {value}
        </span>
      </span>
    </div>
  );
}
