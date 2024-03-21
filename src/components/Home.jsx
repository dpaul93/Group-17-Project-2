// import React, { useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import "../styles/Home.css";
// import axios from 'axios'
// import {useGoogleLogin, googleLogout} from '@react-oauth/google'

// function Home() {

// const [ user, setUser ] = useState([]);
// const [ profile, setProfile ] = useState([]);

// const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log('Login Failed:', error)
// });

// useEffect(
//     () => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     },
//     [ user ]
// );

// // log out function to log the user out of google and set the profile array to null
// const logOut = () => {
//     googleLogout();
//     setProfile(null);
// };

// return (
//     <div className="header container-fluid">
//         {profile.name ? (
//             <div className="d-flex justify-content-center align-items-center h-100">
//                 <div className="row back py-5 text-center justify-content-center">
//                     <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
//                     <div classname="col-3 d-flex justify-content-center">
//                         <img className="img-fluid" src={profile.picture} alt="user image" />
//                     </div>
//                     <h3 className="display-5">{profile.name}</h3>
//                     <p className="lead">{profile.email}</p>
//                     <div className="row col-6 justify-content-between">
//                         <div className=" mx-auto col-4">
//                             <Link to="/Chat">
//                                 <button className="col-12 btn btn-primary">Enter the chat!</button>
//                             </Link>
//                         </div>
//                         <div className="mx-auto col-4">
//                         <   button className="col-12 btn btn-danger" onClick={logOut}>Log out</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         ) : (
//         <div className="header container-fluid">
//             <div className="d-flex justify-content-center align-items-center h-100">
//                 <div className="row back py-5">
//                     <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
//                     <h5 className="col-12 dark text-center">Instant messaging for chatty people</h5>
//                     <div className="col-12 d-flex justify-content-center mt-3">
//                     <button className="btn btn-primary" onClick={() => login()}>Sign in with Google</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )}
//     </div>

// );
// }

// import React, {useState} from 'react'
// import {useNavigate} from "react-router-dom"

// const Home = ({socket}) => {
//     const navigate = useNavigate()
//     const [userName, setUserName] = useState("")

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         localStorage.setItem("userName", userName)
//         socket.emit("newUser", {userName, socketID: socket.id})
//         navigate("/chat")
//     }
//   return (
//     <form className='home__container' onSubmit={handleSubmit}>
//         <h2 className='home__header'>Sign in to Open Chat</h2>
//         <label htmlFor="username">Username</label>
//         <input type="text" 
//         minLength={6} 
//         name="username" 
//         id='username'
//         className='username__input' 
//         value={userName} 
//         onChange={e => setUserName(e.target.value)}
//         />
//         <button className='home__cta'>SIGN IN</button>
//     </form>
//   )
// }

// export default Home

import React, { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import io from 'socket.io-client';
import logo from '../image/yappa_logo.png'

// Create a context to hold the socket instance
const SocketContext = createContext();

function Home() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [socket, setSocket] = useState(null); // Initialize socket state

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    // Function for logging in via Google
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        // Initialize socket when user profile is available
        if (profile.name) {
            const newSocket = io('https://calm-scrubland-96218-01850c0a6077.herokuapp.com/');
            setSocket(newSocket);

            // Clean up socket connection on component unmount
            return () => newSocket.disconnect();
        }
    }, [profile.name]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <SocketContext.Provider value={socket}>
            <div className="header container-fluid">
                {/* If a profile is logged in, a limited profile for the user is shown rather than the main landing page */}
                {profile.name ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="row back py-5 text-center justify-content-center">
                            <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
                            <div className="col-3 d-flex justify-content-center">
                                <img className="img-fluid" src={profile.picture} alt="user image" />
                            </div>
                            <h3 className="display-5">{profile.name}</h3>
                            <p className="lead">{profile.email}</p>
                            <div className="row col-6 justify-content-between">
                                <div className=" mx-auto col-4">
                                    <Link to="/Chat">
                                        <button className="col-12 btn btn-primary">Enter the chat!</button>
                                    </Link>
                                </div>
                                <div className="mx-auto col-4">
                                    <button className="col-12 btn btn-danger" onClick={logOut}>Log out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // If no profile is logged in, the main landing page for the site is shown, including the app logo and a button with a prompt to sign in via Google
                    <div className="header container-fluid">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="row col-6 back justify-content-center py-5">
                                <div className="col-9 mb-3">
                                    <img src={logo} className="img-fluid logo h-100" />
                                </div>
                                <h5 className="col-12 dark text-center">Instant messaging for chatty people</h5>
                                <div className="col-12 d-flex justify-content-center mt-3">
                                    <button className="btn btn-primary" onClick={() => login()}>Sign in with Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SocketContext.Provider>
    );
}

// A custom hook to use the socket instance
export function useSocket() {
    return useContext(SocketContext);
}

export default Home;
