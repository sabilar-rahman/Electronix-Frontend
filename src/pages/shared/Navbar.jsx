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

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <header className="sticky top-0 w-full borer-b">
        <div className="h-14 container flex items-center">
          {/* desktop */}
          <div className="hidden md:flex">
            <Link to="\">
              <ComputerIcon className="text-red-500" />
            </Link>

            <nav className="flex items-center gap-2 lg:gap-4 ml-2">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/pages">pages</Link>
              <Link to="/contact">contact</Link>
            </nav>
          </div>
          {/* mobile nav */}
          <div className="md:hidden">

            <Sheet>
              <SheetTrigger>
                <AlignJustify />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>

                  <Link to="\">
                    <ComputerIcon className="text-red-500" />
                  </Link>

                  <nav className="flex flex-col  gap-2 lg:gap-4 mt-5 ">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/pages">pages</Link>
                    <Link to="/contact">contact</Link>
                  </nav>

                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          {/* desktop & mobile  */}
           <h1 className="flex flex-1 items-center justify-end">
            <Link to="/"> icon here</Link>
          </h1> 
        </div>
      </header>
    </div>
  );
};

export default Navbar;
