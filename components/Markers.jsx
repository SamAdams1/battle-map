import React from 'react'
import { Marker, Tooltip, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import { useState } from "react"

const iconSize = 15
const icon = new Icon({
  iconUrl: "/red-dot.png",
  iconSize:     [iconSize, iconSize],
  iconAnchor:   [iconSize / 2, iconSize / 2],
})
// let wikiLink = "https://en.wikipedia.org/wiki/" + battleName.replace(" ","_")
const Markers = ({ battlesData, showBattle }) => {


  let count = 0;
  return (
    <>
      { Object.keys(battlesData).map((country) => {
        let firstLetter = country.charAt(0);
        if (firstLetter == firstLetter.toUpperCase()) {
          //returns each country, skips non-country data
          return (
          Object.keys(battlesData[country]).map((battleName) => {
            const latLon = battlesData[country][battleName].latLon
            if (latLon) {
              // goes through battles and creates the marker if latlon is defined
              count+=1
              return(
                <Marker position={battlesData[country][battleName].latLon} icon={icon} key={count} >
                  <Popup>
                    <h3>
                      <a 
                        href={"https://en.wikipedia.org/wiki/" + battleName.split(" or ").at(0).replace(" ","_")} 
                        target='_blank'
                        className='learnMoreBtn'
                      >{battleName}</a>
                    </h3>
                    <br />
                    <button>Favorite</button>
                  </Popup>
                </Marker>
              )
            }
          })
      )}
      })}
  {console.log("battles: " + count)}
    </>
  )
}

export default Markers