import React, { useState } from "react";

const ChatTxt = ({ message, user, deleteMsg }) => {
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
    fetch("http://localhost:3006/editMessage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    }).then((response) => {
      console.log(response);
    });
  };

  let myMsg = highlightMyMessages();
  return (
    <div className={"p-2 " + (myMsg || "bg-slate-50")}>
      <h4 className="font-medium">
        {message.username} ~ {dateTime(message)[1]}
        {myMsg && (
          <>
            <button
              onClick={() => deleteMsg(message)}
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
        )}
      </h4>
      {editing && user.loggedIn ? (
        <>
          <textarea
            type="text"
            value={editedTxt}
            onChange={(e) => setEditedTxt(e.target.value)}
          />
          <button onClick={editMessage}>Save</button>
        </>
      ) : (
        <h4 className="py-1 pl-4">{text}</h4>
      )}
    </div>
  );
};

export default ChatTxt;
