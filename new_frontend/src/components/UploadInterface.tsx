// UploadInterface.tsx

import React, { ChangeEvent, DragEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './UploadInterface.css';

interface UploadInterfaceProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ onChange }) => {
  const { isAuthenticated } = useAuth0();
  const [dragOver, setDragOver] = useState(false);

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (!isAuthenticated) {
      alert("You must be logged in to upload a file.");
      e.preventDefault(); // Prevents the file dialog from opening
    }
  };

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
    if (!isAuthenticated) {
      alert("Please login to upload a file");
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
      alert("Please login to upload a file");
       
      e.target.value = ''; // Reset the file input
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
     
    const mockEvent = {
      target: {
        files: [file],
        value: ''
      },
      preventDefault: () => {},
      stopPropagation: () => {}
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(mockEvent);
  };

  return (
    <div className="upload-interface"
         onDragEnter={handleDragEnter}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
    >
      <input 
        type="file" 
        onChange={handleFileInputChange} 
        accept="image/jpeg, image/png, .pdf, .pptx, .ppt, .doc, .docx, .xlsx" 
        style={{ display: 'none' }} 
        id="file-input" 
        disabled={!isAuthenticated}
      />
      <label 
        htmlFor="file-input" 
          className={`upload-button ${!isAuthenticated ? 'disabled' : ''}`}
        onClick={handleLabelClick}
      >
        <div className={dragOver ? "upload-box dragover" : "upload-box"}>
          <img src='/Sanbox Icon and images/Sanbox Icon and images/Upload icons.png' className='UploadInterface_upload-icon' />
          <h2 className='UploadInterface_description'>PDF, PNG, JPEG, JPG, PPT, and DOCX</h2>
          <div className="UploadInterface_header">
            <h1>Upload</h1>
          </div>
          <div className='UploadInterface_file-description'>
            <p>{isAuthenticated 
              ? "Click/Drag and drop file here or Just paste screenshot" 
              : <div className='UploadInterface_login-message'>
                Login to upload a file
              </div>}
            </p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default UploadInterface;
