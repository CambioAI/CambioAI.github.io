import React, { useState } from 'react';
import './LoginButton.css';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return null;  // If authenticated, render nothing.
    }

    return (
        <button className="login_button" onClick={() => loginWithRedirect()}>
            Login
        </button>
    );
};

export default LoginButton;