import { useEffect, useState } from "react";
import { mockProduct } from "../data/mockProduct";
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

// Maps a DummyJSON product into the shape the product page expects.
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
          // Curated showcase product (full sizes/colors/offers).
          await new Promise((resolve) => setTimeout(resolve, 200));
          productResponse = mockProduct;
        } else {
          // TODO(BACKEND): Replace with GET /products/:id from your API.
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          if (!response.ok) throw new Error(ERROR_MESSAGES.productNotFound);
          const data = await response.json();
          productResponse = mapApiProduct(data);
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
    setQuantity((prev) =>
      Math.min(prev + 1, PRODUCT_LIMITS.maxQuantity)
    );
  };

  const decrementQuantity = () => {
    setQuantity((prev) =>
      Math.max(prev - 1, PRODUCT_LIMITS.minQuantity)
    );
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
