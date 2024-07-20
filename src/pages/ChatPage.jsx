import Axios from "axios";
import React, { useState, useEffect } from "react";

const ChatPage = ({ user }) => {
  const getMessages = () => {
    fetch("http://localhost:3006/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response bad");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    getMsgData();

    const websocket = new WebSocket("ws://127.0.0.1:8080");

    websocket.onopen = () => {
      console.log("WebSocket is connected");
      // Generate a unique client ID
      const id = Math.floor(Math.random() * 1000);
      setClientId(id);
    };

    websocket.onmessage = (evt) => {
      const message = evt.data;
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
          clientId: clientId,
        })
      );
      setMessage("");
      addToMsgDB();
    }
  };

  const getMsgData = () => {
    fetch("http://localhost:3006/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response bad");
        }
        return response.json();
      })
      .then((data) => {
        data = data.map((msg, index) => {
          return data[index]["message"];
        });
        console.log(data);
        setMessages(data);
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  };

  const addToMsgDB = () => {
    fetch("http://localhost:3006/addMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Chat - Client {clientId}</h1>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={getMessages}>test</button>
    </div>
  );
};

export default ChatPage;
