import React from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./axios-config";

import HomeV1 from "./v1/pages/home";
import AppContext from "./context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/home/home";
import { Modal } from "semantic-ui-react";
import Qp_description from "./v1/components/qp_description";
import { GlobalStyle } from "./global-style";

const Main = () => {
  const [state, setState] = React.useState({
    isShowingQp: false,
    showedQP: null,
    showQp: (showedQP) =>
      setState({
        isShowingQp: true,
        showedQP,
      }),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/v1",
      element: <HomeV1 />,
    },
  ]);

  return [
    <Modal
      key={"modal-qp"}
      size="small"
      open={state.isShowingQp}
      onClose={() => setState({
        isShowingQp: false,
        showedQP: null,
        showQp: (showedQP) =>
          setState({
            isShowingQp: true,
            showedQP,
          }),
      })}
    >
      {state.showedQP ? <Qp_description showedQP={state.showedQP} /> : null}
    </Modal>,
    <AppContext.Provider key={'contet'} value={state}>
      <RouterProvider router={router} />;
    </AppContext.Provider>,
  ];
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle/>
    <Main />
  </React.StrictMode>,
);
