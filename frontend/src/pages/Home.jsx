import { useProperties } from "../hooks/useProperties";
import Hero from "../components/Home/Hero"
import PropertySection from "../components/Home/PropertySection"

function Home() {
  const { properties, loading, handleSearch, error } = useProperties();

  return (
    <div>
      <Hero onSearch={handleSearch}></Hero>

      {error && (
        <p className="text-red-500 text-center mt-4"> 
          {error}
        </p>
      )}

      <PropertySection properties={properties} loading={loading}/>
    </div>
  )
}

export default Home;