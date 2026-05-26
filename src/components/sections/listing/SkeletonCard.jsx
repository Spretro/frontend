export default function ListingSkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white animate-pulse" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="bg-gray-200" style={{ aspectRatio: "3/4" }} />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-200 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3.5 bg-gray-200 rounded-full w-1/2" />
        <div className="h-10 bg-gray-200 rounded-2xl mt-1" />
      </div>
    </div>
  );
}
