import { PropsWithChildren } from "react";
import { MenuProvider } from "./MenuContext";
import MenuTarget from "./MenuTarget";
import MenuDropdown from "./MenuDropdown";

function Menu({ children }: PropsWithChildren) {
  return <MenuProvider>{children}</MenuProvider>;
}

Menu.Target = MenuTarget;
Menu.Dropdown = MenuDropdown;

export default Menu;
