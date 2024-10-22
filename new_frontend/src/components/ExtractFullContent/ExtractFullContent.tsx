// ExtractFullContent.tsx
import React, { useState, useRef } from 'react';
import './ExtractFullContent.css';
import UploadInterface from '../UploadInterface';
import ExtractFullContentRightPanel_1 from './ExtractFullContentRightPanel_1';
import ExtractFullContentRightPanel_2 from './ExtractFullContentRightPanel_2';
import { useFileContext } from '../FileContext';




interface ExtractFullContentProps {
      isActive: boolean;
      onFileChange: (file: File) => void; 
      apiResponse: any;
}


const ExtractFullContent: React.FC<ExtractFullContentProps> = ({ isActive, onFileChange, apiResponse  }) => {
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                  onFileChange(event.target.files[0]);
            }
      };
      const [showPanel, setShowPanel] = useState(1);  // State to toggle panels
      const togglePanel = () => {
            setShowPanel(showPanel === 1 ? 2 : 1);
      };


      const [leftWidth, setLeftWidth] = useState(70); // Initial width in percentage
      const containerRef = useRef<HTMLDivElement>(null);

      const startResize = (event: React.MouseEvent) => {
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
      };

      const resize = (event: MouseEvent) => {
            if (containerRef.current) {
                  const containerWidth = containerRef.current.getBoundingClientRect().width;
                  const newLeftWidth = ((event.clientX - containerRef.current.getBoundingClientRect().left) / containerWidth) * 100;
                  if (newLeftWidth >= 65 && newLeftWidth <= 72) { // Constrain resizing
                  setLeftWidth(newLeftWidth);
                  }
            }
      };
      const stopResize = () => {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            };


    if (!isActive) return null;

    return (
         
      <div ref={containerRef} className="split-container">
            <div className="ExtractFullContent_left_panel" style={{ width: `${leftWidth}%` }}>
            {apiResponse && (
                <div>
                    <h2>  API Response:</h2>
                    <pre className='ExtractFullContent_api_response'>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
            )}
               
            </div>
            <div className="ExtractFullContent_divider" onMouseDown={startResize}></div>
            <div className="ExtractFullContent_right_panel" style={{ width: `${100 - leftWidth}%` }}>
                   
                  {showPanel === 1 ? (
                    <ExtractFullContentRightPanel_1 onButtonClick={togglePanel} />
                        ) : (
                              <ExtractFullContentRightPanel_2 onButtonClick={togglePanel} />
                  )}
                  <div className="ExtractFullContent_upload_interface">
                        <UploadInterface   onChange={handleFileChange}  />
                  </div>
                  
            </div>
        </div>




            
        
    );
};

export default ExtractFullContent;
