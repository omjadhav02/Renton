import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Hero({ onSearch }) {
  const [filters, setFilters] = useState({
    city: "",
    bedrooms: "",
    propertyType: "",
  });

  const [price, setPrice] = useState([0, 100000]);

  const bhkOptions = [1, 2, 3, 4];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  // Handle search 
  const handleSearch = () => {
    const cleanedFilters = {
      ...filters,
      minPrice: price[0],
      maxPrice: price[1],
    };

    const finalFilters = Object.fromEntries(
      Object.entries(cleanedFilters).filter(([_, v]) => v !== "")
    );

    onSearch(finalFilters);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Your Perfect Home
        </h1>

        <p className="text-gray-500 mb-10 text-lg">
          Search apartments, villas, and houses effortlessly
        </p>

        {/* Sticky Wrapper */}
        <div
          className={`transition-all duration-300`}
            
        >
          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-7 gap-4 items-end border border-gray-100">

            {/* City */}
            <div className="flex flex-col text-left">
              <label className="text-sm text-gray-500 mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Pune"
                value={filters.city}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Price Slider */}
            <div className="flex flex-col text-left col-span-2">
              <label className="text-sm text-gray-500 mb-2">
                Price: ₹{price[0]} - ₹{price[1]}
              </label>

              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={price[0]}
                onChange={(e) =>
                  setPrice([
                    Math.min(Number(e.target.value), price[1]),
                    price[1],
                  ])
                }
              />

              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={price[1]}
                onChange={(e) =>
                  setPrice([
                    price[0],
                    Math.max(Number(e.target.value), price[0]),
                  ])
                }
              />
            </div>

            {/* Bedrooms (BHK) */}
            <div className="flex flex-col text-left col-span-2">
              <label className="text-sm text-gray-500 mb-2">Bedrooms</label>

              <div className="flex gap-2 flex-wrap">
                {bhkOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        bedrooms:
                          prev.bedrooms === num ? "" : num,
                      }))
                    }
                    className={`px-4 py-2 rounded-full border transition text-sm font-medium
                      ${
                        filters.bedrooms === num
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                      }
                    `}
                  >
                    {num} BHK
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="flex flex-col text-left">
              <label className="text-sm text-gray-500 mb-1">Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md h-[42px]"
            >
              <IoSearchOutline size={18} />
              Search
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;