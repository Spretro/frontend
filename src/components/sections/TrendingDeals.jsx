import { useState, useEffect } from "react";

const deals = [
  {
    id: 1,
    title: "FLASH SALE",
    subtitle: "Up to 70% OFF",
    description: "Limited Time Offer",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    bg: "from-orange-500 via-red-500 to-pink-600",
    shape: "circle"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh Styles",
    description: "Just Dropped Today",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    bg: "from-purple-500 via-pink-500 to-rose-500",
    shape: "square"
  },
  {
    id: 3,
    title: "BEST SELLERS",
    subtitle: "Top Picks",
    description: "Most Loved Items",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    bg: "from-blue-500 via-cyan-500 to-teal-500",
    shape: "triangle"
  },
  {
    id: 4,
    title: "EXCLUSIVE",
    subtitle: "Members Only",
    description: "Premium Collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    bg: "from-amber-500 via-yellow-500 to-lime-500",
    shape: "hexagon"
  }
];

export default function TrendingDeals() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % deals.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 md:px-8 py-8 md:py-12 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            🔥 Trending Deals
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">Don't miss out on these hot offers!</p>
        </div>

        <div className="relative h-[400px] md:h-[500px]">
          {deals.map((deal, idx) => (
            <div
              key={deal.id}
              className={`absolute inset-0 transition-all duration-700 ${
                idx === active ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className={`relative h-full rounded-[32px] overflow-hidden shadow-2xl bg-gradient-to-br ${deal.bg}`}>
                {/* Background image */}
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                />

                {/* Decorative shapes based on type */}
                {deal.shape === "circle" && (
                  <>
                    <div className="absolute top-10 right-10 w-32 h-32 border-8 border-white/20 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                    <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm" />
                  </>
                )}
                {deal.shape === "square" && (
                  <>
                    <div className="absolute top-16 right-16 w-40 h-40 border-8 border-white/20 rotate-45 animate-pulse" />
                    <div className="absolute bottom-16 left-16 w-28 h-28 bg-white/10 backdrop-blur-sm rotate-12" />
                  </>
                )}
                {deal.shape === "triangle" && (
                  <>
                    <div className="absolute top-12 right-12 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-white/20 animate-bounce" style={{ animationDuration: "3s" }} />
                  </>
                )}
                {deal.shape === "hexagon" && (
                  <>
                    <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 backdrop-blur-sm" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                  </>
                )}

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl">
                    <p className="text-xs md:text-sm text-white/90 font-bold uppercase tracking-widest mb-3">
                      {deal.description}
                    </p>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
                      {deal.title}
                    </h3>
                    <p className="text-2xl md:text-4xl text-white font-bold mb-6 md:mb-8 drop-shadow-lg">
                      {deal.subtitle}
                    </p>
                    <button className="bg-white text-gray-900 px-8 md:px-12 py-3 md:py-4 rounded-full font-black text-sm md:text-base hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xl hover:scale-110">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
          {deals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="relative h-1.5 md:h-2 w-16 md:w-20 bg-gray-200 rounded-full overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 transition-all duration-300 ${
                  idx === active ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
