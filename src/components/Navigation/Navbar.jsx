import { useEffect, useState } from "react";
import { Menu, X, CircleUserRound, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Navigation/Navbar.css";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isUserClick, setIsuserClicked] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toogleUser = () => setIsuserClicked(!isUserClick);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logout successfully");
  };

  // Online state handler

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex justify-between p-1">
          <div
            className=" text-3xl font-bold text-gray-900 h-full w-full flex justify-start items-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Taskify
          </div>
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>

        {isLoggedIn && (
          <div
            className="md:hidden cursor-pointer relative"
            onClick={toogleUser}
          >
            <CircleUserRound size={35} />
            {isUserClick && (
              <div className="h-35 w-30 border border-zinc-200 absolute right-0 mt-5 rounded-2xl z-999 flex items-center justify-center bg-white">
                <div className="h-11/12 w-11/12 border border-zinc-200 rounded-md flex justify-around flex-col items-center">
                  <div className="h-8 w-8 border text-center flex justify-center items-center rounded-full bg-blue-600 text-white font-bold text-xl">
                    {user.toUpperCase()[0]}
                  </div>
                  <div className="capitalize font-bold text-2xl text-zinc-600">
                    {user}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="hidden md:flex space-x-6 text-gray-700 font-bold text-lg items-center">
          <NavLink to="/" className={"hover:text-blue-600 px-3 py-2"}>
            Home
          </NavLink>
          <NavLink to="/addtask" className={"hover:text-blue-600 px-3 py-2"}>
            Add task
          </NavLink>
          <NavLink to="/viewtask" className={"hover:text-blue-600 px-3 py-2"}>
            View task
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/complete" className={"hover:text-blue-600 px-3 py-2"}>
              Completed task
            </NavLink>
          )}
          <NavLink to="/about" className={"hover:text-blue-600 px-3 py-2"}>
            About us
          </NavLink>

          {isLoggedIn && (
            <div className="cursor-pointer relative" onClick={toogleUser}>
              <CircleUserRound size={35} />
              {isUserClick && (
                <div className="h-55 w-45 border border-zinc-200 absolute right-0 mt-5 rounded-2xl shadow-[0px_8px_24px_15px_#e8e8e8] z-999 flex items-center justify-center bg-white">
                  <div className="h-11/12 w-11/12 border border-zinc-200 rounded-md flex justify-around flex-col items-center">
                    <div className="h-8 w-8 border text-center rounded-full bg-blue-600 text-white flex justify-center items-center">
                      {user.toUpperCase()[0]}
                    </div>
                    <div className="capitalize">{user}</div>
                    <div onClick={handleLogout}>
                      <LogOut />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <NavLink
            to="/"
            className={
              "text-gray-700 hover:text-blue-600 h-10 flex items-center font-medium text-xl pl-5"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/addtask"
            className={
              "h-10 flex items-center font-medium text-xl pl-5 text-gray-700 hover:text-blue-600"
            }
          >
            Add task
          </NavLink>
          <NavLink
            to="/viewtask"
            className={
              "h-10 flex items-center font-medium text-xl pl-5 text-gray-700 hover:text-blue-600"
            }
          >
            View task
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/complete"
              className={
                "h-10 flex items-center font-medium text-xl pl-5 text-gray-700 hover:text-blue-600"
              }
            >
              Completed task
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={
              "h-10 flex items-center font-medium text-xl pl-5 text-gray-700 hover:text-blue-600"
            }
          >
            About Us
          </NavLink>
          {isLoggedIn && (
            <div
              className="h-10 flex items-center font-medium text-xl pl-5 text-gray-700 hover:text-blue-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
