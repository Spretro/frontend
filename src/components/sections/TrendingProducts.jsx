const trendingProducts = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: "₹1,299",
    originalPrice: "₹2,599",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    tag: "BESTSELLER",
    rating: 4.5
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: "₹1,899",
    originalPrice: "₹3,499",
    discount: "46% OFF",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    tag: "TRENDING",
    rating: 4.8
  },
  {
    id: 3,
    name: "Ethnic Silk Saree",
    price: "₹2,499",
    originalPrice: "₹4,999",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    tag: "NEW",
    rating: 4.9
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: "₹1,599",
    originalPrice: "₹3,199",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    tag: "HOT",
    rating: 4.6
  },
  {
    id: 5,
    name: "Sports Sneakers",
    price: "₹2,199",
    originalPrice: "₹4,399",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    tag: "BESTSELLER",
    rating: 4.7
  },
  {
    id: 6,
    name: "Designer Watch",
    price: "₹3,499",
    originalPrice: "₹6,999",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
    tag: "LUXURY",
    rating: 4.9
  },
  {
    id: 7,
    name: "Casual T-Shirt",
    price: "₹499",
    originalPrice: "₹999",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    tag: "SALE",
    rating: 4.4
  },
  {
    id: 8,
    name: "Formal Blazer",
    price: "₹2,999",
    originalPrice: "₹5,999",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    tag: "PREMIUM",
    rating: 4.8
  }
];

export default function TrendingProducts() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              🔥 Trending Now
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Most popular items this week</p>
          </div>
          <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-xs md:text-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Tag */}
                <span className="absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[9px] md:text-xs font-black px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                  {product.tag}
                </span>

                {/* Discount badge */}
                <span className="absolute top-2 md:top-3 right-2 md:right-3 bg-green-500 text-white text-[9px] md:text-xs font-black px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                  {product.discount}
                </span>

                {/* Wishlist button */}
                <button className="absolute bottom-2 md:bottom-3 right-2 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-600 hover:text-white">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Product info */}
              <div className="p-3 md:p-4">
                <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-500 font-medium">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <span className="text-base md:text-lg font-black text-gray-900">{product.price}</span>
                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>

                {/* Add to cart button */}
                <button className="w-full bg-gray-900 text-white py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-rose-600 transition-all duration-300 group-hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
