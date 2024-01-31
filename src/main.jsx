import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "material-icons/iconfont/material-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHomePage from "./Component/UserHomePage/UserHomePage.jsx";
import { Setting, SettingPassword, SettingProfile, Dashboard } from "./Page";
import ActivityPage from "./Component/UserHomePage/ActivityPage.jsx";
import Home from "./Component/Home.jsx";
import Contact from "./Component/Contact.jsx";
import Aboutus from "./Component/Aboutus.jsx";
import AdminPage from "./Page/members/adminpage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // {
  //   path: "/login",
  //   element: <Contact />,
  // },
  // {
  //   path: "/Aboutus",
  //   element: <Aboutus />,
  // },


  {
    path: "/UserHomePage",
    element: <UserHomePage />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/setting/password",
    element: <SettingPassword />,
  },
  {
    path: "/setting/profile",
    element: <SettingProfile />,
  },
  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Activity",
    element: <ActivityPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
