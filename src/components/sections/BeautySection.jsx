import { beautyBags } from "../../data";

function BagCard({ label, image }) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 flex-shrink-0 cursor-pointer group">
      <div className="w-36 h-36 md:w-48 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 relative">
        <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm shadow-2xl hover:bg-rose-600 hover:text-white transition-all">
            View
          </button>
        </div>
      </div>
      <span className="text-sm md:text-base text-gray-900 font-black tracking-wide group-hover:text-rose-600 transition-colors">{label}</span>
    </div>
  );
}

export default function BeautySection() {
  return (
    <section className="bg-white py-8 md:py-12 px-4 md:px-8 rounded-[24px] md:rounded-[32px] mx-4 md:mx-8 shadow-xl border border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">BEAUTY</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Elevate your style</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 rounded-[20px] md:rounded-[28px] p-6 md:p-10 mt-4 md:mt-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-5 md:top-10 right-5 md:right-10 w-20 h-20 md:w-32 md:h-32 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 w-24 h-24 md:w-40 md:h-40 bg-rose-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <p className="text-[10px] md:text-xs text-rose-600 font-black text-center uppercase tracking-widest mb-1 md:mb-2">BAGS TOO</p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 text-center mb-6 md:mb-10 tracking-tight">EVERY OCCASION</h3>
          <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-4">
            {beautyBags.map((bag, i) => (
              <BagCard key={i} {...bag} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
