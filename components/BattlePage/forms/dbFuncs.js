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

export function updateNameList(country, nameList) {
  // console.log("history", data);
  Axios.put("http://localhost:3005/updateNameList", { country, nameList })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.error(e));
}

export function getCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let hour = today.getUTCHours();
  let min = String(today.getUTCMinutes()).padStart(2, "0");
  return `${mm}/${dd}/${yyyy} ~ ${hour}:${min}`;
}
