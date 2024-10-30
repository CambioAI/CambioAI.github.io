import React from 'react';
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

 

const Header: React.FC  = ( ) => {
    const { isAuthenticated } = useAuth0();
    return (
        
        <header className="main_header">
            <div className="main_header_content">
                <h1 className="main_header_first_half">Any</h1>
                <h1 className="main_header_second_half">Parser</h1>
            </div>
        
            {isAuthenticated ? <LogoutButton /> : <LoginButton  />}
        </header>
      
    );
};

export default Header;
