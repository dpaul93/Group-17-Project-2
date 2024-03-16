import React from "react";
import ChatBar from "../chat-bar/ChatBar";
import ChatBody from "../chat-body/ChatBody";
import ChatFooter from "../chat-footer/ChatFooter";

const ChatPage = ({ socket }) => {
  return (
    <div className="chat">
      <ChatBar/>
      <div className="chat__main">
        <ChatBody/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};

export default ChatPage;
