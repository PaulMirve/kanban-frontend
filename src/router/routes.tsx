import { RouteObject, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import { Layout } from "../components/App";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";

export const routes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: "/",
    element: isAuthenticated ? <Layout /> : <Navigate to={"/login"} />,
    children: [
      {
        path: "",
        element: <Main />,
        index: true,
      },
      {
        path: ":boardId",
        element: <Main />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
];
