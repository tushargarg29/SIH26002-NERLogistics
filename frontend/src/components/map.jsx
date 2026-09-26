import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet default pin fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CITIES = {
  Guwahati: { coords: [26.1445, 91.7362], state: "Assam", hub: "Primary Cargo Depot" },
  Imphal: { coords: [24.817, 93.9368], state: "Manipur", hub: "Border Trade Zone" },
  Shillong: { coords: [25.5788, 91.8933], state: "Meghalaya", hub: "Central Logistics Post" },
  Dimapur: { coords: [25.9094, 93.7266], state: "Nagaland", hub: "Railhead Distribution Hub" },
  Agartala: { coords: [23.8315, 91.2868], state: "Tripura", hub: "Integrated Checkpost" },
  Aizawl: { coords: [23.7271, 92.7176], state: "Mizoram", hub: "Southern Transit Point" },
  Silchar: { coords: [24.8333, 92.7789], state: "Assam", hub: "Barak Valley Transit" },
  Kohima: { coords: [25.6751, 94.1086], state: "Nagaland", hub: "Mountain Pass Station" },
};

export default function Map() {
  const [fromCity, setFromCity] = useState("Shillong");
  const [toCity, setToCity] = useState("Imphal");
  const [routeCoords, setRouteCoords] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRealRoute = async () => {
    const origin = CITIES[fromCity];
    const dest = CITIES[toCity];

    if (!origin || !dest || fromCity === toCity) return;

    setLoading(true);

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.coords[1]},${origin.coords[0]};${dest.coords[1]},${dest.coords[0]}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const rawCoords = data.routes[0].geometry.coordinates;
        setRouteCoords(rawCoords.map((coord) => [coord[1], coord[0]]));
        setRouteInfo({
          distance: (data.routes[0].distance / 1000).toFixed(1),
          duration: (data.routes[0].duration / 3600).toFixed(1),
        });
      }
    } catch (err) {
      console.error("Routing error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-split">
      {/* Control & Intelligence Sidebar */}
      <aside className="control-sidebar">
        
        {/* Origin / Destination Panel */}
        <div className="ui-panel">
          <div className="panel-header">
            <h3>Route Planner</h3>
            <span className="tag">Live Matrix</span>
          </div>

          <div className="form-group">
            <label>Origin Hub</label>
            <div className="input-row">
              <span className="node-marker green-node">A</span>
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="select-custom"
              >
                {Object.keys(CITIES).map((c) => (
                  <option key={`from-${c}`} value={c}>{c} ({CITIES[c].state})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Destination Hub</label>
            <div className="input-row">
              <span className="node-marker red-node">B</span>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="select-custom"
              >
                {Object.keys(CITIES).map((c) => (
                  <option key={`to-${c}`} value={c}>{c} ({CITIES[c].state})</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={fetchRealRoute}
            disabled={loading}
            className="action-btn"
          >
            {loading ? "Computing Safe Corridor..." : "Generate Safe Route"}
          </button>
        </div>

        {/* Live Metrics Card (Appears on Route Calculation) */}
        {routeInfo && (
          <div className="ui-panel metrics-panel">
            <div className="panel-header">
              <h3>Corridor Telemetry</h3>
              <span className="tag verified">Optimal</span>
            </div>
            <div className="metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Highway Distance</span>
                <span className="metric-value">{routeInfo.distance} <small>km</small></span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Est. Drive Time</span>
                <span className="metric-value">{routeInfo.duration} <small>hrs</small></span>
              </div>
            </div>
            <div className="road-type">
              <span>Primary Corridors: NH-27, NH-29, NH-37</span>
            </div>
          </div>
        )}

        {/* Regional Highway Advisory */}
        <div className="ui-panel advisory-panel">
          <div className="panel-header">
            <h3>Highway Status</h3>
            <span className="live-pulse"></span>
          </div>
          <ul className="status-list">
            <li>
              <span className="dot dot-green"></span>
              <div>
                <strong>NH-27 (Guwahati – Lumding)</strong>
                <p>Normal traffic flow, no weather halts</p>
              </div>
            </li>
            <li>
              <span className="dot dot-yellow"></span>
              <div>
                <strong>NH-29 (Dimapur – Kohima)</strong>
                <p>Heavy freight convoy slowing transit</p>
              </div>
            </li>
            <li>
              <span className="dot dot-green"></span>
              <div>
                <strong>NH-37 (Silchar Valley Corridor)</strong>
                <p>Clear, checkpost lanes open</p>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Map Viewport */}
      <div className="map-wrapper">
        <MapContainer
          center={[25.8, 93.2]}
          zoom={7}
          minZoom={6}
          maxZoom={15}
          zoomControl={false}
          scrollWheelZoom={true}
          className="leaflet-full"
        >
          <ZoomControl position="bottomright" />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {Object.entries(CITIES).map(([name, data]) => (
            <Marker key={name} position={data.coords}>
              <Popup>
                <div style={{ color: "#0f172a" }}>
                  <strong style={{ fontSize: "1rem" }}>{name}</strong>
                  <p style={{ margin: "2px 0 0 0", color: "#64748b" }}>{data.hub}</p>
                  <p style={{ margin: "4px 0 0 0", fontWeight: "bold", color: "#059669" }}>
                    Node operational
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {routeCoords && (
            <Polyline
              positions={routeCoords}
              color="#2563eb"
              weight={6}
              opacity={0.9}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}