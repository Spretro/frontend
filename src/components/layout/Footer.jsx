import {
  BadgeCheck,
  Mail,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const footerGroups = [
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "/faqs" },
      { label: "Return Policy", href: "/faqs" },
      { label: "Shipping Policy", href: "/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Kids", href: "/kids" },
      { label: "New In", href: "/new-in" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Beauty", href: "/category/beauty" },
      { label: "Jewellery", href: "/category/jewellery" },
      { label: "Sneakers", href: "/category/sneakers" },
      { label: "Watches", href: "/category/watches" },
      { label: "Luxury", href: "/category/luxury" },
    ],
  },
];

const trustItems = [
  { icon: Truck, label: "60 min delivery", desc: "Select locations" },
  { icon: RotateCcw, label: "Easy returns", desc: "Simple support" },
  { icon: ShieldCheck, label: "Secure payments", desc: "Protected checkout" },
  { icon: BadgeCheck, label: "Authentic brands", desc: "Verified products" },
];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <section className="px-4 py-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#F9F8FF] p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#F3EEFF] text-[#6A2CFF]">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span>
                <strong className="block text-sm font-black text-gray-950">{label}</strong>
                <small className="text-xs font-semibold text-gray-500">{desc}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111] px-4 py-10 text-white md:px-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <a href="/" className="inline-flex flex-col no-underline">
              <span className="text-4xl font-black tracking-tight text-white">
                SPRETRO<span className="text-[#6A2CFF]">.</span>
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-gray-500">
                Fashion Commerce
              </span>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Streetwear, sneakers, beauty, watches, jewellery, and everyday
              luxury curated for fast discovery and smooth delivery.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-gray-400">
              <a href="mailto:support@spetro.com" className="flex items-center gap-3 hover:text-white">
                <Mail size={17} />
                support@spetro.com
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={17} />
                Bengaluru, India
              </span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.title}>
                <h2 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-white">
                  {group.title}
                </h2>
                <div className="grid gap-3">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SPRETRO Technologies Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/terms-and-conditions" className="hover:text-white">Terms</a>
            <a href="/sitemap" className="hover:text-white">Sitemap</a>
            <a href="/contact-us" className="hover:text-white">Contact</a>
          </div>
        </div>
      </section>
    </footer>
  );
}
