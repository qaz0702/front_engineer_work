import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Cloud,
  MapPin,
  Thermometer,
  Wind,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const BERLIN = { lat: 52.52, lon: 13.41, name: "Berlin" };
const LONDON = { lat: 51.5074, lon: 0.1278, name: "London" };
const TAIPEI = { lat: 25.0330, lon: 121.5654, name: "Taipei" };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="tooltip-item"
            style={{ color: entry.color }}
          >
            <span>{entry.name}:</span>
            <span>{entry.value}°C</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ londonAvg: 0, berlinAvg: 0, taipeiAvg: 0 });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all simultaneously
      const [londonRes, berlinRes, taipeiRes] = await Promise.all([
        fetch(
          `${API_BASE_URL}?latitude=${LONDON.lat}&longitude=${LONDON.lon}&daily=temperature_2m_max&timezone=Europe/London`,
        ),
        fetch(
          `${API_BASE_URL}?latitude=${BERLIN.lat}&longitude=${BERLIN.lon}&daily=temperature_2m_max&timezone=Europe/Berlin`,
        ),
        fetch(
          `${API_BASE_URL}?latitude=${TAIPEI.lat}&longitude=${TAIPEI.lon}&daily=temperature_2m_max&timezone=Asia/Taipei`,
        ),
      ]);

      if (!londonRes.ok || !berlinRes.ok || !taipeiRes.ok)
        throw new Error("Failed to fetch weather data from one or more APIs");

      const londonData = await londonRes.json();
      const berlinData = await berlinRes.json();
      const taipeiData = await taipeiRes.json();

      // Process and merge data
      const mergedData = londonData.daily.time.map((time, index) => {
        const date = new Date(time);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return {
          date: formattedDate,
          london: londonData.daily.temperature_2m_max[index],
          berlin: berlinData.daily.temperature_2m_max[index],
          taipei: taipeiData.daily.temperature_2m_max[index],
        };
      });

      setData(mergedData);

      // Calculate averages
      const lAvg = (
        mergedData.reduce((acc, curr) => acc + curr.london, 0) /
        mergedData.length
      ).toFixed(1);
      const bAvg = (
        mergedData.reduce((acc, curr) => acc + curr.berlin, 0) /
        mergedData.length
      ).toFixed(1);
      const tAvg = (
        mergedData.reduce((acc, curr) => acc + curr.taipei, 0) /
        mergedData.length
      ).toFixed(1);

      setStats({ londonAvg: lAvg, berlinAvg: bAvg, taipeiAvg: tAvg });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Global Weather Analytics</h1>
        <p>Real-time temperature comparison between London, Berlin and Taipei</p>
      </header>

      <main>
        <div className="stats-grid">
          <div className="glass-card stat-item">
            <div className="icon-wrapper">
              <MapPin size={24} />
            </div>
            <div className="stat-content">
              <h3>London Avg</h3>
              <p>{loading ? "..." : `${stats.londonAvg}°C`}</p>
            </div>
          </div>
          <div className="glass-card stat-item">
            <div
              className="icon-wrapper"
              style={{
                background: "rgba(236, 72, 153, 0.1)",
                color: "#ec4899",
              }}
            >
              <MapPin size={24} />
            </div>
            <div className="stat-content">
              <h3>Berlin Avg</h3>
              <p>{loading ? "..." : `${stats.berlinAvg}°C`}</p>
            </div>
          </div>
          <div className="glass-card stat-item">
            <div
              className="icon-wrapper"
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                color: "#f59e0b",
              }}
            >
              <MapPin size={24} />
            </div>
            <div className="stat-content">
              <h3>Taipei Avg</h3>
              <p>{loading ? "..." : `${stats.taipeiAvg}°C`}</p>
            </div>
          </div>
          <div className="glass-card stat-item">
            <div
              className="icon-wrapper"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
              }}
            >
              <Thermometer size={24} />
            </div>
            <div className="stat-content">
              <h3>Peak Temp</h3>
              <p>
                {loading
                  ? "..."
                  : `${Math.max(...data.map((d) => Math.max(d.london, d.berlin, d.taipei)))}°C`}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem" }}>
              Temperature Trends (Next 7 Days)
            </h2>
            <div className="legend-container" style={{ margin: 0 }}>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ backgroundColor: "#3b82f6" }}
                ></div>
                <span>London</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ backgroundColor: "#ec4899" }}
                ></div>
                <span>Berlin</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-dot"
                  style={{ backgroundColor: "#f59e0b" }}
                ></div>
                <span>Taipei</span>
              </div>
              <button 
                onClick={fetchData} 
                style={{
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-secondary)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '1rem'
                }}
              >
                <RefreshCcw size={16} className={loading ? 'spin' : ''} />
              </button>
            </div>
          </div>

          <div className="chart-container">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Retrieving API Data...</p>
              </div>
            ) : error ? (
              <div className="loading-container">
                <div className="error-message">
                  <AlertTriangle size={32} style={{ marginBottom: "0.5rem" }} />
                  <p>Error: {error}</p>
                  <button
                    onClick={fetchData}
                    style={{
                      marginTop: "1rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis unit="°C" />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <Bar
                    name="London"
                    dataKey="london"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    name="Berlin"
                    dataKey="berlin"
                    fill="#ec4899"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    name="Taipei"
                    dataKey="taipei"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>

      <footer
        style={{
          marginTop: "4rem",
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.875rem",
          paddingBottom: "2rem",
        }}
      >
        <p>
          Data provided by Open-Meteo API • Developed with API Chart
          Visualization Skill
        </p>
      </footer>
    </div>
  );
}

export default App;
