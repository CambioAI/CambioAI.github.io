import { useState, useEffect } from 'react';
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
import { FileProvider, LoadingProvider } from './components/FileContext';
import TourComponent from './components/TourComponent';
import axios from 'axios';


const DocumentParsing: React.FC = () => {
  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  
  
  const [file, setFile] = useState<File | null>(null);
  const [FullContent_apiResponse, setFullContent_apiResponse] = useState(null);
  const [KeyValue_apiResponse, setKeyValue_apiResponse] = useState(null);
  const [isTourStarted, setIsTourStarted] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const location = useLocation();

  const steps = [
    { position: { top: '570px', left: '1030px' },
   content: 'Decide what to leave out',
    buttonText: "Got it!",
    arrowPosition :{'--top':'none', '--bottom':'none', '--left':'100% ', '--right':'none' },
    shape: {'--clip-path': ' polygon(0% 0, 0% 100%,100% 50%)'}  ,
    },
  
  
  
  
    { position: { top: '370px', left: '980px' },
   content: 'View parsed content below',
    buttonText: "Got it!",
    arrowPosition :{'--bottom':'none', '--top':'100%', '--left':'10%  ', '--right':'none' },
    shape: {'--clip-path': 'polygon(0 0, 100% 0, 50% 100%)'}  ,
    },
    
    { position: { top: '570px', left: '1200px' },
   content: 'You can download/copy parsed content or redo the task',
    buttonText: "Got it!",
    arrowPosition :{'--bottom':'100%', '--top':'none', '--left':'none  ', '--right':'none' },
    shape: {'--clip-path': 'polygon(0 100%, 100% 100%, 50% 0)'}  ,
    },
    { position: { top: '700px', left: '1200px' },
   content: 'Great job! Now you can upload your doc to start parsing',
    buttonText: "Finish",
    arrowPosition :{'--bottom':'none', '--top':'100%', '--left':'none  ', '--right':'none' },
    shape: {'--clip-path': 'polygon(0 0, 100% 0, 50% 100%)'}  ,
    },
  
  
 
  ];

  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.file) setFile(state.file);
       
    }
    if (location.state && (location.state as any).isTourStarted) {
      setIsTourStarted((location.state as any).isTourStarted);
      setIsTourOpen((location.state as any).isTourStarted);
    }
  }, [location]);
  const handleFileChange = (file: File) => {
      setFile(file);
  };
   


  const input_keys = ["name", "address", "phone", "email"]
  const server_url_keyValues = "http://35.95.52.139:8000/extract"
  const server_url_full = "http://35.95.52.139:8000/parse"
  const api_key = "Cambio2024!"
  const ExtractKeyValuePostServer = async (input_keys: string[], input_descriptions: string[]) => {
    
    if (input_keys.length == 0) {
      alert("You need to have at least one key");
      return;
    }
    if (input_keys[0] == "") {
      alert("You need to have at least one key");
      return;
    }
    let fileToUse = file;
    if (! fileToUse) {
       
      try {
          const response = await fetch(defaultPdfUrl);
          const blob = await response.blob();
          fileToUse = new File([blob], 'defaultfile.pdf', { type: blob.type });
      } catch (error) {
          alert('Error fetching the default file. Please try again.');
          return;
      }
          
      
    }

    // Check file size (e.g., limit to 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (fileToUse.size > MAX_FILE_SIZE) {
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    try {
      // Read and encode the file
      const fileContent = await readFileAsBase64(fileToUse);

      const payload = {
        input_keys: input_keys,
        input_descriptions: input_descriptions,
        file_content: fileContent,
        file_type: "pdf",
      };

      const headers = {
        "X-API-Key": api_key,
        "Content-Type": "application/json"
      };
      console.log("started");
      console.log(input_keys);
      console.log(input_descriptions);
      const response = await axios.post(server_url_keyValues, payload);
      console.log(JSON.stringify(response.data, null, 2));
      setKeyValue_apiResponse(response.data);
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

  const ExtractFullContentPostServer = async () => {
    let fileToUse = file;
    if (! fileToUse) {
       
      try {
          const response = await fetch(defaultPdfUrl);
          const blob = await response.blob();
          fileToUse = new File([blob], 'defaultfile.pdf', { type: blob.type });
      } catch (error) {
          alert('Error fetching the default file. Please try again.');
          return;
      }
          
      
    }

    // Check file size (e.g., limit to 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (fileToUse.size > MAX_FILE_SIZE) {
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    try {
      // Read and encode the file
      const fileContent = await readFileAsBase64(fileToUse);

      const payload = {
        
        file_content: fileContent,
        file_name: fileToUse.name,
      };

      const headers = {
        "X-API-Key": api_key,
        "Content-Type": "application/json"
      };
      console.log("started");
      const response = await axios.post(server_url_full, payload, { headers });
      console.log(JSON.stringify(response.data, null, 2));
      setFullContent_apiResponse(response.data);
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
            return <iframe src={fileUrl} style={{ width: '100%', height: '90vh' }} frameBorder="0"></iframe>;
            } else if (file.type.startsWith('image')) {
            return <img src={fileUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />;
            }
      }
      if (!file && defaultPdfUrl  ) { 
            return <iframe src={defaultPdfUrl} style={{ width: '100%', height: '90vh' }} frameBorder="0"></iframe>;}
          
      if (!file && !defaultPdfUrl) return <p className="no-file-selected">Your uploaded file will be shown here :)</p>;

      
    };



     
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
      <LoadingProvider>
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
            <button onClick={() => setActiveCategory('keyValue')} className={activeCategory === 'keyValue' ? 'active' : ''} >
              Extract Key-Value Pairs Beta
            </button>
          </div>
          <div className="DocumentParsing_category-content">
          <FileProvider ExtractKeyValuePostServer={ExtractKeyValuePostServer} ExtractFullContentPostServer={ExtractFullContentPostServer}>
       
          <ExtractFullContent isActive={activeCategory === 'full'} onFileChange={handleFileChange} FullContent_apiResponse={FullContent_apiResponse} />
          <ExtractTables isActive={activeCategory === 'tables'} onFileChange={handleFileChange} />  
          <ExtractKeyValue isActive={activeCategory === 'keyValue'} onFileChange={handleFileChange} KeyValue_apiResponse={KeyValue_apiResponse} />  
            {/* {renderCategoryContent()} */}

          
          </FileProvider>
              </div>







           
             
        </div>
      </div>
      {isTourOpen && (
            <TourComponent steps={steps} onClose={() => setIsTourOpen(false)} />
           )}
    </LoadingProvider> 
    </div >
    
  );
};

export default DocumentParsing;









