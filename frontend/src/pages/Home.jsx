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
  <div className="bg-slate-50 min-h-screen">

    <Hero onSearch={handleSearch} />

    {error && (
      <p className="text-red-500 text-center mt-6">
        {typeof error === "string" ? error : error?.message}
      </p>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6 mt-6 px-4">

      {/* LEFT */}
      <div className="overflow-y-auto">
        <PropertySection
          properties={properties}
          loading={loading}
          Fav={Fav}
        />
      </div>

      {/* RIGHT MAP */}
      <div className="hidden lg:block sticky top-6 h-[70vh]">
        <div className="h-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg">
          <MapView properties={properties} />
        </div>
      </div>

    </div>

  </div>

);
}

export default Home;