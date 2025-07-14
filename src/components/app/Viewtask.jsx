import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
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
      <div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {loading ? (
            <div className="text-center h-[100vh] w-full flex justify-center items-center text-zinc-600 text-4xl">
              <Loading />
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center h-[100vh] w-full flex justify-center items-center text-zinc-400 text-3xl flex-col">
              No tasks yet.
              <Link
                to="/addtask"
                className="text-[15px] m-10 p-5 rounded-full font-extrabold text-blue-700 bg-blue-200"
                title="Add new task"
              >
                <Plus size={35} />
              </Link>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className="w-full max-w-[550px] min-h-[400px] bg-white rounded-2xl p-7 flex flex-col gap-6 justify-center shadow-[0px_5px_6px_3px_rgba(0,_0,_0,_0.1)] mb-[50px]"
                key={task._id}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm px-2 py-1 rounded font-semibold ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.completed ? "Task completed" : "Not complete yet"}
                  </span>
                  <span className="text-sm px-2 py-1 rounded ml-2 font-bold text-zinc-400">
                    {formatDate(task.createdAt)}
                  </span>
                </div>

                {editId === task._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded px-3 py-2 font-medium text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => saveEdit(task._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold text-lg cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 text-gray-900 px-4 py-2 rounded font-bold text-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold break-words">
                      {task.title}
                    </div>
                    <div className="text-base font-normal mb-2 break-words">
                      {task.description}
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold text-lg cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-[#ee3f3f] text-white px-4 py-2 rounded font-bold text-lg cursor-pointer"
                      >
                        Delete
                      </button>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleComplete(task._id, task.completed)
                        }
                        className={`ml-4 w-7 h-7 rounded-full border-gray-300 cursor-pointer ${
                          task.completed ? "bg-green-400" : ""
                        }`}
                        style={{
                          accentColor: task.completed ? "#22c55e" : "#eee",
                          boxShadow: "0 0 2px #aaa",
                        }}
                      />
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
