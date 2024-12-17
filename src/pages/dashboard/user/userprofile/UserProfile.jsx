import { Button } from "@/components/ui/button";
import { useEditProfileMutation } from "@/redux/featuresApi/auth/authApi";
import { setUser } from "@/redux/featuresApi/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const [formdata, setformData] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
    userId: "",
  });

  useEffect(() => {
    if (user) {
      setformData({
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profileImage: user?.profileImage || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editProfile({
        id: user?._id,
        profileData: {
          name: formdata.name,
          bio: formdata.bio,
          profileImage: formdata.profileImage,
        },
      }).unwrap();
      dispatch(setUser(res)); // Update Redux with new data
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-6 bg-white shadow-lg rounded-lg p-6">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          src={
            formdata.profileImage 
          }
          
        />
        <div>
          <h1 className="text-2xl font-semibold">{user?.name || "Your Name"}</h1>
          <p className="text-gray-600">{user?.email || "example@email.com"}</p>
          <p className="mt-2 text-gray-500">{user?.bio || "Add your bio here"}</p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </Button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formdata.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="profileImage" className="block text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="profileImage"
                  id="profileImage"
                  value={formdata.profileImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows="3"
                  value={formdata.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <Button
                type="submit"
                className={`w-full px-4 py-2 rounded-md text-white ${
                  isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
