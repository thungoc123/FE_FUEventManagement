import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// phải thêm provider vào mới sử dụng được
import { Provider } from "react-redux";
import { store, persistor } from "./Store/Store.ts";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import Modal from "./components/Organisms/Guest/Modal.tsx";
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
    </PersistGate>

  </Provider>
  // </React.StrictMode>
);
