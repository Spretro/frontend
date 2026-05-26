import { BadgeCheck, PackageCheck, Truck } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Company</p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-950 md:text-6xl">About SPRETRO</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
          SPRETRO is a fashion commerce destination for fast-moving style, trusted brands, and convenient shopping across clothing, sneakers, beauty, jewellery, watches, and seasonal drops.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
        {[
          { icon: BadgeCheck, title: "Authentic Brands", text: "Curated products from verified sellers and brand partners." },
          { icon: Truck, title: "Fast Fulfilment", text: "Built for quick discovery, smooth checkout, and reliable delivery." },
          { icon: PackageCheck, title: "Easy Returns", text: "Clear return support for eligible products within the stated window." },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#F3EEFF] text-[#6A2CFF]">
              <Icon size={22} />
            </div>
            <h2 className="text-xl font-black text-gray-950">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
