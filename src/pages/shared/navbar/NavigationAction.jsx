import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { logout } from "@/redux/featuresApi/auth/authSlice";
import { useLogoutUserMutation } from "@/redux/featuresApi/auth/authApi";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const NavigationAction = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const userDropdown = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
    },
    // {
    //   title: "Logout",
    //   href: "/logout",
    // },
  ];
  const adminDropdown = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      title: "Manage Items",
      href: "/dashboard/manage-items",
    },
    {
      title: "All Orders",
      href: "/dashboard/all-orders",
    },
    {
      title: "Add New Product",
      href: "/dashboard/add-product",
    },
    // {
    //   title: "Logout",
    //   href: "/logout",
    // },
  ];

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);
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

                    {user && user.role === "user"
                      ? userDropdown.map((item) => (
                          <Link key={item.title} to={item.href}>
                            {item.title}
                          </Link>
                        ))
                      : user && user.role === "admin"
                      ? adminDropdown.map((item) => (
                          <Link key={item.title} to={item.href}>
                            {item.title}
                          </Link>
                        ))
                      : null}

                    {user ? (
                      <Button variant="destructive" onClick={handleLogout}>
                        Logout
                      </Button>
                    ) : (
                      <Button variant="destructive">
                        <Link to="/login">Login</Link>
                      </Button>
                    )}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Display Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.profileImage} alt="Profile" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className=" text-red-500">
                    Welcome, {user.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {user.role === "admin"
                      ? adminDropdown.map((item) => (
                          <DropdownMenuItem key={item.title}>
                            <Link to={item.href}>{item.title}</Link>
                          </DropdownMenuItem>
                        ))
                      : userDropdown.map((item) => (
                          <DropdownMenuItem key={item.title}>
                            <Link to={item.href}>{item.title}</Link>
                          </DropdownMenuItem>
                        ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logout Button */}
              <Button variant="destructive" onClick={() => handleLogout()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="destructive">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationAction;
