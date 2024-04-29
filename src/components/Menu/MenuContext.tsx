import { PropsWithChildren, createContext, useState } from "react";

interface IMenuContext {
  opened: boolean;
  close: () => void;
  open: () => void;
  targetRef: HTMLElement | null;
  setTargetRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export const MenuContext = createContext<IMenuContext | null>(null);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [opened, setOpened] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null);

  function close() {
    setOpened(false);
  }

  function open() {
    setOpened(true);
  }

  return (
    <MenuContext.Provider
      value={{ opened, open, close, targetRef, setTargetRef }}
    >
      {children}
    </MenuContext.Provider>
  );
};
