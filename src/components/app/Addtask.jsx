import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";

function AddTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function handleAdd(data) {
    try {
      await axiosInstance.post("/task", data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Task added !");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding task");
    }
    reset();
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-end min-h-[92vh] max-md:min-h-[88vh] bg-[#fdfdfd]">
        <div className="h-full w-full flex justify-center">
          <form
            onSubmit={handleSubmit(handleAdd)}
            className="w-full max-w-[550px] shadow-md rounded-2xl p-7 flex flex-col gap-5 bg-white min-h-[450px] justify-evenly border border-[#dddddd8f] mb-10"
          >
            <h2 className="text-4xl font-bold mb-2 text-left text-zinc-600">
              Taskify
            </h2>
            <input
              type="text"
              placeholder="Task title…"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 30,
                  message: "Title sholud be 30 or less",
                },
              })}
              className="border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
            <textarea
              placeholder="Task description…"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 200,
                  message: "Description should be 100 or less",
                },
              })}
              className="border rounded px-3 py-2 h-32 resize-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
            <button
              type="submit"
              className={`${
                isSubmitting ? "bg-blue-400" : "bg-blue-600"
              } text-white rounded px-4 py-2 text-lg font-semibold cursor-pointer flex justify-center items-center`}
              disabled={isSubmitting}
            >
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
                "Add"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddTask;
