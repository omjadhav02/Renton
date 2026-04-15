import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 14);
    }
  }, [lat, lng]);

  return null;
}

const MapView = ({ property }) => {
  const defaultCenter = [20.0057, 73.7651];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {property && (
        <>
          <RecenterMap
            lat={property.latitude}
            lng={property.longitude}
          />

          <Marker position={[property.latitude, property.longitude]}>
            <Popup>
              <strong>{property.title}</strong><br />
              ₹{property.price}
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default MapView;