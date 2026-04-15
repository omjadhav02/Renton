import { useProperties } from "../hooks/useProperties";
import Hero from "../components/Home/Hero"
import PropertySection from "../components/Home/PropertySection"
import { useFavorites } from "../hooks/useFavorites";
import MapView from "../features/map/components/MapView"
import { useState } from "react";

import { IoBedOutline, IoWaterOutline, IoLocationOutline, IoCashOutline, IoOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
        <div className="mt-4">

          {selectedProperty ? (
            <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg p-5 hover:shadow-xl transition">

              {/* IMAGE */}
              <div className="relative mb-4">
                <img
                  src={selectedProperty.images?.[0]?.imageUrl || "https://via.placeholder.com/400"}
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow">
                  ₹ {selectedProperty.price}/month
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-slate-900 mb-1">
                {selectedProperty.title}
              </h3>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                <IoLocationOutline className="text-indigo-500" />
                <span className="line-clamp-1">{selectedProperty.address}</span>
              </div>

              {/* DETAILS */}
              <div className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 mb-4">
                <div className="flex items-center gap-1">
                  <IoBedOutline className="text-indigo-500" />
                  <span>{selectedProperty.bedrooms} Bedrooms</span>
                </div>

                <div className="flex items-center gap-1">
                  <IoWaterOutline className="text-blue-500" />
                  <span>{selectedProperty.bathrooms} Bathrooms</span>
                </div>

                <div className="flex items-center gap-1">
                  <IoCashOutline className="text-green-600" />
                  <span>₹{selectedProperty.deposit}</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {selectedProperty.description}
              </p>

              {/* ACTION */}
              <button
                onClick={() => navigate(`/property/${selectedProperty.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium"
              >
                <IoOpenOutline size={18} />
                View Details
              </button>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 mt-10">
              <IoLocationOutline size={48} />
              <p className="mt-2 text-center">Select a property to see details here</p>
            </div>
          )}

        </div>
      </div>

    </div>

  </div>

);
}

export default Home;