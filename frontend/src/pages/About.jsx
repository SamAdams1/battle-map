import React from "react";
import Card from "../../components/Card";

const About = () => {
  const content = [
    "Battle Map is a place where you can explore historical battles.",
    "Gain historical perspective to the battles that might have happened nearby.",
    "Collaborate with others to map battles.",
  ];
  return (
    <div className="flex flex-row flex-wrap">
      {content.map((item, index) => (
        <Card key={index} bgColor={"bg-red-700"} children={<h2>{item}</h2>} />
      ))}
    </div>
  );
};

export default About;
