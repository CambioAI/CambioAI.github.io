import React, { createContext, useContext, ReactNode } from 'react';

const FileContext = createContext({
  ExtractKeyValuePostServer: (input_keys: string[]) => {}, 
  ExtractFullContentPostServer: () => {}
});

export const useFileContext = () => useContext(FileContext);


export const FileProvider: React.FC<{ 
  children: ReactNode; 
  ExtractKeyValuePostServer: (input_keys: string[]) => void, 
  ExtractFullContentPostServer: () => void 
}> = ({ children, ExtractKeyValuePostServer, ExtractFullContentPostServer }) => (
  <FileContext.Provider value={{ ExtractKeyValuePostServer, ExtractFullContentPostServer }}>
    {children}
  </FileContext.Provider>
);