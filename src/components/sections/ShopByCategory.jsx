import { shopCategories } from "../../data";

function CategoryCard({ label, image }) {
  return (
    <button className="flex flex-col items-center gap-3 md:gap-4 group">
      <div className="w-24 h-28 md:w-32 lg:w-36 md:h-36 lg:h-44 rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-2">
        <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <span className="text-xs md:text-sm font-bold text-gray-900 text-center leading-tight max-w-[96px] md:max-w-[144px] group-hover:text-rose-600 transition-colors">
        {label}
      </span>
    </button>
  );
}

export default function ShopByCategory() {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-8 md:py-12 px-4 md:px-8 rounded-[24px] md:rounded-[32px] mx-4 md:mx-8 shadow-xl border border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Shop By Category</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Explore our curated collections</p>
        </div>
        <button className="text-rose-600 font-bold text-xs md:text-sm hover:text-rose-700 flex items-center gap-2">
          View All
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-10">
        {shopCategories.map((cat, i) => (
          <CategoryCard key={i} {...cat} />
        ))}
      </div>
    </section>
  );
}
