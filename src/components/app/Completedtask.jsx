import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import { toast } from "react-hot-toast";
import Loading from "../Loading/Loading";
import Tasknotfound from "../Tasknotfound/Tasknotfound";

function formatDate(dt) {
  if (!dt) return "";
  const date = new Date(dt);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Completedtask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  async function fetchCompletedTasks() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/task/completed", {
        headers: { Authorization: token },
      });
      const completedTasks = res.data.filter((task) => task.completed);
      setTasks(completedTasks);
    } catch (err) {
      toast.error("Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[88vh] p-4">
        <div className="flex-wrap justify-center items-start gap-8">
          {loading ? (
            <div className="text-center w-full text-zinc-600 text-4xl">
              <Loading />
            </div>
          ) : tasks.length === 0 ? (
            <div>
              <Tasknotfound completed="completed" />
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="w-full max-w-[500px] bg-white rounded-2xl p-6 flex flex-col gap-4 mt-[60px] shadow-md border-gray-100"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                    Task Completed
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {formatDate(task.updatedAt)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800 break-words">
                  {task.title}
                </div>
                <div className="text-base text-gray-600 break-words">
                  {task.description}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Completedtask;
