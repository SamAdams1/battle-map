import "./App.css"
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import Markers from "../components/Markers"


function App() {
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [countryCenter, setCountryCenter] = useState({})
  const [battleLocs, setBattleLocs] = useState({})
  const [battleNames, setBattleNames] = useState({})

  // const


  function getData(url, idk) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        idk(data)
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


  return (
    <>
      <div>
        <h1>Battle Map</h1>
      </div>
      <MapContainer 
        center={[40, 10]} 
        zoom={2} 
        worldCopyJump={false}
        maxBounds={L.latLngBounds([100, 200], [-100, -200])}
        mapBoundsVisconsity={1}
        markerZoomAnimation={false}
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
