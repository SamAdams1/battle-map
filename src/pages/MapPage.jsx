import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

import "leaflet/dist/leaflet.css";

import Map from "../../components/MapPage/Map";
import Markers from "../../components/MapPage/Markers";
import InfoPanel from "../../components/MapPage/InfoPanel";

const MapPage = ({ user }) => {
  const [data, setData] = useState({});
  const [dataRetrieved, setDataRetrieved] = useState(false);

  const [map, setMap] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    getData();

    setDataRetrieved(true);
  }, []);

  const getData = () => {
    Axios.get("http://localhost:3005/battles")
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          formatData(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  const formatData = (dataArr) => {
    for (let index = 0; index < dataArr.length; index++) {
      const item = dataArr[index];
      data[item.country] = item.battles;
    }
    console.log(data);
  };

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
      {/* <InfoPanel
        countries={Object.keys(data)}
        panFunc={panToPoint}
        showMarkerPopup={showMarkerPopup}
      /> */}
      <Map mapRef={setMap} classname="Map">
        <Markers data={data} markersRef={markersRef} user={user} />
      </Map>
    </div>
  );
};

export default MapPage;
