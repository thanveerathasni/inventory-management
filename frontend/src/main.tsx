import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PUBLIC_ROUTES } from './constants/routes';
import { LoginPage } from './pages/Login';
import { store } from './store/store';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path={PUBLIC_ROUTES.LOGIN} />
          <Route
            element={<Navigate replace to={PUBLIC_ROUTES.LOGIN} />}
            path={PUBLIC_ROUTES.HOME}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
