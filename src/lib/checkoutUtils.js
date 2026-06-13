import { formatCurrency } from "./productUtils";

export const CHECKOUT_STORAGE_KEYS = {
  addresses: "spretro_checkout_addresses",
  selectedAddressId: "spretro_checkout_selected_address",
};

export const emptyAddressForm = {
  fullName: "",
  phone: "",
  pincode: "",
  house: "",
  address: "",
  locality: "",
  landmark: "",
  city: "",
  state: "",
  type: "Home",
  customType: "",
};

export const addressTypes = ["Home", "Office", "Other"];

export const couponDiscounts = {
  SPRETRO100: 100,
  STYLE10: "10%",
  FIRSTBUY: 150,
};

export function calculateCheckoutTotals(items = [], fees = {}, couponCode = "") {
  const totalMrp = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price || 0) * item.quantity,
    0
  );
  const sellingTotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const discountOnMrp = Math.max(totalMrp - sellingTotal, 0);
  const specialOfferDiscount = fees.specialOfferDiscount || 0;
  const deliveryCharges = fees.deliveryCharges || 0;
  const platformFee = fees.platformFee || 0;
  const taxes = fees.taxes || 0;
  const normalizedCoupon = couponCode.trim().toUpperCase();
  const couponValue = couponDiscounts[normalizedCoupon];
  const couponDiscount =
    couponValue === "10%"
      ? Math.round(sellingTotal * 0.1)
      : Number(couponValue || 0);
  const finalAmount = Math.max(
    sellingTotal -
      couponDiscount -
      specialOfferDiscount +
      deliveryCharges +
      platformFee +
      taxes,
    0
  );
  const totalSavings = discountOnMrp + couponDiscount + specialOfferDiscount;

  return {
    totalMrp,
    discountOnMrp,
    couponDiscount,
    specialOfferDiscount,
    deliveryCharges,
    platformFee,
    taxes,
    finalAmount,
    totalSavings,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export function getAddressTypeLabel(address = {}) {
  if (address.type === "Other") return address.customType || "Other";
  return address.type || "Home";
}

export function getFullAddress(address = {}) {
  return [
    address.house,
    address.address,
    address.locality,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");
}

export function validateAddressForm(formData) {
  const errors = {};
  const requiredFields = [
    ["fullName", "Full name is required."],
    ["phone", "Phone number is required."],
    ["pincode", "Pincode is required."],
    ["house", "House, flat, or building number is required."],
    ["address", "Address is required."],
    ["locality", "Locality or street is required."],
    ["city", "City or district is required."],
    ["state", "State is required."],
  ];

  requiredFields.forEach(([field, message]) => {
    if (!String(formData[field] || "").trim()) errors[field] = message;
  });

  if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
    errors.phone = "Enter a valid 10 digit Indian mobile number.";
  }

  if (formData.pincode && !/^\d{6}$/.test(formData.pincode.trim())) {
    errors.pincode = "Enter a valid 6 digit pincode.";
  }

  if (formData.type === "Other" && !formData.customType.trim()) {
    errors.customType = "Add a label for this address.";
  }

  return errors;
}

export function normalizeAddressPayload(formData, existingAddress) {
  return {
    ...(existingAddress || {}),
    id: existingAddress?.id || `address-${Date.now()}`,
    fullName: formData.fullName.trim(),
    phone: formData.phone.trim(),
    pincode: formData.pincode.trim(),
    house: formData.house.trim(),
    address: formData.address.trim(),
    locality: formData.locality.trim(),
    landmark: formData.landmark.trim(),
    city: formData.city.trim(),
    state: formData.state.trim(),
    type: formData.type,
    customType: formData.type === "Other" ? formData.customType.trim() : "",
  };
}

export function buildOrderSummary({ cartItems, selectedAddress, totals, couponCode }) {
  return {
    items: cartItems,
    deliveryAddress: selectedAddress,
    pricing: totals,
    couponCode: couponCode.trim().toUpperCase(),
    amountLabel: formatCurrency(totals.finalAmount),
    createdAt: new Date().toISOString(),
  };
}
