import { AlignJustify } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

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





const NavigationAction = ({ user, dispatch }) => {



  const [logoutUser]= useLogoutUserMutation()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      

    } catch (error) {
      console.log(error);

    }
  }


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
                    <Button variant="destructive">
                      {" "}
                      <Link to="/login">Login</Link>
                    </Button>
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
              <Avatar>
                <AvatarImage src={user.profileImage} alt="Profile" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

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
