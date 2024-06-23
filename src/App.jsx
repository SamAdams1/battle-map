import "./reset.css"
import "./App.css"

// leaflet imports
import "leaflet/dist/leaflet.css"
import { useState, useEffect, useRef } from "react"

//Custom components
import Markers from "../components/MapPage/Markers"
import InfoPanel from "../components/MapPage/InfoPanel"
import Map from "../components/MapPage/Map"
import BattlePage from "../components/BattlePage/BattlePage"



function App() {
  // handle data
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [countryCenter, setCountryCenter] = useState({})
  const [battleLocs, setBattleLocs] = useState({})
  const [battleNames, setBattleNames] = useState({})
  
  //handle map
  const [map, setMap] = useState(null)
  const markersRef = useRef([])

  // handle pages
  const [mapPage, setMapPage] = useState(true)
  

  function getData(url, setState) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setState(data)
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error);
      });
  }

  useEffect(() => {
    getData("./data/countryCenter.json", setCountryCenter)
    getData("./data/battleLocs.json", setBattleLocs)
    getData("./data/battleNames.json", setBattleNames)
    setDataRetrieved(true)
  }, [])

  const showPopup = (battleName) => {
    setTimeout(() => {markersRef.current[battleName].openPopup()}, 350)
    // console.log(markersRef)
  }
  const panToPoint = (latLon, zoom) => {
    map.setView(latLon, zoom)
  }

  return (
    <>
      <div id="Top" className="header">
        <h1>Battle Map</h1>
        <button onClick={() => setMapPage(true)}>Map</button>
        <button onClick={() => setMapPage(false)}>Battle List</button>
        <button>Favorites</button>
      </div>
      <div className="content">
        { mapPage ? (
          <>
            <InfoPanel 
            countriesData={countryCenter} 
            battlesNames={battleNames} 
            battleLocs={battleLocs} 
            panFunc={panToPoint}
            showBattlePopup={showPopup}
            />
            <Map mapRef={setMap}>
              {dataRetrieved && <Markers battlesData={battleLocs}  markersRef={markersRef}/>}
            </Map>
          </>
      ) : (
        <BattlePage nameData={battleNames} locationData={battleLocs}/>
      )}
    </div>
  </>
)}

export default App
