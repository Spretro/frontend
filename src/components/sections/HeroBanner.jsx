import { useState, useEffect } from "react";
import { heroSlides } from "../../data";

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-8 py-6">
      <div className="relative rounded-[32px] overflow-hidden shadow-2xl" style={{ height: "600px" }}>
        {/* Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />
            
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-64 h-64 border-4 border-white/10 rounded-full animate-pulse" />
            <div className="absolute bottom-32 left-32 w-40 h-40 border-4 border-white/10 rounded-full" />

            {/* Tag */}
            {slide.tag && (
              <span className="absolute top-10 left-10 bg-white/95 backdrop-blur-md text-gray-900 text-sm font-black px-6 py-3 rounded-full shadow-2xl uppercase tracking-wider">
                {slide.tag}
              </span>
            )}

            {/* Content */}
            <div className="absolute bottom-16 left-16 z-10 max-w-2xl">
              <h2 className="text-8xl font-black text-white leading-none tracking-tighter mb-4 drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-4xl text-white/95 font-bold tracking-wide drop-shadow-xl mb-8">
                {slide.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-2xl hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === active ? "w-12 h-3 bg-rose-600" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
