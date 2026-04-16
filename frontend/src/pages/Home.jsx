import { useProperties } from "../hooks/useProperties";
import Hero from "../components/Home/Hero"
import PropertySection from "../components/Home/PropertySection"
import { useFavorites } from "../hooks/useFavorites";
import MapView from "../features/map/components/MapView"
import { useState } from "react";

import { IoBedOutline, IoWaterOutline, IoLocationOutline, IoCashOutline, IoOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Info from "../features/map/components/Info";

function Home() {
  const { properties, loading, handleSearch, error } = useProperties();
  const { addFav, removeFav, favIds } = useFavorites();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const Fav = { addFav, removeFav, favIds };

  const navigate = useNavigate();

return (
  <div className="bg-slate-50 min-h-screen">

    <Hero onSearch={handleSearch} />

    {error && (
      <p className="text-red-500 text-center mt-6">
        {typeof error === "string" ? error : error?.message}
      </p>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6 mt-6 px-4 h-[calc(100vh-100px)]">

      {/* LEFT */}
      <div className="overflow-y-auto h-full pr-2">
        <PropertySection
          properties={properties}
          loading={loading}
          Fav={Fav}
          onSelect={setSelectedProperty}
        />
      </div>

      {/* RIGHT MAP */}
      <div className="hidden lg:flex flex-col h-full overflow-y-auto pr-2">

        {/* MAP */}
        <div className="h-[350px] flex-shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg">
          <MapView property={selectedProperty} />
        </div>

        {/* SCROLLABLE INFO */}
        <Info selectedProperty={selectedProperty} navigate={navigate}/>
      </div>

    </div>

  </div>

);
}

export default Home;