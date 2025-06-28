import React, { useEffect, useState } from "react";

export default function DataTable({ onBack, endpoint, label }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(!!endpoint);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    fetch(endpoint)
      .then((res) => res.json())
      .then((result) => {
        // Try to find the first array in the result
        let arr = null;
        for (const key in result) {
          if (Array.isArray(result[key])) {
            arr = result[key];
            break;
          }
        }
        setData(arr || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [endpoint]);

  if (!endpoint) {
    return (
      <div className="tile-table-container">
        <button className="button" onClick={onBack}>&larr; Back</button>
        <h3>No data available</h3>
        <p>There is no endpoint specified for this tile.</p>
      </div>
    );
  }

  if (loading) return <div className="tile-table-container">Loading...</div>;
  if (error) return <div className="tile-table-container">{error}</div>;

  if (!data.length) {
    return (
      <div className="tile-table-container">
        <button className="button" onClick={onBack}>&larr; Back</button>
        <h3>No data found</h3>
      </div>
    );
  }

  // Dynamically render table headers and rows
  const headers = Object.keys(data[0]);

  return (
    <div className="tile-table-container">
      <button className="button" onClick={onBack}>&larr; Back</button>
      <h3>{label} Data</h3>
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              {headers.map((header) => (
                <td key={header}>{String(item[header])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
