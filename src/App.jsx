import { useState, useEffect } from "react";
import "./styles.css";
import { CodexHub } from "./components/CodexHub/CodexHub";
import { useFilters } from "./state/filters";
import { Gateway } from "./Gateway";

export default function App() {
  // State to hold the data once it's loaded
  const [lookups, setLookups] = useState(null);
  const [data, setData] = useState(null);

  const filters = useFilters();
  const [view, setView] = useState("gateway");

  // This useEffect hook runs once when the app starts
  // It fetches your two main JSON files.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lookupsResponse, dataResponse] = await Promise.all([
          fetch("/lookups.json"),
          fetch("/world_pcms.json"),
        ]);
        const lookupsData = await lookupsResponse.json();
        const pcmData = await dataResponse.json();
        setLookups(lookupsData);
        setData(pcmData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // The empty array [] means this effect runs only once

  const handleSelectGateway = (regionId) => {
    filters.setRegions(() => new Set());
    filters.setFamilies(() => new Set());
    filters.setTypes(() => new Set());
    filters.setStreams(() => new Set());
    filters.api.toggle(filters.setRegions, regionId);
    setView("hub");
  };

  const handleBackToGateway = () => {
    setView("gateway");
  };

  // Show a loading message until both files are fetched
  if (!lookups || !data) {
    return <div style={{ padding: 16 }}>Loading Codex Data…</div>;
  }

  return (
    <div className="app">
      {view === "gateway" ? (
        <Gateway onSelectGateway={handleSelectGateway} />
      ) : (
        <CodexHub
          lookups={lookups}
          data={data}
          filters={filters}
          onBack={handleBackToGateway}
        />
      )}
    </div>
  );
}
