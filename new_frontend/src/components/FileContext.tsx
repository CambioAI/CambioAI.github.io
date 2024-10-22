import React, { createContext, useContext, ReactNode } from 'react';

const FileContext = createContext({ ExtractKeyValue : () => {} , ExtractFullContent : () => {} });


export const useFileContext = () => useContext(FileContext);


export const FileProvider: React.FC<{ children: ReactNode; ExtractKeyValue: () => void, ExtractFullContent: () => void }> = ({ children, ExtractKeyValue, ExtractFullContent }) => (
      <FileContext.Provider value={{ ExtractKeyValue, ExtractFullContent }}>
        {children}
      </FileContext.Provider>
    );