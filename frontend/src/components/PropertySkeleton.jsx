function PropertySkeleton() {
  return (
    <div className="animate-pulse">

      {/* Image */}
      <div className="h-52 bg-slate-800 rounded-xl"></div>

      {/* Text */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
        <div className="h-3 bg-slate-800 rounded w-1/2"></div>
        <div className="h-4 bg-slate-800 rounded w-1/3 mt-2"></div>
      </div>

    </div>
  );
}

export default PropertySkeleton;