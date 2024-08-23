import React from "react";
import { motion } from "framer-motion";
import FavButton from "../FavButton";
import WikiButton from "../WikiButton";
import Card from "../Card";
// import EditIcon from "@mui/icons-material/Edit";
const BattleSingle = ({ user, data, index, country, showPopup }) => {
  const nameOnly = data.name.split(" – ")[0].split(" or ")[0];
  const hasLatLon = "latLon" in data;

  function tensPlace(coord) {
    coord = coord.toString();
    if (coord.length > 5) {
      coord = coord.slice(0, 5);
    }
    return parseFloat(coord);
  }

  return (
    <Card
      bgColor={hasLatLon ? " bg-green-600" : " bg-red-700"}
      children={
        <div className="flex flex-col flex-1">
          <div className="flex mb-auto">
            <div className="p-1 *:mb-1 w-full">
              <a
                href={
                  "https://en.wikipedia.org/wiki/" +
                  nameOnly.split(" or ")[0].replace(" ", "_")
                }
                target="_blank"
                className="underline"
              >
                <h2>{nameOnly}</h2>
              </a>
              <div>
                {hasLatLon ? (
                  <h3>
                    Location:
                    {hasLatLon &&
                      " " +
                        tensPlace(data.latLon[0]) +
                        ", " +
                        tensPlace(data.latLon[1])}
                  </h3>
                ) : (
                  <div className="flex ">
                    <h3 className="mr-2">Location: </h3>
                    <button
                      title="Add Location Data"
                      onClick={() => showPopup(data, "add", index)}
                      disabled={!user.loggedIn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                    </button>
                  </div>
                )}
                <h3>Year: {data.year}</h3>
              </div>
            </div>
            {user.loggedIn && (
              <div className="right-0 self-start">
                <FavButton battleDict={data} country={country} user={user} />
              </div>
            )}
          </div>

          <div className="flex *:w-full *:mt-4">
            {user.perms.editData && (
              <button
                onClick={() => showPopup(data, "edit", index)}
                title="Edit Battle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            )}

            {user.perms.reportData && (
              <button
                onClick={() => showPopup(data, "report", index)}
                title="Report Battle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                  />
                </svg>
              </button>
            )}

            {user.perms.deleteBattle && (
              <button
                onClick={() => showPopup(data, "delete", index)}
                title="Delete Battle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      }
    />
  );
};

export default BattleSingle;
