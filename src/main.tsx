import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// phải thêm provider vào mới sử dụng được
import { Provider } from "react-redux";
import { store } from "./Store/Store.ts";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </Provider>
  // </React.StrictMode>
);
