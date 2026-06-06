/**
 * Loading Skeleton Components for Product Page
 */

export function ProductGallerySkeleton() {
  return (
    <div className="w-full space-y-3 sm:space-y-4 animate-pulse">
      {/* Main image skeleton */}
      <div className="relative w-full rounded-lg bg-light-grey">
        <div className="aspect-[4/5] w-full bg-gray-300 rounded-lg" />
      </div>

      {/* Thumbnails skeleton */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded" />
        <div className="flex-1 flex gap-2 sm:gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-300 rounded flex-shrink-0"
            />
          ))}
        </div>
        <div className="h-10 w-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function ProductInfoSkeleton() {
  return (
    <div className="w-full space-y-4 sm:space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="h-8 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
      </div>

      {/* Price skeleton */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-32" />
        <div className="h-4 bg-gray-300 rounded w-24" />
      </div>

      {/* Size skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-12" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-300 rounded" />
          ))}
        </div>
      </div>

      {/* Color skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-12" />
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-300 rounded-full" />
          ))}
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-1 h-10 bg-gray-300 rounded" />
        <div className="flex-1 h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-32" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded border border-gray-300 p-4 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-2/3" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SimilarItemsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-32" />
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded border border-gray-300 overflow-hidden">
            <div className="aspect-[4/5] bg-gray-300" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FullPageSkeleton() {
  return (
    <main className="w-full bg-light-grey">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 bg-white">
        <section className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ProductGallerySkeleton />
          <ProductInfoSkeleton />
        </section>
      </div>
    </main>
  );
}
