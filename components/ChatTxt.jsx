import React, { useState } from "react";

const ChatTxt = ({ message, user, deleteMsg }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.text);
  const [editedTxt, setEditedTxt] = useState(message.text);

  const highlightMyMessages = (messageSender) => {
    if (user.loggedIn) {
      return user.username == messageSender ? "myMessage" : "";
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

  let myMsg = highlightMyMessages(message.username);
  return (
    <div>
      <div className={"message " + myMsg}>
        <h3>
          {message.username} ~ {dateTime(message)[1]}
          {myMsg && (
            <>
              <button onClick={() => deleteMsg(message)}>Delete</button>
              <button onClick={() => setEditing(!editing)}>
                {editing ? <>Cancel</> : <>Edit</>}
              </button>
            </>
          )}
        </h3>
        {editing ? (
          <>
            <input
              type="text"
              value={editedTxt}
              onChange={(e) => setEditedTxt(e.target.value)}
            />
            <button onClick={editMessage}>Save</button>
          </>
        ) : (
          <h3>{text}</h3>
        )}
      </div>
    </div>
  );
};

export default ChatTxt;
