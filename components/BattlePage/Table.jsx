import React from 'react'

const Table = ({ battleNames, battleLocs, country }) => {

  function tensPlace(coord) {
    coord = coord.toString()
    if (coord.length > 5) {
      coord = coord.slice(0, 5)
    }
    return parseFloat(coord)
  }

  function battleHasLoc(country, battleName){
    let data = battleLocs[country][battleName]
    if (data) {
      return [tensPlace(data.latLon[0]), tensPlace(data.latLon[1])]
    }
    return data
  }

  return(
    <>
    <tr>
      <th></th>
      <th>Battle</th>
      <th>Location</th>
      <th></th>
    </tr>

    {battleNames[country].map((battle, index) => {
      battle = battle.split(" – ").at(0)
      const battleCoords = battleHasLoc(country, battle)
      return (
        <tr key={battle+index}>
          <td>{index+1}</td>
          <td className={ battleCoords ? ("green"):("red")}>{battle.split(" or ")[0]}</td>
          { battleCoords ? (
            <>
              {/* <td className=''>[{battleCoords[0]}, {battleCoords[1]}]</td> */}
              <td><button className='addLocBtn' onClick={() => navigator.clipboard.writeText(battleCoords)} title='Copy to Clipboard'>[{battleCoords[0]}, {battleCoords[1]}]</button></td>
            </>
            ) : (
              <>
                {/* <td className=''></td> */}
                <td><button className='addLocBtn' title='Add Location Data'>Add</button></td>
              </>
          )}
        </tr>
      )
    })}
    </>
  )
}

export default Table