import React, { useState } from 'react'

const getSavedZoom = () => {
let savedZoomLevel = localStorage.getItem("zoomLvl") 

if (savedZoomLevel) return savedZoomLevel
else return 
}

const Battles = ({ data, battleLocations, panToBattle, country, showMarkerPopup }) => {
  const minZoom = 5; const maxZoom = 15;
  const [zoomLvl, setZoomLvl] = useState(getSavedZoom() || maxZoom)

  const saveZoom = (num) => {
    setZoomLvl(parseInt(num))
    localStorage.setItem("zoomLvl", num)
    // console.log(localStorage.getItem("zoomLvl"))
  }

  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, zoomLvl)
    showMarkerPopup(battleName)
  }

  return (
    <>
    <h2>{country} - { Object.keys(battleLocations[country]).length}/{data[country].length }</h2>
    <div className='battleList'>
      {data[country].map((battleName, index) => {
        battleName = battleName.split(" – ")[0]
        const battleData = battleLocations[country][battleName] 
        return (
          <div key={ country + index}>
            { battleData != undefined ? (
              <div className="battleBtn">
                <p>{(index + 1) + ": "} </p>
                <button onClick={() => onClick(battleData, battleName)}> {battleName}</button>
              </div>
            ) : (
              <p>{(index + 1) + ": "} {battleName}</p>
            )}
          </div>
        )
      })}
    </div>
    <div className="zoomSlider">
      <p>Zoom: {zoomLvl < 10 && 0}{zoomLvl}</p>
      <input type="range" name="" id="" title='Zoom level when battle is clicked' min={minZoom} max={maxZoom} value={zoomLvl} onChange={(e) => saveZoom(e.target.value)}/>

    </div>
    </>
  )
}

export default Battles