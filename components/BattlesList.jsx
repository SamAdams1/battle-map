import React from 'react'

const BattlesList = ({ data, battleLocations, panToBattle, country }) => {

  return (
    <div className='battleList' key={"fornite"}>
      {data[country].map((battle, index) => {
        battle = battle.split(" – ")[0]
        let displayTxt = (index + 1 ) + ": " + battle
        return (
          <>
            { battleLocations[country][battle] != undefined ? (
              <>
                <button 
                  key={country + index} 
                  onClick={() => panToBattle(battleLocations[country][battle].latLon, 10)}
                >{displayTxt}</button>
                <br />
              </>
            ) : (
              <>
              <p>{displayTxt}</p>
              </>
            )}

          </>
        )
      })}
    </div>
  )
}

export default BattlesList