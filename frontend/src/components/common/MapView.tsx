// MapView.jsx (or .tsx)
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";

const ResizeHandler = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

const normalIcon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // maybe red
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FlyToLocation = ({
  center,
  zoom = 4,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [map, center, zoom]);
  return null;
};

const LocationPicker = ({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelect({ lat, lng });
    },
  });
  return null;
};

export default function MapView({
  center = [28.168875180063345, 3.025376507503128] /* Algiers */,
  markers = [],
  handleSelect,
  zoom = 5,
}: {
  center?: [number, number];
  markers?: Array<{ lat: number; lng: number; type?: string; label?: string }>;
  handleSelect?: (coords: { lat: number; lng: number }) => void;
  zoom?: number;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        errorTileUrl="https://via.placeholder.com/256?text=No+Tile"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={marker.type === "active" ? activeIcon : normalIcon}
          title="dddd"
          alt="ddd"
        >
          <Tooltip permanent direction="top" offset={[0, -40]}>
            {marker.label}
          </Tooltip>
        </Marker>
      ))}
      {handleSelect && <LocationPicker onSelect={handleSelect} />}
      <FlyToLocation center={center} zoom={zoom} />
      <ResizeHandler />
    </MapContainer>
  );
}
