// Create map and add tiles to it
let map = L.map('map', {
  worldCopyJump: true,
  maxBounds: L.latLngBounds([100, 200],[-100, -200]),
  maxBoundsViscosity: 1,
  markerZoomAnimation: false,
  worldCopyJump:true
}).setView([55, 10], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 2,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><p>Click dot to learn about battle.</p>',
}).addTo(map);
map.invalidateSize() // fixes tiles not loading in on map

const latLonDataPath = "../d.json"
const countryNamePath = "../countries.json"
const battleNamePath = "../battleList2.json"
const countryCenterPath = "../countriesCenter.json"

let euroCountries = [
  "albania",
  "andorra",
  "austria",
  "belarus",
  "belgium",
  "bosniaAndHerzegovina",
  "bulgaria",
  "croatia",
  "cyprus",
  "czechRepublic",
  "denmark",
  "england",
  "estonia",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "iceland",
  "ireland",
  "italy",
  "kosovo",
  "latvia",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "malta",
  "moldova",
  "monaco",
  "montenegro",
  "netherlands",
  "northMacedonia",
  "norway",
  "poland",
  "portugal",
  "romania",
  "russia",
  "sanMarino",
  "scotland",
  "serbia",
  "slovakia",
  "slovenia",
  "spain",
  "sweden",
  "switzerland",
  "ukraine",
  "wales",
  "vaticanCity"
];
let layers = {}

// Elements
document.onload = showCountryList();
const infoElement = document.getElementById("infoPage");

const iconSize = 15
var redIcon = L.icon({
  iconUrl: '../public/red-dot.png',

  iconSize:     [iconSize, iconSize],
  iconAnchor:   [iconSize / 2, iconSize / 2], // point of the icon which will correspond to marker's location
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function addMarkerToMap(latLon, battleTitle, country){
  L.marker(latLon, {
    title: battleTitle + " - " + country,
    bubblingMouseEvent: true,
    icon: redIcon,
  }).addTo((map)).on('click', showMarkerData = (e) => {
    try{
      displayBattleDesc(e.target.options.title)
      // infoElement.innerText = `${e.target.options.title} | ${e.target.getLatLng()}`
      // console.log(country, e.target.options.title, e.target.getLatLng())
    }catch(error){
      console.error(e.target.options.title)
      console.error(error)
    }
  })
}



async function displayBattleDesc(title){
  title = title.split(" - ")
  let battleName = title[0].split("or")[0]
  let country = title.at(-1)
  let battles = await axios(latLonDataPath)
  console.log(title)

  let battleData = battles.data[country].withLocationData[battleName]
  let battleHtml = document.createElement("h1")
  battleHtml.innerText = `${country}\n${battleName}\n[${battleData.latLon}]\nPageId: ${battleData.pageId}`
  infoElement.innerText = ""
  infoElement.appendChild(battleHtml)

  // link to wikipage
  let wikiLink = "https://en.wikipedia.org/wiki/" + battleName.replace(" ","_")
  let wikiElement = document.createElement("a")
  wikiElement.href = wikiLink
  wikiElement.target = "_blank" //link opens in new tab
  wikiElement.innerText = battleName
  infoElement.appendChild(wikiElement)


  let battleHtml2 = document.createElement("p")
  battleHtml2.innerText = await getBattleWikiHTML(battleData.pageId, battleName)
  infoElement.appendChild(battleHtml2)
}



// 6148 total battles found on wikipedia only 1620 with location data or 1640
// singlecountry = {"All": 1,}
let count = 0;
async function addBattlesMarkers(){
  let battlesJsonData = await axios(latLonDataPath)
  let countries = await axios(countryNamePath)
  // console.log(battlesJsonData.data)
  
  for (const country in countries.data) {
    // console.log(country)
    try{
      let battleData = battlesJsonData.data[country]["withLocationData"]
      for (const battle in battleData) {
        // console.log(battleData[battle]["latLon"])
        count+=1
        addMarkerToMap(battleData[battle]["latLon"], battle, country)
        
        // addCountryDataToMap(battleData[battle]["latLon"], country)
      }
    }catch(e){
      console.error(country, e)
    }
  }
  console.log(`Battles displayed: ${count}`)
}
addBattlesMarkers()



document.getElementById("countryListBtn").addEventListener("click", showCountryList)
async function showCountryList(){
  map.setView([55, 10], 2)
  let countries = await axios(countryNamePath)
  infoElement.innerText = ""

  // Separate countries by letter
  let lastChar = "Z";
  for (const country in countries.data) {
    if (country.charAt(0) != lastChar) {
      lastChar = country.charAt(0);
      let letterChar = document.createElement("h1");
      letterChar.innerText = lastChar + ":"
      letterChar.className = "letterHeader"
      infoElement.appendChild(letterChar)
    }

    let newBtn = document.createElement("input")
    newBtn.type = "button"; 
    newBtn.id = country; 
    newBtn.className = "countryListBtn"
    newBtn.value = `${country.toString()}\n`
    newBtn.addEventListener("click", function(){focusCountry(this.id)})
    infoElement.appendChild(newBtn)
  }
}

let headerBtns = document.getElementsByClassName("headerBtn")
for (var i = 0; i < headerBtns.length; i++) {
  headerBtns[i].addEventListener("click", function(){focusCountry(this.id)})
}



async function focusCountry(country){
  const countryPosData = await axios(countryCenterPath)
  let countryLatLon = countryPosData.data[country].latLon
  map.setView(countryLatLon , 5.5)

  infoElement.innerText = ""
  let battleList = await axios(battleNamePath)
  let count = 1;
  let countryElement = document.createElement("h1")
  countryElement.innerText = country
  infoElement.appendChild(countryElement)
  let battlesLocs = await axios(latLonDataPath)
  battlesLocs = battlesLocs.data[country].withLocationData

  const countrysBattles = battleList.data[country]
  for (const battle in countrysBattles) {
    let battleBtn  = document.createElement("p");
    try{
      const battleLatLon = battlesLocs[countrysBattles[battle].split(" – ")[0]].latLon

      battleBtn.innerText = `${count}: ${countrysBattles[battle]}`
      battleBtn.id = battleLatLon; 
      battleBtn.classList.add("battleListBtn");
      battleBtn.classList.add("battleTitle");

      battleBtn.addEventListener('click', function(){
        let latLonArr = this.id.split(",")
        map.setView([parseFloat(latLonArr[0]), parseFloat(latLonArr[1])], 14)
        this.style.color = "purple"
      })

      infoElement.appendChild(battleBtn)
      count += 1
    }catch(error){

      battleBtn.innerText = `${count}: ${countrysBattles[battle].toString()}\n`
      battleBtn.classList.add("battleTitle")
      infoElement.appendChild(battleBtn)

      count += 1;
    }
  }
}



const wikiURL2 = "https://en.wikipedia.org/w/api.php?"

let battleHtmlParams = {
  origin: "*",
  format: "json",
  action: "parse",
  prop: "text",
}


countriesParam = {
  'origin': "*",
  'format': "json",
  'action': "parse",
  'prop': "text",
  // 'section': 0,
  'pageid': 0,
}

// async function getBattleWikiHTML(pageId, battleName){
//   battleHtmlParams.pageid = pageId;
//   console.log(pageId)
//   let data = await axios.get(wikiURL2, {params: battleHtmlParams});
//   // let links = data.data.parse.externallinks;
//   battleHTML = data.data.parse.text["*"]
//   console.log($(battleHTML).text())
//   console.log(battleHTML)
//   // console.log(battleHTML.split("</table>"))
//   return $("<p>The </p>"+battleHTML.split("<p>The").at(-1).split("References").at(0).split("Notes").at(0).split("See also").at(0)).text().replace(/\[[^\]]*\]/g, '')
// }
// could get info by search for the sections instead of the whole thing like with the battle list.
// [edit]
async function getBattleWikiHTML(pageId, battleName){
  battleHtmlParams.pageid = pageId;
  // battleHtmlParams.section = 0;
  // console.log(pageId)
  let data = await axios.get(wikiURL2, {params: battleHtmlParams});
  battleHTML = data.data.parse.text["*"]
  // console.log($(battleHTML).text())
  battleParagraphs = battleHTML.split("<p>")
  console.log("============================================================")
  infoToReturn = undefined
  for (let index = 0; index < battleParagraphs.length; index++) {
    if (battleParagraphs[index].includes("<b>") && battleParagraphs[index].includes(`${battleName}`) && !battleParagraphs[index].includes("mw-parser")) {
      // console.log(battleParagraphs[index].replace(/<[^>]*>/g, '').replace(/&.*?;/g, ''))
      infoToReturn = battleParagraphs[index].replace(/<[^>]*>/g, '').replace(/&.*?;/g, '').replace(/\[[^\]]*\]/g, '')
    }
  }
  if (infoToReturn == undefined) {
    return battleHtml
  }else{
    return infoToReturn
  }
}
// </p>
// [user-generated source]
// &#91;1&#93;&#58;&#8202;8&#8202;&#91;5&#93;