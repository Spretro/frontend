const faqs = [
  ["How quickly will my order arrive?", "Delivery timelines depend on your location and product availability. Eligible areas may see express delivery options at checkout."],
  ["Can I return products?", "Eligible items can be returned within the stated return window when they are unused, unwashed, and include original tags and packaging."],
  ["Are SPETRO products authentic?", "Yes. Products are sourced through verified sellers and brand partners."],
  ["How do I track my order?", "Use your order ID from the confirmation message, or contact support if you need help locating it."],
];

export default function Faqs() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Help</p>
        <h1 className="text-4xl font-black tracking-tight text-gray-950 md:text-6xl">FAQs</h1>
        <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">Answers to common questions about orders, returns, delivery, payments, and product authenticity.</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-4xl gap-4">
        {faqs.map(([question, answer]) => (
          <article key={question} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-950">{question}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">{answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
