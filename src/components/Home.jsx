import React, { useState, useEffect} from 'react';
import "../styles/Home.css";
import axios from 'axios'
import {useGoogleLogin, googleLogout} from '@react-oauth/google'
import GoogleSignInButton from './googleLogin';

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
        {profile ? (
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="row back py-5 text-center">
                    <h1 className="col-12 display-1 fw-bold dark text-center mb-3"> Yappa</h1>
                    <div classname="col-3 d-flex justify-content-center">
                        <img className="img-fluid" src={profile.picture} alt="user image" />
                    </div>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <div>
                        <button className="btn btn-primary col-3" onClick={logOut}>Log out</button>
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