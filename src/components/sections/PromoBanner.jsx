export default function PromoBanner() {
  return (
    <section className="px-8 py-4">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl px-12 py-6 flex items-center justify-between overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/10 rounded-full" />
        <div className="absolute right-1/4 top-0 w-24 h-24 border-4 border-white/10 rounded-full" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <div>
            <div className="text-white text-2xl font-bold">GET ₹200 OFF*</div>
            <div className="text-white/80 text-sm">on your first 3 orders</div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="text-green-400 text-6xl font-black opacity-20">*20</div>
          <div className="text-green-400 text-4xl font-black">*20</div>
        </div>
      </div>
    </section>
  );
}
