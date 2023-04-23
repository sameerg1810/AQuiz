/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "../styles/App.css";
import "bootswatch/dist/quartz/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles/App.css";
/** import components */
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { CheckUserExist } from "../helper/helper";

/** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {
  return (
    <div className="bgimg m-0">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
