import React from 'react';
import './Header.css';


type HeaderProps = {
    title: string; 
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="main_header">
            <h1>{title}</h1>
            {/* <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav> */}
        </header>
    );
};

export default Header;
