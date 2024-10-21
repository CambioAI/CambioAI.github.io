// ExtractFullContent.tsx
import React, { useState, useRef } from 'react';
import './ExtractTables.css';
import UploadInterface from '../UploadInterface';
import ExtractTablesRightPanel_1 from './ExtractTablesRightPanel_1';
import ExtractTablesRightPanel_2 from './ExtractTablesRightPanel_2';





interface ExtractTablesProps {
      isActive: boolean;
      onFileChange: (file: File) => void; 
}


const ExtractTables: React.FC<ExtractTablesProps> = ({ isActive, onFileChange }) => {
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
            <div className="ExtractTables_left_panel" style={{ width: `${leftWidth}%` }}>
                Left Panel
            </div>
            <div className="ExtractTables_divider" onMouseDown={startResize}></div>
            <div className="ExtractTables_right_panel" style={{ width: `${100 - leftWidth}%` }}>
                   
                  {showPanel === 1 ? (
                    <ExtractTablesRightPanel_1 onButtonClick={togglePanel} />
                        ) : (
                              <ExtractTablesRightPanel_2 onButtonClick={togglePanel} />
                  )}
                  <div className="ExtractTables_upload_interface">
                        <UploadInterface   onChange={handleFileChange}  />
                  </div>
                  
            </div>
        </div>




            
        
    );
};

export default ExtractTables;
