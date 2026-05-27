import { useNavigate } from "react-router-dom";

const MAIN = {
  tag: "SUMMER EDIT 2025",
  title: "Flat 40%",
  titleAccent: "Off",
  sub: "On 1000+ handpicked styles across women, men & kids",
  cta: "Shop the Sale",
  path: "/sale",
  image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85",
};

const SIDE = [
  {
    tag: "NEW IN",
    title: "Fresh Drops",
    sub: "New styles every week",
    cta: "Explore",
    path: "/new-in",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=85",
    overlay: "linear-gradient(160deg, rgba(232,62,108,0.72) 0%, rgba(15,23,42,0.55) 100%)",
  },
  {
    tag: "SNEAKER DROP",
    title: "The Kick Edit",
    sub: "Top sneaker brands, curated",
    cta: "Shop Sneakers",
    path: "/category/sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    overlay: "linear-gradient(160deg, rgba(15,23,42,0.75) 0%, rgba(106,44,255,0.45) 100%)",
  },
];

export default function PromoBanner() {
  const navigate = useNavigate();

  return (
    <section className="px-3 sm:px-4 md:px-6 py-4 md:py-5" style={{ background: "#F9F8FF" }}>
      <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-3 md:gap-4" style={{ minHeight: 420 }}>

        {/* ── Main tall card ── */}
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group"
          style={{ minHeight: 380 }}
          onClick={() => navigate(MAIN.path)}
        >
          <img
            src={MAIN.image}
            alt={MAIN.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(15,10,35,0.78) 0%, rgba(106,44,255,0.35) 60%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
            <span className="self-start text-[9px] md:text-[10px] font-black tracking-[0.22em] uppercase text-white/60 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {MAIN.tag}
            </span>

            <div>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                {MAIN.title}{" "}
                <span style={{ color: "#A78BFA" }}>{MAIN.titleAccent}</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/60 font-medium max-w-xs leading-relaxed">
                {MAIN.sub}
              </p>
              <button
                className="mt-5 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-black hover:bg-[#6A2CFF] hover:text-white transition-all duration-300 shadow-lg"
                onClick={(e) => { e.stopPropagation(); navigate(MAIN.path); }}
              >
                {MAIN.cta}
                <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Two stacked side cards ── */}
        <div className="grid grid-rows-2 gap-3 md:gap-4">
          {SIDE.map((card) => (
            <div
              key={card.tag}
              className="relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group"
              onClick={() => navigate(card.path)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: card.overlay }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />

              <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                <span className="self-start text-[9px] font-black tracking-[0.2em] uppercase text-white/60 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {card.tag}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/55 font-medium">{card.sub}</p>
                  <button
                    className="mt-3 inline-flex items-center gap-1.5 text-white text-xs font-black border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200"
                    onClick={(e) => { e.stopPropagation(); navigate(card.path); }}
                  >
                    {card.cta} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
