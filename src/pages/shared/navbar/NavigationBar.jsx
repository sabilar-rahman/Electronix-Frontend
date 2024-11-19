import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex md:space-x-4">
        <NavigationMenuItem>

          
            <Link to="/">
              Home
            </Link>
         

        </NavigationMenuItem>
        <NavigationMenuItem>

          
            <Link to="/shop">
              Shop
            </Link>
        

        </NavigationMenuItem>
        <NavigationMenuItem>

        
            <Link to="/page">
              Page
            </Link>
         

        </NavigationMenuItem>

        <NavigationMenuItem>
          

            <Link to="/contact">
              Contact
            </Link>

         
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationBar;
