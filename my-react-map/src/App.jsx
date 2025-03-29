// App.js
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";
import { useState } from "react";
import MapComponent from "./MapComponent";
import MaplessApp from "./MaplessApp";

function App() {
  const [positionXReactive, setPositionXReactive] = useState(1);
  const [busPositions, setBusPositions] = useState([[-122.493782, 37.833683]]);
  
  const incrementCount = () => {
    setPositionXReactive((positionXReactive) => positionXReactive + 1);
  };

  const updateBusPositions = (newPositions) => {
    setBusPositions(newPositions);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapComponent positionXReactive={positionXReactive} busPositions={busPositions} />
      <MaplessApp onIncrement={incrementCount} onUpdateBusPositions={updateBusPositions} />
    </div>
  );
}

export default App;