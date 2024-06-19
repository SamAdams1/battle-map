// endpoint
const wikiURL = "https://en.wikipedia.org/w/api.php?"
let params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "coordinates",
  generator: "search",
}

let secondParams = {
  origin: "*",
  format: "json",
  action: "parse",
  prop: "externallinks",
}

let battlesData = {};
  
var totalBattles = 0;
var numWCords = 0;
var numNoLocation = 0;
var foundNormally = 0;
var foundByExternalLink = 0;
async function getBattleData(country, text){
    let pageId;
    let locationFnd = false;
    try{
      params.gsrsearch = text;
      params.gsrlimit = 1;
  
      let data = await axios.get(wikiURL, { params: params });
      let page  = data.data.query.pages;
      let key = Object.keys(page)[0];
      pageId = key;
      totalBattles += 1;
      // console.log(totalBattles, text, page[key]);
      
      let latLon = [page[key].coordinates[0].lat, page[key].coordinates[0].lon];
      battlesData[country].withLocationData[text] = {};
      battlesData[country].withLocationData[text]["latLon"] = latLon;
      battlesData[country].withLocationData[text]["pageId"] = pageId;
      locationFnd = true;
      foundNormally += 1;
    } 
    catch(e){
      try { 
        // For pages that do not have the coordinate tag but still have location tag
        secondParams.pageid = pageId;
        let data = await axios.get(wikiURL, {params: secondParams});
        let links = data.data.parse.externallinks;
  
        for (const key in links) {
          if (links[key].includes("geohack")) {
            let coordinates = links[key].split("=").at(-1);
            let cords;

            if (coordinates.includes(".")) {
              cords = removeOtherParams(coordinates.split("_"));
              let [northSouth, eastWest] = checkSouthandWest(cords);
              cords = [parseFloat(cords[0]) * northSouth, parseFloat(cords[2]) * eastWest];
            }
            else{
              cords = removeOtherParams(coordinates.split("_"));
              cords = convertToLonLat(cords);
            }
            // if (cords[0] == null){throw error=("No Location Link Found in external links.\n")}
            battlesData[country].withLocationData[text] = {};
            battlesData[country].withLocationData[text]["latLon"] = cords;
            battlesData[country].withLocationData[text]["pageId"] = pageId;
            locationFnd = true;
            foundByExternalLink += 1;
          }
        }
        if (!locationFnd){throw error=(text, "\nNo Location Link Found in external links.\n")};
      }
      catch (error) {
        if (!locationFnd) {
          battlesData[country].noLocationData[text] = {};
          battlesData[country].noLocationData[text]["latLon"] = [0,0];
          battlesData[country].noLocationData[text]["pageId"] = pageId;
          // console.error(error,`${text} Id: ${pageId}`);
          numNoLocation += 1;
        }
      }
    }
    if (locationFnd){numWCords += 1;} 
  }
  
  let lastCountry;
  async function readTxt(){
    let data = await axios.get("../battleList.json")
    // let data = response.json()
    // console.log(Object.getOwnPropertyNames(data))
    fetch(`../countries.json`)
      .then((res) => res.json())
      .then((countryList) => {
        // text = text.split("\r\n")
        let apiCalls = 0;
        for (const country in countryList) {
          if (apiCalls >= 100){
            break;
          }
          lastCountry = country

          let countrydict = {
            totalBattles: 0,
            withLocationData: {},
            noLocationData: {},
          }
          battlesData[country] = countrydict

          let battlesNum = 0;
          for (const battleIndex in data.data[country]) {
            let battleStr = data.data[country][battleIndex]
            // console.log(battleStr)
            // Catch if battle name is not followed by "- date" or date is in name, improveS search by not repeating numbers
            if (battleStr.includes("–")){
              let battleFormattted = battleStr.split(" – ")
              getBattleData(country, battleFormattted[0])
            }else{
              setTimeout()
              getBattleData(country, battleStr)
            }
            // console.log(country, battleIndex)
            battlesNum +=1
          }
          battlesData[country].totalBattles = battlesNum
          apiCalls += battlesNum
          
          console.log(country, battlesNum)
          // console.log(apiCalls)
        }
        console.log(battlesData)
      })
      .catch((e) => console.error(e));
  }
// readTxt();
// getBattleData("Battle of Carteia (naval)")
// INVESTIGATE "BATTLE OF MOUNT'S BAY 1595" ITS WAY OFF COAST FOR SOME REASON

// Battle of Nivelle and Battle of the Bidassoa
// still show up null,null for latlon

// Work on my coordinate finder it causes many glitches and often the math is wrong.

function convertToLonLat(dms){
    try{
      let lat, lon;
      let [northSouth, eastWest] = checkSouthandWest(dms);
      
      if (dms.length <= 6){
        lat = parseFloat(dms[0]) + parseFloat(dms[1]) / 60;
        lon = parseFloat(dms[3]) + parseFloat(dms[4]) / 60;
      }else{
        lat = parseFloat(dms[0]) + parseFloat(dms[1]) / 60 + parseFloat(dms[2]) / 3600;
        lon = parseFloat(dms[4]) + parseFloat(dms[5]) / 60 + parseFloat(dms[6]) / 3600;
      }
      lat *= northSouth; lon *= eastWest;
      // console.log(dms, [lat, lon])
      return [lat, lon]
    }catch(e){
      console.error(`Format not supported: ${dms}`)
    }
}
function checkSouthandWest(dms){
    let northSouth = 1, eastWest = 1;
    for (const key in dms) {
        if (dms[key] == "W") {eastWest = -1};
        if (dms[key] == "S") {northSouth = -1};
      }
    return [northSouth, eastWest];
}

function removeOtherParams(dms){
  while (dms.at(-1) != "W" && dms.at(-1) != "E" ){
    dms = dms.slice(0, dms.length - 1)
  }
  return dms;
}
