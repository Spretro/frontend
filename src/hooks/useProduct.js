import { useEffect, useState } from "react";
import { mockProduct, allMockRecommendedProducts } from "../data/mockProduct";
import { clamp, ERROR_MESSAGES, PRODUCT_LIMITS } from "../lib/productUtils";
import { toINR, toOriginalINR } from "../utils/currency";

const GENERIC_OFFERS = [
  { title: "Bank Offer", body: "Up to ₹250 off with select cards", count: "12 offers" },
  { title: "Partner Offers", body: "Buy 2 or more items and get 5% off", count: "3 offers" },
  { title: "Cashback", body: "Earn SPRETRO coins on every order", count: "1 offer" },
];

const APPAREL_HINTS = ["shirt", "dress", "top", "jacket", "jeans", "trouser", "kurta", "saree"];

function titleCase(str = "") {
  return str.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function buildSizes(category = "") {
  const c = category.toLowerCase();
  if (c.includes("shoe")) return ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
  if (APPAREL_HINTS.some((hint) => c.includes(hint))) return ["S", "M", "L", "XL", "XXL"];
  return [];
}

// ---------------------------------------------------------------------------
// Detects whether a product object uses the new backend schema.
// The discriminator is the presence of `sale_price` (paise-based pricing).
// ---------------------------------------------------------------------------
function isBackendSchema(product) {
  return typeof product.sale_price === "number";
}

// ---------------------------------------------------------------------------
// Maps the NEW backend product schema into the shape the product page expects.
// Backend prices are in paise (1 INR = 100 paise).
// ---------------------------------------------------------------------------
function mapBackendProduct(d, extraOffers) {
  const price = typeof d.sale_price === "number" ? d.sale_price / 100 : 0;
  const originalPrice = typeof d.mrp === "number" ? d.mrp / 100 : price;

  // images[] can be {url, alt_text, position_order} objects or plain strings
  const rawImages = Array.isArray(d.images) ? d.images : [];
  const images = rawImages
    .slice()
    .sort((a, b) => (a.position_order ?? 0) - (b.position_order ?? 0))
    .map((img) => (typeof img === "string" ? img : img.url))
    .filter(Boolean);

  // variants[] → unique colors for the color-picker, unique sizes for the size-picker
  const variants = Array.isArray(d.variants) ? d.variants : [];

  const seenColors = new Set();
  const colorVariants = variants.reduce((acc, v) => {
    if (v.color && !seenColors.has(v.color)) {
      seenColors.add(v.color);
      acc.push({
        id: v.color.toLowerCase().replace(/\s+/g, "-"),
        name: v.color,
        image: v.image || images[0] || "",
      });
    }
    return acc;
  }, []);

  const seenSizes = new Set();
  const sizes = variants
    .map((v) => v.size)
    .filter((s) => s && !seenSizes.has(s) && seenSizes.add(s));

  // specifications: backend sends a plain object → convert to [{label, value}] array
  // Guard: if it's already an array (old shape), pass it through.
  let specifications = [];
  if (d.specifications) {
    if (Array.isArray(d.specifications)) {
      specifications = d.specifications;
    } else {
      specifications = Object.entries(d.specifications).map(([key, val]) => ({
        label: titleCase(key.replace(/_/g, " ")),
        value: String(val),
      }));
    }
  }

  // brand: derive a readable name from brand_id or fall back to d.brand
  const brand =
    d.brand ||
    (d.brand_id ? titleCase(d.brand_id.replace(/^brand_/, "")) : "SPRETRO");

  return {
    id: String(d.id),
    name: d.name || d.title || "Product",
    brand,
    shortDescription: d.short_description || d.shortDescription || d.description || "",
    description: d.description || d.short_description || "",
    price,
    originalPrice,
    rating: d.rating ?? 0,
    reviewCount: d.review_count ?? d.reviewCount ?? 0,
    productCode: String(d.id),
    origin: d.origin || "Made in India",
    manufacturer: d.manufacturer || `${brand} Pvt Ltd`,
    images,
    sizes,
    colorVariants,
    offers: extraOffers || GENERIC_OFFERS,
    specifications,
  };
}

// ---------------------------------------------------------------------------
// Maps a DummyJSON product into the shape the product page expects.
// ---------------------------------------------------------------------------
function mapApiProduct(d) {
  const price = toINR(d.price);
  const originalPrice = d.discountPercentage
    ? toOriginalINR(d.price, d.discountPercentage)
    : price;
  const images = (Array.isArray(d.images) && d.images.length ? d.images : [d.thumbnail]).filter(
    Boolean
  );
  const specifications = [
    d.brand && { label: "Brand", value: d.brand },
    d.category && { label: "Category", value: titleCase(d.category) },
    d.sku && { label: "SKU", value: d.sku },
    d.weight != null && { label: "Weight", value: `${d.weight} g` },
    d.warrantyInformation && { label: "Warranty", value: d.warrantyInformation },
    d.shippingInformation && { label: "Shipping", value: d.shippingInformation },
    d.returnPolicy && { label: "Return Policy", value: d.returnPolicy },
    d.stock != null && {
      label: "Availability",
      value: d.stock > 0 ? `In stock (${d.stock} left)` : "Out of stock",
    },
  ].filter(Boolean);

  return {
    id: String(d.id),
    name: d.title,
    brand: d.brand || titleCase(d.category || "SPRETRO"),
    shortDescription: d.description,
    description: d.description,
    price,
    originalPrice,
    rating: Math.round((d.rating ?? 0) * 10) / 10,
    reviewCount: Array.isArray(d.reviews) ? d.reviews.length : 0,
    productCode: String(d.id),
    origin: titleCase(d.category || "Imported"),
    manufacturer: d.brand || "SPRETRO Brands Pvt Ltd",
    images,
    sizes: buildSizes(d.category),
    colorVariants: [],
    offers: GENERIC_OFFERS,
    specifications,
  };
}

// ---------------------------------------------------------------------------
// Normalises an image value to a plain URL string.
// Handles both old (string) and new ({url, ...}) image shapes.
// ---------------------------------------------------------------------------
function imgUrl(img) {
  return typeof img === "string" ? img : img?.url ?? "";
}

export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(PRODUCT_LIMITS.minQuantity);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      if (!productId) {
        setError(ERROR_MESSAGES.productNotFound);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let productResponse;

        if (String(productId) === String(mockProduct.id)) {
          // ── Curated showcase product ────────────────────────────────────────
          await new Promise((resolve) => setTimeout(resolve, 200));
          productResponse = isBackendSchema(mockProduct)
            ? mapBackendProduct(mockProduct, mockProduct.offers)
            : mockProduct;

        } else if (allMockRecommendedProducts[productId]) {
          // ── Recommendation card clicked ─────────────────────────────────────
          await new Promise((resolve) => setTimeout(resolve, 200));
          const rec = allMockRecommendedProducts[productId];

          if (isBackendSchema(rec)) {
            // Full new-schema product in the recommendation list
            productResponse = mapBackendProduct(rec);
          } else {
            // Slim card (old shape) — merge card fields onto the mapped base product
            const base = mapBackendProduct(mockProduct, mockProduct.offers);
            const recPrice =
              typeof rec.price === "number" ? rec.price : (rec.sale_price ?? 0) / 100;
            const recOriginalPrice =
              typeof rec.originalPrice === "number"
                ? rec.originalPrice
                : (rec.mrp ?? 0) / 100;

            productResponse = {
              ...base,
              id: rec.id,
              name: rec.name,
              brand: rec.brand || base.brand,
              price: recPrice,
              originalPrice: recOriginalPrice,
              rating: rec.rating ?? base.rating,
              reviewCount: rec.reviewCount ?? rec.review_count ?? base.reviewCount,
              images: rec.image
                ? [rec.image]
                : base.images,
              colorVariants: [],
              productCode: rec.id,
            };
          }

        } else if (/^\d+$/.test(String(productId))) {
          // ── Numeric ID → DummyJSON external API ────────────────────────────
          // TODO(BACKEND): Replace with GET /products/:id from your API.
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          if (!response.ok) throw new Error(ERROR_MESSAGES.productNotFound);
          const data = await response.json();
          productResponse = mapApiProduct(data);

        } else {
          throw new Error(ERROR_MESSAGES.productNotFound);
        }

        if (ignore) return;

        setProduct(productResponse);
        setSelectedSize(productResponse.sizes?.[0] || null);
        setSelectedColor(productResponse.colorVariants?.[0]?.id || null);
        setQuantity(PRODUCT_LIMITS.minQuantity);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.fetchError;
        setError(errorMessage);
        console.error("Error fetching product:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [productId]);

  const updateSize = (size) => {
    setSelectedSize(size);
    setError(null);
  };

  const updateColor = (variantId) => {
    setSelectedColor(variantId);
    setError(null);
  };

  const updateQuantity = (nextQuantity) => {
    const parsedQuantity =
      typeof nextQuantity === "string"
        ? Number.parseInt(nextQuantity, 10)
        : nextQuantity;

    if (Number.isNaN(parsedQuantity)) return;

    setQuantity(
      clamp(
        parsedQuantity,
        PRODUCT_LIMITS.minQuantity,
        PRODUCT_LIMITS.maxQuantity
      )
    );
    setError(null);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, PRODUCT_LIMITS.maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, PRODUCT_LIMITS.minQuantity));
  };

  const validateCartAddition = () => {
    const hasSizes = (product?.sizes || []).length > 0;
    const hasColorVariants = (product?.colorVariants || []).length > 0;

    if (hasSizes && !selectedSize) {
      setError(ERROR_MESSAGES.sizeRequired);
      return false;
    }

    if (hasColorVariants && !selectedColor) {
      setError(ERROR_MESSAGES.colorRequired);
      return false;
    }

    return true;
  };

  const addToCart = async () => {
    if (!validateCartAddition()) {
      return false;
    }

    try {
      setCartLoading(true);
      setError(null);

      // MOCK DATA START
      // TODO(BACKEND): Replace with POST /cart/items.
      await new Promise((resolve) => setTimeout(resolve, 450));
      console.info("Mock add to cart", {
        productId,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
      // MOCK DATA END

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ERROR_MESSAGES.generic;
      setError(errorMessage);
      console.error("Error adding to cart:", err);
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    product,
    loading,
    error,
    selectedSize,
    selectedColor,
    quantity,
    cartLoading,
    updateSize,
    updateColor,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    setError,
    clearError,
    validateCartAddition,
  };
}
