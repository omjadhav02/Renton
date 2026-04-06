import { useSearchProperty } from "../../hooks/useSearchProperty";
import SearchBar from "./SearchBar";

function Hero({ onSearch }) {
  const { price, setPrice, filters, setFilters, handleChange, handleSearch, bhkOptions } = useSearchProperty(onSearch);

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
          className={`transition-all duration-300 `}
            
        >
          {/* Search Card */}
          <SearchBar handleChange={handleChange} handleSearch={handleSearch} filters={filters} price={price} bhkOptions={bhkOptions} setFilters={setFilters} setPrice={setPrice}/>
        </div>

      </div>
    </section>
  );
}

export default Hero;