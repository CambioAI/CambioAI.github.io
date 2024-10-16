import React from 'react';
import './ExtractFullContentRightPanel_1.css';




const ExtractFullContentRightPanel_1: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {




    return (
      <div>
            <button className="ExtractFullContent_extract_button" onClick={onButtonClick}>Extract Full Content</button>
            <div>
                  <li className="ExtractFullContent_checkbox_list">

                        <label>
                              <input type="checkbox" /> Personal ID Info
                        </label>
                        <label>     
                              <input type="checkbox" /> Page Number
                        </label>
                        <label>
                              <input type="checkbox" /> Footnote
                        </label>
                        <label>
                              <input type="checkbox" /> Header & Footers
                        </label>
                        <label>
                              <input type="checkbox" /> Tables
                        </label>
                        <label>
                              <input type="checkbox" /> Charts & Figures
                        </label>
                  </li>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractFullContentRightPanel_1;

