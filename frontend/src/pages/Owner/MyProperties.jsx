import OwnerPropertyCard from "../../components/OwnerPropertyCard";
import { Link } from "react-router-dom";
import { useMyProperties } from "../../hooks/useMyProperties";

function MyProperties() {
  const { properties, loading } = useMyProperties();

  // ✅ LOADING UI (Skeleton style)
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-60 bg-white rounded-2xl border border-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Properties
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and update your listings
          </p>
        </div>

        {/* CTA BUTTON */}
        <Link
          to="/owner/create-property"
          className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium"
        >
          + Add Property
        </Link>
      </div>

      {/* EMPTY STATE */}
      {properties.length === 0 ? (
        <div className="p-12 bg-white border border-gray-200 rounded-2xl text-center">
          <div className="text-4xl mb-3">🏡</div>
          <p className="text-gray-700 font-medium">
            No properties yet
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Start by adding your first property
          </p>

          <Link
            to="/owner/create-property"
            className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium"
          >
            Add Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <OwnerPropertyCard property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProperties;