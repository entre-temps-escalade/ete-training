import { PropsWithChildren, createContext, useState } from "react";

interface ISidebarContext {
  expanded: boolean | undefined;
  reduce: () => void;
  expand: () => void;
}

export const SidebarContext = createContext<ISidebarContext | null>(null);

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [expanded, setExpanded] = useState<boolean | undefined>(undefined);

  function reduce() {
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <SidebarContext.Provider value={{ expanded, expand, reduce }}>
      {children}
    </SidebarContext.Provider>
  );
};
