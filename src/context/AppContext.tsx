import dayjs from "dayjs";
import React, { createContext, useContext, useState } from "react";

const defaultState = {
  monthIndex: 0,
  setMonthIndex: (_index: number) => {},
};

export const AppContext = createContext(defaultState);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  return (
    <AppContext.Provider value={{ monthIndex, setMonthIndex }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
