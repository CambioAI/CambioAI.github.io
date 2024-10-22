import React from 'react';
import { useTour } from './TourContext';

interface Step {
    position: { top: string; left: string };
    content: string;
}

interface Props {
    steps: Step[];
    onClose: () => void;
}

const TourComponent: React.FC<Props> = ({ steps, onClose }) => {
    const { currentStepIndex, setCurrentStepIndex } = useTour();

    const handleGotIt = () => {
        onClose();
        setCurrentStepIndex(currentStepIndex + 1);
    };

    return (
        <div style={{
            position: 'absolute',
            top: steps[currentStepIndex % steps.length].position.top,
            left: steps[currentStepIndex % steps.length].position.left,
            padding: '10px',
            backgroundColor: '#BFFFD5',
            opacity: 0.8,
            borderRadius: '5px',
            border: "none",
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
        }}>
            <p>{steps[currentStepIndex % steps.length].content}</p>
            <button onClick={handleGotIt} style={{
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
                Got it!
            </button>
        </div>
    );
};

export default TourComponent;
