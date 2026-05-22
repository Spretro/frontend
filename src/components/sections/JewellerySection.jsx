import { jewelleryItems } from "../../data";

function JewelleryCard({ label, image }) {
  return (
    <div className="flex flex-col items-center gap-4 flex-shrink-0 cursor-pointer group">
      <div className="w-48 h-60 rounded-3xl overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="absolute bottom-5 left-0 right-0 text-center">
          <span className="text-white text-base font-black drop-shadow-2xl tracking-wide">{label}</span>
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-5 py-2 rounded-full text-xs font-bold hover:bg-rose-600 hover:text-white transition-all">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JewellerySection() {
  return (
    <section className="bg-gradient-to-br from-white via-purple-50 to-white py-12 px-8 rounded-[32px] mx-8 shadow-xl border border-purple-100 mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">JEWELLERY</h2>
          <p className="text-base text-gray-500 font-semibold mt-1 tracking-wide">WE LOVE FASHION & BEAUTY</p>
        </div>
        <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
          View Collection
        </button>
      </div>
      <div className="flex gap-8 mt-8 overflow-x-auto scrollbar-hide pb-4">
        {jewelleryItems.map((item, i) => (
          <JewelleryCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
