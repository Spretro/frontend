import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({
  items = [],
  renderItem,
  ariaLabel = 'Carousel',
  gapClassName = 'gap-3 sm:gap-4',
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    track?.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      track?.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items.length]);

  const scrollByPage = (direction) => {
    if (!trackRef.current) return;
    const delta = trackRef.current.clientWidth * 0.9;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -delta : delta,
      behavior: 'smooth',
    });
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`flex ${gapClassName} overflow-x-auto scroll-smooth scrollbar-hide`}
        role="region"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <div key={`carousel-item-${item?.id ?? index}`} className="flex-none">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByPage('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 z-10 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} className="text-gray-800" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByPage('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 z-10 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} className="text-gray-800" />
        </button>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
