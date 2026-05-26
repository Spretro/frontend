const deals = [
  {
    label: "Summer Sale",
    value: "Up to 70%",
    unit: "OFF",
    sub: "On selected styles",
    gradient: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9B6DFF 100%)",
    shine: "rgba(255,255,255,0.12)",
    glow: "rgba(106,44,255,0.45)",
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: "New Arrivals",
    value: "Fresh",
    unit: "Every Week",
    sub: "Straight from the runway",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    shine: "rgba(255,255,255,0.06)",
    glow: "rgba(30,41,59,0.5)",
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    label: "Free Shipping",
    value: "On ₹999+",
    unit: "Orders",
    sub: "No code needed · Always",
    gradient: "linear-gradient(135deg, #065F46 0%, #059669 60%, #34D399 100%)",
    shine: "rgba(255,255,255,0.1)",
    glow: "rgba(5,150,105,0.4)",
    icon: (
      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
];

export default function PromoBanner() {
  return (
    <section className="py-5 px-3 md:px-6" style={{ background: "#F9F8FF" }}>
      <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {deals.map((deal, i) => (
          <div
            key={i}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1.5"
            style={{
              background: deal.gradient,
              boxShadow: `0 4px 28px ${deal.glow}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = `0 16px 48px ${deal.glow}`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = `0 4px 28px ${deal.glow}`)
            }
          >
            {/* Top shine overlay */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
              style={{ background: `linear-gradient(180deg, ${deal.shine} 0%, transparent 100%)` }}
            />
            {/* Diagonal shimmer line */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)" }}
            />
            {/* Decorative circle top-right */}
            <div className="absolute -top-6 -right-6 size-28 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -top-2 -right-2 size-16 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative px-6 py-7 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">
                  {deal.label}
                </p>
                <p className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                  {deal.value}
                </p>
                <p className="text-sm font-black text-white/80 leading-tight mb-1">{deal.unit}</p>
                <p className="text-[10px] text-white/50 font-medium truncate">{deal.sub}</p>
              </div>
              <div className="flex flex-col items-center gap-2.5 shrink-0">
                <div className="size-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white backdrop-blur-sm">
                  {deal.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors whitespace-nowrap">
                  SHOP →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
