import React from 'react';
import './NoticeContainer.css';

const NoticeContainer: React.FC = () => {
    return (
      <div className="NoticeContainer_container">
        <div className="NoticeContainer_notice">
      
          <p>We process only the first 10 pages of files up to 10MB in size, and all data is cleared upon page refresh in Sandbox. For details on our no-storage policy, please refer to AnyParser's privacy policy.</p>
        </div>
          
          <button className="full-access-button">Full Access</button>
         
      </div>
    );
};


 


export default NoticeContainer;
