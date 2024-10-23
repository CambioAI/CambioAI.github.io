import { useEffect, useState  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';
import NoticeContainer from './components/NoticeContainer';
import './ChooseCategory.css';
import TourComponent from './components/TourComponent';
import { useTour } from './components/TourContext';

const ChooseCategory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTourStarted, setIsTourStarted] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const steps = [
    { position: { top: '170px', left: '200px' },
   content: 'The original documents will be shown here',
    buttonText: "Got it!",
    arrowPosition :{'--top':'100%', '--bottom':'none', '--left':'10%', '--right':'none' },
    shape: {'--clip-path': 'polygon(0 0, 100% 0, 50% 100%)'}  ,
    },
  
  
  
  
    { position: { top: '950px', left: '780px' },
   content: 'Choose your parsing method',
    buttonText: "Got it!",
    arrowPosition :{'--bottom':'100%', '--top':'none', '--left':'10%  ', '--right':'none' },
    shape: {'--clip-path': 'polygon(0 100%, 100% 100%, 50% 0)'}  ,
    },

    
  
  
 
  ];
   
  useEffect(() => {
    // Check if there is a file passed in the location state
    if (location.state && (location.state as any).file) {
      setFile((location.state as any).file);
    }
    if (location.state && (location.state as any).isTourStarted) {
      setIsTourStarted((location.state as any).isTourStarted);
      setIsTourOpen((location.state as any).isTourStarted);
    }
  }, [location]);

  const handleCategoryClick = (category: string) => {
     
    navigate('/documentParsing', { state: { file, category, isTourStarted } });
  };

  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  
  
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
    }
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
      if (!file && defaultPdfUrl) { 
        return <iframe src={defaultPdfUrl} style={{ width: '100%', height: '90vh' }} frameBorder="0"></iframe>;}
      if (!file && !defaultPdfUrl) return <p className="no-file-selected">Your uploaded file will be shown here :)</p>;
      
    };

  return (
    <div className="ChooseCategory">
      <Header  />
      <SubHeader  />
      <div className="ChooseCategory_container">
        <div className="ChooseCategory_left_panel">
          <div className="left-header">
            <h2>File Outlook</h2>
          </div>
           
          {renderPreview()} 
        </div>
        <div className="ChooseCategory_right_panel">
          <NoticeContainer  />
          <div className="right-header" >
            <h1 className="ChooseCategory_title">Parse Documents</h1>
            <p className="ChooseCategory_description">Choose a category to view tailored instructions.</p>
            <p className="ChooseCategory_description">Editing options will be available for all categories once your tasks is set up.</p>  
          </div>

          <div className="ChooseCategory-buttons"> 
            <button className="ChooseCategory-button" onClick={() => handleCategoryClick('full')}>
              <img src=" \Sanbox Icon and images\Sanbox Icon and images\extract full content illustration.png"  className="ChooseCategory-button-image"/>
              <h2 className="ChooseCategory-button-title">Extract Full Content</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>
            </button>

            <button className="ChooseCategory-button" onClick={() => handleCategoryClick('tables')}>
              <img src=" \Sanbox Icon and images\Sanbox Icon and images\extract table illustration.png" className="ChooseCategory-button-image" />
              <h2 className="ChooseCategory-button-title">Extract Tables Only</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>

            </button>

            <button className="ChooseCategory-button" onClick={() => handleCategoryClick('keyValue')}>
              <img src=" \Sanbox Icon and images\Sanbox Icon and images\Parse illustration.png" className="ChooseCategory-button-image"/>
              <h2 className="ChooseCategory-button-title">Extract Key-Value Pairs</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>




            </button>

             
          </div>

        </div>
        
      </div>
      {isTourOpen && (
            <TourComponent steps={steps} onClose={() => setIsTourOpen(false)} />
           )}
    </div>
  );
};

export default ChooseCategory;
