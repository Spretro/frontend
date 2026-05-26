const brandCollabs = [
  {
    name: "NEEMAN'S",
    subtitle: "NEW ARRIVALS",
    deal: "UPTO 50% OFF",
    bg: "#F5F0E8",
    dark: false,
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&q=80",
    ],
  },
  {
    name: "GEAR & CO.",
    subtitle: "NEW ARRIVAL",
    deal: "STARTING ₹149",
    bg: "#111827",
    dark: true,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=300&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80",
    ],
  },
  {
    name: "GIVA",
    subtitle: "NEW ARRIVALS",
    deal: "UPTO 40% OFF",
    bg: "#2D0A1E",
    dark: true,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&q=80",
    ],
  },
  {
    name: "WROGN",
    subtitle: "NEW DROP",
    deal: "UPTO 60% OFF",
    bg: "#0F172A",
    dark: true,
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80",
    ],
  },
  {
    name: "ANOUK",
    subtitle: "FESTIVE EDIT",
    deal: "STARTING ₹299",
    bg: "#3B0764",
    dark: true,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
    ],
  },
  {
    name: "H&M SPORT",
    subtitle: "NEW SEASON",
    deal: "UPTO 55% OFF",
    bg: "#052E16",
    dark: true,
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=80",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&q=80",
    ],
  },
];

export default function CuratedCollections() {
  return (
    <section
      className="py-14"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F9F8FF 100%)" }}
    >
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 fade-in">
          <div>
            <p className="text-xs font-bold text-[#6A2CFF] uppercase tracking-widest mb-1">Brand Drops</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Shop by <em className="text-[#6A2CFF] not-italic">Brand</em>
            </h2>
          </div>
          <button className="text-sm font-bold text-[#6A2CFF] hover:underline flex items-center gap-1 mb-1">
            View All
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
          {brandCollabs.map((brand, i) => {
            const text = brand.dark ? "text-white" : "text-gray-900";
            const subText = brand.dark ? "text-white/60" : "text-gray-500";
            const dealBg = brand.dark ? "bg-white/10 text-white" : "bg-black/8 text-gray-800";

            return (
              <div
                key={i}
                className="shrink-0 cursor-pointer group fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 flex flex-col"
                  style={{
                    width: "clamp(220px, 22vw, 280px)",
                    background: brand.bg,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 16px 56px rgba(106,44,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.12)")
                  }
                >
                  {/* 2x2 product image grid */}
                  <div className="grid grid-cols-2 gap-0.5 p-0.5">
                    {brand.images.map((img, j) => (
                      <div key={j} className="aspect-square overflow-hidden">
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Brand info */}
                  <div className="px-4 py-4">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${subText}`}>
                      {brand.subtitle}
                    </p>
                    <p className={`text-xl font-black tracking-tight leading-none mb-3 ${text}`}>
                      {brand.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full ${dealBg}`}>
                        {brand.deal}
                      </span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${subText} group-hover:gap-2 transition-all`}>
                        Shop
                        <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
