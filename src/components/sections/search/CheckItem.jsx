import { Check } from "lucide-react";

export default function CheckItem({ label, count, checked, onToggle }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div
        className={`size-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
          checked ? "bg-[#6A2CFF] border-[#6A2CFF]" : "border-gray-300 group-hover:border-[#6A2CFF]"
        }`}
        onClick={onToggle}
      >
        {checked && <Check size={9} strokeWidth={3.5} className="text-white" />}
      </div>
      <span
        className="text-sm text-gray-700 flex-1 leading-tight capitalize group-hover:text-gray-900 transition-colors"
        onClick={onToggle}
      >
        {label.replace(/-/g, " ")}
      </span>
      {count != null && (
        <span className="text-[11px] text-gray-400 font-medium shrink-0">({count})</span>
      )}
    </label>
  );
}
