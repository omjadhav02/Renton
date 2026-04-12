import {
  IoSearchOutline,
  IoLocationOutline,
  IoHomeOutline,
  IoBedOutline,
  IoCashOutline,
  IoChevronDown,
} from "react-icons/io5";

const SearchBar = ({
  handleChange,
  filters,
  handleSearch,
  price,
  bhkOptions,
  setFilters,
  setPrice,
}) => {
  return (
    <div className="w-full flex justify-center px-2">

      <div className="
        w-full max-w-6xl
        bg-slate-900 border border-slate-800
        rounded-2xl shadow-2xl
        p-4
        flex flex-col lg:flex-row
        gap-3
      ">

        {/* LOCATION */}
        <div className="flex flex-col sm:flex-row gap-2 flex-1">

          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="w-full min-w-0 bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleChange}
            className="w-full min-w-0 bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={filters.country}
            onChange={handleChange}
            className="w-full min-w-0 bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3">

          {/* BHK */}
          <select
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                bedrooms: e.target.value,
              }))
            }
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">BHK</option>
            {bhkOptions.map((num) => (
              <option key={num} value={num}>
                {num} BHK
              </option>
            ))}
          </select>

          {/* TYPE */}
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
          </select>

          {/* PRICE */}
          <select
            value={`${price[0]}-${price[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              setPrice([min, max]);
            }}
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="0-200000">Budget</option>
            <option value="0-10000">Below ₹10k</option>
            <option value="10000-30000">₹10k - ₹30k</option>
            <option value="30000-60000">₹30k - ₹60k</option>
            <option value="60000-100000">₹60k - ₹1L</option>
            <option value="100000-200000">Above ₹1L</option>
          </select>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg transition"
        >
          Search
        </button>

      </div>

    </div>
  );
};

export default SearchBar;