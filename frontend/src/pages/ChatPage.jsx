import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ChatTxt from "../../components/ChatTxt";
import { getCurrentDate } from "../../components/BattlePage/forms/dbFuncs";
import { ENDPOINT } from "../../environment";
const wsEndpoint =
  ENDPOINT === "http://localhost:3005"
    ? "ws://localhost:3005/ws"
    : // ? "ws://127.0.0.1:3005/ws"
      "wss://map-backend-7ravbvmifa-nn.a.run.app/ws";

const ChatPage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [chatRoom, setChatRoom] = useState("Main");

  const messagesEndRef = useRef({});

  useEffect(() => {
    getMessages();
    const websocket = new WebSocket(wsEndpoint);
    // const websocket = new WebSocket("ws://127.0.0.1:3005/ws");
    // const websocket = new WebSocket("wss://localhost:8080/ws");

    console.log(wsEndpoint);
    // const websocket = new WebSocket(`${wsEndpoint}/ws`);
    // const websocket = new WebSocket(`wss://localhost:3005/ws`);

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

    // scrollToBottomOnMount();
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      let msgFormat = {
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
      addMsgToDB(msgFormat);
      setMessage("");
    }
  };

  const getMessages = () => {
    fetch(`${ENDPOINT}/chats/messages`)
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

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const objectId = (
    m = Math,
    d = Date,
    h = 16,
    s = (s) => m.floor(s).toString(h)
  ) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

  const addMsgToDB = (msgFormat) => {
    fetch(`${ENDPOINT}/chats/addMessage`, {
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

  const deleteMsg = (index, id) => {
    let bruh = [...messages];

    console.log(bruh[index].text, index);
    console.log(bruh.splice(index, 1));
    console.log("msgs:", messages);
    setMessages(bruh);

    fetch(`${ENDPOINT}/chats/deleteMessage`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
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
    <div className="flex flex-col h-vh]">
      {/* <div className="flex flex-row w-full">
        <div className="w-36 *:w-full px- bg-red-800 overflow-y-auto">
          <h3 className="my-3 text-white">Channels</h3>
          {chatRooms.map((room) => {
            let a = currentRoom(room);
            return (
              <button
                key={room}
                className={a}
                onClick={() => setChatRoom(room)}
                disabled={room != "Main"}
              >
                {room}
              </button>
            );
          })}
        </div> */}
      <div className="overflow-y-auto  w-full h-[86vh] pb-10">
        {messages.map((message, index) => (
          <div key={message._id}>
            {lastDate != message.date.split(" ~ ")[0] && (
              <div className="flex flex-col items-center bg-slate-50 py-2">
                <span className="bg-slate-400 h-[.2rem] w-full translate-y-[1.22rem]"></span>
                <h4 className="bg-slate-200 solid border-2 border-slate-800 rounded-md z-0 p-1 font-medium">
                  {(lastDate = message.date.split(" ~ ")[0])}
                </h4>
              </div>
            )}
            <ChatTxt
              message={message}
              user={user}
              deleteMsg={deleteMsg}
              index={index}
            />
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="mt-20"></div>
      <div className="bg-red-800 flex p-2 fixed bottom-0 w-full h-20">
        <textarea
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
  );
};

export default ChatPage;
