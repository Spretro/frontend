// MOCK DATA START
// TODO(BACKEND): Replace with GET /products/:id.
export const mockProduct = {
  id: "1307441",

  brand_id: "brand_bewakoof",
  category_id: "cat_mens_tshirts",

  name: "Premium Cotton T-Shirt",
  slug: "premium-cotton-tshirt",

  short_description:
    "Experience all-day comfort with this premium cotton t-shirt.",

  description:
    "Experience all-day comfort with this premium cotton t-shirt...",


  origin: "Made in India",

  manufacturer:
    "Bewakoof Brands Pvt Ltd, Sairaj logistic hub A5, BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302",

  logistics_partner: "Sairaj Logistics Hub",

  mrp: 239900,
  sale_price: 149900,
  discount_percentage: 37.5,

  rating: 4.5,
  review_count: 248,

  tags: [
    "tshirt",
    "cotton",
    "casual",
    "mens-fashion",
  ],

  specifications: {
    material: "Premium Cotton",
    fit: "Regular Fit",
    neck: "Crew Neck",
    sleeve: "Half Sleeve",
    care: "Machine wash at 30°C",
    occasion: "Casual",
    country_of_origin: "India",
  },

  variants: [
    {
      sku: "TSHIRT-OLIVE-S",
      color: "Olive Green",
      size: "S",

      mrp: 239900,
      sale_price: 149900,

      quantity: 25,

      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
    },

    {
      sku: "TSHIRT-OLIVE-M",
      color: "Olive Green",
      size: "M",

      mrp: 239900,
      sale_price: 149900,

      quantity: 30,

      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
    },

    {
      sku: "TSHIRT-TEAL-M",
      color: "Deep Teal",
      size: "M",

      mrp: 239900,
      sale_price: 149900,

      quantity: 40,

      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/t/h/2/xl-659614-bewakoof-original-imahdfs5ugecy5ng.jpeg",
    },

    {
      sku: "TSHIRT-BLACK-M",
      color: "Charcoal Black",
      size: "M",

      mrp: 239900,
      sale_price: 149900,

      quantity: 18,

      image:
        "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/r/u/t/l-645974-bewakoof-original-imah5h4rz366kwx3.jpeg",
    },
  ],

  images: [
    {
      url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/w/b/g/xl-651229-bewakoof-original-imahbcgnkhrgge4q.jpeg",
      alt_text: "Front View",
      position_order: 0,
    },

    {
      url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/g/2/7/xl-651229-bewakoof-original-imahbcgnaqgufy2y.jpeg",
      alt_text: "Back View",
      position_order: 1,
    },

    {
      url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/p/k/n/xl-651229-bewakoof-original-imahbcgnmzmhxpzm.jpeg",
      alt_text: "Fabric Detail",
      position_order: 2,
    },

    {
      url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/9/9/9/xl-651229-bewakoof-original-imahbcgnuctvpun8.jpeg",
      alt_text: "Side View",
      position_order: 3,
    },

    {
      url: "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/m/3/b/xl-651229-bewakoof-original-imahbcgnjrwhvg6e.jpeg",
      alt_text: "Lifestyle View",
      position_order: 4,
    },
  ],
};


// Shared dummy data
export const mockOffers = [
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
];

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

      brand_id: "brand_bewakoof",
      category_id: "cat_mens_tshirts",

      name: "Oversized Graphic Cotton T-Shirt",

      slug: "oversized-graphic-cotton-tshirt",

      short_description:
        "Premium oversized cotton t-shirt with graphic print.",

      description:
        "Designed for everyday comfort, this oversized graphic cotton t-shirt features soft breathable fabric, premium stitching and a relaxed silhouette suitable for daily wear.",

      origin: "Made in India",

      manufacturer:
        "Bewakoof Brands Pvt Ltd, Sairaj logistic hub A5, BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302",

      logistics_partner:
        "Sairaj Logistics Hub",

      mrp: 149900,
      sale_price: 79900,

      discount_percentage: 46.7,

      rating: 4.5,
      review_count: 1832,

      specifications: {
        material: "100% Cotton",
        fit: "Oversized Fit",
        neck: "Crew Neck",
        sleeve: "Half Sleeve",
        care: "Machine Wash",
        occasion: "Casual"
      },

      tags: [
        "tshirt",
        "oversized",
        "graphic",
        "streetwear"
      ],

      variants: [
        {
          sku: "BWK-GRPH-OLIVE-M",
          color: "Olive Green",
          size: "M",

          mrp: 149900,
          sale_price: 79900,

          quantity: 25,

          image:
            "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
        },

        {
          sku: "BWK-GRPH-BLACK-M",
          color: "Charcoal Black",
          size: "M",

          mrp: 149900,
          sale_price: 79900,

          quantity: 18,

          image:
            "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/r/u/t/l-645974-bewakoof-original-imah5h4rz366kwx3.jpeg",
        },
      ],

      images: [
        {
          url:
            "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/c/q/b/xl-637169-bewakoof-original-imahb8zhuhnuzure.jpeg",
          alt_text: "Front View",
          position_order: 0,
        },

        {
          url:
            "https://rukminim2.flixcart.com/image/1920/1920/xif0q/t-shirt/d/m/j/m-652355-bewakoof-original-imahdfs5w3endzng.jpeg",
          alt_text: "Back View",
          position_order: 1,
        }
      ]
    },
    {
      id: "123454321",
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

// MOCK DATA START
// Flat lookup map: all recommendation products keyed by id.
// TODO(BACKEND): Remove once the real product API covers all IDs.
export const allMockRecommendedProducts = Object.fromEntries(
  [
    ...mockRecommendations.sameBrandProducts,
    ...mockRecommendations.similarProducts,
    ...mockRecommendations.customersAlsoLike,
    ...mockRecommendations.recommendedBySpretro,
  ].map((p) => [p.id, p])
);
// MOCK DATA END
