import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import "./index.css"
import { createRoot } from "react-dom/client";
import AppContext from "./context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {HomePage} from './pages/home/home'

import Edit from "./pages/edit";

const Main = () => {
  const [isShowingQp, setIsShowingQp] = useState(false);
  const [showedQP, setShowedQP] = useState(null);

  const showQp = (qp) => {
    setIsShowingQp(true);
    setShowedQP(qp);
  };

  const contextValue = {
    isShowingQp,
    showedQP,
    showQp,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/edit",
      element: <Edit />,
    },
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
