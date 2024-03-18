import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";
import axios from 'axios'
import {useGoogleLogin, googleLogout} from '@react-oauth/google'

function Home() {

const [ user, setUser ] = useState([]);
const [ profile, setProfile ] = useState([]);

const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

useEffect(
    () => {
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
    },
    [ user ]
);

// log out function to log the user out of google and set the profile array to null
const logOut = () => {
    googleLogout();
    setProfile(null);
};

return (
    <div className="header container-fluid">
        {profile.name ? (
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="row back py-5 text-center justify-content-center">
                    <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
                    <div classname="col-3 d-flex justify-content-center">
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
                        <   button className="col-12 btn btn-danger" onClick={logOut}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
        <div className="header container-fluid">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="row back py-5">
                    <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
                    <h5 className="col-12 dark text-center">Instant messaging for chatty people</h5>
                    <div className="col-12 d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={() => login()}>Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>

);
}

export default Home