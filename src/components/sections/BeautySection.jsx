import { beautyBags } from "../../data";

function BagCard({ label, image }) {
  return (
    <div className="flex flex-col items-center gap-4 flex-shrink-0 cursor-pointer group">
      <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 relative">
        <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm shadow-2xl hover:bg-rose-600 hover:text-white transition-all">
            View
          </button>
        </div>
      </div>
      <span className="text-base text-gray-900 font-black tracking-wide group-hover:text-rose-600 transition-colors">{label}</span>
    </div>
  );
}

export default function BeautySection() {
  return (
    <section className="bg-white py-12 px-8 rounded-[32px] mx-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">BEAUTY</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Elevate your style</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 rounded-[28px] p-10 mt-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <p className="text-xs text-rose-600 font-black text-center uppercase tracking-widest mb-2">BAGS TOO</p>
          <h3 className="text-3xl font-black text-gray-900 text-center mb-10 tracking-tight">EVERY OCCASION</h3>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4">
            {beautyBags.map((bag, i) => (
              <BagCard key={i} {...bag} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
