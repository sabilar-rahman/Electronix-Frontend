import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const components = [
  {
    title: "Title 1",
    description: "Description 1",
  },
  {
    title: "Title 2",
    description: "Description 2",
  },
];

const NavigationBar = () => {
  return (
    // <div>
    //     <NavigationMenu>
    //         <NavigationMenuList className="hidden md:flex md:space-x-4">
    //             <NavigationMenuItem>

    //                 <NavigationMenuLink></NavigationMenuLink>

    //             </NavigationMenuItem>
    //         </NavigationMenuList>
    //     </NavigationMenu>
    // </div>

    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex md:space-x-4">
        <NavigationMenuItem>
          <Link href="/">
            <NavigationMenuLink>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/shop">
            <NavigationMenuLink>Shop</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/page">
            <NavigationMenuLink>Page</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact">
            <NavigationMenuLink>Contact</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationBar;
