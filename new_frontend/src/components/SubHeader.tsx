import React from 'react';
import './SubHeader.css';
import { useNavigate } from 'react-router-dom';

 

const SubHeader: React.FC  = ( ) => {

    const navigate = useNavigate();
    const navigateToChooseCategory = () => navigate('/');

    
    return (
        <header className="sub_header" >
            <h1 className="sub_header_text_finished" onClick={navigateToChooseCategory}>Sandbox</h1>
            <h1 className="sub_header_text" >Tasks</h1>
            <h1 className="sub_header_text" >API</h1>
            <h1 className="sub_header_text" >Billing</h1>
            <h1 className="sub_header_text" >Settings</h1>

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
