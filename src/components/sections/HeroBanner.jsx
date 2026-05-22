import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data";

function HeroCard({ slide, size = "large" }) {
  const isLarge = size === "large";
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${slide.bg} flex flex-col justify-end ${
        isLarge ? "h-72" : "h-[136px]"
      }`}
    >
      {/* Decorative fashion silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-24 h-40 bg-white/30 rounded-full blur-2xl" />
      </div>
      {/* Fashion figure placeholder */}
      <div className="absolute top-0 right-4 bottom-0 flex items-end justify-center">
        <div
          className="w-20 rounded-t-full opacity-40"
          style={{ height: "85%", background: `linear-gradient(to top, ${slide.accent}88, transparent)` }}
        />
      </div>
      {slide.tag && (
        <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/30">
          {slide.tag}
        </span>
      )}
      <div className="relative p-4">
        <h2 className={`font-black text-white leading-tight ${isLarge ? "text-2xl" : "text-base"}`}>
          {slide.title}
        </h2>
        <p className="text-white/80 text-xs font-semibold mt-0.5">{slide.subtitle}</p>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-4 py-4">
      <div className="relative grid grid-cols-3 gap-3">
        {/* Large center */}
        <div className="col-span-1 relative group cursor-pointer" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)}>
          <HeroCard slide={heroSlides[(active + heroSlides.length - 1) % heroSlides.length]} />
        </div>
        <div className="col-span-1 cursor-pointer">
          <HeroCard slide={heroSlides[active]} size="large" />
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <HeroCard slide={heroSlides[(active + 1) % heroSlides.length]} size="small" />
          <HeroCard slide={heroSlides[(active + 2) % heroSlides.length]} size="small" />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-5 h-1.5 bg-gray-800" : "w-1.5 h-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
