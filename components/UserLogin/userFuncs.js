import Axios from "axios";

// class Soldier {
//   constructor () {

//   }
//   suggestBattle() {
//     console.log("suggest")
//   }
// }

export function suggestBattle(battle) {
  console.log("suggest " + battle);
}

export function addBattle(battle) {
  console.log("add " + battle);
}

export function getUserData(id) {
  return Axios.get("http://localhost:3005/userDisplay", { params: { id } })
    .then((response) => {
      if (response.data.length === 0) {
        console.log("UserDisplay error.");
        return null; // Or handle the error as needed
      } else {
        return response.data[0]; // Adjust this to return the actual user data
      }
    })
    .catch((error) => {
      console.error(error);
      return null; // Or handle the error as needed
    });
}
