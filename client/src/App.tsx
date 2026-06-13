import { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import Sidebar from "./Sidebar";
function App() {
  const [metrics, setMetrics] = useState({ cpu: 0, ram: 0, gpu: 0, disk: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({ cpu: Math.random(), ram: 0, gpu: 0, disk: 0 });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-scroll p-6 flex flex-wrap items-start align-top content-start self-start transition-all duration-75">
        <Graph name="CPU" description="4 cores" metric={metrics.cpu} />
      </main>
    </div>
  );
}

export default App;
