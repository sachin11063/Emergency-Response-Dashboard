//import axios from "axios";

function DispatchPanel({ incidents, loading, onDispatch }) {

  const reportedIncidents = incidents.filter(
    incident => incident.status === "reported"
  );

  return (
  <div>
    <h3>Pending Incidents</h3>

    {loading && (
      <>
        <div className="incident-card">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
        <div className="incident-card">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
      </>
    )}

    {!loading && reportedIncidents.length === 0 && (
      <div className="empty-state">No pending incidents</div>
    )}

    {!loading &&
      reportedIncidents.map(incident => (
        <div className="incident-card" key={incident._id}>
          <strong>{incident.description}</strong>
          <br />

          <span className={`badge ${incident.severity}`}>
            {incident.severity.toUpperCase()}
          </span>

          <button
            className="dispatch-btn"
            onClick={() => onDispatch(incident._id)}
          >
            Dispatch Nearest Unit
          </button>
        </div>
      ))}
  </div>
);


}

export default DispatchPanel;
