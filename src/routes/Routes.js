import { useRoutes } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout";
import { Home, ExerciseDetail, Error, FitnessTracking, SignUp, SignIn } from "../pages";


//import { Route, Routes, Navigate } from "react-router-dom";

export const exerciseRoutes = [
  {
    element: <RootLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/exercise/:id", element: <ExerciseDetail /> },
      { path: "/fitnesstracking", element: <FitnessTracking /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <SignIn /> },
    ],
  },
  { path: "*", element: <Error /> },
];


export const Routes = () => {
  const routes = useRoutes(exerciseRoutes);

  return routes;
};











