import React, { useEffect } from "react";
import { updateCountryBattleLocs } from "./dbFuncs";

const DeleteForm = ({ user, country, index, battles, setPopupVis }) => {
  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  const deleteBattle = () => {
    battles.splice(index, 1);
    updateCountryBattleLocs(country, battles);
    // console.log(battles);
    setPopupVis(false);
  };

  return (
    <div className="flex flex-col items-center text-center *:my-4 ">
      <h1 className="text-red-600 font-bold underline">Delete</h1>
      <h1>{battles[index].name}</h1>
      <h2>This will permantly delete this battle and all its data.</h2>
      <h2>Are you sure?</h2>
      <div className="*:p-4 *:mx-4">
        <button onClick={deleteBattle}>Confirm</button>
        <button onClick={() => setPopupVis(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteForm;
