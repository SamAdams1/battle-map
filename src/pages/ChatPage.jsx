import Axios from "axios";
import React, { useState, useEffect } from "react";

const ChatPage = ({ user, getDate }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [chatRoom, setChatRoom] = useState("Main");

  useEffect(() => {
    getMessages();

    const websocket = new WebSocket("ws://127.0.0.1:8080");

    websocket.onopen = () => {
      console.log("WebSocket is connected");
    };

    websocket.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    websocket.onclose = () => {
      console.log("WebSocket is closed");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);
  let compiledMsg = {};
  const sendMessage = () => {
    if (ws) {
      compiledMsg = {
        text: message,
        username: user.username,
        userId: user._id,
        date: getDate(),
        _id: objectId(),
      };
      ws.send(
        JSON.stringify({
          type: "message",
          payload: compiledMsg,
        })
      );
      addMsgToDB();
      setMessage("");
    }
  };

  const getMessages = () => {
    fetch("http://localhost:3006/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response bad");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  };

  const objectId = (
    m = Math,
    d = Date,
    h = 16,
    s = (s) => m.floor(s).toString(h)
  ) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

  const addMsgToDB = () => {
    fetch("http://localhost:3006/addMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(compiledMsg),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const highlightMyMessages = (messageSender) => {
    if (user.loggedIn) {
      return user.username == messageSender ? "myMessage" : "";
    }
    return "";
  };

  const dateTime = (message) => {
    let date = message.date;
    return date.split("~");
  };

  const deleteMsg = (msg) => {
    console.log(msg);
    // console.log(messages);
    // remove messsage from client variable
    setMessages(
      messages.filter((msgItem) => {
        return msgItem._id != msg._id;
      })
    );
    fetch("http://localhost:3006/deleteMsg", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: msg._id }),
    }).then((response) => {
      console.log(response);
    });
  };

  let lastDate = "";
  return (
    <div>
      <h1>{chatRoom} Chat</h1>
      <div className="chatDisplay">
        {messages.map((message, index) => (
          <div key={index}>
            {lastDate != dateTime(message)[0] && (
              <h2>-{(lastDate = dateTime(message)[0])}-</h2>
            )}
            <div className={"message " + highlightMyMessages(message.username)}>
              <h3>
                {message.username} ~ {dateTime(message)[1]}
                {highlightMyMessages(message.username) && (
                  <button onClick={() => deleteMsg(message)}>Delete</button>
                )}
              </h3>
              <h3>{message.text}</h3>
            </div>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={sendMessage} disabled={!user.loggedIn}>
        Send Message
      </button>
      <button onClick={() => console.log(messages)}>test</button>
    </div>
  );
};

export default ChatPage;
