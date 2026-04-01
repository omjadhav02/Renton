import { useProperties } from "../hooks/useProperties";
import Hero from "../components/Home/Hero"
import PropertySection from "../components/Home/PropertySection"
import { useFavorites } from "../hooks/useFavorites";

function Home() {
  const { properties, loading, handleSearch, error } = useProperties();

  const { addFav, removeFav, favIds } = useFavorites();

  const Fav = {addFav, removeFav, favIds}

  return (
    <div>
      <Hero onSearch={handleSearch}></Hero>

      {error && (
        <p className="text-red-500 text-center mt-4">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}

      <PropertySection properties={properties} loading={loading} Fav={Fav}/>
    </div>
  )
}

export default Home;