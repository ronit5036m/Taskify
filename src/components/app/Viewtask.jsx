import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
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

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const token = localStorage.getItem("token");

  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/task", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleComplete(id, completed) {
    try {
      await axiosInstance.patch(
        `/task/${id}`,
        { completed: !completed },
        { headers: { Authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch {
      toast.error("Error updating task");
    }
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.delete(`/task/${id}`, {
        headers: { Authorization: token },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Error deleting task");
    }
  }

  function startEdit(task) {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  }

  async function saveEdit(id) {
    try {
      await axiosInstance.patch(
        `/task/${id}`,
        {
          title: editTitle,
          description: editDesc,
        },
        { headers: { Authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? { ...task, title: editTitle, description: editDesc }
            : task
        )
      );
      setEditId(null);
      toast.success("Task updated!");
    } catch {
      toast.error("Error updating task");
    }
  }

  function cancelEdit() {
    setEditId(null);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 bg-white">
        <div
          className={`max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {loading ? (
            <div className="col-span-full h-screen w-full flex justify-center items-center text-zinc-600 text-4xl">
              <Loading />
            </div>
          ) : tasks.length === 0 ? (
            <div className="col-span-full h-[100vh] flex items-center justify-center">
              <Tasknotfound completed="" />
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4 border border-gray-100 m-10"
                key={task._id}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Incomplete"}
                  </span>
                  <span className="text-xs font-medium text-zinc-400 flex items-center pl-5">
                    {formatDate(task.createdAt)}
                  </span>
                </div>

                {editId === task._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded px-3 py-2 font-medium text-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows="3"
                      className="border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => saveEdit(task._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xl font-bold text-gray-800 break-words">
                      {task.title}
                    </div>
                    <div className="text-sm text-gray-600 break-words">
                      {task.description}
                    </div>
                    <div className="flex items-center flex-wrap gap-3 mt-2">
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <label className="flex items-center gap-2 ml-auto cursor-pointer">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() =>
                            handleComplete(task._id, task.completed)
                          }
                          className="w-5 h-5 accent-green-500 rounded cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">Mark done</span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewTask;
