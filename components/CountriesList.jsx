import React from 'react'


const CountriesList = ({data, panToCountry, showBattles}) => {
  let lastLetter = ""

  const onClick = (countryData, countryName) => {
    panToCountry(countryData.latLon, countryData.zoom)
    showBattles(countryName)
  }

  return (
    <div className='countryList' key={"what"}>
      {Object.keys(data).map((countryName, index) => {
        const countryData = data[countryName]
        let  currentLetter = countryName.charAt(0)
        return (
          <>
            { lastLetter !== currentLetter && <h1 key={currentLetter}>{lastLetter = currentLetter}</h1>}
            <button 
              key={"country" + index} 
              onClick={() => onClick(countryData, countryName)}
            >{countryName}</button>
            <br key={"break"+index}/>
          </>
        )
      })}
    </div>
  )
}

export default CountriesList