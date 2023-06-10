import { useRoutes } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout";
import { Home, WorkoutLibrary, Error, FitnessTracking, SignUp, SignIn } from "../pages";
import UserProfile from "../pages/UserProfile"

export const exerciseRoutes = [
  {
    element: <RootLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/workout", element: <WorkoutLibrary /> },
      { path: "/fitnesstracking", element: <FitnessTracking /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <SignIn /> },
      { path: "/library", element: <UserProfile /> },
    ],
  },
  { path: "*", element: <Error /> },
];


export const Routes = () => {
  const routes = useRoutes(exerciseRoutes);

  return routes;
};














