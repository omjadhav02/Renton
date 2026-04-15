import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState, useEffect } from "react";

// 🌍 Search provider
const provider = new OpenStreetMapProvider();


// 📍 Handle map click
function LocationMarker({ setForm }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setForm(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
      }));
    }
  });

  return null;
}


// 🔄 Recenter map when lat/lng changes
function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 14);
    }
  }, [lat, lng]);

  return null;
}


// 🔍 Search Component
function SearchBar({ setForm }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const map = useMap();

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    try {
      const res = await provider.search({ query: value });
      setResults(res);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelect = (place) => {
    const { x, y, label } = place;

    map.setView([y, x], 14);

    setForm(prev => ({
      ...prev,
      latitude: y,
      longitude: x,
      address: label // optional autofill
    }));

    setQuery(label);
    setResults([]);
  };

  return (
    <div className="absolute top-3 right-3 z-[1000] w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search location..."
        className="w-full p-2 rounded-lg border shadow bg-white"
      />

      {results.length > 0 && (
        <div className="bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto">
          {results.map((place, i) => (
            <div
              key={i}
              onClick={() => handleSelect(place)}
              className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {place.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// 🗺️ Main MapPicker
const MapPicker = ({ form, setForm }) => {

  const center = form.latitude && form.longitude
    ? [form.latitude, form.longitude]
    : [18.5204, 73.8567]; // Pune default

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "320px", width: "100%", position: "relative" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔍 Search */}
      <SearchBar setForm={setForm} />

      {/* 📍 Click selection */}
      <LocationMarker setForm={setForm} />

      {/* 🔄 Recenter */}
      {form.latitude && form.longitude && (
        <RecenterMap lat={form.latitude} lng={form.longitude} />
      )}

      {/* 📌 Marker */}
      {form.latitude && form.longitude && (
        <Marker position={[form.latitude, form.longitude]} />
      )}

    </MapContainer>
  );
};

export default MapPicker;