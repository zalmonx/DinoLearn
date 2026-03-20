import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./page/Home"));
const Info = lazy(() => import("./page/Info"));
const Model = lazy(() => import("./page/Model"));
import RotationFix from "./page/ratation fix";
import Loading from "./page/loading";


const router = createBrowserRouter([
  { path: "/", element: <Suspense fallback={<Loading />}><Home /></Suspense> },
  { path: "/Info", element: <Suspense fallback={<Loading />}><Info /></Suspense> },
  { path: "/Model", element: <Suspense fallback={<Loading />}><Model /></Suspense> },
], {
  basename: import.meta.env.BASE_URL,
});

const App = () => {
  return (
    <div>
      <RotationFix />
      <RouterProvider router={router} />
    </div>
  )
};




export default App;