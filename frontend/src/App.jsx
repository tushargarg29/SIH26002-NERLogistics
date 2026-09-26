import Map from "./components/map";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="brand-badge">SIH26002</span>
          <div>
            <h1 className="brand-title">NER Logistics Command Portal</h1>
            <p className="brand-subtitle">North East Region • Multimodal Safe Transit & Route Analytics</p>
          </div>
        </div>
        <div className="nav-actions">
          <div className="status-chip live">
            <span className="pulse-dot"></span>
            <span>OSRM Routing Engine: Online</span>
          </div>
        </div>
      </header>

      {/* Main Map + Integrated Left Rail */}
      <main className="main-content">
        <Map />
      </main>
    </div>
  );
}

export default App;