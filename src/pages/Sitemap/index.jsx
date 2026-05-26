import { Link } from "react-router-dom";

const groups = [
  {
    title: "Shop",
    links: [
      ["Women", "/women"],
      ["Men", "/men"],
      ["Kids", "/kids"],
      ["New In", "/new-in"],
      ["Brands", "/brands"],
      ["Sale", "/sale"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Contact Us", "/contact-us"],
      ["FAQs", "/faqs"],
      ["Terms And Conditions", "/terms-and-conditions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about-us"],
      ["Careers", "/careers"],
      ["Sitemap", "/sitemap"],
    ],
  },
];

export default function Sitemap() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Navigation</p>
        <h1 className="text-4xl font-black tracking-tight text-gray-950 md:text-6xl">Sitemap</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">A quick map of the main shopping, help, and company pages.</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-black text-gray-950">{group.title}</h2>
            <div className="grid gap-3">
              {group.links.map(([label, href]) => (
                <Link key={href} className="font-bold text-gray-600 transition-colors hover:text-[#6A2CFF]" to={href}>
                  {label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
