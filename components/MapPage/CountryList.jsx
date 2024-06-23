import React from 'react'


const Countries = ({data, panToCountry, showBattles}) => {
  let lastLetter = ""

  const onClick = (countryData, countryName) => {
    panToCountry(countryData.latLon, countryData.zoom)
    showBattles(countryName)
  }

  return (
    <div className='countryList'>
      {Object.keys(data).map((countryName, index) => {
        const countryData = data[countryName]
        let  currentLetter = countryName.charAt(0)
        return (
          < div key={countryName}>
            { lastLetter !== currentLetter && <h1>{lastLetter = currentLetter}</h1>}
            <button onClick={() => onClick(countryData, countryName)}>{countryName}</button>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default Countries