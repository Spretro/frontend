import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4 px-5">
      <button
        className="flex items-center justify-between w-full text-left group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs font-black uppercase tracking-widest text-gray-800 group-hover:text-[#6A2CFF] transition-colors">
          {title}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={2.5}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
