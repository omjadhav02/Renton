import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import OwnerPropertyCard from "../components/OwnerPropertyCard";

function OwnerProperties() {

  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {

    const fetchProperties = async () => {
      try {

        const res = await axiosInstance.get("/properties");

        // filter only owner's properties
        const myProperties = res.data.filter(
          (p) => p.owner.id === user.id
        );

        setProperties(myProperties);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();

  }, [user]);

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-500">
          No properties added yet.
        </p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {properties.map((property) => (
            <OwnerPropertyCard
              key={property.id}
              property={property}
            />
          ))}

        </div>

      )}

    </div>

  );

}

export default OwnerProperties;