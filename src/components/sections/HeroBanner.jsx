import { useState, useEffect } from "react";
import { heroSlides } from "../../data";

const stats = [
  {
    value: "10M+",
    label: "Happy Customers",
    bg: "linear-gradient(135deg, #6A2CFF 0%, #9B6DFF 100%)",
    shadow: "rgba(106,44,255,0.4)",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "50K+",
    label: "Top Brands",
    bg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    shadow: "rgba(15,23,42,0.5)",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: "Free",
    label: "Easy Returns",
    bg: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
    shadow: "rgba(5,150,105,0.4)",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    value: "60 Min",
    label: "Fast Delivery",
    bg: "linear-gradient(135deg, #92400E 0%, #D97706 100%)",
    shadow: "rgba(217,119,6,0.4)",
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  const goNext = () => setActive((p) => (p + 1) % heroSlides.length);
  const goPrev = () => setActive((p) => (p - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full" style={{ background: "#F9F8FF" }}>

      {/* ── Slider card ── */}
      <div className="px-2 sm:px-4 md:px-6 pt-3 md:pt-4">
        <div className="max-w-360 mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-3xl"
            style={{ height: "clamp(360px, 58vh, 680px)" }}
          >
            {/* Blobs */}
            <div className="absolute top-1/4 right-1/3 size-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none z-10" />
            <div className="absolute bottom-1/4 left-1/4 size-40 rounded-full bg-rose-500/15 blur-3xl pointer-events-none z-10" />

            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute inset-x-5 md:inset-x-10 bottom-10 md:bottom-12 max-w-xl">
                  {slide.tag && (
                    <span className="mb-2 inline-flex items-center gap-2 bg-[#6A2CFF] text-white text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                      <span className="size-1.5 rounded-full bg-white/80 animate-pulse" />
                      {slide.tag}
                    </span>
                  )}
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-2xl text-white/55 font-bold mt-1 mb-3 md:mb-4 tracking-widest uppercase">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <button className="bg-white text-gray-900 px-5 md:px-7 py-2 md:py-2.5 rounded-full font-black text-xs md:text-sm hover:bg-[#6A2CFF] hover:text-white transition-all duration-300 shadow-xl">
                      Shop Now
                    </button>
                    <button className="border-2 border-white/30 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-white/10 hover:border-white/60 transition-all">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 bg-white/15 hover:bg-white/35 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <svg className="size-3.5 md:size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 bg-white/15 hover:bg-white/35 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <svg className="size-3.5 md:size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots + counter */}
            <div className="absolute bottom-3 inset-x-5 md:inset-x-10 flex items-center gap-3 z-20">
              <span className="text-white/40 text-[9px] font-bold tabular-nums shrink-0">
                {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(heroSlides.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === active ? "w-6 h-1.5 bg-white" : "size-1.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── separated with gap */}
      <div className="px-2 sm:px-4 md:px-6 pt-3 md:pt-4 pb-1">
        <div className="max-w-360 mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              style={{
                background: s.bg,
                boxShadow: `0 4px 20px ${s.shadow}`,
              }}
            >
              {/* Shine */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/15 to-transparent pointer-events-none" />
              {/* Decorative circle */}
              <div className="absolute -right-4 -top-4 size-16 rounded-full bg-white/8 pointer-events-none" />
              {/* Icon */}
              <div className="shrink-0 size-10 md:size-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                {s.icon}
              </div>
              {/* Text */}
              <div className="min-w-0">
                <p className="text-xl md:text-3xl font-black text-white leading-none tracking-tight">
                  {s.value}
                </p>
                <p className="text-[11px] md:text-sm text-white/70 font-semibold mt-1 leading-tight truncate">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
