import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "component/login/index";
import { ProtectedRoute } from "hooks/authorize";
import Register from "component/register";
import User from "component/user";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
       <ProtectedRoute>
      <App />
       </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
       <ProtectedRoute>
      <User />
       </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
