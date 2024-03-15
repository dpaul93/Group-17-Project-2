import React from 'react';

function ChatBarProfile({ name, imgURL, LastMessage }){
    console.log(name);
    console.log(imgURL);
    console.log(LastMessage);

    return(
        
        <div className="btn py-2 d-flex card align-item-start position-relative " style={{ width: '380px',height:'100px', padding: '10px',backgroundColor:'#adb5bd' }} > 
            <div className='position-absolute top-0 start-0' style={{width: '100px'}}>
                <img 
                className={"rounded-circle mt-3 circle-img"}
                width={70}
                src={imgURL}
                alt="Profile"
                />
            </div>
            <div className='text-nowrap position-absolute top-1 start-50' style={{width: '200px'}}>
                <h1 className='fw-bold fs-4 lh-base name'>{name} </h1>
                <p className='fs-6'>{LastMessage}</p>
            </div>
        </div>
       
    
        ); 
    
}

export default ChatBarProfile;