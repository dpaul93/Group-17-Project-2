import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChatBody = ({ conversationId }) => {
    const navigate = useNavigate();
    const { selectedUserId } = useContext(SelectedUserContext);
    const [conversations, setConversations] = useState({});

const conversation = conversations[selectedUserId] || [];  
    return (
        <>
        <div className="message__container">
            {conversation.map((msg, index) => (
            <div key={index} className={`message__chats ${msg.sender === 'You' ? 'message__sender' : 'message__recipient'}`}>
                <p className="sender__name">{msg.sender}</p>
                <p>{msg.message}</p>
            </div>
            ))}
            
        </div>
        </>
            );
  
};

export default ChatBody;