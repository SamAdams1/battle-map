import Axios from "axios";

// const endpoint = "https://map-backend-7ravbvmifa-nn.a.run.app";
const endpoint = "http://localhost:3005";

// get data for map
export function getEveryBattle() {
  return Axios.get(`${endpoint}/battles`)
    .then((response) => {
      if (response.data.length === 0) {
        console.log("No battles found.");
        return null; // Return null if no data is found
      } else {
        return formatAllBattlesData(response.data[0]); // Return the first battle (or adjust as needed)
      }
    })
    .catch((error) => {
      console.error("Error fetching battles:", error);
      throw error; // Re-throw the error to be handled by the caller
    });
}
const formatAllBattlesData = (dataArr) => {
  let idk = {};
  for (let index = 0; index < dataArr.length; index++) {
    const item = dataArr[index];
    idk[item.country] = item.battles;
  }
  return idk;
};

// ${endpoint}
// country center for map
export function fetchCountryCenter(country) {
  Axios.get(`${endpoint}/countryCenter`, { params: { country } })
    .then((response) => {
      if (response.data.length == 0) {
        console.log(route + " not found.");
        return null;
      } else {
        return response.data[0]["countryCenter"];
      }
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
}
