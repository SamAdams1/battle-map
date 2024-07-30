import Axios from "axios";
import React, { useState, useEffect } from "react";
import ChatTxt from "../../components/ChatTxt";
import { getCurrentDate } from "../../components/BattlePage/forms/dbFuncs";

const ChatPage = ({ user }) => {
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
        date: getCurrentDate(),
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

  const currentRoom = (room) => {
    return room == chatRoom ? "bg-yellow-200" : "";
  };
  let chatRooms = ["Main", "Germany", "France", "England", "Spain"];
  let lastDate = "";
  return (
    <div className="flex flex-row w-full">
      <div className="w-72 *:w-full px-2 bg-red-800 overflow-y-auto">
        <h3 className="my-3 text-white">Channels:</h3>
        {chatRooms.map((room) => {
          let a = currentRoom(room);
          return (
            <button key={room} className={a} onClick={() => setChatRoom(room)}>
              {room}
            </button>
          );
        })}
      </div>
      <div className="overflow-y-auto  w-full h-[86vh] ">
        {messages.map((message, index) => (
          <div key={index}>
            {lastDate != message.date.split(" ~ ")[0] && (
              <div className="flex flex-col items-center bg-slate-50 py-2">
                <span className="bg-slate-400 h-[.2rem] w-full translate-y-[1.22rem]"></span>
                <h4 className="bg-slate-200 solid border-2 border-slate-800 rounded-md z-10 p-1 font-medium">
                  {(lastDate = message.date.split(" ~ ")[0])}
                </h4>
              </div>
            )}
            <ChatTxt message={message} user={user} deleteMsg={deleteMsg} />
          </div>
        ))}
      </div>
      <div className="bg-red-800 absolute bottom-0 w-full flex h-20 p-3 pt-0">
        <textarea
          value={message}
          onChange={handleInputChange}
          className="flex-1 w-10"
          placeholder={"Message " + chatRoom}
        />
        <button onClick={sendMessage} disabled={!user.loggedIn || !message}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
