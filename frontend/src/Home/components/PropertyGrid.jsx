import PropertyCard from "../../components/PropertyCard";
import PropertySkeleton from "../../components/PropertySkeleton";

function PropertyGrid({ properties, loading, Fav, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
  {loading
    ? Array.from({ length: 8 }).map((_, i) => (
        <PropertySkeleton key={i} />
      ))
    : properties.map((property) => (
        <PropertyCard key={property.id} property={property} Fav={Fav} onSelect={onSelect}/>
      ))
  }

</div>
  );
}

export default PropertyGrid;