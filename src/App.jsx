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

import Axios from "axios"


// battlesYesLocation
// 3383
// battlesNoLocation
// 2742
// battlesFoundTotal
// 6125
function App() {
  // handle data
  const [dataRetrieved, setDataRetrieved] = useState(false)
  const [countryCenter, setCountryCenter] = useState({})
  const [battleLocs, setBattleLocs] = useState({})
  const [battleNames, setBattleNames] = useState({})

  const [test, setTest] = useState({})
  
  //handle map
  const [map, setMap] = useState(null)
  const markersRef = useRef([])

  // handle pages
  const [mapPage, setMapPage] = useState(true)
  

  const getDBData = (collection, setState) => {
    Axios.get(`http://localhost:3005/${collection}`).then((response) => {
      if (response.data.length == 0) {
        console.log(collection + " not found.")
      } else {
        setState(response.data[0])
      }
    }).catch((e) => console.log(e))
  }

  const idk = (collection, setState) => {
    Axios.get(`http://localhost:3005/${collection}`).then((response) => {
      if (response.data.length == 0) {
        console.log(collection + " not found.")
      } else {
        dbDocuments2Dict(response.data[0], setState)
      }
    }).catch((e) => console.log(e))
  }

  const addBattleLoc = (country, battle, data) => {
    battleLocs[country][battle] = data;
    battleLocs[country]["numBattlesInCountry"] += 1;
    let battles ={};
    Object.keys(battleLocs[country]).filter((key) => {
      if (key != "_id" && key != "country" && key != "numBattlesInCountry") {
        battles[key] = battleLocs[country][key]
      }
    })
    // console.log(battles)
    Axios.put(`http://localhost:3005/${"addBattleLoc"}`, battles).then((response) => {
      console.log(response);
    }).catch((e) => console.log(e))
  }

  useEffect(() => {
    getDBData("countryCenter", setCountryCenter)
    getDBData("names", setBattleNames)
    idk("battleLocations", setBattleLocs)

    setDataRetrieved(true)
  }, [])

  const dbDocuments2Dict = (data, setState) => {
    if (data) {
      const retrievedData = {};
      data.map((country) => {
        retrievedData[country["country"]] = country
        // console.log({[country["country"]]: country})
      })
      if (retrievedData) {
        // console.log(retrievedData)
        setState(retrievedData)
      }
      // console.log(data)
    }
  }


  const showMarkerPopup = (battleName) => {
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
        <button onClick={() => console.log(battleLocs)}>Favorites</button>
      </div>
      <div className="content">
        { mapPage ? (
          <>
            <InfoPanel 
              countriesData={countryCenter} 
              battlesNames={battleNames} 
              battleLocs={battleLocs} 
              panFunc={panToPoint}
              showMarkerPopup={showMarkerPopup}
            />
            <Map mapRef={setMap}>
              {dataRetrieved && <Markers battlesData={battleLocs}  markersRef={markersRef}/>}
            </Map>
          </>
      ) : (
        <BattlePage nameData={battleNames} locationData={battleLocs} addBattleLoc={addBattleLoc}/>
      )}
    </div>
  </>
)}

export default App
