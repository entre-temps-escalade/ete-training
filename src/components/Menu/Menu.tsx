import { PropsWithChildren } from "react";
import { MenuProvider } from "./MenuContext";
import MenuTarget from "./MenuTarget";
import MenuDropdown from "./MenuDropdown";

interface Props {
  onExit?: () => void;
}

function Menu({ children, onExit }: PropsWithChildren<Props>) {
  return <MenuProvider onExit={onExit}>{children}</MenuProvider>;
}

Menu.Target = MenuTarget;
Menu.Dropdown = MenuDropdown;

export default Menu;
