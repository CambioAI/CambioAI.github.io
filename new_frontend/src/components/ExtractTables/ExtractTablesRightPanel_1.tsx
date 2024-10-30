import React from 'react';
import './ExtractTablesRightPanel_1.css';




const ExtractTablesRightPanel_1: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {




    return (
      <div>
            <button className="ExtractTablesRightPanel_1_extract_button" onClick={onButtonClick}>
                  <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Download.png' className='ExtractTablesRightPanel_1_Dwld_icon' alt='Download_Icon' />    
                  Extract Tables Only
                  </button>
            <div>
                  <li className="ExtractTablesRightPanel_1_checkbox_list">
                        <h3 className="ExtractTablesRightPanel_1_header">Leave-out Info</h3>

                        <label>
                              <input type="checkbox" /> Personal ID Info
                        </label>
                        
                  </li>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractTablesRightPanel_1;

