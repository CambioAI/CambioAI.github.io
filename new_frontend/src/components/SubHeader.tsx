import React from 'react';
import './SubHeader.css';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    title: string; 
};

const SubHeader: React.FC<HeaderProps> = ({ title }) => {

    const navigate = useNavigate();
    const navigateToChooseCategory = () => navigate('/');

    
    return (
        <header className="sub_header" onClick={navigateToChooseCategory}>
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

export default SubHeader;
