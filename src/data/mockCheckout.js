// MOCK DATA START
// TODO(BACKEND): Replace with GET /cart, GET /addresses, and GET /offers.
export const mockCartItems = [
  {
    id: "cart-tee-olive-xl",
    productId: "1307441",
    name: "Premium Cotton T-Shirt",
    brand: "Bewakoof",
    size: "XL",
    color: "Olive Green",
    quantity: 2,
    price: 1499,
    originalPrice: 2399,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/w/b/g/xl-651229-bewakoof-original-imahbcgnkhrgge4q.jpeg",
  },
  {
    id: "cart-relaxed-black-m",
    productId: "bewakoof-relaxed-fit-tee",
    name: "Relaxed Fit Typography T-Shirt",
    brand: "Bewakoof",
    size: "M",
    color: "Charcoal Black",
    quantity: 1,
    price: 899,
    originalPrice: 1699,
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/3/d/m/l-599566-bewakoof-original-imahhrqakyrptwyg.jpeg",
  },
];

export const mockAddresses = [
  {
    id: "address-home-1",
    fullName: "Saswata Roy",
    phone: "9876543210",
    pincode: "700091",
    house: "Flat 12B, Tower 4",
    address: "Spretro Heights, Sector V",
    locality: "Salt Lake",
    landmark: "Near RDB Cinema",
    city: "Kolkata",
    state: "West Bengal",
    type: "Home",
    customType: "",
    isDefault: true,
  },
];

export const mockAvailableOffers = [
  {
    id: "flat100",
    title: "Flat ₹100 Off",
    description: "Use code SPRETRO100 on orders above ₹999.",
    couponCode: "SPRETRO100",
  },
  {
    id: "tenpercent",
    title: "10% Discount",
    description: "Extra 10% off on selected everyday styles.",
    couponCode: "STYLE10",
  },
  {
    id: "firstorder",
    title: "First Order Discount",
    description: "New customers get an additional welcome benefit.",
    couponCode: "FIRSTBUY",
  },
  {
    id: "bankoffer",
    title: "Bank Offers",
    description: "Save more with eligible credit and debit cards.",
    couponCode: "",
  },
];

export const mockCheckoutFees = {
  deliveryCharges: 0,
  platformFee: 19,
  taxes: 0,
  specialOfferDiscount: 75,
};
// MOCK DATA END
