import HamburgerIcon from "../icons/HamburgerIcon";
import logo from "../assets/ete.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-450 h-12 w-full flex py-2 px-5 items-center justify-between text-white">
      <img className="h-8" src={logo} />
      <HamburgerIcon />
    </nav>
  );
};

export default Navbar;
