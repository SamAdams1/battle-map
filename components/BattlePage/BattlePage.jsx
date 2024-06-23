import React, { useState } from 'react'
import NavSideBar from './NavSideBar'

const BattlePage = ({nameData, locationData}) => {
  const [showNav, setShowNav] = useState(true)

  function tensPlace(coord) {
    coord = coord.toString()
    if (coord.length > 5) {
      coord = coord.slice(0, 5)
    }
    return parseFloat(coord)
  }

  function battleHasLoc(country, battleName){
    let data = locationData[country][battleName]
    if (data) {
      return [tensPlace(data.latLon[0]), tensPlace(data.latLon[1])]
    }
    return data
  }

  function getTotalBattles(countryName) {
    try {
      let total = locationData[countryName].numBattlesInCountry
      return total
    } catch {
      return 0
    }
  }


  const displayBattles = (country) => {
    return(
      <>
      <tr>
        <th></th>
        <th>Battle</th>
        <th>Location</th>
      </tr>
      {nameData[country].map((battle, index) => {
        battle = battle.split(" – ").at(0)
        const battleCoords = battleHasLoc(country, battle)
        return (
          <tr key={battle+index}>
            <td>{index+1}</td>
            <td className={ battleCoords ? ("green"):("red")}>{battle.split(" or ")[0]}</td>
            { battleCoords ? (
              <td className='coordSect'>[{battleCoords[0]}, {battleCoords[1]}]</td>
              ) : (
              <td className='test'><button className='addLocBtn'>Add</button></td>
            )}
          </tr>
        )
      })}
      </>
    )
  }

  return (
    <div className='battlePage'>
      <a href='https://en.wikipedia.org/wiki/List_of_battles_by_geographic_location' target='_blank'>
        <h1>All Battles</h1>
      </a>
      <button className='showHideNav' onClick={() => setShowNav(!showNav)}>{ showNav ? (<>Hide</>) : (<>Show</>)} Side Bar</button>
      { showNav &&  
        <NavSideBar countryList={Object.keys(nameData)}/>
      }

      { Object.keys(nameData).map((country) => {
        const [collapseable, setCollapseable] = useState(true)
        return (
          <div key={"title"+country} className='countrySect'>
            <div className='countryTitle'>
              <h1 id={country}>{country}</h1>
              <h2>{getTotalBattles(country)} / {nameData[country].length} battles </h2>
              <button onClick={() => setCollapseable(!collapseable)}>{collapseable ? (<>hide</>) : ( <>show</>)}</button>
            </div>
            <table>
              <tbody>
              { collapseable && displayBattles(country) }
              </tbody>
            </table>
          </div>
        )
      })}

    </div>
  )
}

export default BattlePage