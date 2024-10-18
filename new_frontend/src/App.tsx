import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';

import NoticeContainer from './components/NoticeContainer';
import LoginPage from './components/LoginPage';





function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const navigateToChooseCategory = () => navigate('/chooseCategory');

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
    }
  };
  const renderPreview = () => {
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
      <div>
        <Header title="AnyParser" />
      
      </div>
      <div>
        <SubHeader title="Sandbox" />
      </div>

    {isLoggedIn ? ( 
      <LoginPage setIsLoggedIn={setIsLoggedIn} />
    ) : (  
       

       

      <div className="Mainpage_container">
          <div className="Mainpage_left_panel">


            <div className="left-header">
              <h2>File Outlook</h2>
            </div>
            
            {renderPreview()}
          </div>



          <div className="Mainpage_right_panel">
            {/* <div className="notice-container">
              <div className="notice">
                
                <p>We process only the first 10 pages of files up to 10MB in size, and all data is cleared upon page refresh in Sandbox. For details on our no-storage policy, please refer to AnyParser's privacy policy.</p>
              </div>
              <div className="notice-button"> 
                <button className="full-access-button">FULL ACCESS</button>
              </div>
            </div> */}
            <NoticeContainer />

            <h1 className="header-text">Parse Documents</h1>


            <div className="upload-interface-container">
              <UploadInterface onChange={handleFileChange} />
            </div>
            <h1 className="header-text">Or Start with Samples</h1>
            <div className="Mainpage_sample-container">
              <div className="ChooseCategory-buttons"> 
                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                  <img src="testFileLogo.png"  className="Mainpage_sample-button-image"/>
                  <h2 className="Mainpage_sample-button-title">Financial Statements</ h2>
                  <p className="Mainpage_sample-button-description">Unstructured | Irregular Layout | Text Multi-layer Tables | Personal ID Info Header & Footers</p>
                </button>
                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                  <img src="testFileLogo.png"  className="Mainpage_sample-button-image"/>
                  <h2 className="Mainpage_sample-button-title">Sustainability Report</ h2>
                  <p className="Mainpage_sample-button-description">Unstructured | Irregular Layout | Text 
                  Tables | Info Graphic | Plots</p>
                </button>
                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                  <img src="testFileLogo.png"  className="Mainpage_sample-button-image"/>
                  <h2 className="Mainpage_sample-button-title">Table of Contents</ h2>
                  <p className="Mainpage_sample-button-description">Structured | Irregular Layout | Text 
                  Multi-layer list
                  
                  
                  </p>
                </button> 
              </div>
            </div>




            <div className="ProductTour">
              <p>Take a Product Tour?</p>
              <button className="product-tour-button">Let's Go!</button>  
            </div>
             
            


          </div>
          {/* <div className="footer"></div> */}
      </div>
      
    )} 

    <div className="footer"></div>
    </div >
 
          
  );

}
export default App;
