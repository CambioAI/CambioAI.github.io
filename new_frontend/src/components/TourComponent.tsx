import React from 'react';

interface Step {
  content: string;
  selector: string;
  position: { top: number; left: number };
}



interface TourComponentProps {
  steps: Step[];
  isTourOpen: boolean;
  closeTour: () => void;
}

const TourComponent: React.FC<TourComponentProps> = ({ steps, isTourOpen, closeTour }) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  React.useEffect(() => {
    if (isTourOpen) {
      const element = document.querySelector(steps[currentStepIndex].selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex, isTourOpen, steps]);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      closeTour(); // End the tour
    }
  };

  if (!isTourOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: steps[currentStepIndex].position.top,
      left: steps[currentStepIndex].position.left,
      padding: '10px',
      backgroundColor: '#BFFFD5',
      opacity: 0.8,

      borderRadius: '5px',
      border: "none",
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      zIndex: 1000, // Ensure it's above other content
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
    }}>
      <p>{steps[currentStepIndex].content}</p>
       
             
      <button onClick={goToNextStep} style={{
      width: "100px",
      alignSelf: "flex-end",
      color: "#F24822",
      backgroundColor: "#BFFFD5",
    
      border: "none",
      textDecoration: "underline",
       
      padding: "5px",
      fontWeight: 700,
      fontSize: "14px",
      cursor: "pointer",
         
         
      }}>Got It!</button>
      </div>
 
  );
};

export default TourComponent;
