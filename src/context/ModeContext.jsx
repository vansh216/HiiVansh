import { createContext, useContext, useEffect, useState } from "react";

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("portfolio-mode") || null;
  });

  useEffect(() => {
    if (mode) localStorage.setItem("portfolio-mode", mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}