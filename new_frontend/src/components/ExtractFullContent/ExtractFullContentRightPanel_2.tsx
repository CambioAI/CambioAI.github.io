import React from 'react';
import './ExtractFullContentRightPanel_2.css';




const ExtractFullContentRightPanel_2: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {



      
    return (
      <div>
             
            <div>
            <button className="ExtractFullContentRightPanel_2_extract_button" onClick={onButtonClick}>
                        <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Download.png' className='ExtractFullContentRightPanel_2_Dwld_icon' alt='Download_Icon' />  
                        Dwld as Markdown

                  </button>
                  <li className="ExtractFullContentRightPanel_2_checkbox_list">

                  <header onClick={onButtonClick}>
                              <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Redo.svg' className='ExtractFullContentRightPanel_2_redo_icon' alt='Redo_Icon' />  
                              
                              Redo Table Extraction
                  </header>
                  <header onClick={onButtonClick}>
                              <img src='/Sanbox Icon and images\Sanbox Icon and images\RightPanel\Copy.svg' className='ExtractFullContentRightPanel_2_copy_icon' alt='Copy_Icon' />  
                              
                              Copy Full Content
                  </header>
                  </li>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractFullContentRightPanel_2;
