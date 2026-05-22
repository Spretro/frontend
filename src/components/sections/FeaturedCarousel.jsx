import { useState, useEffect } from "react";

const featuredProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    title: "NEW JEWELZ",
    subtitle: "UPTO 94% OFF",
    brands: ["YELLOW CHIMES", "JUST UP THINGS", "Glazzio"],
    bg: "from-amber-100 to-stone-200"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80",
    title: "NEW ARRIVALS",
    subtitle: "UPTO 50% OFF",
    brand: "NEEMAN'S",
    bg: "from-gray-200 to-gray-300"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    title: "NEW",
    subtitle: "STARTING",
    bg: "from-amber-200 to-yellow-100"
  }
];

export default function FeaturedCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-8 py-6">
      <div className="relative">
        {/* Carousel */}
        <div className="flex gap-4 overflow-hidden">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                idx === 0 ? "w-[40%]" : idx === 1 ? "w-[35%]" : "w-[25%]"
              }`}
              style={{ minHeight: "420px" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.bg}`} />
              
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Brands (if any) */}
              {product.brands && (
                <div className="absolute top-6 left-6 flex gap-3">
                  {product.brands.map((brand, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-semibold text-gray-800">{brand}</span>
                    </div>
                  ))}
                </div>
              )}

              {product.brand && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <span className="text-sm font-bold text-gray-900">{product.brand}</span>
                </div>
              )}

              {/* Text content */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-4xl font-black tracking-wider mb-2 drop-shadow-lg">
                  {product.title}
                </h3>
                <p className="text-white text-xl font-bold tracking-wide drop-shadow-lg">
                  {product.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`rounded-full transition-all ${
                idx === active
                  ? "w-8 h-2 bg-gray-800"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
