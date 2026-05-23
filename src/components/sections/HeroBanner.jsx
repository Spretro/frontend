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
    <section className="px-4 md:px-8 py-4 md:py-6">
      <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl" style={{ height: "clamp(400px, 50vw, 600px)" }}>
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
            <div className="absolute top-10 md:top-20 right-10 md:right-20 w-32 h-32 md:w-64 md:h-64 border-4 border-white/10 rounded-full animate-pulse" />
            <div className="absolute bottom-16 md:bottom-32 left-16 md:left-32 w-20 h-20 md:w-40 md:h-40 border-4 border-white/10 rounded-full" />

            {/* Tag */}
            {slide.tag && (
              <span className="absolute top-4 md:top-10 left-4 md:left-10 bg-white/95 backdrop-blur-md text-gray-900 text-xs md:text-sm font-black px-4 md:px-6 py-2 md:py-3 rounded-full shadow-2xl uppercase tracking-wider">
                {slide.tag}
              </span>
            )}

            {/* Content */}
            <div className="absolute bottom-8 md:bottom-16 left-4 md:left-16 right-4 z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-2 md:mb-4 drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-xl md:text-3xl lg:text-4xl text-white/95 font-bold tracking-wide drop-shadow-xl mb-4 md:mb-8">
                {slide.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-2xl hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-8">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === active ? "w-8 md:w-12 h-2 md:h-3 bg-rose-600" : "w-2 md:w-3 h-2 md:h-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
