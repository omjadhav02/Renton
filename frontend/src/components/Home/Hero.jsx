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
    // ONLY UI CHANGED — LOGIC SAME

<section className="relative py-24 px-6 bg-white">

  <div className="max-w-6xl mx-auto text-center">

    <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
      Find. Book. MoveIn.
    </h1>

    <p className="text-slate-500 mb-12 text-lg max-w-2xl mx-auto">
      Discover premium homes with a seamless renting experience built for modern living.
    </p>

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
</section>
  );
}

export default Hero;