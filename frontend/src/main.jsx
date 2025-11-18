import React from 'react';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './axios-config';

import HomeV1 from './v1/pages/home';
import AppContext from './context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home';
import { GlobalStyle } from './global-style';
import { ComplaintDetailsModal } from './components/complaint-details-modal';

const Main = () => {
  const [modalState, setModalState] = React.useState({
    isShowingQp: false,
    showedQP: null,
    isLoadingQp: false,
  });

  const showQp = React.useCallback((showedQP) => {
    setModalState({
      isShowingQp: true,
      showedQP,
      isLoadingQp: false,
    });
  }, []);

  const startQpLoading = React.useCallback(() => {
    setModalState({
      isShowingQp: true,
      showedQP: null,
      isLoadingQp: true,
    });
  }, []);

  const closeQp = React.useCallback(() => {
    setModalState({
      isShowingQp: false,
      showedQP: null,
      isLoadingQp: false,
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/v1',
      element: <HomeV1 />,
    },
  ]);

  const contextValue = React.useMemo(
    () => ({
      ...modalState,
      showQp,
      closeQp,
      startQpLoading,
    }),
    [modalState, showQp, closeQp, startQpLoading]
  );

  return [
    <ComplaintDetailsModal
      key={'modal-qp'}
      isOpen={modalState.isShowingQp}
      complaint={modalState.showedQP}
      isLoading={modalState.isLoadingQp}
      onClose={closeQp}
    />,
    <AppContext.Provider key={'contet'} value={contextValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>,
  ];
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Main />
  </React.StrictMode>
);
