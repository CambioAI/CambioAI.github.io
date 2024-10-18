 
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';
import NoticeContainer from './components/NoticeContainer';
import './DocumentParsing.css';
import ExtractFullContent from './components/ExtractFullContent/ExtractFullContent';
import ExtractKeyValue from './components/ExtractKeyValue/ExtractKeyValue';

const DocumentParsing: React.FC = () => {
  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  
  
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
      setFile(file);
  };
  
  
  const renderPreview = () => {
      
      if (file) {
            const fileUrl = URL.createObjectURL(file);
            if (file.type.startsWith('application/pdf')) {
            return <iframe src={fileUrl} style={{ width: '100%', height: '500px' }} frameBorder="0"></iframe>;
            } else if (file.type.startsWith('image')) {
            return <img src={fileUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />;
            }
      }
      if (defaultPdfUrl  ) { 
            return <iframe src={defaultPdfUrl} style={{ width: '100%', height: '500px' }} frameBorder="0"></iframe>;}
          
      if (!file) return <p className="no-file-selected">Your uploaded file will be shown here :)</p>;

      
    };






    const [activeCategory, setActiveCategory] = useState<'full' | 'tables' | 'keyValue'>('full');
    const renderCategoryContent = () => {
      switch (activeCategory) {
        // case 'full':
        //   return <p>Full content parsing options and details will go here.</p>;
        case 'tables':
          return <p>Table extraction options and details will go here.</p>;
          // case 'keyValue':
          //   return <ExtractKeyValue />;
        default:
          return null;
      }
    };









  return (
    <div className="DocumentParsing">
      <Header title="AnyParser" />
      <SubHeader title="Sandbox" />
      <div className="DocumentParsing_container">
        <div className="DocumentParsing_left_panel">
          <div className="left-header">
            <h2>File Outlook</h2>
          </div>
           
          {renderPreview()}
        </div>
        <div className="DocumentParsing_right_panel">
          <div className="DocumentParsing_FULL">
            <NoticeContainer />
          </div>
          
            






     
          <div className="DocumentParsing_category-buttons">
            <button onClick={() => setActiveCategory('full')} className={activeCategory === 'full' ? 'active' : ''}>
              Extract Full Content
            </button>
            <button onClick={() => setActiveCategory('tables')} className={activeCategory === 'tables' ? 'active' : ''}>
              Extract Tables Only
            </button>
            <button onClick={() => setActiveCategory('keyValue')} className={activeCategory === 'keyValue' ? 'active' : ''}>
              Extract Key-Value Pairs Beta
            </button>
          </div>
          <div className="DocumentParsing_category-content">
          <ExtractFullContent isActive={activeCategory === 'full'} onFileChange={handleFileChange} />
          <ExtractKeyValue isActive={activeCategory === 'keyValue'} onFileChange={handleFileChange} />  
            {renderCategoryContent()}
          </div>








           
             
        </div>
      </div>
    </div >
  );
};

export default DocumentParsing;
