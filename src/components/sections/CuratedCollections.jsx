import { curatedCollections } from "../../data";

function CollectionCard({ label, tag, image }) {
  return (
    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 w-48 h-64 md:w-64 md:h-80 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {tag && (
        <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] md:text-xs font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl uppercase tracking-wider">
          {tag}
        </span>
      )}
      <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5">
        <p className="text-white text-sm md:text-base font-black leading-tight tracking-wide drop-shadow-lg">{label}</p>
        <button className="mt-2 md:mt-3 bg-white/90 backdrop-blur-sm text-gray-900 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-600 hover:text-white">
          Explore
        </button>
      </div>
    </div>
  );
}

export default function CuratedCollections() {
  return (
    <section className="bg-gradient-to-br from-white via-rose-50 to-white py-8 md:py-12 px-4 md:px-8 rounded-[24px] md:rounded-[32px] mx-4 md:mx-8 shadow-xl border border-rose-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Curated Collections</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Handpicked styles just for you</p>
        </div>
        <button className="text-rose-600 font-bold text-xs md:text-sm hover:text-rose-700 flex items-center gap-2">
          See All
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">
        {curatedCollections.map((col, i) => (
          <CollectionCard key={i} {...col} />
        ))}
      </div>
    </section>
  );
}
