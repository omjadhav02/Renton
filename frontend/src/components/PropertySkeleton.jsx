function PropertySkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

      {/* Image */}
      <div className="h-52 bg-slate-200"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3 mt-2"></div>
      </div>

    </div>
  );
}

export default PropertySkeleton;