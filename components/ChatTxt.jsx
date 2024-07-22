import React, { useState } from "react";

const ChatTxt = ({ message, user, deleteMsg }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(message.text);

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
    setEdit(false);
    message.text = text;
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
              <button onClick={() => setEdit(true)}>Edit</button>
            </>
          )}
        </h3>
        {edit ? (
          <>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
