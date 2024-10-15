// UploadInterface.tsx

import React, { ChangeEvent, DragEvent, useState } from 'react';
import './UploadInterface.css';

interface UploadInterfaceProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ onChange }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const mockEvent = {
        target: {
          files: [file],
          value: ''
        },
        preventDefault: () => {},
        stopPropagation: () => {}
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(mockEvent); // Reuse the onChange prop function with a mock event carrying the file.
    }
  };

  return (
    <div className="upload-interface"
         onDragEnter={handleDragEnter}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
    >
      <input type="file" onChange={onChange} accept="image/jpeg, image/png, .pdf, .pptx, .ppt, .doc, .docx, .xlsx" style={{ display: 'none' }} id="file-input" />
      <label htmlFor="file-input" className="upload-button">
        <div className={(dragOver ? "upload-box dragover" : "upload-box")}>
          <div className="header">
            <h1>Upload</h1>
          </div>
          <div className="icon-container">
            <div className="icon pdf"><span>PDF</span></div>
            <div className="icon ppt"><span>PPT</span></div>
            <div className="icon word"><span>WORD</span></div>
            <div className="icon image"><span>IMG</span></div>
          </div>
          <p>Click/Drag and drop file here or Just paste screenshot</p>
        </div>
      </label>
    </div>
  );
};

export default UploadInterface;
