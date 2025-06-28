import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom";

import DataTable from './components/DataTable';


import appData from './appData.json';

const apps = appData.map(app => ({ name: app.appName, path: app.appName.toLowerCase().replace(/\s+/g, '') }));

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Applications</h1>
      <ul className="app-list">
        {apps.map(app => (
          <li key={app.path} className="app-list-item">
            <Link to={`/${app.path}`}>{app.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppPage() {
  const { appName } = useParams();
  const navigate = useNavigate();
  const app = appData.find(a => a.appName.toLowerCase().replace(/\s+/g, '') === appName);
  if (!app) return <div>App not found</div>;

  const tiles = [
    { label: 'Source', endpoint: 'source' },
    { label: 'Host', endpoint: 'host' },
    { label: 'Target', endpoint: 'target' }
  ];

  return (
    <div className="app-page-container">
      <h2>{app.appName}</h2>
      <div className="tiles-container">
        {tiles.map(tile => (
          <div key={tile.endpoint} className="tile" onClick={() => navigate(`/${appName}/${tile.endpoint}`)}>
            <div className="tile-label">{tile.label}</div>
            <div className="tile-endpoint">/{appName}/{tile.endpoint}</div>
          </div>
        ))}
      </div>
      <button className="button" onClick={() => navigate('/home')}>&larr; Back</button>
    </div>
  );
}

function TileDataPage() {
  const { appName, tileType } = useParams();
  const navigate = useNavigate();
  const app = appData.find(a => a.appName.toLowerCase().replace(/\s+/g, '') === appName);
  let endpoint = null;
  let label = tileType ? tileType.charAt(0).toUpperCase() + tileType.slice(1) : '';
  if (app && app[tileType]) {
    endpoint = app[tileType];
  }
  return (
    <DataTable
      onBack={() => navigate(`/${appName}`)}
      endpoint={endpoint}
      label={label}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/:appName" element={<AppPage />} />
        <Route path="/:appName/:tileType" element={<TileDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;