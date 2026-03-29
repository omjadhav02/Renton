import { useState } from "react";

export const useSearchProperty = (onSearch) => {
    const [filters, setFilters] = useState({
        city: "",
        bedrooms: "",
        propertyType: "",
      });
    
      const [price, setPrice] = useState([0, 100000]);
    
      const bhkOptions = [1, 2, 3, 4];
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
    
      // Handle search 
      const handleSearch = () => {
        const cleanedFilters = {
          ...filters,
          minPrice: price[0],
          maxPrice: price[1],
        };
    
        const finalFilters = Object.fromEntries(
          Object.entries(cleanedFilters).filter(([_, v]) => v !== "")
        );
    
        onSearch(finalFilters);
    };

    return { price, setPrice, filters, setFilters, handleChange, handleSearch, bhkOptions }
}