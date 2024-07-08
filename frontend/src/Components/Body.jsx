// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Send from "./Send";
const Body = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Signup/>
    },
    {
        path: '/signin',
        element: <Signin/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/send',
        element: <Send/>
    },

  ]);
  return (
        <RouterProvider router={routes}/>
  )
}

export default Body