import React from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import FavButton from "../../components/FavButton";
import Card from "../../components/Card";

const Contributions = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Contributions" />
  ) : (
    <div className="flex flex-col belowHeader">
      <h1>Your Contributions</h1>

      <div className="flex flex-wrap">
        {user.contributions.map((battleDict) => {
          return (
            <Card
              // bgColor={}
              children={
                <div key={battleDict.id} className="flex">
                  <div>
                    <h2>
                      <a
                        href={
                          "https://en.wikipedia.org/wiki/" +
                          battleDict.battle
                            .split(" or ")
                            .at(0)
                            .replace(" ", "_")
                        }
                        target="_blank"
                        className="underline"
                      >
                        {battleDict.battle}
                      </a>
                    </h2>
                    <h3>{battleDict.country}</h3>
                    <h3>{battleDict["dateAdded"]}</h3>
                  </div>
                  <div className="right-0 self-start">
                    <FavButton
                      country={battleDict.country}
                      battleDict={battleDict}
                      user={user}
                    />
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Contributions;
