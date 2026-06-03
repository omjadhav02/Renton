import { useSearchProperty } from "../../hooks/useSearchProperty";
import SearchBar from "./SearchBar";

function Hero({ onSearch }) {
  const {
    price,
    setPrice,
    filters,
    setFilters,
    handleChange,
    handleSearch,
    bhkOptions,
  } = useSearchProperty(onSearch);

  return (
    <section className="relative px-4 pt-16 pb-10 bg-gradient-to-b from-slate-50 via-white to-white">

      <div className="max-w-5xl mx-auto text-center">

        {/* HEADLINE */}
        <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
          Find your next <span className="text-indigo-600">perfect home</span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-slate-500 mt-4 mb-8 text-base md:text-lg max-w-xl mx-auto">
          Smart search. Seamless booking. Designed for modern renters.
        </p>

        {/* SEARCH CARD */}
        <div >
          <SearchBar
            handleChange={handleChange}
            handleSearch={handleSearch}
            filters={filters}
            price={price}
            bhkOptions={bhkOptions}
            setFilters={setFilters}
            setPrice={setPrice}
          />
        </div>

      </div>

      {/* OPTIONAL: subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

    </section>
  );
}

export default Hero;