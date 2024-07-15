import React, { useState, useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

import Map from "../../components/MapPage/Map";
import Markers from "../../components/MapPage/Markers";
import InfoPanel from "../../components/MapPage/InfoPanel";

const MapPage = ({ countryCenter, battleNames, battleLocs, user }) => {
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);

  const showMarkerPopup = (battleName) => {
    setTimeout(() => {
      markersRef.current[battleName].openPopup();
    }, 350);
  };
  const panToPoint = (latLon, zoom) => {
    map.setView(latLon, zoom);
  };

  return (
    <div>
      <InfoPanel
        countriesData={countryCenter}
        battlesNames={battleNames}
        battleLocs={battleLocs}
        panFunc={panToPoint}
        showMarkerPopup={showMarkerPopup}
      />
      <Map mapRef={setMap} classname="Map">
        <Markers battlesData={battleLocs} markersRef={markersRef} user={user} />
      </Map>
    </div>
  );
};

export default MapPage;
