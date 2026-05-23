import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "Absolutely love the quality and variety! The ethnic collection is stunning and the delivery was super fast.",
    bg: "from-pink-100 to-rose-100"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "Best online shopping experience! Great prices, authentic products, and hassle-free returns. Highly recommended!",
    bg: "from-blue-100 to-cyan-100"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "The home decor section is amazing! Found exactly what I was looking for. Customer service is top-notch.",
    bg: "from-purple-100 to-pink-100"
  },
  {
    id: 4,
    name: "Arjun Singh",
    role: "Fitness Trainer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "Perfect sportswear collection! Comfortable, stylish, and affordable. My go-to store for all fitness gear.",
    bg: "from-green-100 to-emerald-100"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
    text: "Love the curated collections! Always find trendy pieces that fit perfectly. Shopping here is always a delight!",
    bg: "from-amber-100 to-yellow-100"
  }
];

export default function CustomerReviews() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 md:px-8 py-8 md:py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            ⭐ What Our Customers Say
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">Real reviews from real people</p>
        </div>

        <div className="relative h-[400px] md:h-[450px]">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-all duration-700 ${
                idx === active ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className={`bg-gradient-to-br ${testimonial.bg} rounded-[32px] p-6 md:p-12 shadow-2xl h-full flex flex-col justify-between`}>
                {/* Quote icon */}
                <div className="text-6xl md:text-8xl text-gray-900/10 font-serif leading-none">"</div>

                {/* Review text */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-lg md:text-2xl lg:text-3xl text-gray-900 font-bold text-center leading-relaxed max-w-3xl">
                    {testimonial.text}
                  </p>
                </div>

                {/* Customer info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="text-center md:text-left">
                      <h4 className="text-lg md:text-xl font-black text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-gray-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === active ? "w-10 md:w-12 h-2 md:h-3 bg-rose-600" : "w-2 md:w-3 h-2 md:h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
