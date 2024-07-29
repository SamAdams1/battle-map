import React, { useState } from "react";
import { updateNameList } from "./forms/dbFuncs";

const EditName = ({ index, battleName, country, nameList }) => {
  const [name, setName] = useState(battleName);

  function updateList(val) {
    setName(val);
    nameList[index] = val;
    console.log(nameList[index]);
    updateNameList(country, nameList);
  }

  return (
    <div>
      <textarea
        className="w-full"
        value={name}
        onChange={(e) => updateList(e.target.value)}
      ></textarea>
      <button onClick={() => updateList(name)}>Post</button>
    </div>
  );
};

export default EditName;
