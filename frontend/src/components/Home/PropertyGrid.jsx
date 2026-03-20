import PropertyCard from "../PropertyCard";
import PropertySkeleton from "../PropertySkeleton";

function PropertyGrid({ properties, loading }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <PropertySkeleton key={i} />
          ))
        : properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
      }

    </div>
  );
}

export default PropertyGrid;