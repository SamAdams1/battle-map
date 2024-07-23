import Axios from "axios";
import React, { useState, useEffect } from "react";
import ChatTxt from "../../components/ChatTxt";

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

  let msgFormat = {};
  const sendMessage = () => {
    if (ws) {
      msgFormat = {
        text: message,
        username: user.username,
        userId: user._id,
        date: getDate(),
        _id: objectId(),
      };
      ws.send(
        JSON.stringify({
          type: "message",
          payload: msgFormat,
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
      body: JSON.stringify(msgFormat),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
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
    fetch("http://localhost:3006/deleteMessage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: msg._id }),
    }).then((response) => {
      console.log(response);
    });
  };

  let chatRooms = ["Germany", "France", "England", "Spain"];
  let lastDate = "";
  return (
    <div>
      <h1>{chatRoom} Chat</h1>
      <div className="flex flex-row w-full">
        <div className="w-1/6 *:w-full mx-2">
          <h3>Channels</h3>
          <button>{chatRoom}</button>
          {chatRooms.map((room) => (
            <>
              <button>{room}</button>
            </>
          ))}
        </div>
        <div className="overflow-y-auto w-full h-80">
          {messages.map((message, index) => (
            <>
              {lastDate != message.date.split(" ~ ")[0] && (
                <div className="flex flex-col items-center bg-slate-50">
                  <h3 className="bg-slate-200 solid border-2 border-slate-800 rounded-md">
                    -{(lastDate = message.date.split(" ~ ")[0])}-
                  </h3>
                </div>
              )}
              <ChatTxt message={message} user={user} deleteMsg={deleteMsg} />
            </>
          ))}
        </div>
        <div className="absolute bottom-0 w-full flex h-20 p-3">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            className="flex-1"
            placeholder={"Message " + chatRoom}
          />
          <button onClick={sendMessage} disabled={!user.loggedIn || !message}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
