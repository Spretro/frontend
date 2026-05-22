const trendingProducts = [
  { image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&q=80", bg: "bg-pink-50" },
  { image: "https://images.unsplash.com/photo-1564257577-d18b7c1a4095?w=300&q=80", bg: "bg-blue-50" },
  { image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&q=80", bg: "bg-amber-50" },
  { image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80", bg: "bg-orange-50" },
  { image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&q=80", bg: "bg-indigo-50" },
  { image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80", bg: "bg-rose-50" },
  { image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80", bg: "bg-gray-50" },
  { image: "https://images.unsplash.com/photo-1564257577-d18b7c1a4095?w=300&q=80", bg: "bg-sky-50" },
];

export default function OnTheRise() {
  return (
    <section className="bg-white py-10 px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">ON THE RISE</h2>
        <p className="text-base text-gray-600 font-medium">Trends blowing up right now</p>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {trendingProducts.map((product, i) => (
          <div
            key={i}
            className={`${product.bg} rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow`}
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src={product.image}
              alt={`Trending ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
