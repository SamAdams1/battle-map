import React from "react";

const Titles = ({ user, titles }) => {
  return (
    <div>
      <h1>Titles</h1>
      <div>
        {titles.map((title) => (
          <div key={title.title}>
            <h2>{title.title}</h2>
            <h3>{title.desc}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Titles;
