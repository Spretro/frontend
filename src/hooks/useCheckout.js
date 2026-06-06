import { useEffect, useMemo, useState } from "react";
import {
  mockAddresses,
  mockAvailableOffers,
  mockCartItems,
  mockCheckoutFees,
} from "../data/mockCheckout";
import {
  buildOrderSummary,
  calculateCheckoutTotals,
  CHECKOUT_STORAGE_KEYS,
} from "../lib/checkoutUtils";

function readStoredJson(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

export function useCheckout() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadCheckout = async () => {
      try {
        setLoading(true);
        setError("");

        // MOCK DATA START
        // TODO(BACKEND): Replace with GET /checkout/summary.
        await new Promise((resolve) => setTimeout(resolve, 250));
        // MOCK DATA END

        if (ignore) return;

        const storedAddresses = readStoredJson(
          CHECKOUT_STORAGE_KEYS.addresses,
          mockAddresses
        );
        const storedSelectedAddressId =
          window.localStorage.getItem(CHECKOUT_STORAGE_KEYS.selectedAddressId) ||
          storedAddresses.find((address) => address.isDefault)?.id ||
          storedAddresses[0]?.id ||
          "";

        setCartItems(mockCartItems);
        setAddresses(storedAddresses);
        setSelectedAddressId(storedSelectedAddressId);
      } catch {
        if (!ignore) setError("Failed to load checkout details.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadCheckout();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(
        CHECKOUT_STORAGE_KEYS.addresses,
        JSON.stringify(addresses)
      );
    }
  }, [addresses, loading]);

  useEffect(() => {
    if (!loading && selectedAddressId) {
      window.localStorage.setItem(
        CHECKOUT_STORAGE_KEYS.selectedAddressId,
        selectedAddressId
      );
    }
  }, [loading, selectedAddressId]);

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const totals = useMemo(
    () => calculateCheckoutTotals(cartItems, mockCheckoutFees, appliedCoupon),
    [appliedCoupon, cartItems]
  );

  const applyCoupon = () => {
    const normalizedCoupon = couponCode.trim().toUpperCase();

    if (!normalizedCoupon) {
      setCouponMessage("Enter a coupon code.");
      return false;
    }

    const nextTotals = calculateCheckoutTotals(
      cartItems,
      mockCheckoutFees,
      normalizedCoupon
    );

    if (!nextTotals.couponDiscount) {
      setAppliedCoupon("");
      setCouponMessage("This coupon is not valid for the current order.");
      return false;
    }

    setAppliedCoupon(normalizedCoupon);
    setCouponMessage(`${normalizedCoupon} applied successfully.`);
    return true;
  };

  const saveAddress = async (addressPayload) => {
    try {
      setActionLoading(true);
      setError("");

      // MOCK DATA START
      // TODO(BACKEND): Replace with POST/PUT /addresses.
      await new Promise((resolve) => setTimeout(resolve, 400));
      // MOCK DATA END

      setAddresses((current) => {
        const exists = current.some((address) => address.id === addressPayload.id);
        const nextAddresses = exists
          ? current.map((address) =>
            address.id === addressPayload.id ? addressPayload : address
          )
          : [...current, addressPayload];

        window.localStorage.setItem(
          CHECKOUT_STORAGE_KEYS.addresses,
          JSON.stringify(nextAddresses)
        );

        return nextAddresses;
      });
      setSelectedAddressId(addressPayload.id);
      window.localStorage.setItem(
        CHECKOUT_STORAGE_KEYS.selectedAddressId,
        addressPayload.id
      );
      return true;
    } catch {
      setError("Failed to save address. Please try again.");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const continueToPayment = async () => {
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return null;
    }

    if (!selectedAddress) {
      setError("Add or select a delivery address to continue.");
      return null;
    }

    try {
      setActionLoading(true);
      setError("");

      const orderSummary = buildOrderSummary({
        cartItems,
        selectedAddress,
        totals,
        couponCode: appliedCoupon,
      });

      // TODO(PAYMENT): Hand this payload to Razorpay order creation later.
      await new Promise((resolve) => setTimeout(resolve, 350));
      console.info("Mock order summary ready for Razorpay", orderSummary);

      return orderSummary;
    } catch {
      setError("Could not prepare payment. Please try again.");
      return null;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    cartItems,
    addresses,
    selectedAddress,
    selectedAddressId,
    availableOffers: mockAvailableOffers,
    couponCode,
    appliedCoupon,
    couponMessage,
    totals,
    loading,
    actionLoading,
    error,
    setCouponCode,
    setSelectedAddressId,
    setError,
    applyCoupon,
    saveAddress,
    continueToPayment,
  };
}
