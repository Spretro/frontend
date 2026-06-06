// MOCK DATA START
// TODO(BACKEND): Replace with GET /products/:id.
export const mockProduct = {
  id: "1307441",
  name: "Premium Cotton T-Shirt",
  brand: "Bewakoof",
  shortDescription: "Experience all-day comfort with this premium cotton t-shirt, crafted for effortless everyday style.",
  description:
    "Experience all-day comfort with this premium cotton t-shirt, crafted for effortless everyday style. Made from high-quality, breathable fabric with a soft hand feel, it keeps you comfortable whether you're out and about or relaxing at home. The versatile design makes it perfect for layering or wearing on its own, offering a relaxed fit and timeless appeal that complements any wardrobe. \n \n \n Upgrade your casual wardrobe with this ultra-comfortable cotton t-shirt. Designed with soft, breathable fabric and a premium finish, it delivers maximum comfort and everyday versatility. Easy to style, easy to layer, and built for daily wear, this tee is your go-to choice for a laid-back yet stylish look. \n \n \n Crafted from high-quality cotton, this t-shirt offers a soft touch and breathable feel, making it ideal for all-day wear. Whether you're running errands or hanging out with friends, its relaxed fit and classic design ensure you stay comfortable and stylish. Perfect for pairing with jeans or shorts, this tee is a must-have staple for any casual wardrobe. ",
  price: 1499,
  originalPrice: 2399,
  rating: 4.5,
  reviewCount: 248,
  productCode: "1307441",
  origin: "Made in India",
  manufacturer:
    "Bewakoof Brands Pvt Ltd, Sairaj logistic hub A5, BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302",
  images: [
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/w/b/g/xl-651229-bewakoof-original-imahbcgnkhrgge4q.jpeg",
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/g/2/7/xl-651229-bewakoof-original-imahbcgnaqgufy2y.jpeg",
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/p/k/n/xl-651229-bewakoof-original-imahbcgnmzmhxpzm.jpeg",
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/9/9/9/xl-651229-bewakoof-original-imahbcgnuctvpun8.jpeg",
    "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/m/3/b/xl-651229-bewakoof-original-imahbcgnjrwhvg6e.jpeg",
  ],
  sizes: ["S", "M", "L", "XL", "XXL", "2XL", "3XL"],
  colorVariants: [
    {
      id: "olive-green",
      name: "Olive Green",
      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
    },
    {
      id: "deep-teal",
      name: "Deep Teal",
      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/t/h/2/xl-659614-bewakoof-original-imahdfs5ugecy5ng.jpeg",
    },
    {
      id: "charcoal-black",
      name: "Charcoal Black",
      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/r/u/t/l-645974-bewakoof-original-imah5h4rz366kwx3.jpeg",
    },
  ],
  offers: [
    {
      title: "Cashback",
      body: "Up to ₹9 cashback with select wallets",
      count: "1 offer",
    },
    {
      title: "Bank Offer",
      body: "Up to ₹25 off with select cards",
      count: "29 offers",
    },
    {
      title: "Partner Offers",
      body: "Buy 2 or more items and get 3% off",
      count: "2 offers",
    },
  ],
  specifications: [
    { label: "Material", value: "Premium cotton" },
    { label: "Fit", value: "Regular fit" },
    { label: "Neck", value: "Crew neck" },
    { label: "Sleeve", value: "Half sleeve" },
    { label: "Care", value: "Machine wash at 30°C" },
    { label: "Wash separately", value: "Yes" },
    { label: "Occasion", value: "Casual" },
    { label: "Country of origin", value: "India" },
  ],
};
// MOCK DATA END

// MOCK DATA START
// TODO(BACKEND): Replace with GET /products/:id/reviews.
export const mockReviews = [
  {
    id: 1,
    author: "Rahul Kumar",
    rating: 5,
    title: "Excellent quality and fit",
    comment:
      "The t-shirt is comfortable, the stitching feels solid, and it works well for daily wear.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    author: "Priya Singh",
    rating: 4,
    title: "Great product, good price",
    comment:
      "Good cotton and a clean fit. It shrank slightly after the first wash, so follow care instructions.",
    date: "1 month ago",
  },
  {
    id: 3,
    author: "Amit Patel",
    rating: 5,
    title: "Perfect for office and casual wear",
    comment:
      "Looks neat, feels light, and has held up nicely after multiple washes.",
    date: "1.5 months ago",
  },
];
// MOCK DATA END

// MOCK DATA START
// TODO(BACKEND): Replace with GET /products/:id/recommendations.
export const mockRecommendations = {
  sameBrandProducts: [
    {
      id: "bewakoof-oversized-graphic-tee",
      brand: "Bewakoof",
      name: "Oversized Graphic Cotton T-Shirt",
      price: 799,
      originalPrice: 1499,
      rating: 4.5,
      reviewCount: 1832,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/c/q/b/xl-637169-bewakoof-original-imahb8zhuhnuzure.jpeg",
    },
    {
      id: "bewakoof-everyday-crew-tee",
      brand: "Bewakoof",
      name: "Everyday Crew Neck T-Shirt",
      price: 699,
      originalPrice: 1299,
      rating: 4.3,
      reviewCount: 1240,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/h/2/xl-659614-bewakoof-original-imahdfs5ugecy5ng.jpeg",
    },
    {
      id: "bewakoof-relaxed-fit-tee",
      brand: "Bewakoof",
      name: "Relaxed Fit Typography T-Shirt",
      price: 899,
      originalPrice: 1699,
      rating: 4.4,
      reviewCount: 964,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/3/d/m/l-599566-bewakoof-original-imahhrqakyrptwyg.jpeg",
    },
    {
      id: "bewakoof-soft-touch-tee",
      brand: "Bewakoof",
      name: "Soft Touch Casual T-Shirt",
      price: 749,
      originalPrice: 1399,
      rating: 4.2,
      reviewCount: 716,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/z/a/p/xl-592032-bewakoof-original-imah9h2kyz3yapvn.jpeg",
    },
    {
      id: "bewakoof-premium-solid-tee",
      brand: "Bewakoof",
      name: "Premium Solid Half Sleeve T-Shirt",
      price: 849,
      originalPrice: 1599,
      rating: 4.6,
      reviewCount: 2056,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/f/l/9/s-537232-bewakoof-original-imahbzhjmqxdmcdz.jpeg",
    },
    {
      id: "bewakoof-olive-essential-tee",
      brand: "Bewakoof",
      name: "Olive Essential Cotton T-Shirt",
      price: 799,
      originalPrice: 1499,
      rating: 4.1,
      reviewCount: 548,
      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
    },
    {
      id: "bewakoof-teal-weekend-tee",
      brand: "Bewakoof",
      name: "Teal Weekend Graphic T-Shirt",
      price: 999,
      originalPrice: 1899,
      rating: 4.7,
      reviewCount: 1327,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/m/p/c/-original-imahh2xe8gvyhsmp.jpeg",
    },
    {
      id: "bewakoof-charcoal-street-tee",
      brand: "Bewakoof",
      name: "Charcoal Streetwear T-Shirt",
      price: 899,
      originalPrice: 1799,
      rating: 4.4,
      reviewCount: 881,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/e/t/-original-imahfzyxxj2h9jyn.jpeg",
    },
    {
      id: "bewakoof-striped-smart-tee",
      brand: "Bewakoof",
      name: "Striped Smart Casual T-Shirt",
      price: 949,
      originalPrice: 1999,
      rating: 4.2,
      reviewCount: 673,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/h/j/a/3xl-608737-bewakoof-original-imah9suwcnguabkt.jpeg",
    },
    {
      id: "bewakoof-graphic-print-tee",
      brand: "Bewakoof",
      name: "Graphic Print Statement T-Shirt",
      price: 1099,
      originalPrice: 1899,
      rating: 4.5,
      reviewCount: 1094,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/s/z/h/l-519226-bewakoof-original-imah6wnzdhahfvdb.jpeg",
    },
  ],
  similarProducts: [
    {
      id: "similar-snitch-white-tee",
      brand: "SNITCH",
      name: "Classic White Regular Fit T-Shirt",
      price: 899,
      originalPrice: 1599,
      rating: 4.2,
      reviewCount: 824,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/2/j/o/xl-mens-os-break-lavender-xl-first-wave-original-imahnrhfyjzfx757.jpeg",
    },
    {
      id: "similar-snitch-black-tee",
      brand: "SNITCH",
      name: "Solid Black Street T-Shirt",
      price: 899,
      originalPrice: 1599,
      rating: 4.3,
      reviewCount: 712,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/v/4/s/l-027-breakrul-g-preeo-original-imahh2x3cxwxtgpd.jpeg",
    },
    {
      id: "similar-yazole-polo",
      brand: "Yazole",
      name: "Navy Blue Casual Polo T-Shirt",
      price: 1199,
      originalPrice: 2199,
      rating: 4.4,
      reviewCount: 396,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-t-shirt/t/h/y/m-ovr-one-piece-maroon-m-sh-heartees-original-imahdrgj4ekgzmyj.jpeg",
    },
    {
      id: "similar-highlander-classic",
      brand: "Highlander",
      name: "Classic Cotton Crew T-Shirt",
      price: 899,
      originalPrice: 1499,
      rating: 4.2,
      reviewCount: 655,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/l/8/a/xl-hmts000114-highlander-original-imahm2fpzatdbzhe.jpeg",
    },
    {
      id: "similar-highlander-everyday",
      brand: "Highlander",
      name: "Everyday Crew Neck T-Shirt",
      price: 799,
      originalPrice: 1299,
      rating: 4.1,
      reviewCount: 448,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/v/f/l-hlot000082-highlander-original-imah4w9xx7rcbzp3.jpeg",
    },
     {
      id: "bewakoof-relaxed-fit-tee",
      brand: "Bewakoof",
      name: "Relaxed Fit Typography T-Shirt",
      price: 899,
      originalPrice: 1699,
      rating: 4.4,
      reviewCount: 964,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/3/d/m/l-599566-bewakoof-original-imahhrqakyrptwyg.jpeg",
    }
  ],
  customersAlsoLike: [
    {
      id: "also-like-highlander-signature",
      brand: "Highlander",
      name: "Signature Solid Slim Fit T-Shirt",
      price: 949,
      originalPrice: 1599,
      rating: 4.4,
      reviewCount: 901,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/f/r/l/xl-hlts003612-highlander-original-imagtdpsca4tfzeq.jpeg",
    },
    {
      id: "also-like-highlander-relaxed",
      brand: "Highlander",
      name: "Relaxed Fit Washed T-Shirt",
      price: 899,
      originalPrice: 1399,
      rating: 4.3,
      reviewCount: 534,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/j/p/xs-hlts006015-highlander-original-imah7f2rfzeqm9kc.jpeg",
    },
    {
      id: "also-like-highlander-soft",
      brand: "Highlander",
      name: "Soft Touch Longline T-Shirt",
      price: 999,
      originalPrice: 1699,
      rating: 4.5,
      reviewCount: 775,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/n/w/v/l-hlts004325-highlander-original-imah3qwfcnewzhm7.jpeg",
    },
    {
      id: "also-like-occupied-white",
      brand: "Occupied Clothing Co.",
      name: "Minimal White Oversized T-Shirt",
      price: 1049,
      originalPrice: 1899,
      rating: 4.2,
      reviewCount: 302,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/y/s/o/s-tnvrnos-d210-tripr-original-imahnvpusavgpzhw.jpeg",
    },
    {
      id: "also-like-yazole-solid-polo",
      brand: "Yazole",
      name: "Solid Design Polo Neck T-Shirt",
      price: 1149,
      originalPrice: 2199,
      rating: 4.6,
      reviewCount: 621,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/i/e/r/xxl-ost001-ytwodesigns-original-imahjuy2ycytv6hd.jpeg",
    },
         {
      id: "bewakoof-relaxed-fit-tee",
      brand: "Bewakoof",
      name: "Relaxed Fit Typography T-Shirt",
      price: 899,
      originalPrice: 1699,
      rating: 4.4,
      reviewCount: 964,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/3/d/m/l-599566-bewakoof-original-imahhrqakyrptwyg.jpeg",
    }
  ],
  recommendedBySpretro: [
    {
      id: "spretro-pick-monochrome-tee",
      brand: "Spretro Picks",
      name: "Monochrome Capsule T-Shirt",
      price: 999,
      originalPrice: 1799,
      rating: 4.7,
      reviewCount: 1186,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/h/f/n/xl-etra-7198-ausk-resized-2-original-imahdjn4rwqfxggw.jpeg",
    },
    {
      id: "spretro-pick-clean-white-tee",
      brand: "Spretro Picks",
      name: "Clean White Layering T-Shirt",
      price: 849,
      originalPrice: 1499,
      rating: 4.5,
      reviewCount: 942,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/t/h/2/xl-659614-bewakoof-original-imahdfs5ugecy5ng.jpeg",
    },
    {
      id: "spretro-pick-smart-stripe",
      brand: "Spretro Picks",
      name: "Smart Stripe Weekend T-Shirt",
      price: 949,
      originalPrice: 1999,
      rating: 4.4,
      reviewCount: 806,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/c/9/i/m-tan-shk-blk-os-tantrix-original-imahm5fzsakzesgj.jpeg",
    },
    {
      id: "spretro-pick-navy-polo",
      brand: "Spretro Picks",
      name: "Navy Smart Casual Polo",
      price: 1199,
      originalPrice: 2199,
      rating: 4.6,
      reviewCount: 688,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/c/r/t/s-os-anime-sky-s-tripbroz-original-imaheuawdyntnqpg.jpeg",
    },
    {
      id: "spretro-pick-solid-everyday",
      brand: "Spretro Picks",
      name: "Solid Everyday Rotation T-Shirt",
      price: 899,
      originalPrice: 1499,
      rating: 4.3,
      reviewCount: 559,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/l/8/a/xl-hmts000114-highlander-original-imahm2fpzatdbzhe.jpeg",
    },
        {
      id: "similar-yazole-polo",
      brand: "Yazole",
      name: "Navy Blue Casual Polo T-Shirt",
      price: 1199,
      originalPrice: 2199,
      rating: 4.4,
      reviewCount: 396,
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-t-shirt/t/h/y/m-ovr-one-piece-maroon-m-sh-heartees-original-imahdrgj4ekgzmyj.jpeg",
    },
  ],
};
// MOCK DATA END
