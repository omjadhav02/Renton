import PropertyGrid from "./PropertyGrid";

function PropertySection({ properties, loading, Fav, onSelect }) {
  return (
    <section className="px-2 py-6">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">

    <div>
      <h2 className="text-3xl font-semibold text-slate-900">
        Available Homes
      </h2>

      <p className="text-slate-500 text-sm mt-1">
        Curated listings for you
      </p>
    </div>

    {!loading && (
      <span className="text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200 w-fit">
        {properties.length} listings
      </span>
    )}

  </div>

  <PropertyGrid properties={properties} loading={loading} Fav={Fav} onSelect={onSelect} />

</section>
  );
}

export default PropertySection;