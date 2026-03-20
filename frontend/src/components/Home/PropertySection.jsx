import PropertyGrid from "./PropertyGrid";

function PropertySection({ properties, loading }) {

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-3">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Explore Properties
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Find homes that match your lifestyle
          </p>
        </div>

        {!loading && (
          <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full w-fit">
            {properties.length} available
          </span>
        )}

      </div>

      {/* Grid */}
      <PropertyGrid properties={properties} loading={loading} />

    </section>
  );
}

export default PropertySection;