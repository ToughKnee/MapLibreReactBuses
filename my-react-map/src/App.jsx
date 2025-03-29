//===========================  Imports
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";
import {
  RLayer,
  RSource,
  RGradientMarker,
  RMap,
  RMarker,
  RNavigationControl,
} from "maplibre-react-components";
import { useMemo, useState } from "react";
import { mountainIconFactory } from "./util";
// we needed this for the RGradientMap component
import "maplibre-react-components/style.css";
import ButtonComponent from "./ButtonComponent"; // Import the button logic component
//======

//===========================  Variables
const center = { lng: -122.493782, lat: 37.833683 };
const variableGeoJSONMap = {
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'LineString',
    'coordinates': [
      [-122.483696, 37.833818],
      [-122.493782, 37.833683]
    ]
  }
}
let positionX = -122.493782;
let positionY = 37.833683;
//======



const mountain = [6.4546, 46.1067];

function App() {
  const [positionXReactive, setPositionXReactive] = useState(1);

  const incrementCount = () => {
    setPositionXReactive((positionXReactive) => positionXReactive + 1);
    console.log('incrementCount')
  };


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <RMap initialCenter={center} initialZoom={6}>
        <RGradientMarker
          longitude={positionX}
          latitude={positionY}
          scale={positionXReactive}
        />
        {/* //===========================  Ruta */}
        <RSource id="thyez" type="geojson" data={variableGeoJSONMap} />
        <RLayer
          source="thyez"
          id="thyez-fill"
          type="fill"
        />
        {/* //======  */}
      </RMap>
      <div
      className="absolute right-4 top-4"
      style={{
        top: "10%",
        left: "90%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <button onClick={incrementCount}>Increment Count</button>
    </div>

    </div>
  );
}

export default App;

