import Axios from "axios";

export function updateCountryBattleLocs(country, countryBattleLocs) {
  let total = Object.keys(countryBattleLocs).length;
  // console.log(country, countryBattleLocs, total);
  Axios.put("http://localhost:3005/addBattleLoc", {
    country,
    battles: countryBattleLocs,
    total,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.error(e));
}

export function updateUserContributions(userID, contributions) {
  // console.log(userID, contributions);
  Axios.put("http://localhost:3005/updateContributions", {
    _id: userID,
    contributions: contributions,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.error(e));
}

export function postToHistory(data) {
  // console.log("history", data);
  Axios.post("http://localhost:3005/suggestLoc", data)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.error(e));
}