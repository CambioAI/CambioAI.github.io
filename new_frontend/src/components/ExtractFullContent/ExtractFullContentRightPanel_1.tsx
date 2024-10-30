import React from 'react';
import './ExtractFullContentRightPanel_1.css';
import { useFileContext } from '../FileContext';



const ExtractFullContentRightPanel_1: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {


      const { ExtractFullContentPostServer } = useFileContext();
      const handleButtonClick = () => {
            ExtractFullContentPostServer (); // Calls the ExtractFullContent function
            onButtonClick(); // Calls the onButtonClick function passed as a prop
        }

    return (
      <div>
             
                  {/* <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Download.png' class='icon' alt='Download_Icon' />   */}
                  <button className="ExtractFullContent_extract_button" onClick={handleButtonClick}  >
                        <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Download.png' className='ExtractFullContent_Dwld_icon' alt='Download_Icon' />  
                        Extract Full Content

                  </button>
           
            <div>
                  <li className="ExtractFullContent_checkbox_list">
                        <h3 className="ExtractFullContent_header">Leave-out Info</h3>
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

