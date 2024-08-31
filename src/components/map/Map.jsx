import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  const initialPosition = [52.4797, -1.90269];
  const initialZoom = 7;

  return (
    <MapContainer
      center={initialPosition}
      zoom={initialZoom}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
      <ResetViewButton
        initialPosition={initialPosition}
        initialZoom={initialZoom}
      />
    </MapContainer>
  );
}

export default Map;

const ResetViewButton = ({ initialPosition, initialZoom }) => {
  const map = useMap();

  const handleResetView = () => {
    map.setView(initialPosition, initialZoom);
  };

  return (
    <button
      onClick={handleResetView}
      className="reset"
      style={{
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "5px",
        cursor: "pointer",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        top: "10px",
        right: "10px",
        border: "none",
        zIndex: 1000,
      }}
    >
      <img src="/refresh.png" width={"100%"} alt="refresh" />
    </button>
  );
};
