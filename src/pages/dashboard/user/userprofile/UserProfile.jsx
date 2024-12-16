import { Button } from "@/components/ui/button";
import { useEditProfileMutation } from "@/redux/featuresApi/auth/authApi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editProfile, { isLoading, error, isSuccess }] =
    useEditProfileMutation();

  const [formdata, setformData] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto">
      <div>
        <img
          src={
            formdata.profileImage ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />

        <div className="ml-6">
          <h1>{user?.name || ""}</h1>
          <p>{user?.email || ""}</p>
          <p>{user?.bio || " "}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
      </div>
      {/* show modal */}

      {
        
      }
    </div>
  );
};

export default UserProfile;
