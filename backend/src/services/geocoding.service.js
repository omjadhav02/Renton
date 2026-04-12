// services/geocoding.service.js

export const getCoordinates = async (address) => {
  try {
    
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "RentonApp/1.0 (omjadhav1053@gmail.com)"
        }
      }
    );
    
    const data = await res.json();

    if (!data || data.length === 0) {
      throw new Error("Location not found");
    }

    await delay(1000);

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };

  } catch (error) {
    throw new Error("Geocoding failed: " + error.message);
  }
};
const delay = (ms) => new Promise(res => setTimeout(res, ms));