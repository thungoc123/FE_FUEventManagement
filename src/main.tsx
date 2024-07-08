import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// phải thêm provider vào mới sử dụng được
import { Provider } from "react-redux";
<<<<<<< HEAD
import { store } from "./Store/Store.ts";
=======
import { store, persistor } from "./Store/Store.ts";
>>>>>>> TienMerge

import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
<<<<<<< HEAD
        {/* <PersistGate loading={null}> */}
=======
        <PersistGate loading={null} persistor={persistor}>
>>>>>>> TienMerge

    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
<<<<<<< HEAD
    {/* </PersistGate> */}
=======
    </PersistGate>
>>>>>>> TienMerge

  </Provider>
  // </React.StrictMode>
);
