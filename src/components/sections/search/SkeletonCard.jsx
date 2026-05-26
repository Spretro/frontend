export default function SearchSkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white animate-pulse">
      <div className="bg-gray-100" style={{ aspectRatio: "3/4" }} />
      <div className="p-3.5 space-y-2">
        <div className="h-2 bg-gray-100 rounded-full w-1/3" />
        <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-9 bg-gray-100 rounded-xl mt-2" />
      </div>
    </div>
  );
}
