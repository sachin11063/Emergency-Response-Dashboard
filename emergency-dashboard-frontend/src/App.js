import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import DispatchPanel from "./components/DispatchPanel";
import "./dashboard.css";
import Counter from "./components/Counter";


function App() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const totalIncidents = incidents.length;
const pendingIncidents = incidents.filter(i => i.status === "reported").length;
const assignedIncidents = incidents.filter(i => i.status === "assigned").length;

// Approx response time (minutes): assignedAt - createdAt
const responseTimes = incidents
  .filter(i => i.status === "assigned")
  .map(i => {
    const created = new Date(i.createdAt).getTime();
    const updated = new Date(i.updatedAt).getTime();
    return Math.max(1, Math.round((updated - created) / 60000));
  });

const avgResponseTime =
  responseTimes.length > 0
    ? Math.round(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      )
    : 0;


  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchIncidents = () => {
    setLoading(true);
    axios
      .get("http://localhost:5001/api/incidents")
      .then(res => setIncidents(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchIncidents();

    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDispatch = async (incidentId) => {
    try {
      await axios.post(
        `http://localhost:5001/api/dispatch/${incidentId}`
      );
      showToast("Unit dispatched successfully", "success");
      fetchIncidents();
    } catch {
      showToast("Dispatch failed. No units available.", "error");
    }
  };

  return (
    <>
      <div className="dashboard-header">
        Emergency Response Coordination Dashboard

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <MapView incidents={incidents} theme={theme} />


      <div className="metrics-wrapper">
  <div className="metrics-row">

  <div className="metric-card total">
    <div className="metric-label">Total Incidents</div>
    <div className="metric-value">
  <Counter value={totalIncidents} />
</div>

  </div>

  <div className="metric-card pending">
    <div className="metric-label">Pending Incidents</div>
    <div className="metric-value">
  <Counter value={pendingIncidents} />
</div>

  </div>

  <div className="metric-card assigned">
    <div className="metric-label">Assigned Incidents</div>
    <div className="metric-value">
  <Counter value={assignedIncidents} />
</div>

  </div>

  <div className="metric-card time">
    <div className="metric-label">Avg Response Time</div>
    <div className="metric-value">
  <Counter value={avgResponseTime} /> min
</div>
  </div>
</div>
</div>


      <div className="dashboard-container">
        <div className="map-wrapper">
          <MapView incidents={incidents} />
        </div>

        <div className="side-panel">
          <DispatchPanel
            incidents={incidents}
            loading={loading}
            onDispatch={handleDispatch}
          />
        </div>
      </div>
      

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}

export default App;
