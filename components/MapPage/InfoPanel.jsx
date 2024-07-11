import React from 'react'
import { useState, useEffect } from "react"
import Countries from './CountryList'
import Battles from './BattleList'


const InfoPanel = ({ countriesData, battlesNames, battleLocs, panFunc, showMarkerPopup }) => {
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
      setLastCountry("")
      let countryCenter = countriesData[lastCountry];
      panFunc(countryCenter.latLon, countryCenter.zoom)
    }
  }
  const onLeftArrow = () => {
    setLastCountry(country)
    setCountry("")
  }

  const goToLatLon = () => {
    if (inputLatLon) {
      let latLonArr = inputLatLon.replace(" ", "").replace("[", "").replace("]","").split(",")
      latLonArr = latLonArr.map((num) => parseFloat(num))
      console.log(latLonArr)
      if (latLonArr[1]) {
        panFunc(latLonArr, 10) 
      } else {
        console.log("invalid entry")
      }
    }
  }
  
  return (
    <div className='infoPanel'>
      <button 
        className='infoPanelVisBtn' 
        onClick={() => setShowDisplay(!showDisplay)}
      >{showDisplay ? ("X") : ("Open Display")}</button>
      { showDisplay &&
        <>
          <div className="displayFuncBtns">
            <button onClick={() => onLeftArrow()} disabled={!country}>{"<"}</button>
            <button onClick={() => onRightArrow()} disabled={(!lastCountry && country) || (!country && !lastCountry)}>{">"}</button>
            <button onClick={onReset}>reset</button>
          </div>
          <div className='selectCountry'>
            { country  ? (
              <Battles data={battlesNames} panToBattle={panFunc} country={country} battleLocations={battleLocs} showMarkerPopup={showMarkerPopup}/>
            ) : (
              <Countries data={countriesData} panToCountry={panFunc} showBattles={showBattles}/>
            )}
          </div>
          <div className="goToLatlon">
            <input type="text" placeholder='Enter LatLon: Ex: 1,1' onChange={(e) => setInputLatLon(e.target.value)}/>
            <button onClick={goToLatLon}>Go To</button>
          </div>
        </>
      }
    </div>
  )
}

export default InfoPanel