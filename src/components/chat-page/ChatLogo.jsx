import React from 'react';
import logo from "../../image/Logo3.png"

function ChatBarLogo(){
    return(
    <figure className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center figure" >
    <img 
        src={logo}
        alt="Logo"
        height={100}
        width={200}
        padding={10}
        />
    <h1 className="fw-bold fs-1 bolder ">YAPPA</h1>
    </figure>
    );
}
export default ChatBarLogo;