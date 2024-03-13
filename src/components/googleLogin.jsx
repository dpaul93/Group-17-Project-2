import React from 'react'
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = () => {
    return (
        <GoogleLogin
            clientId="648522219346-je2qct38or9hpotv7fpnmrfmbv016e5p.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log("Login Failed.")
            }}
            cookePolicy={"single_host_origin"}
        />
    )
}

export default GoogleSignInButton