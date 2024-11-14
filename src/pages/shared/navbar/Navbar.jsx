import { AlignJustify, ComputerIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavbarLogo from "./NavbarLogo";

import NavigationBar from "./NavigationBar";
import NavigationAction from "./NavigationAction";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b px-4 py-4  z-50 sticky top-0 container mx-auto">
      <NavbarLogo />
      <NavigationBar />
      <NavigationAction />
    </div>
  );
};

export default Navbar;
