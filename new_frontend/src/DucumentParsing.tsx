import { useState   } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';
import NoticeContainer from './components/NoticeContainer';
import './DocumentParsing.css';
import ExtractFullContent from './components/ExtractFullContent/ExtractFullContent';
import ExtractKeyValue from './components/ExtractKeyValue/ExtractKeyValue';
import ExtractTables from './components/ExtractTables/ExtractTables';
import { FileProvider } from './components/FileContext';
import axios from 'axios';


const DocumentParsing: React.FC = () => {
  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  
  
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
      setFile(file);
  };


  const input_keys = ["name", "address", "phone", "email"]
  const server_url = "http://35.87.83.173/extract"
  const api_key = "Cambio2024!"
  const sendFileToServer = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    // Check file size (e.g., limit to 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    try {
      // Read and encode the file
      const fileContent = await readFileAsBase64(file);

      const payload = {
        input_keys: input_keys,
        file_content: fileContent,
        file_name: file.name,
      };

      const headers = {
        "X-API-Key": api_key,
        "Content-Type": "application/json"
      };
      console.log("started");
      const response = await axios.post(server_url, payload, { headers });
      console.log(JSON.stringify(response.data, null, 2));
      // Handle successful response (e.g., update state, show success message)
    } catch (error) {
      console.error('Error uploading file:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert('An error occurred while uploading the file. Please try again.');
      }
    }
  };

  // Helper function to read file as base64
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Extract the base64 string (remove the data URL prefix)
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
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



    const location = useLocation();
    const initialCategory = location.state?.category || 'full';


    const [activeCategory, setActiveCategory] = useState<'full' | 'tables' | 'keyValue'>(initialCategory);
    // const renderCategoryContent = () => {
    //   switch (activeCategory) {
    //     // case 'full':
    //     //   return <p>Full content parsing options and details will go here.</p>;
    //     case 'tables':
    //       return <p>Table extraction options and details will go here.</p>;
    //       // case 'keyValue':
    //       //   return <ExtractKeyValue />;
    //     default:
    //       return null;
    //   }
    // };









  return (
    
    <div className="DocumentParsing">
      <Header   />
      <SubHeader   />
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
          
            






          <div className="DocumentParsing_category_header ">
            <h2>Parse Documents</h2>
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
          <FileProvider sendFileToServer={sendFileToServer}>
       
          <ExtractFullContent isActive={activeCategory === 'full'} onFileChange={handleFileChange} />
          <ExtractTables isActive={activeCategory === 'tables'} onFileChange={handleFileChange} />  
          <ExtractKeyValue isActive={activeCategory === 'keyValue'} onFileChange={handleFileChange}   />  
            {/* {renderCategoryContent()} */}

          
          </FileProvider>
              </div>







           
             
        </div>
      </div>
    </div >
  );
};

export default DocumentParsing;









