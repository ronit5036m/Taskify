import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterForm from "./pages/Register/Register";
import LoginForm from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Addtask from "./components/app/Addtask";
import Viewtask from "./components/app/Viewtask";
import Errorpage from "./pages/Error/Errorpage";
import { PublicRoute, PrivateRoute } from "./auth/Auth";
import { AuthProvider } from "./Context/AuthContext";
import Completedtask from "./components/app/Completedtask";
import "./App.css";
import LoadingLogo from "./components/Loadinglogo/LoadingLogo";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/addtask"
            element={
              <PrivateRoute>
                <Addtask />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewtask"
            element={
              <PrivateRoute>
                <Viewtask />
              </PrivateRoute>
            }
          />
          <Route
            path="/complete"
            element={
              <PrivateRoute>
                <Completedtask />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />

          {/* Open Access */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
