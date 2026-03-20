import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Hero({ onSearch }) {

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-4xl">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect Home
        </h1>

        <p className="text-gray-200 mb-10 text-lg">
          Rent apartments, villas & homes easily with Renton
        </p>

        {/* Glass Search Bar */}
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-full flex items-center overflow-hidden shadow-lg">

          <input
            type="text"
            placeholder="Search city, area, or property..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-200 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-4 flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <IoSearchOutline size={20}/>
            Search
          </button>

        </div>

        {/* Quick Cities */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">

          {["Mumbai", "Delhi", "Pune", "Bangalore"].map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-sm hover:bg-white/30 transition"
            >
              {city}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Hero;