function PropertySkeleton() {
  return (
    <div className="animate-pulse">

      {/* Image placeholder */}
      <div className="h-52 bg-gray-200 rounded-xl"></div>

      {/* Text placeholders */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
      </div>

    </div>
  );
}

export default PropertySkeleton;