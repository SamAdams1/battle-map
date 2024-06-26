import React from 'react'
import { useState, useEffect } from "react"
import Countries from './CountryList'
import Battles from './BattleList'


const InfoPanel = ({ countriesData, battlesNames, battleLocs, panFunc, showBattlePopup }) => {
  const [showDisplay, setShowDisplay] = useState(true)
  const [country, setCountry] = useState("")
  const [lastCountry, setLastCountry] = useState("")
  const [inputLatLon, setInputLatLon] = useState("")

  const showBattles = (countryName) => {
    setCountry(countryName)
  }

  const onReset = () => {
    setCountry("")
    setLastCountry("")
    panFunc([40, 10],2)
  }

  const onRightArrow = () => {
    if (country == "" && lastCountry != "") {
      setCountry(lastCountry)
      let countryCenter = countriesData[lastCountry];
      panFunc(countryCenter.latLon, countryCenter.zoom)
    }
  }
  const onLeftArrow = () => {
    setLastCountry(country)
    setCountry("")
  }

  const goToLatLon = () => {
    
  }
  
  return (
    <div className='infoPanel'>
      { showDisplay ? (
        <>
          <div className="displayFuncBtns">
            { country ? ( <button onClick={() => onLeftArrow()} >{"<"}</button>
              ) : (
                <button onClick={() => onLeftArrow()} disabled>{"<"}</button>
            )}
            { lastCountry && !country ? (<button onClick={() => onRightArrow()}>{">"}</button>
              ) : (
              <button onClick={() => onRightArrow()} disabled>{">"}</button>
            )}
            <button onClick={onReset}>reset</button>
            <button className='arrow' onClick={() => setShowDisplay(!showDisplay)}>{"X"}</button>
          </div>
          <div className='selectCountry'>
            { country  ? (
              <>
                <h2>{country}</h2>
                <Battles data={battlesNames} panToBattle={panFunc} country={country} battleLocations={battleLocs} showBattlePopup={showBattlePopup}/>
              </>
            ) : (
              <>
                <h2>Choose Country</h2>
                <Countries data={countriesData} panToCountry={panFunc} showBattles={showBattles}/>
              </>
            )}
          </div>
          <div className="goToLatlon">
            <input type="text" placeholder='Enter LatLon' onChange={(e) => setGoToLatLon(e.target.value)}/>
            <button onClick={goToLatLon}>Go To</button>
          </div>
        </>
      ) : (
        <button className='arrow' onClick={() => setShowDisplay(!showDisplay)}>{"Open Display"}</button>
      )}
    </div>
  )
}

export default InfoPanel