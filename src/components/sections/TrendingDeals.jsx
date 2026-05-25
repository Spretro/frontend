export default function TrendingDeals() {
  return (
    <section
      className="py-10 md:py-14"
      style={{ background: "linear-gradient(135deg, #F9F8FF 0%, #EEF2FF 50%, #F5F0FF 100%)" }}
    >
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="mb-10 fade-in">
          <span className="text-xs font-bold text-[#6A2CFF] uppercase tracking-widest">Explore</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mt-1 leading-none">
            Shop by <em className="text-[#6A2CFF] not-italic">Gender</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="relative rounded-3xl overflow-hidden cursor-pointer group fade-in-up transition-all duration-300 hover:-translate-y-1"
            style={{
              height: "clamp(260px, 35vw, 540px)",
              boxShadow: "0 4px 24px rgba(236,72,153,0.1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 16px 56px rgba(236,72,153,0.28)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 24px rgba(236,72,153,0.1)")
            }
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
              alt="Women's Fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                Women
              </span>
              <h3 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Women's<br />Fashion
              </h3>
              <button className="bg-white text-gray-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-[#6A2CFF] hover:text-white transition-all duration-300 shadow-lg">
                Shop Now
              </button>
            </div>
          </div>

          <div
            className="relative rounded-3xl overflow-hidden cursor-pointer group fade-in-up transition-all duration-300 hover:-translate-y-1"
            style={{
              height: "clamp(260px, 35vw, 540px)",
              animationDelay: "0.1s",
              boxShadow: "0 4px 24px rgba(59,130,246,0.1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 16px 56px rgba(59,130,246,0.28)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,130,246,0.1)")
            }
          >
            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=900&q=80"
              alt="Men's Fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                Men
              </span>
              <h3 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Men's<br />Fashion
              </h3>
              <button className="bg-white text-gray-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-[#6A2CFF] hover:text-white transition-all duration-300 shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
