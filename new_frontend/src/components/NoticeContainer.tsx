import React from 'react';
import './NoticeContainer.css';

const NoticeContainer: React.FC = () => {
    return (
      <div className="notice-container">
      <div className="notice">
    
        <p>We process only the first 10 pages of files up to 10MB in size, and all data is cleared upon page refresh in Sandbox. For details on our no-storage policy, please refer to AnyParser's privacy policy.</p>
      </div>
      <div className="notice-button"> 
        <button className="full-access-button">FULL ACCESS</button>
        </div>
      </div>
    );
};


 


export default NoticeContainer;
