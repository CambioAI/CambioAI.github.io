import React, { createContext, useContext, ReactNode } from 'react';

const FileContext = createContext({ sendFileToServer: () => {} });

export const useFileContext = () => useContext(FileContext);


export const FileProvider: React.FC<{ children: ReactNode; sendFileToServer: () => void }> = ({ children, sendFileToServer }) => (
      <FileContext.Provider value={{ sendFileToServer }}>
        {children}
      </FileContext.Provider>
    );