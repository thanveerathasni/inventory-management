import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppRouter } from "./routes";
import { injectStore } from "./services/api/interceptors";
import { store } from "./store/store";
import "./styles/index.css";

injectStore(store);

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              className: "text-sm",
              duration: 4000,
            }}
          />
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);
