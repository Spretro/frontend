import { useEffect, useState } from "react";
import { mockProduct } from "../data/mockProduct";
import { clamp, ERROR_MESSAGES, PRODUCT_LIMITS } from "../lib/productUtils";

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

        // MOCK DATA START
        // TODO(BACKEND): Replace delay and assignment with GET /products/:id.
        await new Promise((resolve) => setTimeout(resolve, 300));
        const productResponse = mockProduct;
        // MOCK DATA END

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
    const hasColorVariants = (product?.colorVariants || []).length > 0;

    if (!selectedSize) {
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
