import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

const roles = ["Frontend Engineer", "Fashion Category Manager", "Customer Experience Associate", "Performance Marketing Executive"];

export default function Careers() {
  return (
    <main className="bg-[#F9F8FF] px-4 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#6A2CFF]">Careers</p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-950 md:text-6xl">Join SPETRO</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
          Build the shopping experience with people who care about fashion, operations, product quality, and customer trust.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4">
        {roles.map((role) => (
          <article key={role} className="grid items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-[32px_1fr_auto]">
            <BriefcaseBusiness className="text-[#6A2CFF]" size={22} />
            <h2 className="font-black text-gray-950">{role}</h2>
            <Link className="w-max rounded-xl bg-[#6A2CFF] px-5 py-2.5 text-sm font-black text-white" to="/contact-us">
              Apply
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
