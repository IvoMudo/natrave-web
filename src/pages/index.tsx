import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import { Home } from './Home';
import { SignUp } from './SignUp';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { Profile } from './Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/dashboard",
    element: <Dashboard />,
  }, {
    path: "/:username",
    element: <Profile />,
  },
]);

export const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}