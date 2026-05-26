const terms = [
  "Product prices, availability, discounts, and delivery promises may vary by location, stock, and promotional period.",
  "Orders are confirmed only after successful payment authorization and inventory validation.",
  "Return eligibility depends on product category, product condition, hygiene restrictions, and original packaging.",
  "Customers are responsible for providing accurate contact, address, and payment details.",
  "SPETRO may update these terms to keep the service reliable, compliant, and secure.",
];

export default function TermsAndConditions() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Legal</p>
        <h1 className="text-4xl font-black tracking-tight text-gray-950 md:text-6xl">Terms And Conditions</h1>
        <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">Please review these terms before using SPETRO or placing an order.</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-4xl gap-4">
        {terms.map((term, index) => (
          <article key={term} className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-[64px_1fr]">
            <span className="text-xl font-black text-[#6A2CFF]">{String(index + 1).padStart(2, "0")}</span>
            <p className="text-sm leading-7 text-gray-600">{term}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
