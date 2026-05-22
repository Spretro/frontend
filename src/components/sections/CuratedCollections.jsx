import { curatedCollections } from "../../data";

function CollectionCard({ label, tag, image }) {
  return (
    <div className="relative rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 w-64 h-80 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {tag && (
        <span className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-xl uppercase tracking-wider">
          {tag}
        </span>
      )}
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-white text-base font-black leading-tight tracking-wide drop-shadow-lg">{label}</p>
        <button className="mt-3 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-600 hover:text-white">
          Explore
        </button>
      </div>
    </div>
  );
}

export default function CuratedCollections() {
  return (
    <section className="bg-gradient-to-br from-white via-rose-50 to-white py-12 px-8 rounded-[32px] mx-8 shadow-xl border border-rose-100">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Curated Collections</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Handpicked styles just for you</p>
        </div>
        <button className="text-rose-600 font-bold text-sm hover:text-rose-700 flex items-center gap-2">
          See All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {curatedCollections.map((col, i) => (
          <CollectionCard key={i} {...col} />
        ))}
      </div>
    </section>
  );
}
