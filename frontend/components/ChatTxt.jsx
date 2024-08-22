import React, { useState } from "react";
import UserDisplay from "./UserLogin/UserDisplay";
import { ENDPOINT } from "../environment";

const ChatTxt = ({ message, user, deleteMsg, index }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.text);
  const [editedTxt, setEditedTxt] = useState(message.text);

  const highlightMyMessages = () => {
    if (user.loggedIn) {
      return user._id == message.userId ? " bg-red-50" : "";
    }
    return "";
  };
  const dateTime = (message) => {
    let date = message.date;
    return date.split(" ~ ");
  };

  const editMessage = () => {
    setEditing(false);
    setText(editedTxt);
    message.text = editedTxt;
    fetch(`${ENDPOINT}/chats/editMessage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    }).then((response) => {
      console.log(response);
    });
  };

  let myMsg = highlightMyMessages();
  return (
    <div className={"p-2 py-5  " + (myMsg || "bg-slate-50")}>
      <h4 className="font-medium">
        {myMsg ? (
          <>
            {user.username}
            <button
              onClick={() => deleteMsg(index, message._id)}
              className="scale-[.8] font-normal"
            >
              Delete
            </button>
            <button
              onClick={() => setEditing(!editing)}
              className="scale-[.8] font-normal"
            >
              {editing ? <>Cancel</> : <>Edit</>}
            </button>
          </>
        ) : (
          <>
            {/* <UserDisplay id={message.userId} /> ~ {dateTime(message)[1]} */}
            {message.username}
          </>
        )}
      </h4>
      {editing && user.loggedIn ? (
        <div className="flex flex-wrap">
          <textarea
            type="text"
            value={editedTxt}
            onChange={(e) => setEditedTxt(e.target.value)}
            className="w-[75vw]"
          />
          <button onClick={editMessage}>Save</button>
        </div>
      ) : (
        <h4 className="py-1 pl-4">{text}</h4>
      )}
    </div>
  );
};

export default ChatTxt;
