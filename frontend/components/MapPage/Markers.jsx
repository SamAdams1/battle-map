import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
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
                  <div className="flex flex-col text-center *:mb-1">
                    <a
                      href={"https://www.google.com/maps?q=" + latLon}
                      target="_blank"
                      className="w-full *:w-full"
                    >
                      <button>View on Google Maps</button>
                    </a>
                    <h3>{country}</h3>
                    <h3 className="flex">
                      <span className="flex mr-1">{parseInt(index) + 1}:</span>
                      <a
                        href={
                          "https://en.wikipedia.org/wiki/" +
                          battleName.split(" or ")[0].replace(" ", "_")
                        }
                        target="_blank"
                        className="underline"
                      >
                        {battleName}
                      </a>
                    </h3>
                    <h3>{countryData[index]["year"]}</h3>
                    <h4>
                      {latLon[0]}, {latLon[1]}
                    </h4>
                    <br />
                    {/* <div className="*:w-full"> */}
                    {user.loggedIn && (
                      <FavButton
                        battleDict={countryData[index]}
                        country={country}
                        user={user}
                      />
                    )}
                    {/* </div> */}
                  </div>
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
