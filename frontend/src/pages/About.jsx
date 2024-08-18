import React from "react";
import Axios from "axios";
import { motion } from "framer-motion";

import Card from "../../components/Card";

const About = () => {
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
  return (
    <div className="belowHeader flex flex-col items-center w-full *:pb-0">
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
        <span className="bg-gray-200 flex flex-col items-center *:p-2">
          {/* <video width={320} height={240} controls>
            <source src="dance - sailor song.mp4" />
          </video> */}
          <h1>How to use Battle Map</h1>
          <h2>Map Page</h2>
          <div className="*:max-w-[ flex flex-wrap ">
            <Card
              bgColor={"bg-red-700 p-2"}
              children={
                <>
                  <h3>Free Roam</h3>
                  <p>
                    Explore the map without borders, selecting random points on
                    the map. The best way to find battles that you do not yet
                    know; limits your selection to battles with location data
                    (go to battles page or select a country in the map display
                    to see battles without location data).
                  </p>
                </>
              }
            />
            <Card
              bgColor={"bg-red-700 p-2"}
              children={
                <>
                  <h3>Display</h3>
                  <p>
                    Lists out all the available countries. You can enter a
                    coordinate at the bottom of the display to go to a specific
                    point on the map. Click on a country to see its battles.
                    Once clicked you will see some battles have buttons (with a
                    green line) while some do not (red line), battles with
                    location data have a button. Click the button to have the
                    map pan to the battle, its corresponding popup will also
                    appear. Adjust how much you want to zoom in while clicking
                    battles with the zoom adjustor.
                  </p>
                </>
              }
            />
            <Card
              bgColor={"bg-red-700 p-2"}
              children={
                <>
                  <h3>Popups</h3>
                  <h3></h3>
                  <p>
                    Either clicking a marker or battle button will open a popup.
                    This popup will display the battles data: It's country,
                    position of battle in that country's list, the battle's
                    name, its year, and its latitude and longitude data.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <h2>Battles Page</h2>
            <Card
              bgColor={"bg-red-700 p-2"}
              children={
                <>
                  <h3></h3>
                  <p></p>
                </>
              }
            />
          </div>
          <h2>Favorites and Contributions</h2>
          <div className="flex flex-wrap *:flex-1 *:w-full overflow-hidden *:*:min-w-64 *:*:text-center">
            <Card
              bgColor={"bg-red-700 p-2 "}
              children={
                <>
                  <h3>Favorite Battles</h3>
                  <p>
                    Log in to save your favorite battles to come back to later.
                    Favorite tab is located in the dropdown in the top right.
                  </p>
                </>
              }
            />
            <Card
              bgColor={"bg-red-700 p-2 "}
              children={
                <>
                  <h3>Contribute Data</h3>
                  <p>
                    Log in to save your favorite battles to come back to later.
                    Contribute new whole new battles, or add location data to
                    existing battles. Your contributions will be kept track of
                    in your profile. View under profile dropdown.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <h2>Admin Page</h2>
            <Card
              bgColor={"bg-red-700 p-2"}
              children={
                <>
                  <h3></h3>
                  <p></p>
                </>
              }
            />
          </div>
        </span>
      </div>

      <h2>Carousel</h2>
      <h2>About the Dev</h2>

      {/* <h1>Battle Map is a place where you can explore historical battles.</h1> */}
      {/* {content.map((item, index) => (
        <Card key={index} bgColor={"bg-red-700"} children={<h2>{item}</h2>} />
      ))} */}
      {/* <button onClick={() => devChangePass("Sam", "1")}>change pass</button> */}
    </div>
  );
};

export default About;
