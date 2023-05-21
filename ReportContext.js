import React, {useState} from 'react';

export const ReportContext = React.createContext();

export const ReportProvider = ({children}) => {
  const [activeReport, setActiveReport] = useState(null);

  return (
    <ReportContext.Provider value={{activeReport, setActiveReport}}>
      {children}
    </ReportContext.Provider>
  );
};