import React from 'react'

const Battles = ({ data, battleLocations, panToBattle, country, showBattlePopup }) => {

  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, 13)
    showBattlePopup(battleName)
  }

  return (
    <div className='battleList'>
      {data[country].map((battleName, index) => {
        battleName = battleName.split(" – ")[0]
        const battleData = battleLocations[country][battleName] 
        const displayTxt = (index + 1) + ": " + battleName
        return (
          <div key={ country + index}>
            { battleData != undefined ? (
              <>
                <button onClick={() => onClick(battleData, battleName)}>{displayTxt}</button>
                <br/>
              </>
            ) : (
              <>
                <p >{displayTxt}</p>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Battles