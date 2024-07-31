import React, { useRef } from "react";
import { Marker, Tooltip, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";
import FavButton from "../FavButton";

const iconSize = 15;
const icon = new Icon({
  iconUrl: "/red-dot.png",
  iconSize: [iconSize, iconSize],
  iconAnchor: [iconSize / 2, iconSize / 2],
});
// let wikiLink = "https://en.wikipedia.org/wiki/" + battleName.replace(" ","_")

const Markers = ({ data, markersRef, user }) => {
  const totalBattles = 3374;
  let count = 0;
  return (
    <>
      {Object.keys(data).map((country) => {
        let countryData = data[country];
        //returns each country, skips non-country data
        return Object.keys(countryData).map((index) => {
          const latLon = countryData[index].latLon;
          let battleName = countryData[index]["name"].split(" – ")[0];
          if (latLon) {
            // goes through battles and creates the marker if latlon is defined
            count += 1;
            return (
              <Marker
                position={latLon}
                icon={icon}
                key={count}
                ref={(element) => (markersRef.current[battleName] = element)}
              >
                <Popup>
                  <h3>{country}</h3>
                  <h3>
                    {/* {index}: */}
                    <a
                      href={
                        "https://en.wikipedia.org/wiki/" +
                        battleName.split(" or ")[0].replace(" ", "_")
                      }
                      target="_blank"
                    >
                      {index}: {battleName}
                    </a>
                  </h3>
                  <h3>{countryData[index]["year"]}</h3>
                  <h4>
                    {latLon[0]}, {latLon[1]}
                  </h4>
                  <br />
                  {user.loggedIn && (
                    <FavButton
                      battle={battleName}
                      country={country}
                      user={user}
                    />
                  )}
                </Popup>
              </Marker>
            );
          }
        });
      })}
      {/* {count > 0 && console.log("battles: " + count)} */}
    </>
  );
};

export default Markers;
