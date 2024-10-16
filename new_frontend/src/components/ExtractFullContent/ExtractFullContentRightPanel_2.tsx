import React from 'react';
import './ExtractFullContentRightPanel_2.css';




const ExtractFullContentRightPanel_2: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {



      
    return (
      <div>
             
            <div>
                  <li className="ExtractFullContentRightPanel_2_checkbox_list">

                        <header onClick={onButtonClick}>Redo Doc Parsing</header>
                        <header onClick={onButtonClick}>Download Markdown</header>
                        <header onClick={onButtonClick}>Copy Full Content</header>
                  </li>
                  
            </div>
      
      </div>
      
    );
}

export default ExtractFullContentRightPanel_2;

