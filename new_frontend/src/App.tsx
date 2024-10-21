import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import UploadInterface from './components/UploadInterface';
import LogoutButton from './components/LogoutButton';
import NoticeContainer from './components/NoticeContainer';
import LoginButton from './components/LoginButton';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// import Tour from 'reactour';
import TourComponent from './components/TourComponent';



const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const redirectUri = window.location.origin;

const steps = [
  {
    content: 'Let’s start with parsing a sample doc!',
    selector: '#start-button',
    position: { top: 550, left: 930 },
   
  },
   
];
  


const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
 
  const navigate = useNavigate();
  const navigateToChooseCategory = () => navigate('/chooseCategory');

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
    }
  };
  const renderPreview = () => {
    if (!file) return (<div className="Mainpage_no-file-selected-container">
                        <img src="/Sanbox Icon and images/Sanbox Icon and images/file display place holder illustration.png"  className="Mainpage_no-file-selected"/>
                        <p className="Mainpage_no-file-selected-text">Your uploaded file will be shown here :)</p>
                        </div>);
    const fileUrl = URL.createObjectURL(file);
    if (file.type.startsWith('application/pdf')) {
        return <iframe src={fileUrl} style={{ width: '100%', height: '500px' }} frameBorder="0"></iframe>;
    } else if (file.type.startsWith('image')) {
        return <img src={fileUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />;
    }
  };
  const [isTourOpen, setIsTourOpen] = useState(false);

  const startTour = () => {
    setIsTourOpen(true);
  };

  const closeTour = () => {
    setIsTourOpen(false);
  };






  



  return (
    // <Auth0Provider domain={domain} clientId={clientId} 
    // authorizationParams={{ redirect_uri: window.location.origin }}
    // >

    
    <div className="App">
      <div>
        <Header />
      
      </div>
      <div>
        <SubHeader />
      </div>
      <div>
         
        {/* <LoginButton  />
        <LogoutButton   /> */}
      </div>

    
       

       

      <div className="Mainpage_container">
          <div className="Mainpage_left_panel">


            <div className="left-header">
              <h2>File Outlook</h2>
            </div>
            
            {renderPreview()}
          </div>


          {/* {isAuthenticated ? ( */}
          <div className="Mainpage_right_panel">
            <div className="Mainpage_Notice_container">
              <NoticeContainer  />
            </div>
            

            <h1 className="Mainpage_header-text">Parse Documents</h1>


            <div className="upload-interface-container">
              <UploadInterface onChange={handleFileChange} />
            </div>
            <h1 className="Mainpage_header-text">Or Start with Samples</h1>
            <div className="Mainpage_sample-container">
               
                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                  <img src="/Sanbox Icon and images/Sanbox Icon and images/sample 1.png"  className="Mainpage_sample-button-image"/>
                  <div className="Mainpage_sample-button-content">
                    <h2 className="Mainpage_sample-button-title">Financial Statements</ h2>
                    <p className="Mainpage_sample-button-description">Unstructured | Irregular Layout | Text Multi-layer Tables | Personal ID Info Header & Footers</p>
                  </div>
                  
                </button>


                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                   
                    <img src="/Sanbox Icon and images/Sanbox Icon and images/sample 1.png"  className="Mainpage_sample-button-image"/>
                    <div className="Mainpage_sample-button-content"> 
                      <h2 className="Mainpage_sample-button-title">Sustainability Report</ h2>
                      <p className="Mainpage_sample-button-description">Unstructured | Irregular Layout | Text 
                      Tables | Info Graphic | Plots</p>
                    </div>
                  
                </button>


                <button className="Mainpage_sample-button" onClick={navigateToChooseCategory}>
                  <img src="/Sanbox Icon and images/Sanbox Icon and images/sample 3.png"  className="Mainpage_sample-button-image"/>
                  <div className="Mainpage_sample-button-content">
                    <h2 className="Mainpage_sample-button-title">Table of Contents</ h2>
                    <p className="Mainpage_sample-button-description">Structured | Irregular Layout | Text 
                    Multi-layer list
                  
                  
                  </p>
                  </div>
                </button> 
               
            </div>



            <TourComponent steps={steps} isTourOpen={isTourOpen} closeTour={closeTour} />
            <div className="ProductTour">
              <p>Take a Product Tour?</p>
              <button onClick={startTour} className="product-tour-go-button">Let's Go!</button>  
              <button onClick={closeTour} className="product-tour-dismiss-button">Dismiss</button> 
            </div>
             
             
          


          </div>

          {/* ) : (
            <div  >
              <LoginButton />
            </div>
          )}
        */}
        
      </div>
      
              

    <div className="footer"></div>
    </div >
    // </Auth0Provider>
          
  );

}
export default App;
