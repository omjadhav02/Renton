import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import PropertySkeleton from "../components/PropertySkeleton";
import Hero from "../components/Home/Hero";
import PropertySection from "../components/Home/PropertySection";

function Home() {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProperties = async () => {

      try {

        const res = await axiosInstance.get("/properties");

        setProperties(res.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProperties();

  }, []);

  const handleSearch = async ( query ) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/properties?city=${query}`)

      setProperties(res.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }


  return (

    <div>

      {/* HERO SECTION */}
      <Hero onSearch={handleSearch} />


      {/* PROPERTY LISTINGS */}
      <PropertySection
        properties={properties}
        loading={loading}
      />

    </div>

  );
}

export default Home;