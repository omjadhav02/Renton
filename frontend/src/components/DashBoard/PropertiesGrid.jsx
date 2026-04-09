import PropertyCard from "./PropertyCard";

const PropertiesGrid = ({ properties }) => {
  return (
    <div className="mb-8">
      
      <h2 className="text-lg font-semibold mb-4">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PropertiesGrid;