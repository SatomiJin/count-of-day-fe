import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/mainStyle.css";
import "./languages/i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "rc-pagination/assets/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
