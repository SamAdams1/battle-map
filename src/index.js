
// link to search for json of content of wikipedia page
// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=

// Create map and add tiles to it
var map = L.map('map').setView([55, 10], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 16,
minZoom: 2,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let battlesData = [
  {
    map: map,
    position: [49.128056, 16.7625],
    title: "Battle of Austerlitz"
},
  {
    map: map,
    position: [50.678056, 4.412222],
    title: "Battle of Waterloo"
},
{
  map: map,
  position: [44.885556, 8.6775],
  title: "Battle of Merango"
},
{
  map: map,
  position: [52.52, 13.405],
  title: "Fall of Berlin"
},
]

function addMarkersToMap(){
  for (const key in battlesData) {
    L.marker(battlesData[key].position).addTo(map)
    console.log(battlesData[key].position)
  }
}
addMarkersToMap();