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

export function searchNamesForYear(battleLocs, year) {
  for (let index = 0; index < battleLocs.length; index++) {
    const bStr = battleLocs[index].name;
    let bArr = bStr.split(" – ");
    let thisYear;
    try {
      // check if battle has loc as then it will have year
      thisYear = String(battleLocs[bArr[0]].year);
    } catch {
      // if has dash search for year
      if (bArr.length >= 2) {
        thisYear = searchSecondPart(bArr[1].split(" or ")[0].split(",")[0]);
      } else {
        // if not search battle name for year
        thisYear = extractYear(bStr);
      }
    }

    // check if greater
    if (year < parseInt(thisYear)) {
      console.log(thisYear, year);
      return index;
    }
  }
  return battleLocs.length;
}

function searchSecondPart(name2) {
  if (parseInt(name2)) return name2;
  return extractYear(name2);
}

function extractYear(name) {
  let num = "";
  let lastletter = "1";
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    if (parseInt(element) || element == "0") {
      if (!parseInt(lastletter) && lastletter != "0") {
        // console.log("deleting: ", num, element, lastletter);
        num = "";
      }
      num += element;
    }
    if (lastletter + element == "BC") num = "-" + num;
    lastletter = element;
  }
  return num;
}
