import React, { useEffect, useState } from "react";
import "./Chat.css";
import api from "../../api";

const Chat = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    api
      .get("/chat")
      .then((res) => {
        setChats(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCreateChat = () => {
    let data = {
      title: "New Chat",
      description: "This is a description",
    };

    api
      .post("/chat/create", data)
      .then((res) => {
        console.log("Res", res.data);
        setChats([res.data, ...chats]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="chat-container">
      <div className="chat-list">
        <div className="new-chat" onClick={handleCreateChat}>
          + New Chat
        </div>
        <div className="chat-lists">
          <span>Previous chats</span>
          <ul>
            {chats.map((item) => (
              <li key={item?.chat_id}>{item?.title}</li>
            ))}

            {/* <li className="active">chat 01</li> */}
          </ul>
        </div>
      </div>
      <div className="chat-screen">chat screen</div>
    </div>
  );
};

export default Chat;
