export const PRODUCT_LIMITS = {
  maxQuantity: 10,
  minQuantity: 1,
  reviewsPreviewCount: 3,
};

export const IMAGE_PLACEHOLDER =
  "https://placehold.co/900x1200/f3eeff/6a2cff?text=Product";

export const TABS = {
  specifications: "specifications",
  description: "description",
};

export const ERROR_MESSAGES = {
  productNotFound: "Product not found. Please try again.",
  fetchError: "Failed to fetch product. Please refresh the page.",
  sizeRequired: "Please select a size before adding to cart.",
  colorRequired: "Please select a color before adding to cart.",
  generic: "Something went wrong. Please try again.",
};

export function calculateDiscount(price, originalPrice) {
  if (!originalPrice || !price || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatCurrency(amount = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function getInitials(name = "") {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials.slice(0, 2) || "?";
}
