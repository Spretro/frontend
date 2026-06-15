import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("spretro_wishlist") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("spretro_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isWishlisted = useCallback(
    (id) => wishlistItems.some((i) => i.id === id),
    [wishlistItems]
  );

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name || product.title,
          brand: product.brand || "SPRETRO",
          price: product.price,
          image: product.images?.[0] || product.thumbnail,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
