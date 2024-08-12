import Axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";

// params for search for page
// params: {
//   origin: "*",
//   format: "json",
//   action: "query",
//   list: "search",
//   srsearch: a,
//   srlimit: 1,
// }, response["data"]["query"]["search"][0]

const WikiButton = ({ battleName, showPopup }) => {
  // true if article exists, false if no wikiepedia article
  const [articleStatus, setArticleStatus] = useState(true);

  function findWikiPage() {
    Axios.get("https://en.wikipedia.org/w/api.php?", {
      params: {
        origin: "*",
        format: "json",
        action: "parse",
        page: battleName,
        prop: "wikitext",
      },
    })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          // if (response["data"]["query"]["search"][0]) setArticleStatus(true);
          const text = response["data"]["parse"]["wikitext"]["*"];
          console.log(text);
          if (text) {
            showPopup(text, "wiki");
          } else setArticleStatus(false);
        }
      })
      .catch(() => setArticleStatus(false));
  }

  useEffect(() => {
    setTimeout(() => setArticleStatus(true), 4000);
  }, [articleStatus]);

  return (
    <>
      <button onClick={findWikiPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {!articleStatus && <>no article found</>}
    </>
  );
};

export default WikiButton;
