import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TourContextType {
  showTour: boolean;
  setShowTour: (show: boolean) => void;
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [showTour, setShowTour] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const savedState = localStorage.getItem('tourState');
    if (savedState) {
      const { showTour, currentStepIndex } = JSON.parse(savedState);
      setShowTour(showTour);
      setCurrentStepIndex(currentStepIndex);
      console.log("Loaded from local storage:", showTour, currentStepIndex);
    }
  }, []);

  useEffect(() => {
    const state = JSON.stringify({ showTour, currentStepIndex });
    localStorage.setItem('tourState', state);
    console.log("Saved to local storage:", showTour, currentStepIndex);
  }, [showTour, currentStepIndex]);

  return (
    <TourContext.Provider value={{ showTour, setShowTour, currentStepIndex, setCurrentStepIndex }}>
      {children}
    </TourContext.Provider>
  );
};
