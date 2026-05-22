const ethnicCategories = [
  { label: "SHORT KURTIS", bg: "from-pink-400 to-pink-600", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80" },
  { label: "SAREES", bg: "from-purple-400 to-purple-600", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { label: "ANARKALI SUIT", bg: "from-green-500 to-green-700", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80" },
  { label: "ETHNIC DRESSES", bg: "from-pink-500 to-pink-700", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80" },
  { label: "WOMEN KURTA SETS", bg: "from-red-600 to-red-800", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" },
  { label: "BLOUSES", bg: "from-pink-400 to-pink-600", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80" },
];

export default function EthnicBanner() {
  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 py-2">
      <div className="flex gap-0 overflow-x-auto scrollbar-hide">
        {ethnicCategories.map((cat, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-60 h-24 overflow-hidden group cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg}`} />
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-base font-black tracking-wide drop-shadow-lg">
                {cat.label}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
