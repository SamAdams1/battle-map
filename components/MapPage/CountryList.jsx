import React from 'react'


const Countries = ({data, panToCountry, showBattles}) => {
  let lastLetter = ""

  const focusCountry = (countryData, countryName) => {
    panToCountry(countryData.latLon, countryData.zoom)
    showBattles(countryName)
  }

  return (
    <>
    <h2>Choose Country</h2>
    <div className='countryList'>
      {Object.keys(data).map((countryName, index) => {
        if (countryName != "_id") {
          const countryData = data[countryName]
          let  currentLetter = countryName.charAt(0)
          return (
            < div key={countryName}>
              { lastLetter !== currentLetter && <h1>{lastLetter = currentLetter}</h1>}
              <button onClick={() => focusCountry(countryData, countryName)}>{countryName}</button>
              <br />
            </div>
          )
        }})}
    </div>
    </>
  )
}

export default Countries