import { useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { PRODUCT_CONSTANTS } from '../../../utils/constants';

/**
 * ProductGallery Component
 * Displays product images with carousel and thumbnail navigation
 */
export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const visibleThumbnails = PRODUCT_CONSTANTS.THUMBNAIL_COUNT;
  const maxStartIndex = Math.max(images.length - visibleThumbnails, 0);

  /**
   * Get visible thumbnails based on scroll position
   */
  const thumbnails = useMemo(() => {
    return images.slice(thumbStart, thumbStart + visibleThumbnails);
  }, [images, thumbStart, visibleThumbnails]);

  /**
   * Navigate to previous image
   */
  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  /**
   * Navigate to next image
   */
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  /**
   * Shift thumbnail view
   */
  const shiftThumbs = useCallback((direction) => {
    setThumbStart((prev) => {
      if (direction === 'prev') {
        return Math.max(prev - 1, 0);
      }
      return Math.min(prev + 1, maxStartIndex);
    });
  }, [maxStartIndex]);

  /**
   * Handle image loading error
   */
  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  }, []);

  /**
   * Get image source or placeholder
   */
  const getImageSrc = (index) => {
    if (imageErrors[index]) {
      return PRODUCT_CONSTANTS.IMAGE_PLACEHOLDER;
    }
    return images[index] || PRODUCT_CONSTANTS.IMAGE_PLACEHOLDER;
  };

  // Handle empty images array
  if (images.length === 0) {
    return (
      <section aria-label="Product gallery" className="w-full space-y-3 sm:space-y-4">
        <div className="w-full rounded-lg bg-light-grey flex items-center justify-center">
          <div className="aspect-[4/5] w-full flex flex-col items-center justify-center">
            <AlertCircle size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">No images available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Product gallery" className="w-full space-y-3 sm:space-y-4">
      {/* Main image display */}
      <div className="relative w-full overflow-hidden rounded-lg bg-light-grey">
        <div className="aspect-[4/5] w-full">
          <img
            src={getImageSrc(activeIndex)}
            alt={`Product image ${activeIndex + 1} of ${images.length}`}
            className="h-full w-full object-cover transition-transform duration-300"
            onError={() => handleImageError(activeIndex)}
            loading="lazy"
          />
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between pointer-events-none">
          <button
            type="button"
            className="rounded-full bg-white/40 p-2 sm:p-3 text-black shadow hover:bg-white active:scale-95 transition pointer-events-auto"
            onClick={goPrev}
            aria-label={`Previous image (${activeIndex} of ${images.length})`}
          >
            <ChevronLeft size={24} strokeWidth={4} className="sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            className="rounded-full bg-white/40 p-2 sm:p-3 text-black shadow hover:bg-white active:scale-95 transition pointer-events-auto"
            onClick={goNext}
            aria-label={`Next image (${activeIndex + 2} of ${images.length})`}
          >
            <ChevronRight size={24} strokeWidth={4} className="sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="relative flex items-center w-full">
        {/* Thumbnails - Full width with position relative */}
        <div className="flex-1 flex gap-1 sm:gap-1.5 md:gap-2 overflow-hidden">
          {thumbnails.map((src, index) => {
            const absoluteIndex = thumbStart + index;
            const isActive = absoluteIndex === activeIndex;

            return (
              <button
                key={`${src}-${absoluteIndex}`}
                type="button"
                className={`aspect-[4/5] flex-1 overflow-hidden rounded border-2 transition ${
                  isActive
                    ? 'border-purple-500 ring-2 ring-purple-300'
                    : 'border-gray-300 hover:border-purple-500'
                }`}
                onClick={() => setActiveIndex(absoluteIndex)}
                aria-label={`View image ${absoluteIndex + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                <img
                  src={imageErrors[absoluteIndex] ? PRODUCT_CONSTANTS.IMAGE_PLACEHOLDER : src}
                  alt={`Product thumbnail ${absoluteIndex + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => handleImageError(absoluteIndex)}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        {/* Left navigation button - Overlapping 50:50 */}
        <button
          type="button"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded border border-gray-300 p-1.5 sm:p-2 text-black hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-md z-10"
          onClick={() => shiftThumbs('prev')}
          aria-label="Scroll thumbnails left"
          disabled={thumbStart === 0}
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>

        {/* Right navigation button - Overlapping 50:50 */}
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded border border-gray-300 p-1.5 sm:p-2 text-black hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-md z-10"
          onClick={() => shiftThumbs('next')}
          aria-label="Scroll thumbnails right"
          disabled={thumbStart === maxStartIndex}
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
}