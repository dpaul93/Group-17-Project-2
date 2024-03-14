import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChatBody = ({ conversationId }) => {
    const navigate = useNavigate();
    const { selectedUserId } = useContext(SelectedUserContext);
    const [conversations, setConversations] = useState({});

};

const conversation = conversations[selectedUserId] || [];  
return (
    <div className='message__box'>
        <div>

        </div> 
    </div>
  )
  


export default ChatBody;