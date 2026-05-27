import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toINR } from "../utils/currency";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("spretro_cart") || "[]"); }
    catch { return []; }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem("spretro_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        id: product.id,
        name: product.title,
        brand: product.brand || "SPRETRO",
        price: toINR(product.price),
        image: product.thumbnail,
        size: "M",
        color: "Default",
        qty: 1,
      }];
    });

    const id = Date.now();
    setToasts(prev => [...prev, { id, name: product.title, image: product.thumbnail }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalQty }}>
      {children}

      {/* ── Toast stack ── */}
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateX(120px) scale(0.92); }
          to   { opacity:1; transform:translateX(0)      scale(1);    }
        }
        @keyframes toastOut {
          from { opacity:1; transform:translateX(0) scale(1);        max-height:80px; margin-bottom:10px; }
          to   { opacity:0; transform:translateX(120px) scale(0.92); max-height:0;    margin-bottom:0;    }
        }
        .spretro-toast { animation: toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <div style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        display: "flex", flexDirection: "column", gap: 10,
        pointerEvents: "none",
      }}>
        {toasts.map(t => (
          <div key={t.id} className="spretro-toast" style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "white", borderRadius: 16, padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(106,44,255,0.18), 0 2px 8px rgba(0,0,0,0.08)",
            border: "1.5px solid #EDE8FF", minWidth: 280, maxWidth: 340,
            pointerEvents: "auto",
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", background: "#F5F3FF", flexShrink: 0 }}>
              <img src={t.image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#6A2CFF", marginBottom: 2 }}>✓ Added to Cart</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0F0A1E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#6A2CFF,#EC4899)", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
