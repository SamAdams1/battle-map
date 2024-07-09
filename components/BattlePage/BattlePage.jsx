import React, { useState } from 'react'
import NavSideBar from './NavSideBar'
import Table from './Table'
import DBPopup from './Popup'

const BattlePage = ({nameData, locationData, addBattleLoc }) => {
  const [sideBarVis, setSideBarVis] = useState(true)

  const [popupVis, setPopupVis] = useState(false)
  const [selectedBattle, setSelectedBattle] = useState("")
  const [battleCountry, setBattleCountry] = useState("")


  function showPopup(battleName, country) {
    setSelectedBattle(battleName)
    setBattleCountry(country)
    setPopupVis(true)
  }

  function getTotalBattles(countryName) {
    try {
      let total = Object.keys(locationData[countryName]).length
      if (total) {
        return total
      }
      return 0
    } catch {
      return 0
    }
  }

  return (
    <div className='battlePage'>
      <a href='https://en.wikipedia.org/wiki/List_of_battles_by_geographic_location' target='_blank'>
        <h1>All Battles</h1>
      </a>
      <button className='showHideNav' 
        onClick={() => setSideBarVis(!sideBarVis)}
        >{ sideBarVis ? (<>Hide</>) : (<>Show</>)} Side Bar
      </button>
      { sideBarVis &&  
        <NavSideBar countryList={Object.keys(nameData)}/>
      }

      { Object.keys(nameData).map((country) => {
        if (country != "_id") {
        const [collapseable, setCollapseable] = useState(true)
        const totalBattles = nameData[country].length
        return (
          <div key={"title"+country} className='countrySect'>
            <div className='countryTitle'>
              <h1 id={country}>
                {country}
              </h1>
              <h2> {getTotalBattles(country)} / {totalBattles} battles </h2>
              { totalBattles > 0 && 
                <button onClick={() => setCollapseable(!collapseable)}>
                  {collapseable ? (<>hide</>) : ( <>show</>)}
                </button>
              }
            </div>
            { (totalBattles > 0 && collapseable) && 
              <Table 
                battleNames={nameData} 
                battleLocs={locationData} 
                country={country} 
                showPopup={showPopup} 
              />
            }
          </div>
        )
      }})}
      { popupVis && 
        <DBPopup 
          battle={selectedBattle} 
          country={battleCountry} 
          addBattleLoc={addBattleLoc} 
          setPopupVis={setPopupVis}
        />
      }
    </div>
  )
}

export default BattlePage