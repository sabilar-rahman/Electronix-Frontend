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

const NavigationAction = () => {
  return (
    <div>
      <div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  <div className="flex flex-col space-y-4 items-start  w-full mt-4 text-black">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/price">Pages</Link>
                    <Link to="/contact">Contact</Link>
                    <Button variant="destructive">Sign In</Button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:space-x-4">
          <Button variant="destructive">Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationAction;
