import { useLoginUserMutation } from "@/redux/featuresApi/auth/authApi";
import { setUser } from "@/redux/featuresApi/auth/authSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    setValue, // Add setValue to update form fields
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      const { token, user } = res;
      dispatch(setUser({ user }));

      toast.success("Congratulations! Login successful");
      navigate("/");
    } catch (error) {
      setMessage(error.data.message);
      toast.error("Login failed");
    }
  };

  // Predefined demo credentials
  const demoAdmin = { email: "admin@gmail.com", password: "123456" };
  const demoUser = { email: "user@gmail.com", password: "123456" };

  // Function to set demo credentials
  const handleSetDemoCredentials = (type) => {
    const credentials = type === "admin" ? demoAdmin : demoUser;
    setValue("email", credentials.email);
    setValue("password", credentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to Electronix
        </h2>
        <div className="flex justify-center gap-4 mb-4">
          {/* Demo Admin Button */}
          <button
            type="button"
            onClick={() => handleSetDemoCredentials("admin")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Demo Admin
          </button>

          {/* Demo User Button */}
          <button
            type="button"
            onClick={() => handleSetDemoCredentials("user")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Demo User
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 "
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          {message && <span className="text-red-500 text-sm">{message}</span>}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
