import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ChevronRight, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

const PROMO_CODES = { SPRETRO20: 20, FIRST10: 10, SAVE15: 15 };
const DELIVERY_FEE = 99;
const FREE_DELIVERY_THRESHOLD = 4999;

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [removing, setRemoving] = useState(null);
  const [bumping, setBumping] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const items = cartItems;

  const handleUpdateQty = (id, delta) => {
    updateQty(id, delta);
    setBumping(id);
    setTimeout(() => setBumping(null), 300);
  };

  const removeItem = (id) => {
    setRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemoving(null);
    }, 380);
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, pct: PROMO_CODES[code] });
      setPromoSuccess(`${PROMO_CODES[code]}% discount applied!`);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try SPRETRO20");
      setPromoSuccess("");
      setAppliedPromo(null);
    }
  };

  const totalQty  = items.reduce((s, i) => s + i.qty, 0);
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = appliedPromo ? Math.round(subtotal * appliedPromo.pct / 100) : 0;
  const delivery  = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total     = subtotal - discount + delivery;
  const toFree    = FREE_DELIVERY_THRESHOLD - subtotal;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", background: "#F9F8FF", padding: 32 }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg,#6A2CFF,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 16px 40px rgba(106,44,255,0.3)" }}>
          <ShoppingBag size={40} color="white" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-0.8px", margin: "0 0 10px" }}>Your cart is empty</h2>
        <p style={{ fontSize: 14, color: "#999", marginBottom: 36, fontWeight: 500 }}>Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate("/")}
          style={{ height: 50, padding: "0 36px", borderRadius: 50, background: "linear-gradient(135deg,#3D0ECC,#6A2CFF)", color: "white", border: "none", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 8px 28px rgba(106,44,255,0.4)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(106,44,255,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(106,44,255,0.4)"; }}
        >
          Shop Now <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F9F8FF", fontFamily: "'Inter', sans-serif" }}>

      <style>{`
        @keyframes slideOut {
          0%  { opacity:1; transform:translateX(0) scaleY(1); max-height:200px; margin-bottom:16px; }
          100%{ opacity:0; transform:translateX(32px) scaleY(0.85); max-height:0; margin-bottom:0; padding:0; }
        }
        @keyframes slideIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes bump {
          0%,100%{ transform:scale(1);    }
          40%    { transform:scale(1.18); }
        }
        .cart-item         { animation: slideIn 0.32s ease; overflow:hidden; }
        .cart-item.leaving { animation: slideOut 0.38s ease forwards; }
        .qty-num.bump      { animation: bump 0.28s ease; }
        .remove-btn:hover  { background:#FEE2E2!important; color:#DC2626!important; transform:scale(1.08); }
        .qty-btn:hover     { background:#6A2CFF!important; color:white!important; }
        .item-card:hover   { box-shadow:0 10px 32px rgba(106,44,255,0.13)!important; border-color:#C4B5FD!important; }
        .checkout-btn:hover{ box-shadow:0 14px 44px rgba(106,44,255,0.52)!important; transform:translateY(-2px); }
        .continue-btn:hover{ background:#EDE8FF!important; }
        .promo-btn:hover   { background:#5A1FEE!important; }
        @media(max-width:900px){
          .cart-grid{ grid-template-columns:1fr!important; }
          .summary-sticky{ position:static!important; }
        }
        @media(max-width:560px){
          .item-card{ flex-direction:column!important; align-items:flex-start!important; }
          .item-controls{ flex-direction:row!important; align-items:center!important; justify-content:space-between!important; width:100%!important; margin-top:12px!important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px 72px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontSize: 13, color: "#aaa", fontWeight: 600 }}>
          <span style={{ cursor: "pointer", color: "#6A2CFF", transition: "opacity 0.15s" }} onClick={() => navigate("/")}>Home</span>
          <ChevronRight size={13} />
          <span style={{ color: "#444" }}>Cart</span>
        </div>

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-1.8px", lineHeight: 1, margin: 0 }}>Your Cart</h1>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#6A2CFF", background: "#EDE8FF", padding: "5px 14px", borderRadius: 50, letterSpacing: "0.02em" }}>
            {totalQty} {totalQty === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Grid */}
        <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, alignItems: "start" }}>

          {/* ── LEFT — Items ── */}
          <div>
            {items.map(item => (
              <div
                key={item.id}
                className={`cart-item item-card${removing === item.id ? " leaving" : ""}`}
                style={{ background: "white", borderRadius: 22, padding: "20px 22px", display: "flex", gap: 20, alignItems: "center", boxShadow: "0 2px 14px rgba(106,44,255,0.06)", border: "1.5px solid #F0EBFF", transition: "box-shadow 0.22s, border-color 0.22s", marginBottom: 16 }}
              >
                {/* Image */}
                <div style={{ width: 110, height: 110, borderRadius: 16, overflow: "hidden", flexShrink: 0, background: "#F5F3FF" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#9B6DFF", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 5 }}>{item.brand}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#0F0A1E", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#777", background: "#F5F3FF", padding: "3px 11px", borderRadius: 50 }}>Size: {item.size}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#777", background: "#F5F3FF", padding: "3px 11px", borderRadius: 50 }}>Color: {item.color}</span>
                  </div>
                  <div style={{ fontSize: 21, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-0.5px" }}>
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    {item.qty > 1 && <span style={{ fontSize: 12, fontWeight: 600, color: "#aaa", marginLeft: 8 }}>₹{item.price.toLocaleString("en-IN")} each</span>}
                  </div>
                </div>

                {/* Controls */}
                <div className="item-controls" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, flexShrink: 0 }}>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    title="Remove"
                    style={{ width: 36, height: 36, borderRadius: 11, border: "none", background: "#FFF5F5", color: "#F87171", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                  >
                    <Trash2 size={15} strokeWidth={2.5} />
                  </button>

                  <div style={{ display: "flex", alignItems: "center", background: "#F5F3FF", borderRadius: 50, padding: 3 }}>
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQty(item.id, -1)}
                      style={{ width: 34, height: 34, borderRadius: 50, border: "none", background: "transparent", color: "#6A2CFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}
                    >
                      <Minus size={13} strokeWidth={3} />
                    </button>
                    <span
                      className={`qty-num${bumping === item.id ? " bump" : ""}`}
                      style={{ width: 34, textAlign: "center", fontSize: 16, fontWeight: 900, color: "#0F0A1E", display: "inline-block" }}
                    >
                      {item.qty}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQty(item.id, 1)}
                      style={{ width: 34, height: 34, borderRadius: 50, border: "none", background: "transparent", color: "#6A2CFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s" }}
                    >
                      <Plus size={13} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="continue-btn"
              onClick={() => navigate("/")}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "#6A2CFF", background: "transparent", border: "1.5px solid #C4B5FD", borderRadius: 50, padding: "9px 22px", cursor: "pointer", transition: "all 0.2s", marginTop: 4 }}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div className="summary-sticky" style={{ background: "white", borderRadius: 26, padding: 30, boxShadow: "0 4px 28px rgba(106,44,255,0.09)", border: "1.5px solid #F0EBFF", position: "sticky", top: 24 }}>

            {/* Header */}
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-0.4px", margin: "0 0 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              Order Summary
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9B6DFF", background: "#EDE8FF", padding: "3px 10px", borderRadius: 50 }}>{totalQty} items</span>
            </h2>

            {/* Free delivery progress */}
            <div style={{ marginBottom: 22 }}>
              {delivery > 0 ? (
                <>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6A2CFF", marginBottom: 8 }}>
                    Add <span style={{ color: "#EC4899" }}>₹{toFree.toLocaleString("en-IN")}</span> more for free delivery
                  </div>
                  <div style={{ height: 5, background: "#EDE8FF", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`, background: "linear-gradient(90deg,#6A2CFF,#EC4899)", borderRadius: 10, transition: "width 0.5s ease" }} />
                  </div>
                </>
              ) : (
                <div style={{ background: "linear-gradient(135deg,#D1FAE5,#A7F3D0)", borderRadius: 12, padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "#059669" }}>
                  🎉 You unlocked free delivery!
                </div>
              )}
            </div>

            {/* Line items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#777", fontWeight: 500 }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: "#0F0A1E" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {appliedPromo && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, color: "#059669", fontWeight: 700 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Discount
                    <span style={{ fontSize: 10, background: "#D1FAE5", padding: "2px 8px", borderRadius: 50 }}>{appliedPromo.code}</span>
                  </span>
                  <span>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#777", fontWeight: 500 }}>
                <span>Delivery Fee</span>
                <span style={{ fontWeight: 700, color: delivery === 0 ? "#059669" : "#0F0A1E" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
            </div>

            <div style={{ height: 1.5, background: "linear-gradient(90deg,#E8DFFF,#FCE7F3,#E8DFFF)", borderRadius: 2, marginBottom: 18 }} />

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#0F0A1E" }}>Total</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#0F0A1E", letterSpacing: "-1px", lineHeight: 1 }}>₹{total.toLocaleString("en-IN")}</div>
                {discount > 0 && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginTop: 2 }}>You save ₹{discount.toLocaleString("en-IN")}</div>
                )}
              </div>
            </div>

            {/* Promo code */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#F9F7FF", border: `1.5px solid ${promoError ? "#FCA5A5" : promoSuccess ? "#6EE7B7" : "#E8DFFF"}`, borderRadius: 12, padding: "0 14px", transition: "border-color 0.2s" }}>
                  <Tag size={14} color="#9B6DFF" strokeWidth={2} />
                  <input
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value); setPromoError(""); setPromoSuccess(""); }}
                    onKeyDown={e => e.key === "Enter" && applyPromo()}
                    placeholder="Promo code"
                    style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, fontWeight: 600, color: "#333", outline: "none", height: 42, letterSpacing: "0.04em" }}
                  />
                  {promoCode && (
                    <button onClick={() => { setPromoCode(""); setPromoError(""); setPromoSuccess(""); setAppliedPromo(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", display: "flex", alignItems: "center", padding: 0 }}>
                      <X size={13} />
                    </button>
                  )}
                </div>
                <button
                  className="promo-btn"
                  onClick={applyPromo}
                  style={{ padding: "0 18px", borderRadius: 12, background: "#6A2CFF", color: "white", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", letterSpacing: "0.04em" }}
                >
                  Apply
                </button>
              </div>
              {promoError   && <p style={{ fontSize: 11, color: "#DC2626", fontWeight: 600, margin: "6px 0 0 2px" }}>{promoError}</p>}
              {promoSuccess && <p style={{ fontSize: 11, color: "#059669", fontWeight: 600, margin: "6px 0 0 2px" }}>✓ {promoSuccess}</p>}
            </div>

            {/* Checkout button */}
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
              style={{ width: "100%", height: 54, borderRadius: 16, background: "linear-gradient(135deg,#3D0ECC 0%,#6A2CFF 55%,#9B6DFF 100%)", color: "white", border: "none", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 8px 30px rgba(106,44,255,0.4)", transition: "all 0.22s" }}
            >
              Go to Checkout <ArrowRight size={17} strokeWidth={2.5} />
            </button>

            {/* Trust strip */}
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 18, paddingTop: 18, borderTop: "1px solid #F5F3FF" }}>
              {[["🔒","Secure Pay"], ["↩","Easy Returns"], ["⚡","Fast Delivery"]].map(([icon, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 15, marginBottom: 2 }}>{icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", whiteSpace: "nowrap" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
