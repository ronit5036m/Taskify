import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/Navigation/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../Context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);

      if (response.data.success) {
        const token = response.data.token;
        await login(token);
        navigate("/addtask");
        toast.success(response.data.message);
      } else {
        navigate("/login");
        toast.error("No record found");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[88vh] p-4 bg-[#f8f8f8]">
        <div className="bg-white shadow-sm rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Login Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center ${
                isSubmitting
                  ? "bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isSubmitting}
            >
              {/* Submit Loading */}

              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center font-medium block text-gray-700 mb-1">
              Don't have an account ?{" "}
              <Link
                to="/register"
                className="font-bold hover:text-blue-600 transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
