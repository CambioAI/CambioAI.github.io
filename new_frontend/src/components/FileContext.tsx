import React, { createContext, useContext, ReactNode, useState } from 'react';

const FileContext = createContext({
  ExtractKeyValuePostServer: (input_keys: string[], input_descriptions: string[]) => {}, 
  ExtractFullContentPostServer: () => {}
});
 
 
export const useFileContext = () => useContext(FileContext);
 

export const FileProvider: React.FC<{ 
  children: ReactNode; 
  ExtractKeyValuePostServer: (input_keys: string[], input_descriptions: string[]) => void, 
  ExtractFullContentPostServer: () => void 
}> = ({ children, ExtractKeyValuePostServer, ExtractFullContentPostServer }) => (
  <FileContext.Provider value={{ ExtractKeyValuePostServer, ExtractFullContentPostServer }}>
    {children}
  </FileContext.Provider>
);



interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
// Create the context with default values
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {} // Default function that does nothing
});
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};