import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// const ChatBody = ({ conversationId }) => {
//     const navigate = useNavigate();
//     const { selectedUserId } = useContext(SelectedUserContext);
//     const [conversations, setConversations] = useState({});

// const conversation = conversations[selectedUserId] || [];  
//     return (
//         <>
//         <div className="message__container">
//             {conversation.map((msg, index) => (
//             <div key={index} className={`message__chats ${msg.sender === 'You' ? 'message__sender' : 'message__recipient'}`}>
//                 <p className="sender__name">{msg.sender}</p>
//                 <p>{msg.message}</p>
//             </div>
//             ))}

//         </div>
//         </>
//             );
// };

// export default ChatBody;


const ChatBody = ({messages, typingStatus, lastMessageRef, handleClick}) => { 
    const navigate = useNavigate()
    
  
    const handleLeaveChat = () => {
      localStorage.removeItem("userName")
      navigate("/")
      window.location.reload()
    }
    
    return (
      <>
        <header className='chat__mainHeader'>
            <p>Hangout with Colleagues</p>
            <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
          </header>
  
  
          <div className='message__container' onClick={handleClick}>
            {messages.map(message => (
              message.name === localStorage.getItem("userName") ? (
                <div className="message__chats" key={message.id}>

              <p className='sender__name'>You</p>
              <div className='message__sender'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        ))}

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody