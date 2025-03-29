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

const ButtonComponent = () => {
  const [red, setRed] = useState(false);
  const [positionXReactive, setPositionXReactive] = useState(-122.493782);

  return (
    <>
        {/* Punto en el mapa */}
        <RGradientMarker
          longitude={positionX}
          latitude={positionY}
          icon={mountainIconFactory}
        />
    <div
      className="absolute right-4 top-4"
      style={{
        top: "10%",
        left: "90%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <button onClick={() => setRed((r) => !r)}>
        {red ? "set Gray" : "set Red"}
      </button>
    </div>
    </>
  );
};

export default ButtonComponent;
