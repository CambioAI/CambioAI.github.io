// ExtractFullContent.tsx
import React, { useState, useRef } from 'react';
import './ExtractKeyValue.css';
import UploadInterface from '../UploadInterface';
import ExtractKeyValueRightPanel from './ExtractKeyValueRightPanel';




interface ExtractKeyValueProps {
      isActive: boolean;
      onFileChange: (file: File) => void; 
      KeyValue_apiResponse: any;
    
      
}


const ExtractKeyValue: React.FC<ExtractKeyValueProps> = ({ isActive, onFileChange, KeyValue_apiResponse }) => {
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
            <div className="ExtractKeyValue_left_panel" style={{ width: `${leftWidth}%` }}>
            {KeyValue_apiResponse && (
                <div>
                    
                    <pre className='ExtractKeyValue_api_response'>{JSON.stringify(KeyValue_apiResponse.output, null, 2)}</pre>
                </div>
            )}
             
            </div>
            <div className="divider" onMouseDown={startResize}></div>
            <div className="ExtractKeyValue_right_panel" style={{ width: `${100 - leftWidth}%` }}>
                  <div className="ExtractKeyValue_right_panel_upper">
                        <ExtractKeyValueRightPanel  />
                  </div>
                  
                   
                  <div className="ExtractKeyValue_upload_interface">
                        <UploadInterface   onChange={handleFileChange}  />
                  </div>
                  
            </div>
        </div>




            
        
    );
};

export default ExtractKeyValue;
