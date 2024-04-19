// endpoint
const wikiURL = "https://en.wikipedia.org/w/api.php?"
let params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "coordinates",
  generator: "search",
}
// let secondParams = {
//   origin: "*",
//   format: "json",
//   action: "templatedata",
//   includeMissingTitles: true,
//   generator: "alltransclusions",
//   atlimit: 500
//   // prop: "templates",
//   // pllimit: 500,
// }
let secondParams = {
  origin: "*",
  format: "json",
  action: "parse",
  prop: "externallinks",
}

// Create map and add tiles to it
var map = L.map('map').setView([55, 10], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 16,
minZoom: 2,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// let battlesData = {
//   france: {
//     withLocationData: {},
//     noLocationData: {},
//   },
// }
let battlesData = {
  albania: {
    withLocationData: {},
    noLocationData: {},
  },
  andorra: {
    withLocationData: {},
    noLocationData: {},
  },
  austria: {
    withLocationData: {},
    noLocationData: {},
  },
  belarus: {
    withLocationData: {},
    noLocationData: {},
  },
  belgium: {
    withLocationData: {},
    noLocationData: {},
  },
  bosniaAndHerzegovina: {
    withLocationData: {},
    noLocationData: {},
  },
  bulgaria: {
    withLocationData: {},
    noLocationData: {},
  },
  croatia: {
    withLocationData: {},
    noLocationData: {},
  },
  cyprus: {
    withLocationData: {},
    noLocationData: {},
  },
  czechRepublic: {
    withLocationData: {},
    noLocationData: {},
  },
  denmark: {
    withLocationData: {},
    noLocationData: {},
  },
  england: {
    withLocationData: {},
    noLocationData: {},
  },
  estonia: {
    withLocationData: {},
    noLocationData: {},
  },
  finland: {
    withLocationData: {},
    noLocationData: {},
  },
  france: {
    withLocationData: {},
    noLocationData: {},
  },
  germany: {
    withLocationData: {},
    noLocationData: {},
  },
  greece: {
    withLocationData: {},
    noLocationData: {},
  },
  hungary: {
    withLocationData: {},
    noLocationData: {},
  },
  iceland: {
    withLocationData: {},
    noLocationData: {},
  },
  ireland: {
    withLocationData: {},
    noLocationData: {},
  },
  italy: {
    withLocationData: {},
    noLocationData: {},
  },
  kosovo: {
    withLocationData: {},
    noLocationData: {},
  },
  latvia: {
    withLocationData: {},
    noLocationData: {},
  },
  liechtenstein: {
    withLocationData: {},
    noLocationData: {},
  },
  lithuania: {
    withLocationData: {},
    noLocationData: {},
  },
  luxembourg: {
    withLocationData: {},
    noLocationData: {},
  },
  malta: {
    withLocationData: {},
    noLocationData: {},
  },
  moldova: {
    withLocationData: {},
    noLocationData: {},
  },
  monaco: {
    withLocationData: {},
    noLocationData: {},
  },
  montenegro: {
    withLocationData: {},
    noLocationData: {},
  },
  netherlands: {
    withLocationData: {},
    noLocationData: {},
  },
  northMacedonia: {
    withLocationData: {},
    noLocationData: {},
  },
  norway: {
    withLocationData: {},
    noLocationData: {},
  },
  poland: {
    withLocationData: {},
    noLocationData: {},
  },
  portugal: {
    withLocationData: {},
    noLocationData: {},
  },
  romania: {
    withLocationData: {},
    noLocationData: {},
  },
  russia: {
    withLocationData: {},
    noLocationData: {},
  },
  sanMarino: {
    withLocationData: {},
    noLocationData: {},
  },
  scotland: {
    withLocationData: {},
    noLocationData: {},
  },
  serbia: {
    withLocationData: {},
    noLocationData: {},
  },
  slovakia: {
    withLocationData: {},
    noLocationData: {},
  },
  slovenia: {
    withLocationData: {},
    noLocationData: {},
  },
  spain: {
    withLocationData: {},
    noLocationData: {},
  },
  sweden: {
    withLocationData: {},
    noLocationData: {},
  },
  switzerland: {
    withLocationData: {},
    noLocationData: {},
  },
  ukraine: {
    withLocationData: {},
    noLocationData: {},
  },
  wales: {
    withLocationData: {},
    noLocationData: {},
  },
  vaticanCity: {
    withLocationData: {},
    noLocationData: {},
  },
};



let country = "england";

var lencount = 0;
var numWCords = 0;
async function getBattleData(text){
  let pageId;
  let locationFnd = false;
  try{
    params.gsrsearch = text
    params.gsrlimit = 1;

    let data = await axios.get(wikiURL, { params: params });
    let page  = data.data.query.pages
    let key = Object.keys(page)[0]
    pageId = key
    console.log(lencount+=1,text, page[key])

    let latLon = [page[key].coordinates[0].lat, page[key].coordinates[0].lon]
    battlesData[country].withLocationData[text] = latLon
    console.log(battlesData[country], latLon)
    locationFnd = true;
  } 
  catch(e){
    try { 
      // For pages that do not have the coordinate tag but still have location tag
      secondParams.pageid = pageId
      let data = await axios.get(wikiURL, {params: secondParams})
      let links = data.data.parse.externallinks

      // console.log(pageId, data.data.parse)
      let gotLink = false;
      for (const key in links) {
        if (links[key].includes("geohack")) {
          let coordinates = links[key].split("=").at(-1)
          console.log(text, links[key])
          // console.log(coordinates)
          // console.log(coordinates.replace(";","_").split("_"))
          
          if (coordinates.includes(".")) {
            addMarkerToMap([coordinates.split("_")[0], coordinates.split("_")[2]], text)
            battlesData[country].withLocationData[text] = [coordinates.split("_")[0], coordinates.split("_")[2]]
            locationFnd = true;
          }
          else{
            addMarkerToMap(convertToLonLat(coordinates.split("_")), text)
            battlesData[country].withLocationData[text] = convertToLonLat(coordinates.split("_"))
            locationFnd = true;
          }
          gotLink = true;
        }
      }
      if (!gotLink){throw error=("No Link Found in external links.\n")};
    } 
    catch (error) {
      console.log(locationFnd)
      if (!locationFnd) {
        battlesData[country].noLocationData[text] = [0, 0]
        console.error(error,`No location found for: ${text} Id: ${pageId}` )
      }
    }
  }
  if (locationFnd){numWCords += 1;} 
}


async function readTxt(){
  // let data = axios.get("../battleTxts/france.txt")
  // console.log(data)
  fetch(`../battleTxts/${country}.txt`)
    .then((res) => res.text())
    .then((text) => {
      text = text.split("\r\n")
      for (const key in text) {
        // Catch if battle name is not followed by "- date" or date is in name
        // improve search by not repeating numbers
          let newTxt = text[key].replace(" – ", "–").split("–")
          if (newTxt[1] != undefined && !newTxt[0].includes(newTxt[1])){
            getBattleData(newTxt[0].concat(" ", newTxt[1].replace(" ", "")))
          }else{
            getBattleData(newTxt[0])
          }
      }
      
    })
    .catch((e) => console.error(e));
    // console.log(`Battles W/ Coords: ${numWCords}`)
}
// readTxt();
// console.log(`../battleTxts/${country}.txt`)
// getBattleData("Battle of Woden's Burg (592)   592")

// let burg = "Battle of Woden's Burg (592-593) – 592"
// let newTxt = burg.replace(" – ", "–").split("–")
// if (newTxt[1] != undefined && !newTxt[0].includes(newTxt[1])) {
//   console.log(newTxt)
// }





function addMarkerToMap(latLon, battleTitle){
  L.marker(latLon, {
    title: battleTitle,
    bubblingMouseEvent: true,
  }).addTo(map).on('click', showMarkerData = (e) => {
    console.log(e.target.options.title, e.target.getLatLng())
  })
}


var count = 0;
async function addToMap() {
  let franceData = await axios("../battles.json")
  for (const key in franceData.data.france) {
    addMarkerToMap(franceData.data.france[key], key)
    count+=1;
  }
  console.log(`Battles displayed: ${count}`)
}
addToMap()


function convertToLonLat(dms){
  console.log(dms)
  try{
    let lat, lon;
    let northSouth = 1;
    let eastWest = 1;
    for (const key in dms) {
      if (dms[key] == "W") {
        console.log('west');
        eastWest = -1;
      }
      if (dms[key] == "S") {
        console.log('south');
        northSouth = -1;
      }
    }
    if (dms.length <= 7){
      lat = parseFloat(dms[0]) + parseFloat(dms[1]) / 60;
      lon = parseFloat(dms[3]) + parseFloat(dms[4]) / 60;
    }else{
      lat = parseFloat(dms[0]) + parseFloat(dms[1]) / 60 + parseFloat(dms[2]) / 3600;
      lon = parseFloat(dms[4]) + parseFloat(dms[5]) / 60 + parseFloat(dms[6]) / 3600;
    }
    lat *= northSouth; lon *= eastWest;
    console.log(dms, [lat, lon])
    return [lat, lon]
  }catch(e){
    console.error(`Format not supported: ${dms}`)
  }
}