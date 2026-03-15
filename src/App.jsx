import React from "react";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Info from "./page/Info";
import Model from "./page/Model";
import RotationFix from "./page/ratation fix";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Info", element: <Info /> },
  { path: "/Model", element: <Model /> },
]);

const App = () => {
  return (
    <div>
      <RotationFix />
      <RouterProvider router={router} />
    </div>
  )
};




export default App;