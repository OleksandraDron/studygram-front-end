import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import persistedStoreConfig from "./store/store-config.js";
import appRouter from "./config/appRouter.jsx";
import { queryClient } from "./config/app-config.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const appContent = (
    <Provider store={persistedStoreConfig.persistedStore}>
      <PersistGate persistor={persistedStoreConfig.storePersistor}>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <RouterProvider router={appRouter} />
            <ToastContainer />
          </StyledEngineProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
  return <>{appContent}</>;
}

export default App;
