import React from "react";
import Card from "../../components/Card";

const Titles = ({ user, titles }) => {
  const colors = [
    "bg-yellow-500",
    "bg-red-700",
    "bg-red-700",
    "bg-red-700",
    "bg-red-700",
  ];
  return (
    <div className="belowHeader">
      <h1 className="mx-4">Titles</h1>
      <div className="flex flex-wrap">
        {titles.map((title, index) => (
          <Card
            key={index}
            bgColor={colors[index] + " p-2"}
            children={
              <div key={title.title}>
                <h2>
                  {index + 1}: {title.title}
                </h2>
                <h3>{title.desc}</h3>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Titles;
