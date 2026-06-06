import { useState } from "react";
import { Heart, ShoppingBag, Plus, Minus } from "lucide-react";
import { toINR } from "../../utils/currency";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, badge }) {
  const [liked, setLiked] = useState(false);
  const { addToCart, updateQty, removeFromCart, cartItems } = useCart();

  const disc = Math.round(product.discountPercentage);
  const finalPrice = toINR(product.price);
  const originalPrice = disc > 0 ? Math.round(finalPrice / (1 - disc / 100)) : finalPrice;

  const cartItem = cartItems.find(i => i.id === product.id);
  const qty = cartItem?.qty ?? 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQty(product.id, 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (qty <= 1) removeFromCart(product.id);
    else updateQty(product.id, -1);
  };

  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
      style={{ boxShadow: "0 2px 16px rgba(106,44,255,0.07)" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(106,44,255,0.18)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(106,44,255,0.07)")}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {badge ? (
          <span className="absolute top-3 left-3 bg-[#6A2CFF] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        ) : disc >= 25 ? (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            {disc}% OFF
          </span>
        ) : null}

        <button
          className="absolute top-3 right-3 size-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
        >
          <Heart size={14} strokeWidth={2} className={liked ? "fill-rose-500 text-rose-500" : "text-gray-500"} />
        </button>

        {/* Floating qty badge on image when in cart */}
        {qty > 0 && (
          <span className="absolute bottom-3 left-3 bg-[#6A2CFF] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
            {qty} in cart
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6A2CFF] mb-0.5 truncate">
          {product.brand || "SPRETRO"}
        </p>
        <p className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          {product.title}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <svg
              key={n}
              className={`w-3 h-3 ${n <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 font-medium ml-1">{product.rating?.toFixed(1)}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
          <span className="text-base font-black text-gray-900">₹{finalPrice.toLocaleString("en-IN")}</span>
          {disc > 0 && (
            <>
              <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                {disc}% off
              </span>
            </>
          )}
        </div>

        {/* Add to Cart / Qty controls */}
        {qty === 0 ? (
          <button
            className="w-full py-2.5 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-gray-950 group-hover:bg-[#6A2CFF]"
            onClick={handleAdd}
          >
            <ShoppingBag size={13} strokeWidth={2} />
            Add to Cart
          </button>
        ) : (
          <div
            className="w-full rounded-2xl flex items-center overflow-hidden"
            style={{ background: "linear-gradient(135deg,#3D0ECC,#6A2CFF)", height: 38 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDecrease}
              className="flex items-center justify-center transition-all duration-150 hover:bg-white/20 active:scale-90"
              style={{ width: 38, height: 38, flexShrink: 0, border: "none", background: "transparent", cursor: "pointer", color: "white" }}
            >
              <Minus size={13} strokeWidth={3} />
            </button>

            <span style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 900, color: "white", letterSpacing: "-0.3px" }}>
              {qty}
            </span>

            <button
              onClick={handleIncrease}
              className="flex items-center justify-center transition-all duration-150 hover:bg-white/20 active:scale-90"
              style={{ width: 38, height: 38, flexShrink: 0, border: "none", background: "transparent", cursor: "pointer", color: "white" }}
            >
              <Plus size={13} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
