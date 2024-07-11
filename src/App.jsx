import "./reset.css"
import "./App.css"

// leaflet map imports
import "leaflet/dist/leaflet.css"
import { useState, useEffect, useRef } from "react"

//Custom components
import Map from "../components/MapPage/Map"
import Markers from "../components/MapPage/Markers"
import InfoPanel from "../components/MapPage/InfoPanel"

import BattlePage from "../components/BattlePage/BattlePage"

import LoginRegister from "../components/UserLogin/LoginRegister"
import AccountDropdown from "../components/UserLogin/AccountDropdown"

// Better fetch
import Axios from "axios"


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

  // user
  const [loginOrReg, setLoginOrReg] = useState("")
  const [user, setUser] = useState({})
  

  const getDBData = (route, setState) => {
    Axios.get(`http://localhost:3005/${route}`).then((response) => {
      if (response.data.length == 0) {
        console.log(route + " not found.")
      } else {
        setState(response.data[0])
      }
    }).catch((e) => console.log(e))
  }
  // for battle locations
  const dbNewFormatData = (route, setState) => {
    Axios.get(`http://localhost:3005/${route}`).then((response) => {
      if (response.data.length == 0) {
        console.log(route + " not found.")
      } else {
        combineDbDocuments(response.data[0], setState)
      }
    }).catch((e) => console.log(e))
  }

  const combineDbDocuments = (data, setState) => {
    if (data) {
      const retrievedData = {};
      data.map((country) => {
        retrievedData[country["country"]] = country["battles"]
      })
      if (retrievedData) {
        setState(retrievedData)
      }
    }
  }
  
  const addBattleLoc = (country, battle, data) => {
    data["addedByUser"] = "Sam";
    battleLocs[country][battle] = data;
    const total = Object.keys(battleLocs[country]).length
    console.log(battleLocs[country])
    
    Axios.put(`http://localhost:3005/${"addBattleLoc"}`, {"battles": battleLocs[country], country, total}).then((response) => {
      console.log(response);
    }).catch((e) => console.log(e))
  }
  
  useEffect(() => {
    getDBData("countryCenter", setCountryCenter)
    getDBData("names", setBattleNames)
    dbNewFormatData("locations", setBattleLocs)

    setDataRetrieved(true)
  }, [])

  const showMarkerPopup = (battleName) => {
    setTimeout(() => {markersRef.current[battleName].openPopup()}, 350)
    // console.log(markersRef)
  }
  const panToPoint = (latLon, zoom) => {
    map.setView(latLon, zoom)
  }


  return (
    <>
      { loginOrReg && <LoginRegister  formType={loginOrReg} setFormType={setLoginOrReg} setUser={setUser}/>}
      <div id="Top" className="header">
        <h1>Battle Map</h1>
        <button onClick={() => setMapPage(true)}>Map</button>
        <button onClick={() => setMapPage(false)}>Battle List</button>
        <button onClick={() => console.log(battleLocs)}>test</button>
        <div className="accountBtns">
          { Object.keys(user).length ? (<AccountDropdown user={user} setUser={setUser}/>) : (
            <>
              <button onClick={() => setLoginOrReg("Login")}>login</button>
              <button onClick={() => setLoginOrReg("Register")}>register</button>
            </>
          )}
        </div>
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
