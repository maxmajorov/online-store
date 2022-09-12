import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
