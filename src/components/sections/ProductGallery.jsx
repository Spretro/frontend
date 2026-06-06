import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useRef, useState } from "react";
import { IMAGE_PLACEHOLDER } from "../../lib/productUtils";

const VISIBLE_THUMBNAILS = 5;
const SWIPE_THRESHOLD_PX = 40;

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const touchStartX = useRef(null);

  const hasImages = images.length > 0;
  const safeActiveIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
  const maxThumbStart = Math.max(images.length - VISIBLE_THUMBNAILS, 0);
  const safeThumbStart = Math.min(thumbStart, maxThumbStart);
  const visibleImages = images.slice(
    safeThumbStart,
    safeThumbStart + VISIBLE_THUMBNAILS
  );
  const showThumbControls = images.length > VISIBLE_THUMBNAILS;
  const showMobileProgress = images.length > 1;
  const mobileProgressWidth = `${100 / images.length}%`;
  const mobileProgressOffset = `${safeActiveIndex * (100 / images.length)}%`;
  const activeImage = failedImages[safeActiveIndex]
    ? IMAGE_PLACEHOLDER
    : images[safeActiveIndex] || IMAGE_PLACEHOLDER;

  const keepThumbnailVisible = (index) => {
    setThumbStart((current) => {
      if (index < current) return index;
      if (index >= current + VISIBLE_THUMBNAILS) {
        return Math.min(index - VISIBLE_THUMBNAILS + 1, maxThumbStart);
      }
      return current;
    });
  };

  const showImage = (index) => {
    setActiveIndex(index);
    keepThumbnailVisible(index);
  };

  const goPrevious = () => {
    const nextIndex =
      safeActiveIndex === 0 ? images.length - 1 : safeActiveIndex - 1;
    showImage(nextIndex);
  };

  const goNext = () => {
    const nextIndex =
      safeActiveIndex === images.length - 1 ? 0 : safeActiveIndex + 1;
    showImage(nextIndex);
  };

  const shiftThumbnails = (direction) => {
    setThumbStart((current) => {
      if (direction === "previous") return Math.max(current - 1, 0);
      return Math.min(current + 1, maxThumbStart);
    });
  };

  const markImageFailed = (index) => {
    setFailedImages((current) => ({ ...current, [index]: true }));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || images.length <= 1) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") return;

    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) goNext();
    else goPrevious();
  };

  if (!hasImages) {
    return (
      <section aria-label="Product gallery" className="w-full">
        <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl bg-[#F3EEFF] text-center">
          <AlertCircle size={40} className="mb-2 text-[#6A2CFF]" />
          <p className="text-sm font-bold text-gray-600">No images available</p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Product gallery"
      className="grid min-w-0 self-start gap-3 lg:grid-cols-[84px_minmax(0,1fr)] lg:items-start"
    >
      <div className="hidden min-w-0 lg:order-1 lg:block">
        <div className="product-scrollbar-hidden flex gap-2 overflow-x-auto px-9 pb-1 lg:max-h-[640px] lg:flex-col lg:overflow-hidden lg:px-0 lg:py-10">
          {visibleImages.map((src, index) => {
            const absoluteIndex = safeThumbStart + index;
            const isActive = absoluteIndex === safeActiveIndex;

            return (
              <button
                key={`${src}-${absoluteIndex}`}
                type="button"
                onClick={() => showImage(absoluteIndex)}
                className={`h-20 w-16 shrink-0 overflow-hidden rounded-2xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A2CFF] sm:h-24 sm:w-20 lg:h-auto lg:w-full ${
                  isActive
                    ? "border-[3px] border-[#6A2CFF] ring-4 ring-inset ring-[#6A2CFF] shadow-sm"
                    : "border-gray-100 hover:border-[#6A2CFF]"
                }`}
                aria-label={`View product image ${absoluteIndex + 1}`}
                aria-current={isActive}
              >
                <span className="block aspect-[3/4] h-full w-full">
                  <img
                    src={failedImages[absoluteIndex] ? IMAGE_PLACEHOLDER : src}
                    alt={`Product thumbnail ${absoluteIndex + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => markImageFailed(absoluteIndex)}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {showThumbControls && (
          <div className="mt-3 flex items-center justify-center gap-3 lg:mt-4">
            <button
              type="button"
              onClick={() => shiftThumbnails("previous")}
              disabled={safeThumbStart === 0}
              className="flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm transition-all hover:border-[#6A2CFF] hover:text-[#6A2CFF] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
              aria-label="Show previous thumbnails"
            >
              <ChevronLeft size={17} strokeWidth={3} className="lg:hidden" />
              <ChevronUp
                size={17}
                strokeWidth={3}
                className="hidden lg:block"
              />
            </button>
            <button
              type="button"
              onClick={() => shiftThumbnails("next")}
              disabled={safeThumbStart === maxThumbStart}
              className="flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm transition-all hover:border-[#6A2CFF] hover:text-[#6A2CFF] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
              aria-label="Show next thumbnails"
            >
              <ChevronRight size={17} strokeWidth={3} className="lg:hidden" />
              <ChevronDown
                size={17}
                strokeWidth={3}
                className="hidden lg:block"
              />
            </button>
          </div>
        )}
      </div>

      <div
        className="relative order-1 self-start overflow-hidden rounded-3xl bg-gray-50 lg:order-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="aspect-[4/5] w-full">
          <img
            src={activeImage}
            alt={`Product image ${safeActiveIndex + 1} of ${images.length}`}
            className="h-full w-full touch-pan-y object-cover"
            onError={() => markImageFailed(safeActiveIndex)}
          />
        </div>

        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 items-center justify-between lg:flex">
            <button
              type="button"
              onClick={goPrevious}
              className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/85 text-gray-900 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 md:size-10"
              aria-label="Show previous product image"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/85 text-gray-900 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 md:size-10"
              aria-label="Show next product image"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}

        <div className="absolute bottom-3 right-3 rounded-full bg-gray-950/80 px-3 py-1 text-[10px] font-black text-white backdrop-blur-sm">
          {safeActiveIndex + 1} / {images.length}
        </div>
      </div>

      {showMobileProgress && (
        <div
          className="order-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 lg:hidden"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gray-950 transition-[margin] duration-300"
            style={{
              width: mobileProgressWidth,
              marginLeft: mobileProgressOffset,
            }}
          />
        </div>
      )}
    </section>
  );
}
