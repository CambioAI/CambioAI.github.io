 
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';
import NoticeContainer from './components/NoticeContainer';
import './ChooseCategory.css';



const ChooseCategory: React.FC = () => {


  const navigate = useNavigate();
  const navigateToDocumentParsing = () => navigate('/documentParsing');


  // Assuming the URL of your default PDF
  const defaultPdfUrl = "/sampleFiles/samplePDF.pdf";  
  
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
    <div className="ChooseCategory">
      <Header title="AnyParser" />
      <SubHeader title="Sandbox" />
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
            <h1>Parse Documents</h1>
            <p className="ChooseCategory_description">Choose a category to view tailored instructions.</p>
            <p className="ChooseCategory_description">Editing options will be available for all categories once your tasks is set up.</p>  
          </div>

          <div className="ChooseCategory-buttons"> 
            <button className="ChooseCategory-button" onClick={navigateToDocumentParsing}>
              <img src="testingLogo.png"  className="ChooseCategory-button-image"/>
              <h2 className="ChooseCategory-button-title">Extract Full Content</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>
            </button>

            <button className="ChooseCategory-button">
              <img src="testingLogo.png" className="ChooseCategory-button-image" />
              <h2 className="ChooseCategory-button-title">Extract Tables Only</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>

            </button>

            <button className="ChooseCategory-button">
              <img src="testingLogo.png" className="ChooseCategory-button-image"/>
              <h2 className="ChooseCategory-button-title">Extract Key-Value Pairs</ h2>
              <p className="ChooseCategory-button-description">Extract complete content from any document with no coding required! Download the extracted data as markdown or integrate it seamlessly with your software.</p>




            </button>

             
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
