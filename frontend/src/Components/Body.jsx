// import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Send from "./Send";
import Main from "./Main";
const Body = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/browse",
      element: <Main />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "send",
          element: <Send />,
        },
      ],
      errorElement: <h1>Error occured</h1>,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Body;
