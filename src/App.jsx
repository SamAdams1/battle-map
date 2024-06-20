import "./reset.css"
import "./App.css"

// leaflet imports
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react"
import { MapContainer, TileLayer, useMapEvent, } from "react-leaflet"

//Custom components
import Markers from "../components/Markers"
import InfoPanel from "../components/InfoPanel"


function App() {
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [countryCenter, setCountryCenter] = useState({})
  const [battleLocs, setBattleLocs] = useState({})
  const [battleNames, setBattleNames] = useState({})
  
  const [map, setMap] = useState(null)


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
    // getData("./data/battleLocs.json", setBattleLocs)
    getData("./data/battleLocs.json", setBattleLocs)
    getData("./data/battleNames.json", setBattleNames)
    setDataRetrieved(true)
  }, [])

  const researchBattle = (battleName) => {

  }

  const panToPoint = (latLon, zoom) => {
    // const map = useMapEvent()
    map.setView(latLon, zoom)
  }


  return (
    <>
      <div className="header">
        <h1>Battle Map</h1>
      </div>
      <InfoPanel countriesData={countryCenter} battlesNames={battleNames} battleLocs={battleLocs} panFunc={panToPoint}/>
      <MapContainer 
        center={[40, 10]} 
        zoom={2} 
        worldCopyJump={false}
        maxBounds={L.latLngBounds([100, 200], [-100, -200])}
        mapBoundsVisconsity={1}
        markerZoomAnimation={false}
        ref={setMap}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          minZoom={3}
        />
        {dataRetrieved && <Markers battlesData={battleLocs}/>}
      </MapContainer>

    </>
  )
}

export default App
