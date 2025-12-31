import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const severityColor = {
  low: "green",
  medium: "orange",
  high: "red"
};

function MapView({ incidents, theme }) {
  const [units, setUnits] = useState([]);

  useEffect(() => {
  const fetchUnits = () => {
    axios
      .get("http://localhost:5001/api/units")
      .then(res => setUnits(res.data))
      .catch(err => console.error(err));
  };

  fetchUnits(); // initial load

  const interval = setInterval(() => {
    fetchUnits();
  }, 10000);

  return () => clearInterval(interval);
}, []);


  return (
    <MapContainer
      center={[30.7333, 76.7794]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}

    >
      <TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url={
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }
/>

      {/* INCIDENT MARKERS */}
      {incidents.map(incident => (
        <Marker
          key={incident._id}
          position={[
            incident.location.coordinates[1],
            incident.location.coordinates[0]
          ]}
        >
          <Popup>
            <strong>{incident.description}</strong>
            <br />
            Severity:{" "}
            <span style={{ color: severityColor[incident.severity] }}>
              {incident.severity}
            </span>
            <br />
            Status: {incident.status}
          </Popup>
        </Marker>
      ))}

      {/* UNIT MARKERS */}
      {units.map(unit => (
        <CircleMarker
          key={unit._id}
          center={[
            unit.location.coordinates[1],
            unit.location.coordinates[0]
          ]}
          radius={8}
          color={unit.available ? "blue" : "gray"}
          fillOpacity={0.8}
        >
          <Popup>
            <strong>Unit ID:</strong> {unit.unitId}
            <br />
            Type: {unit.type}
            <br />
            Status: {unit.available ? "Available" : "Busy"}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default MapView;
