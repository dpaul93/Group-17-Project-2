import React from 'react';
import "../styles/Home.css"
import GoogleSignInButton from './googleLogin'
import { GoogleLogin } from '@react-oauth/google';

function Home() {
    return (
        <div className="header container-fluid">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="row back py-5">
                    <h1 className="col-12 display-1 fw-bold dark text-center"> Yappa</h1>
                    <h5 className="col-12 dark text-center">Instant messaging for chatty people</h5>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <GoogleSignInButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home