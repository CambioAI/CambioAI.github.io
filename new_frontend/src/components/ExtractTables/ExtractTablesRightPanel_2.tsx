import React from 'react';
import './ExtractTablesRightPanel_2.css';




const ExtractTablesRightPanel_2: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {



      
    return (
      <div>
             
            <div>
                  <button className="ExtractTablesRightPanel_2_extract_button" onClick={onButtonClick}>
                              <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Download.png' className='ExtractTablesRightPanel_2_Dwld_icon' alt='Download_Icon' />    
                              Dwld Tables as Excel</button>
                  <li className="ExtractTablesRightPanel_2_checkbox_list">
                        
                        <header onClick={onButtonClick}>
                              <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Redo.svg' className='ExtractTablesRightPanel_2_redo_icon' alt='Redo_Icon' />  
                              
                              Redo Table Extraction</header>
                         
                         
                  </li>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractTablesRightPanel_2;

