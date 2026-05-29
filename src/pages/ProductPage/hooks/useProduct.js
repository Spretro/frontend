import { useState, useEffect, useCallback } from 'react';
import mockDataFile from '../mockData.json';
import { PRODUCT_CONSTANTS, ERROR_MESSAGES } from '../../../utils/constants';
import { clamp } from '../../../utils/helpers';

// Extract mock product data
const mockProductData = mockDataFile.product;

/**
 * Custom hook for managing product data, selections, and cart operations
 * 
 * @param {string} productId - The product ID to fetch
 * @returns {Object} Product state and action handlers
 */
export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(PRODUCT_CONSTANTS.MIN_QUANTITY);
  const [cartLoading, setCartLoading] = useState(false);

  /**
   * Fetch product data from API
   * In production, replace with actual API endpoint
   */
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API call
        // Example production code:
        // const response = await fetch(`${API_ENDPOINTS.GET_PRODUCT}/${productId}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        // 
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || ERROR_MESSAGES.FETCH_ERROR);
        // }
        // 
        // const data = await response.json();
        // setProduct(data);
        // setSelectedSize(data.sizes?.[0] || null);
        // setSelectedColor(data.colors?.[0]?.name || null);

        // Simulate API delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data - replace with actual API response
        setProduct(mockProductData);
        setSelectedSize(mockProductData.sizes?.[0] || null);
        setSelectedColor(mockProductData.colors?.[0]?.name || null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_ERROR;
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /**
   * Update selected size
   */
  const updateSize = useCallback((size) => {
    setSelectedSize(size);
    setError(null);
  }, []);

  /**
   * Update selected color
   */
  const updateColor = useCallback((colorName) => {
    setSelectedColor(colorName);
    setError(null);
  }, []);

  /**
   * Update quantity with validation
   */
  const updateQuantity = useCallback((qty) => {
    const numQty = typeof qty === 'string' ? parseInt(qty, 10) : qty;
    if (isNaN(numQty)) return;

    const clampedQty = clamp(numQty, PRODUCT_CONSTANTS.MIN_QUANTITY, PRODUCT_CONSTANTS.MAX_QUANTITY);
    setQuantity(clampedQty);
    setError(null);
  }, []);

  /**
   * Increment quantity
   */
  const incrementQuantity = useCallback(() => {
    setQuantity((prev) =>
      Math.min(prev + 1, PRODUCT_CONSTANTS.MAX_QUANTITY)
    );
  }, []);

  /**
   * Decrement quantity
   */
  const decrementQuantity = useCallback(() => {
    setQuantity((prev) =>
      Math.max(prev - 1, PRODUCT_CONSTANTS.MIN_QUANTITY)
    );
  }, []);

  /**
   * Validate cart addition
   */
  const validateCartAddition = useCallback(() => {
    if (!selectedSize || !selectedColor) {
      setError(ERROR_MESSAGES.SIZE_COLOR_ERROR);
      return false;
    }
    return true;
  }, [selectedSize, selectedColor]);

  /**
   * Add product to cart
   * In production, replace with actual API endpoint
   */
  const addToCart = useCallback(async () => {
    if (!validateCartAddition()) {
      return false;
    }

    try {
      setCartLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // Example production code:
      // const response = await fetch(API_ENDPOINTS.ADD_TO_CART, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${authToken}`,
      //   },
      //   body: JSON.stringify({
      //     productId,
      //     size: selectedSize,
      //     color: selectedColor,
      //     quantity,
      //   }),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || ERROR_MESSAGES.GENERIC_ERROR);
      // }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      console.error('Error adding to cart:', err);
      return false;
    } finally {
      setCartLoading(false);
    }
  }, [validateCartAddition]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    product,
    loading,
    error,
    selectedSize,
    selectedColor,
    quantity,
    cartLoading,

    // Actions
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
};
