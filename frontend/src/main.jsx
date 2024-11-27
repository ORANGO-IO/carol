import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import AppContext from "./context";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/home/home";

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
