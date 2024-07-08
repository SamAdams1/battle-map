import React, { useState } from 'react'
import NavSideBar from './NavSideBar'
import Table from './Table'

const BattlePage = ({nameData, locationData}) => {
  const [sideBarVis, setSideBarVis] = useState(true)

  const [popupVis, setPopupVis] = useState(false)
  const [selectedBattle, setSelectedBattle] = useState("")
  const [battleCountry, setBattleCountry] = useState("")

  const [popupInput, setPopupInput] = useState("")

  let b = "";
  let c = "";
  let latlng = "";
  let year = "0";

  function showPopup(battleName, country) {
    setSelectedBattle(battleName)
    setBattleCountry(country)
    console.log(country, battleName)
    setPopupVis(true)
  }

  function addToDB() {
    // let latLon = popupInput;
    let latLon = latlng;
    latLon = latLon.replace("[","").replace("]","").replace(" ","").split(",")
    if (latLon.length > 1 && !isNaN(Number.parseFloat(latLon[0])) && !isNaN(Number.parseFloat(latLon[1]))) {
      console.log(latLon, year)
      console.log(Number.parseFloat(latLon[0]))
      
    }
  }

  function getTotalBattles(countryName) {
    try {
      let total = locationData[countryName].numBattlesInCountry
      return total
    } catch {
      return 0
    }
  }

  function idk(txt){
    setPopupInput(txt)
    console.log(txt)
  }

  return (
    <div className='battlePage'>
      <a href='https://en.wikipedia.org/wiki/List_of_battles_by_geographic_location' target='_blank'>
        <h1>All Battles</h1>
      </a>
      <button className='showHideNav' onClick={() => setSideBarVis(!sideBarVis)}>{ sideBarVis ? (<>Hide</>) : (<>Show</>)} Side Bar</button>
      { sideBarVis &&  
        <NavSideBar countryList={Object.keys(nameData)}/>
      }

      { Object.keys(nameData).map((country) => {
        if (country != "_id") {
        const [collapseable, setCollapseable] = useState(true)
        const totalBattles = getTotalBattles(country)
        return (
          <div key={"title"+country} className='countrySect'>
            {/* <h1 className='stick'>{country}</h1> */}
            <div className='countryTitle'>
              <h1 id={country}>{country}</h1>
              <h2>{totalBattles} / {nameData[country].length} battles </h2>
              { totalBattles > 0 && 
              <button onClick={() => setCollapseable(!collapseable)}>{collapseable ? (<>hide</>) : ( <>show</>)}</button>
              }
            </div>
            { totalBattles > 0 && 
            <table>
              <tbody>
                { collapseable && <Table battleNames={nameData} battleLocs={locationData} country={country} addLocPopup={showPopup}/> }
              </tbody>
            </table>
            }
          </div>
        )
      }})}
      { popupVis && 
      <div className="popup">
        <button onClick={() => setPopupVis(false)}>X</button>
        <h1>{battleCountry}</h1>
        <h1>{selectedBattle}</h1>
        <h2>Entry Format: Latitude, Longitude</h2>
        <h2>No brackets or spaces.</h2>
        <input type="text" placeholder='Example: 34.37,62.17' onChange={(e) => latlng = e.target.value}/>
        <h2>Year - Negative if BC</h2>
        <input type="text" placeholder='Year' onChange={(e) => year = e.target.value}/>
        <button onClick={addToDB}>Submit</button>


        {/* <select name="popupFunc" id="popupFunc" onChange={(e) => console.log(e.target.value)}>
          <option value="Add">Add</option>
          <option value="Report">Report</option>
          <option value="Delete">Delete</option>
        </select> */}
      </div>
      }
    </div>
  )
}

export default BattlePage