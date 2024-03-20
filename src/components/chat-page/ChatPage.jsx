import React, { useEffect, useState, useRef } from "react";
import ChatBar from "../chat-bar/ChatBar";
import ChatBody from "../chat-body/ChatBody";
import ChatFooter from "../chat-footer/ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
    console.log("justSent-MessageResponse");
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
    console.log("justSent-TypingResponse");
  }, [typingStatus])

  // scroll function

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleClick = () => {
    setTypingStatus(!typingStatus) 
  }

  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className="chat__main" onClick={handleClick}>
      <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};

export default ChatPage;
