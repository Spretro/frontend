import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Support</p>
        <h1 className="text-4xl font-black tracking-tight text-gray-950 md:text-6xl">Contact Us</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
          Need help with orders, delivery, returns, payments, or partnerships? Our support team is ready to help.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
        {[
          { icon: Phone, title: "Call", value: "+91 98765 43210", note: "Monday to Saturday, 9 AM to 7 PM" },
          { icon: Mail, title: "Email", value: "support@spetro.com", note: "Replies usually arrive within one business day" },
          { icon: MapPin, title: "Office", value: "SPETRO Commerce Hub, Bengaluru", note: "Visits by appointment only" },
        ].map(({ icon: Icon, title, value, note }) => (
          <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#F3EEFF] text-[#6A2CFF]">
              <Icon size={22} />
            </div>
            <h2 className="text-xl font-black text-gray-950">{title}</h2>
            <p className="mt-3 font-bold text-gray-800">{value}</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">{note}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[0.85fr_1.15fr] md:p-8">
        <div>
          <h2 className="text-2xl font-black text-gray-950">Send A Message</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">Share your details and the team will get back to you.</p>
        </div>
        <form className="grid gap-3">
          <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6A2CFF]" placeholder="Name" />
          <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6A2CFF]" placeholder="Email" type="email" />
          <textarea className="min-h-32 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6A2CFF]" placeholder="Message" />
          <button className="w-max rounded-xl bg-[#6A2CFF] px-6 py-3 text-sm font-black text-white" type="button">Submit</button>
        </form>
      </section>
    </main>
  );
}
