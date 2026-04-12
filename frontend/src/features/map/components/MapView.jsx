import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ properties }) => {
  const defaultCenter = [20.0057, 73.7651]; // Nashik

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {properties.filter(p => p.latitude && p.longitude).map((p) => (
        <Marker key={p.id} position={[p.latitude, p.longitude]}>
          <Popup>
            <strong>{p.title}</strong><br />
            ₹{p.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;