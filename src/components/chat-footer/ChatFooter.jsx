import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return <div className="chat__footer">...</div>;
};

export default ChatFooter;

// import React from 'react';
// import ChatBar from './ChatBar';
// import ChatBody from './ChatBody';
// import ChatFooter from './ChatFooter';

// const ChatPage = ({ socket }) => {
//   return (
//     <div className="chat">
//       <ChatBar />
//       <div className="chat__main">
//         <ChatBody />
//         <ChatFooter />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;