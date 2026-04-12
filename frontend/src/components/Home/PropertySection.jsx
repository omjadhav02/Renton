import PropertyGrid from "./PropertyGrid";

function PropertySection({ properties, loading, Fav }) {
  return (
    <section className="px-4 py-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">

        <div>
          <h2 className="text-3xl font-semibold text-white">
            Explore Properties
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Homes curated for your lifestyle
          </p>
        </div>

        {!loading && (
          <span className="text-sm text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 w-fit">
            {properties.length} available
          </span>
        )}

      </div>

      <PropertyGrid properties={properties} loading={loading} Fav={Fav} />

    </section>
  );
}

export default PropertySection;