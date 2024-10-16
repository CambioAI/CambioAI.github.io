import React from 'react';
import './ExtractKeyValueRightPanel.css';




// const ExtractKeyValueRightPanel: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
const ExtractKeyValueRightPanel = () => {


    return (
      <div>
            
            {/* <button className="ExtractKeyValue_extract_button" onClick={onButtonClick}>Extract Full Content</button> */}
            <button className="ExtractKeyValue_extract_button">Extract Key-Value</button>
            
            <div>
                  <h2 className="ExtractKeyValue_header">Leave-out Info</h2>
                  <li className="ExtractKeyValue_checkbox_list">

                        <label>
                              <input type="checkbox" /> Personal ID Info
                        </label>
                        
                  </li>
                  <h2 className="ExtractKeyValue_header">Your Keys</h2>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractKeyValueRightPanel;

