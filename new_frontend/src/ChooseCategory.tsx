// src/components/NewPage.tsx
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';

const ChooseCategory: React.FC = () => {
  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  // Modify this accordingly
  
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
    }
  };
  
  
  const renderPreview = () => {
      if (defaultPdfUrl) { 
        return <iframe src={defaultPdfUrl} style={{ width: '100%', height: '500px' }} frameBorder="0"></iframe>;}
      if (!file) return <p className="no-file-selected">Your uploaded file will be shown here :)</p>;
  
      const fileUrl = URL.createObjectURL(file);
      if (file.type.startsWith('application/pdf')) {
          return <iframe src={fileUrl} style={{ width: '100%', height: '500px' }} frameBorder="0"></iframe>;
      } else if (file.type.startsWith('image')) {
          return <img src={fileUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />;
      }
    };
  return (
    <div className="App">
      <Header title="AnyParser" />
      <SubHeader title="Sandbox" />
      <div className="container">
        <div className="left-panel">
          <div className="left-header">
            <h2>File Outlook</h2>
          </div>
           
          {renderPreview()}
        </div>
        <div className="right-panel">
          {/* Add components similar to App.tsx */}
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
