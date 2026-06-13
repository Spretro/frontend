export default function CheckoutSection({ eyebrow, title, action, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-[#E8E4F4] bg-white p-4 ${className}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-1 text-base font-black text-gray-950">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
