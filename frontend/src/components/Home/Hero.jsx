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
    <section className="relative py-24 px-6 bg-slate-950 overflow-hidden">

      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
          A smarter way to discover your home.
        </h1>

        <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
  Effortlessly explore premium homes, connect with verified owners, and move in with confidence.
</p>

        {/* Search */}
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