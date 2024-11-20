
import NavbarLogo from "./NavbarLogo";

import NavigationBar from "./NavigationBar";
import NavigationAction from "./NavigationAction";

import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {


//  const { user } = useSelector((state) => state.auth);
//  console.log(user);




  return (
    // <div className="flex justify-between items-center border-b px-4 py-4  z-50 sticky top-0 container mx-auto  ">
    <div className="flex justify-between items-center border-b border-white/20 bg-white/30 backdrop-blur-md px-4 py-4 z-50 sticky top-0 container mx-auto ">
      <NavbarLogo />
      <NavigationBar />
      <NavigationAction />
    </div>
  );
};

export default Navbar;
