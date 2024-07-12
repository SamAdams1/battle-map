import React, { useEffect, useState } from 'react'
import Axios from "axios"


const Table = ({ battleNames, battleLocs, country, showPopup, user }) => {

  function tensPlace(coord) {
    coord = coord.toString()
    if (coord.length > 5) {
      coord = coord.slice(0, 5)
    }
    return parseFloat(coord)
  }

  function battleHasLoc(country, battleName){
    let data = battleLocs[country][battleName]
    if (data) {
      return [tensPlace(data.latLon[0]), tensPlace(data.latLon[1])]
    }
    return data
  }

  const copyToClipboard = (txt) => {
    alert("Location copied to clipboard: " + txt)
    navigator.clipboard.writeText(txt)
  }

  
  const userLoggedIn = () => {
    return Object.keys(user).length >= 1
  }

  const getCurrentDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  // Favorite battle and add to contributions
  const favoriteBattle = (battleName, countryName, setFav) => {
    console.log("favoriting...")
    setFav("isFav")
    const newInfo = {"battle": battleName, "country": countryName, "dateAdded": getCurrentDate()}
    user["favorites"][battleName] = newInfo

    // Axios.put(`http://localhost:3005/${route}`, user)
    // .then((response) => {
    //   console.log(response);
    // }).catch((e) => console.log(e))
  }
  const unfavoriteBattle = (battleName, countryName, setFav) => {
    setFav("notFav")
    console.log("bye")
    user["favorites"][battleName] = null
  }
  const checkFavoriteStatus = (battle) => {
    if (userLoggedIn()) {
      return !(battle in user.favorites) ? "notFav" : "isFav"
    }
    return ""
  }
  const favFunctions = {
    "isFav": unfavoriteBattle,
    "notFav": favoriteBattle
  }

  return(
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Battle</th>
          <th>Location</th>
          <th></th>
        </tr>

        {battleNames[country].map((battle, index) => {
          battle = battle.split(" – ").at(0)
          const battleCoords = battleHasLoc(country, battle)
          const [favStatus, setFavStatus] = useState(checkFavoriteStatus(battle))

          return (
            <tr key={battle+index}>
              <td className={favStatus}>{index+1}</td>
              <td className={ battleCoords ? ("green"):("red")}>{battle.split(" or ")[0]}</td>
              <td>
                { battleCoords ? (
                    <button 
                      className='addLocBtn' 
                      title='Copy to Clipboard'
                      onClick={() => copyToClipboard(battleCoords)} 
                    >[{battleCoords[0]}, {battleCoords[1]}]</button>
                ) : (
                    <button 
                      className='addLocBtn' 
                      title='Add Location Data' 
                      onClick={() => showPopup(battle, country)}
                    >Add</button>
                )}
              </td>
              { userLoggedIn() && 
                <td>
                    <button 
                      className='favBtn' 
                      onClick={() => favFunctions[favStatus](battle, country, setFavStatus)}
                    >{favStatus == "isFav" ? <>Unfavorite</> : <>Favorite</>}</button>
                </td>
              }
            </tr>
          )})}
      </tbody>
    </table>
)}

export default Table