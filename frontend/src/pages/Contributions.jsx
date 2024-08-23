import React from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import FavButton from "../../components/FavButton";
import Card from "../../components/Card";

const Contributions = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Contributions" />
  ) : (
    <div className="flex flex-col belowHeader">
      <h1 className="ml-4">
        {user.contributions.length === 0 ? (
          <>No Contributions</>
        ) : (
          <>Your Contributions</>
        )}
      </h1>

      <div className="flex flex-wrap" key={"gagafda"}>
        {user.contributions.map((battleDict) => {
          return (
            <Card
              key={battleDict.dateAdded}
              bgColor={"bg-green-600"}
              children={
                <div key={battleDict.id} className="flex">
                  <div className="w-full p-2">
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
