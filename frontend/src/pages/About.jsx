import React from "react";
import Card from "../../components/Card";
import Axios from "axios";

const About = () => {
  const content = [
    "Battle Map is a place where you can explore historical battles.",
    "Gain historical perspective to the battles that might have happened nearby.",
    "Collaborate with others to map battles.",
  ];
  // "http://localhost:3005"
  async function devChangePass(username, newPassword) {
    const response = await Axios.put(
      "http://localhost:3005/devUpdatePassword",
      {
        username,
        newPassword,
      }
    );
    console.log(response);
  }
  return (
    <div className="flex flex-row flex-wrap">
      {content.map((item, index) => (
        <Card key={index} bgColor={"bg-red-700"} children={<h2>{item}</h2>} />
      ))}
      {/* <button onClick={() => devChangePass("Sam", "1")}>change pass</button> */}
    </div>
  );
};

export default About;
