const styleCategories = [
  {
    title: "Classy",
    subtitle: "chic",
    bg: "from-gray-100 to-gray-200",
    textColor: "text-gray-900",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  },
  {
    title: "Bratz",
    subtitle: "ERA",
    bg: "from-pink-300 to-pink-400",
    textColor: "text-pink-900",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  },
  {
    title: "Effortless",
    subtitle: "Ethnic",
    bg: "from-rose-200 to-rose-300",
    textColor: "text-rose-900",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80",
  },
  {
    title: "STREET",
    subtitle: "CODED",
    bg: "from-gray-400 to-gray-500",
    textColor: "text-gray-900",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
  },
];

export default function PickYourStyle() {
  return (
    <section className="bg-white py-10 px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Pick your style</h2>
      <div className="grid grid-cols-4 gap-6">
        {styleCategories.map((style, i) => (
          <div
            key={i}
            className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow"
            style={{ height: "420px" }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${style.bg}`} />

            {/* Product image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* White card overlay */}
            <div className="absolute inset-x-12 top-12 bottom-12 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-between py-8 shadow-xl">
              <h3 className={`text-3xl font-bold ${style.textColor} tracking-wide`}>
                {style.title}
              </h3>
              <p className={`text-5xl font-black ${style.textColor} tracking-tight`}>
                {style.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
