
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

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const center = { lng: -84.04899295728595, lat: 9.935610136323218 };
const variableGeoJSONMap = {
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'LineString',
    'coordinates': [
      [-9.483696, 37.993818],
      [-128.493782, 37.953683]
    ]
  }
};

function findBusStopByIdCoordinates(busStopId) {
  // Find the bus stop in the actualGeoJsonBusStops array by its stop_id
  const busStop = actualGeoJsonBusStops.features.find((stop) => stop.properties.stop_id === busStopId);
  if (busStop) {
    // Return the coordinates of the found bus stop
    return busStop.geometry.coordinates;
  }
}

function getUserRouteOptions() {
  let routesWithStops = {};
  // This loop will create an object with the route_id as the key and an array of stop_ids as the value for each route_id that is the same, concretely, this will create an array for every new value of route_id, and store it as an atribute in the "routesWithStops" object, and then it will push the stop_id into the array of that route_id if the route_id already exists in the object
  actualRoutesJSONWithBusStops.map((route, index) => {
    let dynamicAttribute = route.route_id + "__" + route.shape_id;
    // Create array if it doesn't exist
    if (!routesWithStops[dynamicAttribute]) {
      routesWithStops[dynamicAttribute] = []; 
    }
    routesWithStops[dynamicAttribute].push(findBusStopByIdCoordinates(route.stop_id)); // Push the actual stop_id coordinates into the array of the current route
  })
  return routesWithStops;
}

function MapComponent({ positionXReactive, busPositions }) {
  //===========================  MUI User route selection
  const [selectedRouteText, setSelectedRouteText] = useState('');
  const [selectedRoute, setSelectedRoute] = useState([]);

  const handleRouteSelection = (event) => {
    setSelectedRouteText(event.target.value);
    setSelectedRoute(userRouteOptions[event.target.value]);
  };
  console.log('busPositions', busPositions);

  let userRouteOptions = getUserRouteOptions();
  //=====  

  return (
    <>
    {/* //===========================  Random markers simulating bus positions using websockets */}
    <RMap initialCenter={center} initialZoom={14} mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"> 
      {busPositions.map((bus, index) => (
        <RGradientMarker
          key={index} // Add a unique key for each marker
          longitude={bus[0]} // Assuming busPositions elements have positionX
          latitude={bus[1]} // Assuming busPositions elements have positionY
          scale={positionXReactive} // Or any other scale value you want
          onClick={() => console.log("Clicked")}
        />
      ))}
      {/* //=====   */}

      {/* //===========================  Bus stops */}
      {selectedRoute.map((stop, index) => (
        <RGradientMarker
          key={index} // Add a unique key for each marker
          longitude={stop[0]}
          latitude={stop[1]}
          scale={positionXReactive}
        />
      ))}
      {/* //=====   */}

      {/* //===========================  Ruta */}
      <RSource id="athyez" type="geojson" data={variableGeoJSONMap} />
      <RLayer
        source="athyez"
        id="athyez-fill"
        type="line"
        key={4}
      />
      {/* //======  */}
    </RMap>

    {/* //===========================  MUI Select component overlayed on top of the map */}
    <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}>
      <Select
        labelId="routeSelectionLabel"
        id="routeSelection"
        value={selectedRouteText}
        label="Select a route"
        onChange={handleRouteSelection}
      >
      {
        // Loop through the userRouteOptions object and create MenuItem components for each route
        Object.keys(userRouteOptions).map((routeId) => (
          <MenuItem key={routeId} value={routeId}>
            {routeId} {/* Display the route ID as the option label */}
          </MenuItem> ))
      }
      </Select>
    </Box>
    {/* //=====   */}
    </>
  );
}
export default MapComponent;





const actualGeoJsonBusStops = {
  "type": "FeatureCollection",
  "features": [
    {
      "id": 1,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.048992957286, 9.93561013632322]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_01",
        "stop_code": "",
        "stop_name": "Facultad de Educación",
        "stop_heading": null,
        "stop_desc": "Frente al jardín de la Facultad de Educación (FE)",
        "stop_lat": "9.935610",
        "stop_lon": "-84.048993",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 2,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0521755990149, 9.93550159828788]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_02",
        "stop_code": "",
        "stop_name": "Escuela de Artes Plásticas",
        "stop_heading": null,
        "stop_desc": "Nuevo edificio de la Escuela de Artes Plásticas (EAP)",
        "stop_lat": "9.935502",
        "stop_lon": "-84.052176",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 3,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0517499001992, 9.93860832346218]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_03",
        "stop_code": "",
        "stop_name": "Biblioteca de Ciencias de la Salud",
        "stop_heading": null,
        "stop_desc": "Frente al antiguo edificio de la Facultad de Odontología (FOd), diagonal al parqueo de la Biblioteca de Ciencias de la Salud",
        "stop_lat": "9.938608",
        "stop_lon": "-84.051750",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 4,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0487604984007, 9.93832361909286]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_04",
        "stop_code": "",
        "stop_name": "Facultad de Microbiología",
        "stop_heading": null,
        "stop_desc": "Esquina noreste del parqueo de las Escuelas de Artes Musicales (EAM), Química (EQ) y Biología (EB) y la Facultad de Microbiología (FMic)",
        "stop_lat": "9.938324",
        "stop_lon": "-84.048761",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 5,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0453750474415, 9.93590391543794]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_05",
        "stop_code": "",
        "stop_name": "Laboratorio Nacional de Materiales y Modelos Estructurales (LanammeUCR)",
        "stop_heading": null,
        "stop_desc": "Junto al parqueo del Centro de Transferencia Tecnológica (CTT), diagonal al Laboratorio Nacional de Materiales y Modelos Estructurales (LANAMME)",
        "stop_lat": "9.935904",
        "stop_lon": "-84.045375",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_LA",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 6,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0446764430078, 9.93746731144151]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_06",
        "stop_code": "",
        "stop_name": "Facultad de Ingeniería",
        "stop_heading": null,
        "stop_desc": "Costado norte del nuevo edificio de la Facultad de Ingeniería (FI)",
        "stop_lat": "9.937467",
        "stop_lon": "-84.044676",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_FI",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 7,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0423789247891, 9.93802960767692]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_07",
        "stop_code": "",
        "stop_name": "Facultad de Ciencias Sociales",
        "stop_heading": null,
        "stop_desc": "Entre la Facultad de Ciencias Sociales (FCS) y el edificio de parqueos",
        "stop_lat": "9.938030",
        "stop_lon": "-84.042379",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_CS",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 8,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0430777626604, 9.93945164782314]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_08",
        "stop_code": "",
        "stop_name": "Instituto de Investigación en Educación (INIE)",
        "stop_heading": null,
        "stop_desc": "Costado sur del edificio del Instituto de Investigación en Educación (INIE)",
        "stop_lat": "9.939452",
        "stop_lon": "-84.043078",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 9,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.044506756903, 9.94015516886255]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_09",
        "stop_code": "",
        "stop_name": "Centro de Investigación en Cirugía y Cáncer (CICICA)",
        "stop_heading": null,
        "stop_desc": "Costado sur del edificio del Centro de Investigación en Cirugía y Cáncer (CICICA)",
        "stop_lat": "9.940155",
        "stop_lon": "-84.044507",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 10,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0446834624541, 9.94376122039143]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_10",
        "stop_code": "",
        "stop_name": "Oficina de Bienestar y Salud (OBS)",
        "stop_heading": null,
        "stop_desc": "Entre el nuevo edificio de la Oficina de Bienestar y Salud (OBS) y el Estadio Ecológico",
        "stop_lat": "9.943761",
        "stop_lon": "-84.044684",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 11,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0451915613564, 9.94644105082793]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_0_11",
        "stop_code": "",
        "stop_name": "Facultad de Odontología",
        "stop_heading": null,
        "stop_desc": "En el nuevo edificio de la Facultad de Odontología (FOd) en la Finca 3",
        "stop_lat": "9.946441",
        "stop_lon": "-84.045192",
        "zone_id": "bUCR_0",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 12,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.045354583138, 9.94652950084742]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_01",
        "stop_code": "",
        "stop_name": "Facultad de Odontología",
        "stop_heading": null,
        "stop_desc": "En el nuevo edificio de la Facultad de Odontología (FOd) en la Finca 3",
        "stop_lat": "9.946530",
        "stop_lon": "-84.045355",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 13,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0449518073971, 9.94338144408136]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_02",
        "stop_code": "",
        "stop_name": "Escuela de Educación Física y Deportes (EDUFI)",
        "stop_heading": null,
        "stop_desc": "Costado este de las canchas multiuso y de la Escuela de Educación Física y Deportes (EDUFI)",
        "stop_lat": "9.943381",
        "stop_lon": "-84.044952",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 14,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0446865456529, 9.93913459155986]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_03",
        "stop_code": "",
        "stop_name": "Escuela de Nutrición",
        "stop_heading": null,
        "stop_desc": "Esquina noreste del edificio de la Escuela de Nutrición (ENu)",
        "stop_lat": "9.939135",
        "stop_lon": "-84.044687",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 15,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0436758508172, 9.93898038138971]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_04",
        "stop_code": "",
        "stop_name": "Centro de Investigación en Ciencias del Mar y Limnología (CIMAR)",
        "stop_heading": null,
        "stop_desc": "Entre el edificio de parqueos y el Centro de Investigación en Ciencias del Mar y Limnología (CIMAR)",
        "stop_lat": "9.938980",
        "stop_lon": "-84.043676",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 16,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.042189216776, 9.93947279204209]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_05",
        "stop_code": "",
        "stop_name": "Centro de Investigación en Matemática Pura y Aplicada (CIMPA)",
        "stop_heading": null,
        "stop_desc": "Frente al edificio del Centro de Investigación en Matemática Pura y Aplicada (CIMPA)",
        "stop_lat": "9.939473",
        "stop_lon": "-84.042189",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 17,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0422955151037, 9.93813052902614]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_06",
        "stop_code": "",
        "stop_name": "Facultad de Ciencias Sociales",
        "stop_heading": null,
        "stop_desc": "Entre la Facultad de Ciencias Sociales (FCS) y el edificio de parqueos",
        "stop_lat": "9.938131",
        "stop_lon": "-84.042296",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_CS",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 18,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0450182276884, 9.93746866941996]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_07",
        "stop_code": "",
        "stop_name": "Facultad de Ingeniería",
        "stop_heading": null,
        "stop_desc": "Costado norte del nuevo edificio de la Facultad de Ingeniería (FI), al otro lado de la calle",
        "stop_lat": "9.937469",
        "stop_lon": "-84.045018",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_FI",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 19,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0454695091189, 9.93589305371453]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_1_08",
        "stop_code": "",
        "stop_name": "Laboratorio Nacional de Materiales y Modelos Estructurales (LanammeUCR)",
        "stop_heading": null,
        "stop_desc": "Junto al parqueo del Centro de Transferencia Tecnológica (CTT), diagonal al Laboratorio Nacional de Materiales y Modelos Estructurales (LANAMME), al otro lado de la calle",
        "stop_lat": "9.935893",
        "stop_lon": "-84.045470",
        "zone_id": "bUCR_1",
        "stop_url": "",
        "location_type": 0,
        "parent_station": "bUCR_LA",
        "stop_timezone": "",
        "wheelchair_boarding": 2,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 20,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0446764430078, 9.93746731144151]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_FI",
        "stop_code": "",
        "stop_name": "Facultad de Ingeniería",
        "stop_heading": null,
        "stop_desc": "En las inmediaciones del edificio de la Facultad de Ingeniería",
        "stop_lat": "9.937467",
        "stop_lon": "-84.044676",
        "zone_id": "",
        "stop_url": "",
        "location_type": 1,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 21,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0422955151037, 9.93813052902614]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_CS",
        "stop_code": "",
        "stop_name": "Facultad de Ciencias Sociales",
        "stop_heading": null,
        "stop_desc": "En las inmediaciones del edificio de la Facultad de Ciencias Sociales",
        "stop_lat": "9.938131",
        "stop_lon": "-84.042296",
        "zone_id": "",
        "stop_url": "",
        "location_type": 1,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    },
    {
      "id": 22,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-84.0454406749733, 9.93578514170728]
      },
      "properties": {
        "feed": "1",
        "stop_id": "bUCR_LA",
        "stop_code": "",
        "stop_name": "Laboratorio Nacional de Materiales y Modelos Estructurales (LanammeUCR)",
        "stop_heading": null,
        "stop_desc": "En las inmediaciones del Laboratorio Nacional de Materiales y Modelos Estructurales (LanammeUCR)",
        "stop_lat": "9.935785",
        "stop_lon": "-84.045441",
        "zone_id": "",
        "stop_url": "",
        "location_type": 1,
        "parent_station": "",
        "stop_timezone": "",
        "wheelchair_boarding": 1,
        "platform_code": "",
        "shelter": null,
        "bench": null,
        "lit": null,
        "bay": null,
        "device_charging_station": null
      }
    }
  ]
}

const actualRoutesJSONWithBusStops = [
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_01",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_05",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_06",
      "stop_sequence": "2",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_07",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_08",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_09",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_10",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_educacion_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_11",
      "stop_sequence": "8",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_01",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_03",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_04",
      "stop_sequence": "2",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_05",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_06",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_07",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_08",
      "stop_sequence": "6",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_09",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_10",
      "stop_sequence": "9",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_educacion_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_11",
      "stop_sequence": "10",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_02",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_05",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_06",
      "stop_sequence": "2",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_07",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_08",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_09",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_10",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "desde_artes_sin_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_11",
      "stop_sequence": "8",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_02",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_03",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_04",
      "stop_sequence": "2",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_05",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_06",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_07",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_08",
      "stop_sequence": "6",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_09",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_10",
      "stop_sequence": "9",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L2",
      "shape_id": "desde_artes_con_milla",
      "direction_id": "0",
      "stop_id": "bUCR_0_11",
      "stop_sequence": "10",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_01",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_02",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_03",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_04",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_05",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_06",
      "stop_sequence": "6",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_07",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_1_08",
      "stop_sequence": "8",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_educacion",
      "direction_id": "1",
      "stop_id": "bUCR_0_01",
      "stop_sequence": "9",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_01",
      "stop_sequence": "0",
      "timepoint": "1",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_02",
      "stop_sequence": "1",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_03",
      "stop_sequence": "3",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_04",
      "stop_sequence": "4",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_05",
      "stop_sequence": "5",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_06",
      "stop_sequence": "6",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_07",
      "stop_sequence": "7",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_1_08",
      "stop_sequence": "8",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  },
  {
      "route_id": "bUCR_L1",
      "shape_id": "hacia_artes",
      "direction_id": "1",
      "stop_id": "bUCR_0_02",
      "stop_sequence": "10",
      "timepoint": "0",
      "shape_dist_traveled": "",
      "stop_headsign": ""
  }
]