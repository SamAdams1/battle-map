import Axios from "axios";
import React, { useState, useEffect } from "react";

const ChatPage = ({ user, getDate }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");

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

  const sendMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "message",
          payload: message,
          clientId: user.username,
          date: getDate(),
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

  const addMsgToDB = () => {
    fetch("http://localhost:3006/addMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        username: user.username,
        date: getDate(),
      }),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Chat</h1>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <h2>
            {message.user} - {message.date}
          </h2>
          <h3>{message.message}</h3>
        </div>
      ))}
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={sendMessage} disabled={!user.loggedIn}>
        Send Message
      </button>
      <button onClick={() => console.log(messages)}>test</button>
    </div>
  );
};

export default ChatPage;
