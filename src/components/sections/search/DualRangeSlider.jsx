const MAX_INR = 50000;

export default function DualRangeSlider({ min, max, setMin, setMax }) {
  const minPct = (min / MAX_INR) * 100;
  const maxPct = (max / MAX_INR) * 100;

  return (
    <div>
      <style>{`
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#6A2CFF;cursor:pointer;border:2px solid white;box-shadow:0 2px 8px rgba(106,44,255,0.4);}
        input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#6A2CFF;cursor:pointer;border:2px solid white;}
      `}</style>
      <div className="relative h-5 flex items-center mb-3">
        <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
        <div
          className="absolute h-1 bg-[#6A2CFF] rounded-full"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        <input
          type="range" min={0} max={MAX_INR} step={500} value={min}
          onChange={(e) => setMin(Math.min(+e.target.value, max - 500))}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: min > MAX_INR - 1000 ? 5 : 3 }}
        />
        <input
          type="range" min={0} max={MAX_INR} step={500} value={max}
          onChange={(e) => setMax(Math.max(+e.target.value, min + 500))}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Min</p>
          <p className="text-sm font-black text-gray-900">₹{min.toLocaleString("en-IN")}</p>
        </div>
        <div className="w-4 h-px bg-gray-300" />
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-center">
          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Max</p>
          <p className="text-sm font-black text-gray-900">₹{max.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  );
}
