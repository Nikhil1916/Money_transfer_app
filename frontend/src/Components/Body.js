
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Send from "./Send";
const Body = () => {
  const routes = createBrowserRouter([
    {
        path: '/signin',
        Component: <Signin/>
    },
    {
        path: '/signup',
        Component: <Signup/>
    },
    {
        path: '/dashboard',
        Component: <Dashboard/>
    },
    {
        path: 'send',
        Component: <Send/>
    }
  ])
  return (
    <div>
        <RouterProvider router={routes}></RouterProvider>
    </div>
  )
}

export default Body