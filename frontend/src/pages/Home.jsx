import { useProperties } from "../hooks/useProperties";
import Hero from "../components/Home/Hero"
import PropertySection from "../components/Home/PropertySection"
import { useFavorites } from "../hooks/useFavorites";
import MapView from "../features/map/components/MapView"

function Home() {
  const { properties, loading, handleSearch, error } = useProperties();
  const { addFav, removeFav, favIds } = useFavorites();

  const Fav = { addFav, removeFav, favIds };

  return (
    <div className="bg-slate-950 min-h-screen">

      <Hero onSearch={handleSearch} />

      {error && (
        <p className="text-red-400 text-center mt-6">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] mt-10">

        {/* LEFT: Listings */}
        <div className="overflow-y-auto px-4">
          <PropertySection
            properties={properties}
            loading={loading}
            Fav={Fav}
          />
        </div>

        {/* RIGHT: Sticky Map */}
        <div className="hidden lg:block h-[60vh] sticky top-5 pr-4">
          <div className="h-full rounded-xl overflow-hidden shadow-lg border border-slate-800">
            <MapView properties={properties} />
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default Home;