
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";
import {
  RLayer,
  RSource,
  RGradientMarker,
  RMap,
} from "maplibre-react-components";
import { useState } from "react";
import "maplibre-react-components/style.css";

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
};
let positionX = -122.493782;
let positionY = 37.833683;
function MapComponent({ positionXReactive, busPositions }) {
  console.log('busPositions', busPositions);
  return (
    <RMap initialCenter={center} initialZoom={6}>
      {busPositions.map((bus, index) => (
        <RGradientMarker
          key={index} // Add a unique key for each marker
          longitude={bus[0]} // Assuming busPositions elements have positionX
          latitude={bus[1]} // Assuming busPositions elements have positionY
          scale={positionXReactive} // Or any other scale value you want
        />
      ))}
      {/* //===========================  Ruta */}
      <RSource id="thyez" type="geojson" data={variableGeoJSONMap} />
      <RLayer
        source="thyez"
        id="thyez-fill"
        type="fill"
      />
      {/* //======  */}
    </RMap>
  );
}
export default MapComponent;