import { useState, useEffect } from "react";

const brands = [
  {
    id: 1,
    name: "LUXURY COLLECTION",
    tagline: "Elegance Redefined",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    bg: "from-gray-900 via-gray-800 to-black",
    accent: "from-gold-400 to-yellow-500"
  },
  {
    id: 2,
    name: "STREET STYLE",
    tagline: "Urban Fashion",
    discount: "BUY 2 GET 1",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    bg: "from-indigo-600 via-purple-600 to-pink-600",
    accent: "from-cyan-400 to-blue-500"
  },
  {
    id: 3,
    name: "SUMMER VIBES",
    tagline: "Beach Ready",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    bg: "from-cyan-400 via-blue-400 to-indigo-500",
    accent: "from-orange-400 to-red-500"
  },
  {
    id: 4,
    name: "WINTER WARMTH",
    tagline: "Cozy Collection",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    bg: "from-slate-700 via-slate-600 to-slate-800",
    accent: "from-rose-400 to-pink-500"
  }
];

export default function BrandShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % brands.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left side - Slider */}
          <div className="relative h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-2xl">
            {brands.map((brand, idx) => (
              <div
                key={brand.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  idx === active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                }`}
              >
                <div className={`relative h-full bg-gradient-to-br ${brand.bg}`}>
                  {/* Background image */}
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />

                  {/* Animated grid pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "50px 50px"
                  }} />

                  {/* Floating elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-bounce" style={{ animationDuration: "3s" }} />
                  <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm animate-pulse" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
                    <div className={`inline-block bg-gradient-to-r ${brand.accent} text-white text-xs md:text-sm font-black px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6 shadow-xl w-fit`}>
                      {brand.discount}
                    </div>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 tracking-tighter drop-shadow-2xl">
                      {brand.name}
                    </h3>
                    <p className="text-xl md:text-2xl text-white/90 font-bold mb-6 md:mb-8 drop-shadow-lg">
                      {brand.tagline}
                    </p>
                    <button className="bg-white text-gray-900 px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-sm md:text-base hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xl hover:scale-105 w-fit">
                      EXPLORE COLLECTION
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation dots */}
            <div className="absolute bottom-6 left-6 flex gap-2 z-20">
              {brands.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    idx === active ? "bg-white w-8 md:w-12" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Features grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: "🎁", title: "Free Gifts", desc: "On orders above $50", bg: "from-pink-100 to-rose-100" },
              { icon: "🚚", title: "Fast Delivery", desc: "2-3 business days", bg: "from-blue-100 to-cyan-100" },
              { icon: "💳", title: "Easy Returns", desc: "30 days guarantee", bg: "from-purple-100 to-pink-100" },
              { icon: "⭐", title: "Premium Quality", desc: "Verified products", bg: "from-amber-100 to-yellow-100" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${feature.bg} rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer group`}
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg md:text-xl font-black text-gray-900 mb-2 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
