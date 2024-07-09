import React, { useState } from 'react'

const Battles = ({ data, battleLocations, panToBattle, country, showMarkerPopup }) => {
  const [zoomLvl, setZoomLvl] = useState(10) // 5 - 15
  const minZoom = 5; 
  const maxZoom = 15;


  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, 13)
    showMarkerPopup(battleName)
  }

  return (
    <>
    <h2>{country} - {Object.keys(battleLocations[country]).length}/{data[country].length}</h2>
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
                <p >{(index + 1) + ": "} {battleName}</p>
            )}
          </div>
        )
      })}
    </div>
    <div className="zoomSlider">
      <p>Zoom Level</p>
      <input type="range" name="" id="" title='Zoom level when battle is clicked' min={minZoom} max={maxZoom} onChange={(e) => console.log(e.target.value)}/>

    </div>
    </>
  )
}

export default Battles