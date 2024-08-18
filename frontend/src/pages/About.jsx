import React, { useState } from "react";
import Axios from "axios";
import { motion } from "framer-motion";

import Card from "../../components/Card";
import { SocialIcon } from "react-social-icons";

const topBattles = [
  // { name: "Night Attack at Târgovişte", country: "Romania", year: 1462 },
  {
    name: "Battle of the Teutoburg Forest",
    country: "Germany",
    year: -12,
    latLon: "52.41, 8.13",
  },
  {
    name: "Battle of Marathon",
    country: "Greece",
    year: -490,
    latLon: "38.11, 23.97",
  },
  {
    name: "Battle of Tours",
    country: "France",
    year: 732,
    latLon: "47.39, 0.69",
  },
  {
    name: "Battle of Thermopylae",
    country: "Greece",
    year: -480,
    latLon: "38.79, 22.53",
  },
  {
    name: "Battle of Agincourt",
    country: "France",
    year: 1415,
    latLon: "50.46, 2.14",
  },
  // {
  //   name: "Siege of Brundisium",
  //   country: "Italy'",
  //   year: -49,
  //   latLon: "40.63, 17.93",
  // },
];

const About = () => {
  const [carouselIndex, setCarouselIndex] = useState(1);

  const content = [
    "Battle Map is a place where you can explore historical battles.",
    "Gain historical perspective to the battles that might have happened in your country.",
    "Collaborate with others to map battles.",
  ];
  // "http://localhost:3005"
  async function devChangePass(username, newPassword) {
    const response = await Axios.put(
      "http://localhost:3005/devUpdatePassword",
      {
        username,
        newPassword,
      }
    );
    console.log(response);
  }

  function showBattle(index) {
    return (
      index === carouselIndex ||
      index + 1 === carouselIndex ||
      index - 1 === carouselIndex
    );
  }

  return (
    <div className="belowHeader flex flex-col items-center w-full">
      {/* <span className=" absolute w-64 h-svh bg-black"></span> */}
      <span className=" absolute w-[25em] h-24 bg-red-700  translate-y-[10em] rounded-2xl opacity-80"></span>
      <div className="h-[800px]  ">
        <h1
          className="text-white text-6xl font- text-nowrap
          absolute right-[50%] left-[50%] translate-x-[-3.15em] translate-y-[3em]
          bg-gray-700 border-green-200 font-serif 
          "
        >
          BATTLE MAP
        </h1>
        <img src="brownmap.jpg" alt="world map" className="w-svw min-h-96" />
        {/* <img src="vintagemap.webp" alt="world map" className="w-full" /> */}
      </div>

      <div className="flex flex-col items-center bg-red-700 w-full">
        <a href="#guide" className="-translate-y-4 *:rounded-3xl *:p-2">
          <motion.button whileHover={{ scale: 1.2 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.button>
        </a>
      </div>
      <div>
        <div className=" flex flex-wrap w-full *:flex-1 *:*:p-4 *:min-w-64 text-white *:border-2 *:pb-20">
          <div className="bg-red-700" id="guide">
            <h1>Explore</h1>
            <p>See major battles throughout history mapped out! </p>
          </div>
          <div className="bg-red-700">
            <h1>Learn</h1>
            <p>
              Most battles have a wikipedia article. Click the battle name to
              open a new tab to dive deep and learn the history behind a battle.
            </p>
          </div>
          <div className="bg-red-700">
            <h1>Contribute</h1>
            <p>
              Create an account and gain trust amoungst the community to
              contribute data to the battle map wiki! Once permission is granted
              you can add data to existing battles, edit existing battles, and
              add totally new battles to a country.
            </p>
          </div>
        </div>
        <span className="bg-gray-200 flex flex-col items-center *:p-2 pb-20 *:max-w-[50em]">
          <h1>How to use Battle Map</h1>
          <h2>Map Page</h2>
          <div className="howToSect">
            <div className="howToSectSingle">
              <h3>Free Roam</h3>
              <p>
                Explore the map without borders, selecting random points on the
                map. The best way to find battles that you do not yet know;
                limits your selection to battles with location data (go to
                battles page or select a country in the map display to see
                battles without location data).
              </p>
            </div>
            <div className="howToSectSingle">
              <h3>Display</h3>
              <p>
                Lists out all the available countries. You can enter a
                coordinate at the bottom of the display to go to a specific
                point on the map. Click on a country to see its battles. Once
                clicked you will see some battles have buttons (with a green
                line) while some do not (red line), battles with location data
                have a button. Click the button to have the map pan to the
                battle, its corresponding popup will also appear. Adjust how
                much you want to zoom in while clicking battles with the zoom
                adjustor.
              </p>
            </div>
            <div className="howToSectSingle">
              <h3>Popups</h3>
              <h3></h3>
              <p>
                Either clicking a marker or battle button will open a popup.
                This popup will display the battles data: It's country, position
                of battle in that country's list, the battle's name, its year,
                and its latitude and longitude data.
              </p>
            </div>
          </div>
          <h2>Battles Page</h2>
          <div className="howToSect">
            <div className="howToSectSingle">
              <h3>Navigation Bar</h3>
              <p>
                Open the nav bar to navigate different countries data. The
                current selected country will be displayed in red. Click on the
                country button to see all of its battles.
              </p>
            </div>
            <div className="howToSectSingle">
              <h3>Add Location Data</h3>
              <p>
                Open the nav bar to navigate different countries data. The
                current selected country will be displayed in red. Click on the
                country button to see all of its battles.
              </p>
            </div>
            <div className="howToSectSingle">
              <h3>Edit and Report</h3>
              <p>
                Open the nav bar to navigate different countries data. The
                current selected country will be displayed in red. Click on the
                country button to see all of its battles.
              </p>
            </div>
          </div>
          <h2>Favorites and Contributions</h2>
          <div className="howToSect *:my-2">
            <div className="howToSectSingle">
              <h3>Favorite Battles</h3>
              <p>
                Click the bookmark button on the top right corner of a battle
                card to save your favorite battles to be able to come back to
                them later. Favorite tab is located in the dropdown in the top
                right. Must have an account to favorite.
              </p>
            </div>

            <div className="howToSectSingle">
              <h3>Contribute Data</h3>
              <p>
                Contribute whole new battles, or add location data to existing
                battles. Your contributions will be kept track of in your
                profile. View under profile dropdown. Must have right
                permissions to contribute
              </p>
            </div>
          </div>
          <h2>Admin Page</h2>
          <div className="howToSect">
            <div className="howToSectSingle">
              <h3>Permissions</h3>
              <p>
                Gain trust in the community by suggesting battles and making
                yourself known to gain access to the admin page (located under
                profile dropdown). Here you can view reported battles and see
                recent contributed battles.
              </p>
            </div>
          </div>
        </span>
      </div>

      <h2>Top Battles</h2>
      <div className="flex p-2">
        <button
          onClick={() => setCarouselIndex(carouselIndex - 1)}
          disabled={carouselIndex - 1 === 0}
          className="rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="flex flex-row *:flex-1 *:w-full ">
          {topBattles.map((battle, index) => {
            const haslatLon = "latLon" in battle;
            const bg = haslatLon ? "bg-green-700" : "bg-red-700";

            return (
              showBattle(index) && (
                <Card
                  key={battle.name}
                  bgColor={bg + " max-w-64 p-3 *:py-1"}
                  children={
                    <>
                      <h3>
                        <a
                          href={
                            "https://en.wikipedia.org/wiki/" +
                            battle.name.split(" or ")[0].replace(" ", "_")
                          }
                          target="_blank"
                          className="underline"
                        >
                          {/* {battleArr.length >= 3
                    ? battleArr.slice(0, -1).join(" – ")
                    : name} */}
                          {battle.name}
                        </a>
                      </h3>
                      <h4>{battle.country}</h4>
                      <h4>
                        Location:{" "}
                        {haslatLon ? (
                          <>{battle.latLon}</>
                        ) : (
                          <button className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-4"
                            >
                              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                          </button>
                        )}
                      </h4>
                      <h4>Year: {battle.year}</h4>
                    </>
                  }
                />
              )
            );
          })}
        </div>
        <button
          onClick={() => setCarouselIndex(carouselIndex + 1)}
          disabled={carouselIndex + 2 === topBattles.length}
          className="rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="py-20 *:p-2 bg-red-700 w-full text-white text-center">
        <h2>About the Dev</h2>
        <p>
          Battle map was created by a solo developer. If you want to get in
          touch, you can contact me below:
        </p>
        <div className="*:mx-1">
          <SocialIcon
            className="socialIcons"
            url="https://www.linkedin.com/in/samadams14/"
            target="_blank"
          />
          <SocialIcon
            className="socialIcons"
            url="https://github.com/SamAdams1"
            target="_blank"
          />
          <SocialIcon
            className="socialIcons"
            url="https://samuelmdev.com/"
            target="_blank"
          />
        </div>
      </div>

      {/* <h1>Battle Map is a place where you can explore historical battles.</h1> */}
      {/* {content.map((item, index) => (
        <Card key={index} bgColor={"bg-red-700"} children={<h2>{item}</h2>} />
      ))} */}
      {/* <button onClick={() => devChangePass("Sam", "1")}>change pass</button> */}
    </div>
  );
};

export default About;
