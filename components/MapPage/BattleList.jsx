import React from 'react'

const Battles = ({ data, battleLocations, panToBattle, country, showBattlePopup }) => {

  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, 13)
    showBattlePopup(battleName)
  }

  return (
    <>
    <h2>{country} - {battleLocations[country].numBattlesInCountry}/{data[country].length}</h2>
    <div className='battleList'>
      {data[country].map((battleName, index) => {
        battleName = battleName.split(" – ")[0]
        const battleData = battleLocations[country][battleName] 
        return (
          <div key={ country + index}>
            { battleData != undefined ? (
              <>
              <div className="battleBtn">
                <p>{(index + 1) + ": "} </p>
                <button onClick={() => onClick(battleData, battleName)}> {battleName}</button>
              </div>
              </>
            ) : (
              <>
                <p >{(index + 1) + ": "} {battleName}</p>
              </>
            )}
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Battles