import React, { CSSProperties, useState } from 'react';
import './TourComponent.css';
interface Step {
    position: { top: string; left: string };
    content: string;
    buttonText: string;  // New field for custom button text
    arrowPosition: { [key: string]: string };
    shape: { [key: string]: string };
}

interface Props {
    steps: Step[];
    onClose: () => void;
}

const TourComponent: React.FC<Props> = ({ steps, onClose }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleButtonClick = () => {
        const nextStep = currentStepIndex + 1;
        if (nextStep < steps.length) {
            setCurrentStepIndex(nextStep); // Move to the next step
        } else {
            onClose(); // Close the tour if it's the last step
        }
    };

    const currentStep = steps[currentStepIndex];
    

    return (
       
       
        <div
            className="box"
            style={{
                position: 'absolute',
                top: currentStep.position.top,
                left: currentStep.position.left,
                padding: '10px',
                backgroundColor: '#BFFFD5',
                opacity: 0.8,
                borderRadius: '5px',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '--before-height':   '20px',
                '--before-width':   '30px',
                '--before-transform': `scale( '1,1')`,
                ...currentStep.arrowPosition,
                ...currentStep.shape,

            } as React.CSSProperties}
        >
            <p>{currentStep.content}</p>
            <button onClick={handleButtonClick} style={{
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
            }}>
                {currentStep.buttonText}
            </button>
        </div>
    );
};

export default TourComponent;
