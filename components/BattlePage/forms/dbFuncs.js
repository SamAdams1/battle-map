import Axios from "axios";

export function updateCountryBattleLocs(country, battles) {
  let total = getNumWLoc(battles);
  // console.log(country, battles, total);
  Axios.put("http://localhost:3005/updateBattle", {
    country,
    battles,
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

export function getNumWLoc(data) {
  let count = 0;
  data.map((battle) => {
    if ("latLon" in battle) count += 1;
  });
  return count;
}
