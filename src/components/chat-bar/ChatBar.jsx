import React from 'react';
//import logo from "../../image/Logo.png"
import contactsList from "./contactsList"
import ChatBarLogo from "./ChatLogo"
import ChatBarProfile from "./ChatProfile"

export default function ChatBar(){
    console.log("Place1",contactsList);
    return(
        <div className="chatBar">
            <ChatBarLogo />
            <div className="container-md btn py-2 card position-fixed" style={{ width: '400px',height:'800px', padding: '10px', backgroundColor:'#495057' }} >
            {contactsList.map(contact => (
                <ChatBarProfile 
                    key={contact.id}
                    name={contact.name}
                    imgURL={contact.imgURL}
                    LastMessage={contact.LastMessage}
                />
            ))}
            </div>
        </div>
    );

}