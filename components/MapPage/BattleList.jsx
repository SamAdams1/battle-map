import React, { useState } from 'react'

const Battles = ({ data, battleLocations, panToBattle, country, showMarkerPopup }) => {
  const [zoomLvl, setZoomLvl] = useState(15) // 5 - 15
  const minZoom = 10; 
  const maxZoom = 20;


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
                <p >{(index + 1) + ": "} {battleName}</p>
            )}
          </div>
        )
      })}
    </div>
    <div className="zoomSlider">
      <p>Zoom: {zoomLvl < 10 && 0}{zoomLvl}</p>
      <input type="range" name="" id="" title='Zoom level when battle is clicked' min={minZoom} max={maxZoom} onChange={(e) => setZoomLvl(parseInt(e.target.value))}/>

    </div>
    </>
  )
}

export default Battles