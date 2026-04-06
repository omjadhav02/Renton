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
    <div className="w-full justify-center mt-6">
      <div className="flex items-center bg-gradient-to-r from-white to-indigo-50 shadow-xl rounded-full border border-indigo-100 px-3 py-2 w-full max-w-6xl">

        {/* LOCATION */}
        <div className="flex items-center gap-2 px-4 flex-1 group">
          <IoLocationOutline className="text-indigo-500 group-hover:scale-110 transition" size={50} />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400 "
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400 "
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={filters.country}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400 "
          />
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* BHK */}
        <div className="relative flex items-center gap-2 px-4 group">
          <IoBedOutline className="text-indigo-500" size={18} />
          <select
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                bedrooms: e.target.value,
              }))
            }
            className="appearance-none bg-transparent outline-none text-sm pr-5 cursor-pointer"
          >
            <option value="">BHK</option>
            {bhkOptions.map((num) => (
              <option key={num} value={num}>
                {num} BHK
              </option>
            ))}
          </select>

          {/* Custom Arrow */}
          <IoChevronDown className="absolute right-2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition" size={14} />
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* PROPERTY TYPE */}
        <div className="relative flex items-center gap-2 px-4 group">
          <IoHomeOutline className="text-indigo-500" size={18} />
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="appearance-none bg-transparent outline-none text-sm pr-5 cursor-pointer"
          >
            <option value="">Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
          </select>

          <IoChevronDown className="absolute right-2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition" size={14} />
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* BUDGET */}
        <div className="relative flex items-center gap-2 px-4 group">
          <IoCashOutline className="text-indigo-500" size={18} />
          <select
            value={`${price[0]}-${price[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              setPrice([min, max]);
            }}
            className="appearance-none bg-transparent outline-none text-sm pr-5 cursor-pointer"
          >
            <option value="0-200000">Budget</option>
            <option value="0-10000">Below ₹10k</option>
            <option value="10000-30000">₹10k - ₹30k</option>
            <option value="30000-60000">₹30k - ₹60k</option>
            <option value="60000-100000">₹60k - ₹1L</option>
            <option value="100000-200000">Above ₹1L</option>
          </select>

          <IoChevronDown className="absolute right-2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition" size={14} />
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="ml-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition"
        >
          <IoSearchOutline size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;